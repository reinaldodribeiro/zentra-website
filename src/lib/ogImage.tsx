import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { firm } from "@/content/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

async function markDataUri(): Promise<string> {
  const svg = await readFile(join(process.cwd(), "public/brand/zentra-mark-on-dark.svg"));
  return `data:image/svg+xml;base64,${svg.toString("base64")}`;
}

export async function renderOgImage(title: string) {
  const mark = await markDataUri();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          background: "#021b38",
          color: "#f4f6fa",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={mark} alt="" width={84} height={77} />
          <div
            style={{
              marginLeft: 28,
              fontSize: 34,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#b6c2d3",
            }}
          >
            {firm.name}
          </div>
        </div>
        <div style={{ width: 120, height: 6, background: "#ca9328", margin: "40px 0" }} />
        <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.08, letterSpacing: -2 }}>{title}</div>
      </div>
    ),
    ogSize,
  );
}
