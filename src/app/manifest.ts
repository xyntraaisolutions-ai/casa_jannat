import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jaco Escape",
    short_name: "Jaco Escape",
    description: site.description.en,
    start_url: "/",
    display: "standalone",
    background_color: "#F6F1EA",
    theme_color: "#0E3B43",
    lang: "en",
    icons: [
      { src: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
