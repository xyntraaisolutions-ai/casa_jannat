import { notFound } from "next/navigation";
import { ExperienceBooker } from "@/components/ExperienceBooker";
import { JsonLd } from "@/components/JsonLd";
import { Container, Crumbs, Eyebrow, LocaleLink, PageMain } from "@/components/ui";
import {
  categoryLabel,
  experienceFromPrice,
  experiences,
  getExperience,
  type Experience,
} from "@/content/experiences";
import { t, type Copy, type Locale } from "@/lib/copy";
import { formatMoney, formatTime } from "@/lib/dates";
import { getLocale } from "@/lib/locale";
import { buildMetadata } from "@/lib/seo";
import { hostAction, hostHref } from "@/lib/site";

function policyCopy(kind: Experience["policy"], locale: Locale): string {
  const standard =
    locale === "es"
      ? "Puedes cancelar o mover esta experiencia hasta 72 horas antes, con reembolso de esa línea. Dentro de las 72 horas, se debe, salvo que el operador cancele."
      : "You can cancel or move this experience until 72 hours before, and that line is refunded. Inside 72 hours it is due, unless the operator cancels.";
  const weather =
    locale === "es"
      ? " Si el mar, el clima o el parque cierran el día, se mueve o se reembolsa."
      : " If the ocean, the weather, or the park closes the day, it is moved or refunded.";
  const active =
    locale === "es"
      ? " Pide una condición física razonable. Cuéntanos de lesiones, embarazo o límites de edad al sumarla y confirmamos si puedes ir."
      : " It asks for a reasonable level of fitness. Tell us about injuries, pregnancy, or age limits when you add it, and we will confirm you can go.";
  if (kind === "active") return standard + weather + active;
  if (kind === "weather") return standard + weather;
  return standard;
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
          "@type": "Service",
          name: experience.title.en,
          description: experience.summary.en,
          offers: experience.options.map((option) => ({
            "@type": "Offer",
            name: option.label.en,
            price: option.price,
            priceCurrency: "USD",
          })),
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
              <dt className="text-gold">{locale === "es" ? "Desde" : "From"}</dt>
              <dd>{formatMoney(experienceFromPrice(experience), locale)}</dd>
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
              { href: "/experiences", label: locale === "es" ? "Experiencias" : "Experiences", locale },
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
          <h2 className="mt-10 font-display text-3xl text-ocean">{locale === "es" ? "Precios" : "Prices"}</h2>
          <table className="mt-4 w-full text-left text-sm">
            <thead className="text-muted">
              <tr>
                <th className="py-2 font-medium">{locale === "es" ? "Opción" : "Option"}</th>
                <th className="py-2 font-medium">{locale === "es" ? "Grupo" : "Group"}</th>
                <th className="py-2 font-medium">{locale === "es" ? "Precio" : "Price"}</th>
              </tr>
            </thead>
            <tbody>
              {experience.options.map((option) => (
                <tr key={option.id} className="border-t border-line">
                  <td className="py-3">{t(locale, option.label)}</td>
                  <td className="py-3">
                    {option.groupMin === option.groupMax ? option.groupMin : `${option.groupMin}–${option.groupMax}`}
                  </td>
                  <td className="py-3">
                    {formatMoney(option.price, locale)}
                    {option.basis === "person" ? (locale === "es" ? " / persona" : " / person") : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 text-xs text-muted">
            {experience.timeSlots.map((slot) => formatTime(slot, locale)).join(" · ")}
          </p>
          <h2 className="mt-10 font-display text-3xl text-ocean">{locale === "es" ? "Política" : "Policy"}</h2>
          <p className="mt-3 text-sm leading-relaxed">{policyCopy(experience.policy, locale)}</p>
          <LocaleLink locale={locale} href="/policies/cancellation" className="mt-2 inline-block text-sm underline">
            {locale === "es" ? "Cancelación completa" : "Full cancellation policy"}
          </LocaleLink>
          {related.length ? (
            <>
              <h2 className="mt-10 font-display text-3xl text-ocean">{locale === "es" ? "Combina bien con" : "Pairs well with"}</h2>
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
          <ExperienceBooker locale={locale} experience={experience} />
          <a
            href={hostHref(`${locale === "es" ? "Pregunta sobre" : "Question about"} ${experience.title.en}`, experience.title.en)}
            className="block rounded-full border border-ocean px-4 py-3 text-center text-sm font-semibold"
          >
            {hostAction(locale)}
          </a>
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
