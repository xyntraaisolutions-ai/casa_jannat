import type { Metadata } from "next";
import { homeHero } from "@/content/villa";
import type { Locale } from "./copy";
import { site } from "./site";

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
  const en = `${site.url}${path === "/" ? "/" : path}`;
  const es = `${site.url}/es${bare}`;
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
