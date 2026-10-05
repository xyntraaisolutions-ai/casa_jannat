import { notFound } from "next/navigation";
import { Container, Crumbs, PageMain } from "@/components/ui";
import { getPolicy, policies } from "@/content/policies";
import { t } from "@/lib/copy";
import { getLocale } from "@/lib/locale";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return policies.map((policy) => ({ slug: policy.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const policy = getPolicy(slug);
  const locale = await getLocale();
  if (!policy) return {};
  return buildMetadata({
    locale,
    path: `/policies/${slug}`,
    title: t(locale, policy.title),
    description: t(locale, policy.description),
  });
}

export default async function PolicyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const policy = getPolicy(slug);
  if (!policy) notFound();
  const locale = await getLocale();
  const sections = policy.sections(locale);

  return (
    <PageMain className="pb-24">
      <Container className="max-w-3xl">
        <Crumbs
          items={[
            { href: "/", label: locale === "es" ? "Inicio" : "Home", locale },
            { label: t(locale, policy.title), locale },
          ]}
        />
        <h1 className="font-display text-5xl text-ocean">{t(locale, policy.title)}</h1>
        <p className="mt-4 text-muted">{t(locale, policy.description)}</p>
        <div className="mt-10 space-y-8">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-3xl text-ocean">{section.heading}</h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </PageMain>
  );
}
