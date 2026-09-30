import { ImageResponse } from "next/og";
import { firm, hero } from "@/content/site";

export const alt = `${firm.name}: ${hero.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
        <div style={{ fontSize: 34, letterSpacing: 6, textTransform: "uppercase", color: "#b6c2d3" }}>
          {firm.name}
        </div>
        <div style={{ width: 120, height: 6, background: "#ca9328", margin: "36px 0" }} />
        <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>{hero.title}</div>
      </div>
    ),
    size,
  );
}
