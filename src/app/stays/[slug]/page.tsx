import Image from "next/image";
import { notFound } from "next/navigation";
import { BookingCard } from "@/components/BookingCard";
import { Gallery } from "@/components/Gallery";
import { JsonLd } from "@/components/JsonLd";
import { Container, Crumbs, LocaleLink, PageMain } from "@/components/ui";
import { getExperience } from "@/content/experiences";
import { photos, roomLabels, villa } from "@/content/villa";
import { t } from "@/lib/copy";
import { formatMoney, formatTime } from "@/lib/dates";
import { getLocale } from "@/lib/locale";
import { rates } from "@/lib/rates";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const upsells = ["private-chef", "bartender", "dj", "airport-transfer", "grocery-prestock"];

export function generateStaticParams() {
  return [{ slug: villa.slug }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug !== villa.slug) return {};
  const locale = await getLocale();
  return buildMetadata({
    locale,
    path: `/stays/${slug}`,
    title: locale === "es" ? "Casa Jannat · Un pedacito de paraíso" : "Casa Jannat · A Little Piece of Paradise",
    description: t(locale, villa.summary),
  });
}

export default async function VillaPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  if (slug !== villa.slug) notFound();
  const locale = await getLocale();
  const query = await searchParams;
  const read = (key: string) => (typeof query[key] === "string" ? query[key] : "");
  const guests = Number(read("guests")) || 2;

  return (
    <PageMain className="pb-28">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "VacationRental",
          name: "Casa Jannat",
          description: villa.summary.en,
          image: photos.map((photo) => `${site.url}${photo.src}`),
          address: { "@type": "PostalAddress", addressLocality: "Jacó", addressRegion: "Puntarenas", addressCountry: "CR" },
          containsPlace: villa.bedroomsDetail.map((room) => ({
            "@type": "Accommodation",
            name: room.name.en,
            bed: room.bed.en,
          })),
        }}
      />
      <Container>
        <Crumbs
          items={[
            { href: "/", label: locale === "es" ? "Inicio" : "Home", locale },
            { href: "/stays", label: locale === "es" ? "La casa" : "The house", locale },
            { label: "Casa Jannat", locale },
          ]}
        />
      </Container>
      <Container className="pb-8">
        <Gallery locale={locale} />
      </Container>
      <Container className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
        <div>
          <p className="text-sm text-muted">{t(locale, villa.location)}</p>
          <h1 className="mt-2 font-display text-5xl text-ocean md:text-6xl">Casa Jannat</h1>
          <p className="mt-2 font-display text-2xl italic text-jungle">{t(locale, villa.tagline)}</p>
          <p className="mt-4 text-sm">
            {locale === "es" ? "Casa completa en Jacó" : "Entire home in Jacó"} · {villa.bedrooms} {locale === "es" ? "recámaras" : "bedrooms"} · {villa.bathrooms}{" "}
            {locale === "es" ? "baños" : "baths"} · {locale === "es" ? "piscina privada" : "private pool"}
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {[
              `${villa.maxGuests} ${locale === "es" ? "huéspedes" : "guests"}`,
              `${villa.beds} ${locale === "es" ? "camas" : "beds"} + ${villa.sofaBeds} ${locale === "es" ? "sofá cama" : "sofa bed"}`,
              `${villa.bathrooms} ${locale === "es" ? "baños" : "baths"}`,
              `★ ${villa.rating.score}`,
            ].map((chip) => (
              <li key={chip} className="rounded-full bg-white px-3 py-1 text-sm">
                {chip}
              </li>
            ))}
          </ul>
          <div className="mt-8 space-y-4 leading-relaxed">
            {villa.paragraphs.map((paragraph) => (
              <p key={paragraph.en}>{t(locale, paragraph)}</p>
            ))}
          </div>
          <h2 className="mt-12 font-display text-4xl text-ocean">{locale === "es" ? "Dónde se duerme" : "Where you sleep"}</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {villa.bedroomsDetail.map((room) => (
              <article key={room.name.en} className="overflow-hidden rounded-3xl bg-white">
                <div className="relative h-56">
                  <Image src={room.photo.src} alt={t(locale, room.photo.alt)} fill className="object-cover" sizes="(min-width: 640px) 40vw, 100vw" />
                </div>
                <div className="p-4">
                  <h3 className="font-display text-2xl">{t(locale, room.name)}</h3>
                  <p className="text-sm text-muted">
                    {t(locale, room.bed)} · {room.ac ? (locale === "es" ? "Aire propio" : "Its own A/C") : locale === "es" ? "Aire de la sala" : "Living-room A/C"}
                  </p>
                  <p className="mt-2 text-sm">{t(locale, room.note)}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted">{t(locale, villa.sofa)}</p>
          <h2 className="mt-12 font-display text-4xl text-ocean">{locale === "es" ? "La casa tiene" : "The house has"}</h2>
          <div className="mt-5 space-y-6">
            {villa.amenities.map((group) => (
              <div key={group.category.en}>
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-jungle">{t(locale, group.category)}</h3>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item.en} className="rounded-full bg-white px-3 py-1 text-sm">
                      {t(locale, item)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted">
            {photos.map((photo) => t(locale, roomLabels[photo.room])).filter((value, index, list) => list.indexOf(value) === index).join(" · ")}
          </p>
          <h2 className="mt-12 font-display text-4xl text-ocean">{locale === "es" ? "Reglas, en corto" : "Rules, briefly"}</h2>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed">
            <li>{locale === "es" ? `Entrada ${formatTime(site.checkIn, locale)}. Salida ${formatTime(site.checkOut, locale)}.` : `Check-in ${formatTime(site.checkIn, locale)}. Checkout ${formatTime(site.checkOut, locale)}.`}</li>
            <li>{locale === "es" ? "Silencio de 10:00 p.m. a 8:00 a.m." : "Quiet hours 10:00 p.m. to 8:00 a.m."}</li>
            <li>{locale === "es" ? "Sin vidrio en la piscina." : "No glass at the pool."}</li>
            <li>
              {locale === "es"
                ? `Depósito de seguridad reembolsable de ${formatMoney(rates.securityDeposit, locale)}.`
                : `Refundable security deposit of ${formatMoney(rates.securityDeposit, locale)}.`}
            </li>
          </ul>
          <LocaleLink locale={locale} href="/policies/house-rules" className="mt-3 inline-block text-sm underline">
            {locale === "es" ? "Reglas completas" : "Full house rules"}
          </LocaleLink>
          <h2 className="mt-12 font-display text-4xl text-ocean">{locale === "es" ? "Hazlo inolvidable" : "Make it a particular week"}</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {upsells.map((slug) => {
              const experience = getExperience(slug);
              if (!experience) return null;
              return (
                <LocaleLink key={slug} locale={locale} href={`/experiences/${slug}`} className="rounded-3xl bg-ocean p-4 text-sand">
                  <span className="font-display text-2xl">{t(locale, experience.title)}</span>
                  <span className="mt-2 block text-sm text-sand/75">{t(locale, experience.summary)}</span>
                </LocaleLink>
              );
            })}
          </div>
          <h2 className="mt-12 font-display text-4xl text-ocean">{locale === "es" ? "Alrededor" : "Around"}</h2>
          <ul className="mt-4 space-y-3">
            {villa.nearby.map((place) => (
              <li key={place.name.en} className="flex justify-between gap-4 text-sm">
                <span className="font-medium">{t(locale, place.name)}</span>
                <span className="text-right text-muted">{t(locale, place.detail)}</span>
              </li>
            ))}
          </ul>
          <iframe
            title={locale === "es" ? "Ubicación aproximada en Jacó" : "Approximate location in Jacó"}
            className="mt-4 h-72 w-full rounded-3xl border-0"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-84.655%2C9.595%2C-84.600%2C9.640&layer=mapnik&marker=9.616%2C-84.629"
          />
          <h2 className="mt-12 font-display text-4xl text-ocean">
            {villa.rating.score} · {villa.rating.count} {locale === "es" ? "reseñas" : "reviews"}
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {villa.categories.map((category) => (
              <p key={category.label.en} className="flex justify-between text-sm">
                <span>{t(locale, category.label)}</span>
                <span>{category.score.toFixed(1)}</span>
              </p>
            ))}
          </div>
          <a className="mt-4 inline-block text-sm underline" href={site.airbnb}>
            {locale === "es" ? "También en Airbnb" : "Also on Airbnb"}
          </a>
        </div>
        <div className="lg:sticky lg:top-28 lg:self-start">
          <BookingCard
            locale={locale}
            initialCheckIn={read("checkIn")}
            initialCheckOut={read("checkOut")}
            initialGuests={guests}
            initialOccasion={read("occasion")}
          />
        </div>
      </Container>
      <div className="fixed inset-x-0 bottom-0 z-20 flex items-center justify-between border-t border-line bg-sand/95 px-4 py-3 pr-40 backdrop-blur md:hidden">
        <p className="text-sm">
          <span className="font-semibold">{formatMoney(rates.green, locale)}</span>
          <span className="text-muted"> {locale === "es" ? "/ noche" : "/ night"}</span>
        </p>
        <a href="#reserve" className="rounded-full bg-coral-deep px-4 py-2 text-sm font-semibold text-white">
          {locale === "es" ? "Ver fechas" : "Check dates"}
        </a>
      </div>
    </PageMain>
  );
}
