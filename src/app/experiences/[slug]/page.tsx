import { notFound } from "next/navigation";
import { AirbnbCta } from "@/components/AirbnbCta";
import { JsonLd } from "@/components/JsonLd";
import { Container, Crumbs, Eyebrow, LocaleLink, PageMain } from "@/components/ui";
import { categoryLabel, experiences, getExperience, type Experience } from "@/content/experiences";
import { t, type Copy, type Locale } from "@/lib/copy";
import { getLocale } from "@/lib/locale";
import { buildMetadata } from "@/lib/seo";
import { hostAction, hostHref, site } from "@/lib/site";

function policyCopy(kind: Experience["policy"], locale: Locale): string {
  const base =
    locale === "es"
      ? "Las condiciones las confirma el operador al coordinar el día."
      : "Terms are confirmed with the operator when you arrange the day.";
  const weather =
    locale === "es"
      ? " Si el mar, el clima o el parque cierran el día, suele moverse o reembolsarse."
      : " If the ocean, weather, or park closes the day, it is usually moved or refunded.";
  const active =
    locale === "es"
      ? " Pide una condición física razonable; comenta lesiones o límites de edad al preguntar."
      : " It asks for a reasonable level of fitness; mention injuries or age limits when you inquire.";
  if (kind === "active") return base + weather + active;
  if (kind === "weather") return base + weather;
  return base;
}

export function generateStaticParams() {
  return experiences.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const experience = getExperience(slug);
  const locale = await getLocale();
  if (!experience) return {};
  return buildMetadata({
    locale,
    path: `/experiences/${slug}`,
    title: t(locale, experience.title),
    description: t(locale, experience.summary),
  });
}

export default async function ExperiencePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const experience = getExperience(slug);
  if (!experience) notFound();
  const locale = await getLocale();
  const related = experience.pairsWith.map((item) => getExperience(item)).filter(Boolean);

  return (
    <PageMain className="pb-24">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TouristAttraction",
          name: experience.title.en,
          description: experience.summary.en,
        }}
      />
      <section className="bg-ocean text-sand">
        <Container className="py-16">
          <Eyebrow light>{t(locale, categoryLabel[experience.category])}</Eyebrow>
          <h1 className="mt-3 max-w-3xl font-display text-5xl md:text-7xl">{t(locale, experience.title)}</h1>
          <p className="mt-4 max-w-2xl text-lg text-sand/80">{t(locale, experience.summary)}</p>
          <dl className="mt-6 flex flex-wrap gap-6 text-sm">
            <div>
              <dt className="text-gold">{locale === "es" ? "Duración" : "Duration"}</dt>
              <dd>{t(locale, experience.duration)}</dd>
            </div>
            <div>
              <dt className="text-gold">{locale === "es" ? "Encuentro" : "Meeting"}</dt>
              <dd>{t(locale, experience.meeting)}</dd>
            </div>
          </dl>
        </Container>
      </section>
      <Container className="grid gap-10 py-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <Crumbs
            items={[
              { href: "/", label: locale === "es" ? "Inicio" : "Home", locale },
              { href: "/experiences", label: locale === "es" ? "Qué hacer" : "Things to do", locale },
              { label: t(locale, experience.title), locale },
            ]}
          />
          <p className="text-lg leading-relaxed">{t(locale, experience.description)}</p>
          <h2 className="mt-10 font-display text-3xl text-ocean">{locale === "es" ? "Cómo va" : "How it goes"}</h2>
          <ol className="mt-4 space-y-4">
            {experience.itinerary.map((step) => (
              <li key={step.time} className="grid grid-cols-[7rem_1fr] gap-3 text-sm">
                <span className="font-semibold text-jungle">{step.time}</span>
                <span>{t(locale, step.step)}</span>
              </li>
            ))}
          </ol>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <List title={locale === "es" ? "Incluye" : "Included"} items={experience.includes} locale={locale} />
            <List title={locale === "es" ? "No incluye" : "Not included"} items={experience.excludes} locale={locale} />
            <List title={locale === "es" ? "Lleva" : "Bring"} items={experience.bring} locale={locale} />
          </div>
          <h2 className="mt-10 font-display text-3xl text-ocean">{locale === "es" ? "Cómo organizarlo" : "How to arrange it"}</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {locale === "es"
              ? "Esta página es informativa. Precios y disponibilidad se confirman con el anfitrión o el operador local — no se reservan en este sitio."
              : "This page is informational. Prices and availability are confirmed with the host or a local operator — not booked on this site."}
          </p>
          <p className="mt-3 text-sm leading-relaxed">{policyCopy(experience.policy, locale)}</p>
          {related.length ? (
            <>
              <h2 className="mt-10 font-display text-3xl text-ocean">{locale === "es" ? "También te puede interesar" : "You may also like"}</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {related.map((item) =>
                  item ? (
                    <LocaleLink key={item.slug} locale={locale} href={`/experiences/${item.slug}`} className="rounded-3xl bg-white p-4">
                      <span className="font-display text-2xl text-ocean">{t(locale, item.title)}</span>
                      <span className="mt-1 block text-sm text-muted">{t(locale, item.summary)}</span>
                    </LocaleLink>
                  ) : null,
                )}
              </div>
            </>
          ) : null}
        </div>
        <div className="space-y-4 lg:sticky lg:top-40 lg:self-start">
          <div className="rounded-[1.6rem] bg-white p-6 shadow-card ring-1 ring-ocean/10">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-jungle">
              {locale === "es" ? "Informativo" : "Informational"}
            </p>
            <h2 className="mt-2 font-display text-3xl text-ocean">{t(locale, experience.title)}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {locale === "es"
                ? "Primero reserva la casa en Airbnb. Luego escribe si quieres sumar esta idea a la semana."
                : "Book the house on Airbnb first. Then write if you want this idea added to the week."}
            </p>
            <AirbnbCta locale={locale} className="mt-5" />
            <a
              href={hostHref(`${locale === "es" ? "Pregunta sobre" : "Question about"} ${experience.title.en}`, experience.title.en)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block rounded-full border border-ocean px-4 py-3 text-center text-sm font-semibold"
            >
              {hostAction(locale)}
            </a>
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent("Casa Jannat")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block text-center text-xs text-muted underline"
            >
              {site.email}
            </a>
          </div>
        </div>
      </Container>
    </PageMain>
  );
}

function List({ title, items, locale }: { title: string; items: Copy[]; locale: Locale }) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-jungle">{title}</h3>
      <ul className="mt-2 space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.en}>{t(locale, item)}</li>
        ))}
      </ul>
    </div>
  );
}
