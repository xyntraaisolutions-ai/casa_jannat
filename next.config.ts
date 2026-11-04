import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { NextConfig } from "next";
import { parseProperties } from "./src/lib/parseProperties";

/** Load constant.properties once at config time; Next inlines NEXT_PUBLIC_* for client + server. */
const constantProperties = parseProperties(
  readFileSync(join(process.cwd(), "constant.properties"), "utf8"),
);

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
