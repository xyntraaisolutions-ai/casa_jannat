import type { MetadataRoute } from "next";
import { experiences } from "@/content/experiences";
import { policies } from "@/content/policies";
import { posts } from "@/content/posts";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"] }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/stays/casa-jannat", priority: 0.95, changeFrequency: "weekly" },
    { path: "/faq", priority: 0.8, changeFrequency: "monthly" },
    { path: "/experiences", priority: 0.7, changeFrequency: "monthly" },
    ...experiences.map((item) => ({
      path: `/experiences/${item.slug}`,
      priority: 0.55,
      changeFrequency: "monthly" as const,
    })),
    { path: "/guide", priority: 0.7, changeFrequency: "monthly" },
    ...posts.map((item) => ({
      path: `/guide/${item.slug}`,
      priority: 0.6,
      changeFrequency: "monthly" as const,
    })),
    { path: "/about", priority: 0.65, changeFrequency: "yearly" },
    { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
    ...policies.map((item) => ({
      path: `/policies/${item.slug}`,
      priority: 0.4,
      changeFrequency: "yearly" as const,
    })),
  ];

  return entries.map(({ path, priority, changeFrequency }) => {
    const bare = path === "/" ? "" : path;
    return {
      url: `${site.url}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
      alternates: {
        languages: {
          en: `${site.url}${path === "/" ? "/" : path}`,
          es: `${site.url}/es${bare}`,
        },
      },
    };
  });
}
