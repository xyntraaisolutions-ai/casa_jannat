import type { MetadataRoute } from "next";
import { experiences } from "@/content/experiences";
import { occasions } from "@/content/occasions";
import { packages } from "@/content/packages";
import { policies } from "@/content/policies";
import { posts } from "@/content/posts";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/stays",
    "/stays/casa-jannat",
    "/experiences",
    ...experiences.map((item) => `/experiences/${item.slug}`),
    "/packages",
    ...packages.map((item) => `/packages/${item.slug}`),
    ...occasions.map((item) => `/occasions/${item.slug}`),
    "/trip",
    "/plan-my-trip",
    "/guide",
    ...posts.map((item) => `/guide/${item.slug}`),
    "/about",
    "/faq",
    "/contact",
    ...policies.map((item) => `/policies/${item.slug}`),
  ];

  return paths.map((path) => {
    const bare = path === "/" ? "" : path;
    return {
      url: `${site.url}${path}`,
      alternates: {
        languages: {
          en: `${site.url}${path === "/" ? "/" : path}`,
          es: `${site.url}/es${bare}`,
        },
      },
    };
  });
}
