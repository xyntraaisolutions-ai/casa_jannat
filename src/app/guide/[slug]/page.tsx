import { notFound } from "next/navigation";
import { Container, Crumbs, LocaleLink, PageMain } from "@/components/ui";
import { getPost, posts } from "@/content/posts";
import { t } from "@/lib/copy";
import { formatDate } from "@/lib/dates";
import { getLocale } from "@/lib/locale";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  const locale = await getLocale();
  if (!post) return {};
  return buildMetadata({
    locale,
    path: `/guide/${slug}`,
    title: t(locale, post.title),
    description: t(locale, post.description),
  });
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const locale = await getLocale();
  const others = posts.filter((item) => item.slug !== slug).slice(0, 2);

  return (
    <PageMain className="pb-24">
      <Container className="max-w-3xl">
        <Crumbs
          items={[
            { href: "/", label: locale === "es" ? "Inicio" : "Home", locale },
            { href: "/guide", label: locale === "es" ? "Guía" : "Guide", locale },
            { label: t(locale, post.title), locale },
          ]}
        />
        <p className="text-xs uppercase tracking-[0.16em] text-jungle">{formatDate(post.date, locale, true)}</p>
        <h1 className="mt-3 font-display text-5xl leading-tight text-ocean">{t(locale, post.title)}</h1>
        <p className="mt-4 text-lg text-muted">{t(locale, post.description)}</p>
        <article className="mt-10 space-y-5 text-base leading-relaxed">
          {post.blocks.map((block, index) => {
            if (block.type === "h2") {
              return (
                <h2 key={index} className="pt-4 font-display text-3xl text-ocean">
                  {t(locale, block.text)}
                </h2>
              );
            }
            if (block.type === "ul") {
              return (
                <ul key={index} className="list-disc space-y-2 pl-5">
                  {block.items.map((item) => (
                    <li key={item.en}>{t(locale, item)}</li>
                  ))}
                </ul>
              );
            }
            return <p key={index}>{t(locale, block.text)}</p>;
          })}
        </article>
        <div className="mt-12 border-t border-line pt-6">
          <p className="text-sm text-muted">{locale === "es" ? "Sigue" : "Continue"}</p>
          <ul className="mt-3 space-y-2">
            {others.map((item) => (
              <li key={item.slug}>
                <LocaleLink locale={locale} href={`/guide/${item.slug}`} className="font-display text-2xl text-ocean">
                  {t(locale, item.title)}
                </LocaleLink>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </PageMain>
  );
}
