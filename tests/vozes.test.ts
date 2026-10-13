import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { articles } from "../src/content/articles/index.ts";
import { advocacia } from "../src/content/pages/advocacia.ts";
import { creditoConsignado } from "../src/content/pages/creditoConsignado.ts";
import { disparoWhatsapp } from "../src/content/pages/disparoWhatsapp.ts";
import { voiceForPath, voices } from "../src/content/voices.ts";

const campos = ["demoTitle", "demoBody", "exitTitle", "bubbleText", "finalTitle", "finalBody"] as const;

test("as quatro vozes têm todos os textos e as três mensagens do WhatsApp", () => {
  assert.deepEqual(Object.keys(voices), ["inicial", "consignado", "advocacia", "disparo"]);
  for (const voice of Object.values(voices)) {
    for (const campo of campos) assert.ok(voice[campo].length > 0, campo);
    assert.ok(voice.whatsapp.demo.includes("{nome}"));
    assert.ok(voice.whatsapp.padrao.startsWith("Olá"));
    assert.ok(voice.whatsapp.balao.startsWith("Olá"));
  }
});

test("cada página de segmento tem a própria voz e o resto fala com a inicial", () => {
  assert.equal(voiceForPath("/"), "inicial");
  assert.equal(voiceForPath(creditoConsignado.path), "consignado");
  assert.equal(voiceForPath(advocacia.path), "advocacia");
  assert.equal(voiceForPath(disparoWhatsapp.path), "disparo");
  assert.equal(voiceForPath("/artigos"), "inicial");
  assert.equal(voiceForPath("/privacidade"), "inicial");
  for (const article of articles) assert.notEqual(voiceForPath(article.topic.href), "inicial", article.slug);
});

test("só a voz do consignado fala em carteira, e a do disparo fala em WhatsApp oficial", () => {
  const textos = (key: keyof typeof voices) =>
    [...campos.map((campo) => voices[key][campo]), ...Object.values(voices[key].whatsapp)].join(" ").toLowerCase();
  assert.ok(textos("consignado").includes("carteira"));
  for (const key of ["inicial", "advocacia", "disparo"] as const) assert.ok(!textos(key).includes("carteira"), key);
  assert.ok(textos("advocacia").includes("escritório"));
  assert.ok(textos("disparo").includes("whatsapp oficial"));
  assert.ok(!textos("disparo").includes("entreg"));
});

test("os gatilhos leem a voz da página pelo botão flutuante", () => {
  const float = readFileSync("src/components/layout/WhatsAppFloat.tsx", "utf8");
  assert.ok(float.includes("data-voice={voice}"));
  for (const file of ["WhatsAppBubble", "EngagementCard", "ExitModal", "DemoForm"]) {
    assert.ok(readFileSync(`src/components/conversion/${file}.tsx`, "utf8").includes("usePageVoice()"), file);
  }
  assert.ok(readFileSync("src/components/pages/TopicPage.tsx", "utf8").includes("voiceForPath(content.path)"));
  assert.ok(readFileSync("src/components/pages/ArticlePage.tsx", "utf8").includes("voiceForPath(article.topic.href)"));
});
