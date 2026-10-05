import type { Metadata } from "next";
import type { Locale } from "./copy";
import { site } from "./site";

export function buildMetadata({
  locale,
  path,
  title,
  description,
  absolute = false,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  absolute?: boolean;
}): Metadata {
  const bare = path === "/" ? "" : path;
  const en = `${site.url}${path === "/" ? "/" : path}`;
  const es = `${site.url}/es${bare}`;
  const canonical = locale === "es" ? es : en;
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
      type: "website",
      images: [
        {
          url: "/images/casa-jannat/hero-pool.jpg",
          width: 1200,
          height: 1600,
          alt: "Private pool and spa at Casa Jannat in Jacó at sunset",
        },
      ],
    },
  };
}
