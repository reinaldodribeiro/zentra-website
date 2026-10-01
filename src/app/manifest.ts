import type { MetadataRoute } from "next";
import { firm } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: firm.name,
    short_name: firm.shortName,
    lang: "pt-BR",
    start_url: "/",
    display: "browser",
    background_color: "#021b38",
    theme_color: "#021b38",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
