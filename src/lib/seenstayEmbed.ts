import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parseSeenStayEmbedSrc } from "./parseProperties";

/** Same-origin path used by the homepage iframe (avoids SeenStay frame-ancestors blocks). */
export const SEENSTAY_PROXY_PATH = "/embed/seenstay";

/**
 * Upstream SeenStay badge URL from root `seenstay_embed.txt`.
 * Localhost upstreams are skipped in production.
 */
export function loadSeenStayUpstreamUrl(): string {
  try {
    const src = parseSeenStayEmbedSrc(
      readFileSync(join(process.cwd(), "seenstay_embed.txt"), "utf8"),
    ).trim();
    if (!src) return "";
    if (process.env.NODE_ENV === "production" && /^(https?:\/\/)?(localhost|127\.0\.0\.1)(:\d+)?\b/i.test(src)) {
      return "";
    }
    return src;
  } catch {
    return "";
  }
}
