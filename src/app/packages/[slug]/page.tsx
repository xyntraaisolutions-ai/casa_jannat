import { notFound } from "next/navigation";
import { PackageBook } from "@/components/PackageBook";
import { Container, Crumbs, PageMain } from "@/components/ui";
import { getExperience } from "@/content/experiences";
import { getPackage, packages, quotePackage } from "@/content/packages";
import { t } from "@/lib/copy";
import { formatMoney } from "@/lib/dates";
import { getLocale } from "@/lib/locale";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return packages.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pkg = getPackage(slug);
  const locale = await getLocale();
  if (!pkg) return {};
  return buildMetadata({
    locale,
    path: `/packages/${slug}`,
    title: t(locale, pkg.title),
    description: t(locale, pkg.summary),
  });
}

export default async function PackagePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pkg = getPackage(slug);
  if (!pkg) notFound();
  const locale = await getLocale();
  const quote = quotePackage(pkg);

  return (
    <PageMain className="pb-24">
      <Container className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <Crumbs
            items={[
              { href: "/", label: locale === "es" ? "Inicio" : "Home", locale },
              { href: "/packages", label: locale === "es" ? "Paquetes" : "Packages", locale },
              { label: t(locale, pkg.title), locale },
            ]}
          />
          <h1 className="font-display text-5xl text-ocean md:text-6xl">{t(locale, pkg.title)}</h1>
          <p className="mt-4 max-w-xl text-lg text-muted">{t(locale, pkg.summary)}</p>
          <ol className="mt-8 space-y-5">
            {pkg.days.map((day, index) => (
              <li key={day.title.en}>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-jungle">
                  {locale === "es" ? "Día" : "Day"} {index + 1}
                </p>
                <h2 className="font-display text-3xl text-ocean">{t(locale, day.title)}</h2>
                <p className="mt-1 text-sm leading-relaxed">{t(locale, day.detail)}</p>
              </li>
            ))}
          </ol>
          <h2 className="mt-10 font-display text-3xl text-ocean">{locale === "es" ? "Qué entra" : "What's in it"}</h2>
          <ul className="mt-4 divide-y divide-line text-sm">
            <li className="flex justify-between py-2">
              <span>
                Casa Jannat · {pkg.nights} {locale === "es" ? "noches, temporada verde" : "nights, green season"}
              </span>
              <span>{formatMoney(quote.lodging, locale)}</span>
            </li>
            <li className="flex justify-between py-2">
              <span>{locale === "es" ? "Limpieza" : "Cleaning"}</span>
              <span>{formatMoney(quote.cleaning, locale)}</span>
            </li>
            <li className="flex justify-between py-2">
              <span>IVA 13%</span>
              <span>{formatMoney(quote.iva, locale)}</span>
            </li>
            {quote.lines.map((line) => {
              const experience = getExperience(line.slug);
              return (
                <li key={`${line.slug}-${line.optionId}`} className="flex justify-between gap-4 py-2">
                  <span>{experience ? t(locale, experience.title) : line.slug} · {t(locale, line.label)}</span>
                  <span>{formatMoney(line.amount, locale)}</span>
                </li>
              );
            })}
            <li className="flex justify-between py-2 text-jungle">
              <span>{locale === "es" ? "Ahorro del paquete" : "Package savings"}</span>
              <span>−{formatMoney(quote.discount, locale)}</span>
            </li>
            <li className="flex justify-between py-3 font-semibold">
              <span>{locale === "es" ? "Desde" : "From"}</span>
              <span>{formatMoney(quote.total, locale)}</span>
            </li>
          </ul>
          <p className="mt-3 text-xs text-muted">
            {locale === "es"
              ? "El hospedaje usa la tarifa de temporada verde. Si tus fechas caen en temporada alta, el viaje recalcula las noches."
              : "Lodging uses the green-season rate. If your dates fall in high season, the trip recalculates the nights."}
          </p>
        </div>
        <div className="lg:sticky lg:top-28 lg:self-start">
          <PackageBook locale={locale} pkg={pkg} />
        </div>
      </Container>
    </PageMain>
  );
}
