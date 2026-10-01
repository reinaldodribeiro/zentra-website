import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { existsSync } from "node:fs";
import { launch } from "chrome-launcher";
import lighthouse from "lighthouse";
import puppeteer from "puppeteer-core";

const ROUTES = ["/", "/credito-consignado", "/advocacia"];
const MIN_SCORE = 90;
const MAX_LCP_MS = 2500;
const RUNS = 3;
const MAC_CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

function freePort() {
  return new Promise((resolve, reject) => {
    const probe = createServer();
    probe.listen(0, () => {
      const { port } = probe.address();
      probe.close(() => resolve(port));
    });
    probe.on("error", reject);
  });
}

async function waitForServer(base) {
  const deadline = Date.now() + 60000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(base);
      if (response.status === 200) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`${base} did not answer 200 within 60 s`);
}

function median(values) {
  return [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)];
}

async function measureOnce(chrome, url) {
  const { lhr } = await lighthouse(url, { port: chrome.port, output: "json", logLevel: "error", throttlingMethod: "devtools" });
  const scores = Object.fromEntries(
    ["performance", "accessibility", "best-practices", "seo"].map((id) => [id, Math.round(lhr.categories[id].score * 100)]),
  );
  return { scores, lcp: Math.round(lhr.audits["largest-contentful-paint"].numericValue) };
}

async function measure(chrome, url) {
  const runs = [];
  for (let run = 0; run < RUNS; run += 1) runs.push(await measureOnce(chrome, url));
  const scores = Object.fromEntries(
    Object.keys(runs[0].scores).map((id) => [id, median(runs.map((item) => item.scores[id]))]),
  );
  return { scores, lcp: median(runs.map((item) => item.lcp)) };
}

async function acceptAnalytics(chrome, base) {
  const browser = await puppeteer.connect({ browserURL: `http://127.0.0.1:${chrome.port}` });
  const page = await browser.newPage();
  await page.goto(base, { waitUntil: "networkidle2" });
  const accepted = await page.evaluate(() => {
    const buttons = document.querySelectorAll("section[aria-label] button");
    const accept = buttons[buttons.length - 1];
    if (!accept) return false;
    accept.click();
    return true;
  });
  await new Promise((resolve) => setTimeout(resolve, 4000));
  await page.close();
  browser.disconnect();
  if (!accepted) throw new Error("banner de consentimento nao encontrado: a medicao com consentimento nao pode ser feita");
}

if (!process.env.CHROME_PATH && existsSync(MAC_CHROME)) process.env.CHROME_PATH = MAC_CHROME;

const port = await freePort();
const server = spawn("npx", ["next", "start", "-p", String(port)], { stdio: "ignore" });
const chrome = await launch({ chromeFlags: ["--headless=new", "--no-sandbox"] });
const failures = [];

try {
  const base = `http://localhost:${port}`;
  await waitForServer(base);
  for (const route of ROUTES) await waitForServer(`${base}${route}`);
  if (process.env.LIGHTHOUSE_CONSENT === "1") await acceptAnalytics(chrome, base);
  for (const route of ROUTES) {
    const { scores, lcp } = await measure(chrome, `${base}${route}`);
    console.log(`${route}  performance ${scores.performance}  accessibility ${scores.accessibility}  best-practices ${scores["best-practices"]}  seo ${scores.seo}  LCP ${lcp} ms`);
    for (const [id, value] of Object.entries(scores)) {
      if (value < MIN_SCORE) failures.push(`${route} ${id} ${value} < ${MIN_SCORE}`);
    }
    if (lcp > MAX_LCP_MS) failures.push(`${route} LCP ${lcp} ms > ${MAX_LCP_MS} ms`);
  }
} finally {
  await chrome.kill();
  server.kill();
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("todas as rotas dentro da meta");
