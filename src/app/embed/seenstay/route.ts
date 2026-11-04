import { loadSeenStayUpstreamUrl } from "@/lib/seenstayEmbed";

export const dynamic = "force-dynamic";

/**
 * Same-origin proxy for the SeenStay badge.
 * Production seenstay.ai still sends X-Frame-Options: DENY (plus a narrow frame-ancestors
 * allowlist), so a direct HTTPS iframe fails with "refused to connect."
 * Serving the badge HTML from this site lets the homepage iframe work on HTTPS.
 */
export async function GET() {
  const upstream = loadSeenStayUpstreamUrl();
  if (!upstream) {
    return new Response("SeenStay embed is not configured.", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
    });
  }

  let res: Response;
  try {
    res = await fetch(upstream, {
      headers: { Accept: "text/html", "User-Agent": "CasaJannatEmbed/1.0" },
      cache: "no-store",
      signal: AbortSignal.timeout(12_000),
    });
  } catch {
    return new Response("SeenStay embed is temporarily unavailable.", {
      status: 502,
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
    });
  }

  if (!res.ok) {
    return new Response("SeenStay embed is temporarily unavailable.", {
      status: 502,
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
    });
  }

  const html = await res.text();
  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=60",
      // Allow this site only to frame the proxied badge (never forward upstream DENY).
      "Content-Security-Policy": "frame-ancestors 'self'",
      "X-Frame-Options": "SAMEORIGIN",
      "X-Robots-Tag": "noindex",
      "Referrer-Policy": "no-referrer",
    },
  });
}
