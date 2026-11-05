import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { NextConfig } from "next";
import { parseProperties, parseSeenStayEmbedSrc } from "./src/lib/parseProperties";

/** Load constant.properties once at config time; Next inlines NEXT_PUBLIC_* for client + server. */
const constantProperties = parseProperties(
  readFileSync(join(process.cwd(), "constant.properties"), "utf8"),
);

/** SeenStay iframe snippet — root `seenstay_embed.txt` is the source of truth for the badge URL. */
try {
  const embedSrc = parseSeenStayEmbedSrc(
    readFileSync(join(process.cwd(), "seenstay_embed.txt"), "utf8"),
  );
  if (embedSrc) constantProperties["seenstay.embedUrl"] = embedSrc;
} catch {
  // Optional file — section stays hidden if missing.
}

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
  },
  env: {
    NEXT_PUBLIC_SITE_CONSTANTS: JSON.stringify(constantProperties),
  },
  async headers() {
    return [
      {
        source: "/embed/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "no-referrer" },
          // Same-origin homepage iframe; do not send DENY.
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
