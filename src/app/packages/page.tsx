import { Container, Eyebrow, LocaleLink, PageMain } from "@/components/ui";
import { packages, quotePackage } from "@/content/packages";
import { t } from "@/lib/copy";
import { formatMoney } from "@/lib/dates";
import { getLocale } from "@/lib/locale";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const locale = await getLocale();
  return buildMetadata({
    locale,
    path: "/packages",
    title: locale === "es" ? "Paquetes" : "Packages",
    description:
      locale === "es"
        ? "La casa más las experiencias, con el ahorro calculado de los mismos precios."
        : "The house plus the experiences, with savings calculated from the same prices.",
  });
}

export default async function PackagesPage() {
  const locale = await getLocale();
  return (
    <PageMain className="pb-24">
      <Container>
        <Eyebrow>{locale === "es" ? "Paquetes" : "Packages"}</Eyebrow>
        <h1 className="mt-3 max-w-3xl font-display text-5xl text-ocean md:text-6xl">
          {locale === "es" ? "El fin de semana ya armado." : "The weekend, already shaped."}
        </h1>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {packages.map((pkg) => {
            const quote = quotePackage(pkg);
            return (
              <LocaleLink key={pkg.slug} locale={locale} href={`/packages/${pkg.slug}`} className="flex flex-col rounded-3xl bg-white p-6 shadow-card">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-coral-deep">
                  {locale === "es" ? "Ahorras" : "Save"} {formatMoney(quote.discount, locale)}
                </p>
                <h2 className="mt-3 font-display text-4xl text-ocean">{t(locale, pkg.title)}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{t(locale, pkg.summary)}</p>
                <p className="mt-6 text-sm">
                  {locale === "es" ? "Desde" : "From"} {formatMoney(quote.total, locale)}
                </p>
              </LocaleLink>
            );
          })}
        </div>
      </Container>
    </PageMain>
  );
}
