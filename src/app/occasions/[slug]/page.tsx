import Image from "next/image";
import { notFound } from "next/navigation";
import { Container, LocaleLink, PageMain } from "@/components/ui";
import { getOccasion, occasions } from "@/content/occasions";
import { getPackage, quotePackage } from "@/content/packages";
import { villa } from "@/content/villa";
import { t } from "@/lib/copy";
import { formatMoney } from "@/lib/dates";
import { getLocale } from "@/lib/locale";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return occasions.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const occasion = getOccasion(slug);
  const locale = await getLocale();
  if (!occasion) return {};
  return buildMetadata({
    locale,
    path: `/occasions/${slug}`,
    title: t(locale, occasion.title),
    description: t(locale, occasion.summary),
  });
}

export default async function OccasionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const occasion = getOccasion(slug);
  if (!occasion) notFound();
  const locale = await getLocale();
  const pkg = occasion.packageSlug ? getPackage(occasion.packageSlug) : undefined;
  const quote = pkg ? quotePackage(pkg) : null;

  return (
    <PageMain className="pb-24">
      <section className="relative min-h-[70vh] text-sand">
        <Image src={occasion.photo} alt={t(locale, occasion.photoAlt)} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep via-ocean-deep/40 to-ocean-deep/20" />
        <Container className="relative flex min-h-[70vh] flex-col justify-end pb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{t(locale, occasion.kicker)}</p>
          <h1 className="mt-3 font-display text-6xl md:text-7xl">{t(locale, occasion.title)}</h1>
          <p className="mt-4 max-w-xl text-lg text-sand/85">{t(locale, occasion.summary)}</p>
        </Container>
      </section>
      <Container className="grid gap-12 py-16 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-lg leading-relaxed">{t(locale, occasion.intro)}</p>
          <ol className="mt-8 space-y-5">
            {occasion.days.map((day) => (
              <li key={day.title.en}>
                <h2 className="font-display text-3xl text-ocean">{t(locale, day.title)}</h2>
                <p className="mt-1 text-sm leading-relaxed text-muted">{t(locale, day.detail)}</p>
              </li>
            ))}
          </ol>
        </div>
        <aside className="space-y-4">
          <div className="rounded-3xl bg-white p-6">
            <p className="text-xs uppercase tracking-[0.16em] text-jungle">{locale === "es" ? "La casa" : "The house"}</p>
            <h2 className="mt-2 font-display text-4xl text-ocean">Casa Jannat</h2>
            <p className="mt-2 text-sm text-muted">{t(locale, villa.summary)}</p>
            <LocaleLink locale={locale} href="/stays/casa-jannat" className="mt-4 inline-block text-sm underline">
              {locale === "es" ? "Ver la casa" : "See the house"}
            </LocaleLink>
          </div>
          {pkg && quote ? (
            <div className="rounded-3xl bg-ocean p-6 text-sand">
              <p className="text-xs uppercase tracking-[0.16em] text-gold">{locale === "es" ? "Paquete" : "Package"}</p>
              <h2 className="mt-2 font-display text-4xl">{t(locale, pkg.title)}</h2>
              <p className="mt-2 text-sm text-sand/80">{t(locale, pkg.summary)}</p>
              <p className="mt-4">
                {locale === "es" ? "Desde" : "From"} {formatMoney(quote.total, locale)}
              </p>
              <LocaleLink locale={locale} href={`/packages/${pkg.slug}`} className="mt-4 inline-flex rounded-full bg-sand px-4 py-2 text-sm font-semibold text-ocean">
                {locale === "es" ? "Armar este paquete" : "Build this package"}
              </LocaleLink>
            </div>
          ) : null}
          <LocaleLink locale={locale} href="/plan-my-trip" className="block rounded-full border border-ocean px-4 py-3 text-center text-sm font-semibold">
            {locale === "es" ? "Pedir un plan a medida" : "Ask for a custom plan"}
          </LocaleLink>
        </aside>
      </Container>
      <Container className="pb-8">
        <h2 className="font-display text-4xl text-ocean">{locale === "es" ? "Lo que los huéspedes mencionan" : "What guests mention"}</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {occasion.points.map((point) => (
            <p key={point.en} className="rounded-3xl bg-white p-5 text-sm leading-relaxed">
              {t(locale, point)}
            </p>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted">
          ★ {villa.rating.score} · {villa.rating.count} Airbnb
        </p>
      </Container>
    </PageMain>
  );
}
