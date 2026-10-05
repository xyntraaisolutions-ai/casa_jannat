import { Container, Eyebrow, LocaleLink, PageMain } from "@/components/ui";
import { posts } from "@/content/posts";
import { t } from "@/lib/copy";
import { formatDate } from "@/lib/dates";
import { getLocale } from "@/lib/locale";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const locale = await getLocale();
  return buildMetadata({
    locale,
    path: "/guide",
    title: locale === "es" ? "Guía de Jacó" : "Jacó guide",
    description:
      locale === "es"
        ? "Qué hacer en Jacó, cómo llegar del SJO y cuándo pescar."
        : "What to do in Jacó, how to get there from SJO, and when to fish.",
  });
}

export default async function GuidePage() {
  const locale = await getLocale();
  return (
    <PageMain className="pb-24">
      <Container>
        <Eyebrow>{locale === "es" ? "Guía" : "Guide"}</Eyebrow>
        <h1 className="mt-3 max-w-3xl font-display text-5xl text-ocean md:text-6xl">
          {locale === "es" ? "Jacó, dicho en corto." : "Jacó, said plainly."}
        </h1>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {posts.map((post) => (
            <LocaleLink key={post.slug} locale={locale} href={`/guide/${post.slug}`} className="rounded-3xl bg-white p-6">
              <p className="text-xs uppercase tracking-[0.16em] text-jungle">{formatDate(post.date, locale, true)}</p>
              <h2 className="mt-3 font-display text-3xl text-ocean">{t(locale, post.title)}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{t(locale, post.description)}</p>
            </LocaleLink>
          ))}
        </div>
      </Container>
    </PageMain>
  );
}
