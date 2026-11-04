import type { Metadata } from "next";
import { homeHero } from "@/content/villa";
import type { Locale } from "./copy";
import { site } from "./site";

/** Absolute site URL for a path. Home is always self-canonical with a trailing slash. */
export function absoluteUrl(path = "/"): string {
  const base = site.url.replace(/\/$/, "");
  if (!path || path === "/") return `${base}/`;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildMetadata({
  locale,
  path,
  title,
  description,
  absolute = false,
  image,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  absolute?: boolean;
  image?: { url: string; width: number; height: number; alt: string };
}): Metadata {
  const bare = path === "/" ? "" : path;
  const en = absoluteUrl(path);
  const es = absoluteUrl(`/es${bare}`);
  const canonical = locale === "es" ? es : en;
  const share = image ?? {
    url: homeHero.src,
    width: homeHero.width,
    height: homeHero.height,
    alt: locale === "es" ? homeHero.alt.es : homeHero.alt.en,
  };
  return {
    title: absolute ? { absolute: title } : title,
    description,
    // Indexable — never noindex public marketing pages.
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    alternates: {
      canonical,
      languages: { en, es, "x-default": en },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: site.name,
      locale: locale === "es" ? "es_CR" : "en_US",
      alternateLocale: locale === "es" ? ["en_US"] : ["es_CR"],
      type: "website",
      images: [share],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [share.url],
    },
  };
}
