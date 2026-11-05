import Image from "next/image";
import { categoryLabel, experiences } from "@/content/experiences";
import { homeHero, jacoView, photos, villa } from "@/content/villa";
import { t, type Locale } from "@/lib/copy";
import { site } from "@/lib/site";
import { AirbnbCta } from "./AirbnbCta";
import { Newsletter } from "./Forms";
import { CasaBanner } from "./Logo";
import { SeenStayEmbed } from "./SeenStayEmbed";
import { Container, Eyebrow, LocaleLink } from "./ui";

export function HomePage({ locale }: { locale: Locale }) {
  const featured = experiences.filter((item) => item.featured).slice(0, 6);
  const gallery = [photos[0], photos[1], photos[2], photos[3]];

  return (
    <>
      <section className="relative flex min-h-[100svh] flex-col overflow-hidden text-sand md:min-h-0 md:h-[calc(100svh-6.25rem)]">
        <Image
          src={jacoView.src}
          alt={t(locale, jacoView.alt)}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={90}
          className="object-cover object-center"
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[78%] bg-gradient-to-r from-ocean-deep/80 via-ocean-deep/45 to-transparent md:w-[60%] md:from-ocean-deep/75 md:via-ocean-deep/35" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-ocean-deep/45 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ocean-deep/55 to-transparent" />
        <Container className="relative mt-auto flex flex-col pb-10 pt-32 md:pb-20 md:pt-36">
          <Eyebrow light>{locale === "es" ? "Jacó, Costa Rica" : "Jacó, Costa Rica"}</Eyebrow>
          <h1 className="mt-2 max-w-xl font-display text-4xl leading-[0.92] drop-shadow-[0_2px_18px_rgb(8_38_44/0.45)] sm:text-5xl md:mt-3 md:text-7xl">
            Casa Jannat
            <span className="mt-1.5 block font-display text-xl italic text-sand/95 sm:text-2xl md:mt-2 md:text-4xl">
              {locale === "es" ? "un pedacito de paraíso" : "a little piece of paradise"}
            </span>
          </h1>
          <p className="mt-3 max-w-md rounded-2xl bg-ocean-deep/75 px-3.5 py-2.5 text-sm font-medium leading-relaxed text-sand backdrop-blur-sm sm:text-base md:mt-4 md:px-4 md:py-3 md:text-lg">
            {locale === "es"
              ? "Cuatro recámaras, piscina privada, y la playa a un corto paseo."
              : "Four bedrooms, a private pool, and the beach a short walk away."}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3 md:mt-7 md:gap-4">
            <AirbnbCta locale={locale} size="lg" variant="solid" showNote={false} />
            <LocaleLink
              locale={locale}
              href="/stays/casa-jannat"
              className="inline-flex rounded-full border border-sand/50 px-5 py-3 text-sm font-semibold text-sand backdrop-blur-sm hover:bg-sand/10 md:px-6 md:py-3.5 md:text-base"
            >
              {locale === "es" ? "Ver la casa" : "See the house"}
            </LocaleLink>
          </div>
          <p className="mt-2.5 text-[0.7rem] font-medium text-sand/90 [text-shadow:0_1px_3px_rgb(8_38_44/0.7)] md:mt-3 md:text-xs">
            {locale === "es" ? "Reserva directa próximamente · Por ahora, Airbnb" : "Direct booking coming soon · Book on Airbnb for now"}
          </p>
        </Container>
      </section>

      <section className="border-b border-line bg-white">
        <Container className="flex justify-center px-5 py-10 sm:py-14">
          <CasaBanner locale={locale} />
        </Container>
      </section>

      <section className="border-b border-line bg-sand-2/60 py-12 md:py-14" aria-labelledby="casa-facts">
        <Container>
          <Eyebrow>{locale === "es" ? "En resumen" : "At a glance"}</Eyebrow>
          <h2 id="casa-facts" className="mt-3 font-display text-3xl text-ocean md:text-4xl">
            {locale === "es" ? "Qué es Casa Jannat." : "What Casa Jannat is."}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink/90 md:text-lg">
            {locale === "es"
              ? "Casa Jannat es una casa completa en Jacó, Puntarenas, Costa Rica, operada por Jaco Escape. Tiene cuatro recámaras (una king y tres queens), un sofá cama, tres baños, piscina privada con spa circular, entrada con caja de seguridad y la playa a un corto paseo. Duerme hasta ocho personas. En Airbnb tiene 4.9 de 49 estadías. Hoy se reserva en Airbnb; la reserva directa en este sitio llega pronto."
              : "Casa Jannat is an entire home in Jacó, Puntarenas, Costa Rica, operated by Jaco Escape. It has four bedrooms (one king and three queens), a sofa bed, three bathrooms, a private pool with a round spa, lockbox check-in, and Jacó beach a short walk away. It sleeps up to eight guests. On Airbnb it is rated 4.9 from 49 stays. Book on Airbnb today; direct booking on this site is coming soon."}
          </p>
          <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                dt: locale === "es" ? "Huéspedes" : "Guests",
                dd: locale === "es" ? `Hasta ${villa.maxGuests}` : `Up to ${villa.maxGuests}`,
              },
              {
                dt: locale === "es" ? "Recámaras" : "Bedrooms",
                dd: `${villa.bedrooms}`,
              },
              {
                dt: locale === "es" ? "Entrada / salida" : "Check-in / out",
                dd: `${site.checkIn.slice(0, 2)}:00 · ${site.checkOut.slice(0, 2)}:00`,
              },
              {
                dt: "Airbnb",
                dd: `★ ${villa.rating.score} · ${villa.rating.count}`,
              },
            ].map((row) => (
              <div key={row.dt} className="border-l-2 border-jungle/35 pl-3">
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{row.dt}</dt>
                <dd className="mt-1 font-display text-2xl text-ocean">{row.dd}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="bg-sand py-16 md:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <Eyebrow>{locale === "es" ? "La casa" : "The house"}</Eyebrow>
            <h2 className="mt-3 font-display text-4xl text-ocean md:text-5xl">
              {locale === "es" ? "Jannat es la palabra para el paraíso." : "Jannat is the word for paradise."}
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted md:text-lg">{t(locale, villa.summary)}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {villa.highlights.map((item) => (
                <li key={item.en} className="border-l-2 border-jungle/40 pl-3 text-sm text-ocean">
                  {t(locale, item)}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <LocaleLink locale={locale} href="/stays/casa-jannat" className="text-sm font-semibold text-ocean underline underline-offset-4">
                {locale === "es" ? "Fotos, recámaras y reglas" : "Photos, bedrooms, and rules"}
              </LocaleLink>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {gallery.map((photo, index) => (
              <div
                key={photo.src}
                className={`relative overflow-hidden rounded-3xl ${index === 0 ? "col-span-2 aspect-[16/10]" : "aspect-[4/3]"}`}
              >
                <Image src={photo.src} alt={t(locale, photo.alt)} fill className="object-cover" sizes="(min-width: 1024px) 28vw, 50vw" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 md:py-20">
        <Container>
          <Eyebrow>{locale === "es" ? "En la casa" : "Inside the house"}</Eyebrow>
          <h2 className="mt-3 max-w-2xl font-display text-4xl text-ocean md:text-5xl">
            {locale === "es" ? "Lo esencial, sin ruido." : "The essentials, without the clutter."}
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {villa.amenities.map((group) => (
              <div key={group.category.en}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-jungle">{t(locale, group.category)}</h3>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink/90">
                  {group.items.map((item) => (
                    <li key={item.en}>{t(locale, item)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ocean py-16 text-sand md:py-20">
        <Container>
          <Eyebrow light>Airbnb · {villa.rating.count}</Eyebrow>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">
            {villa.rating.score} {locale === "es" ? "de" : "from"} {villa.rating.count} {locale === "es" ? "estadías" : "stays"}
          </h2>
          <p className="mt-4 max-w-xl text-sand/80">
            {locale === "es"
              ? "Las notas son públicas en Airbnb. Aquí están las categorías, no citas inventadas."
              : "The scores are public on Airbnb. These are the categories, not invented quotations."}
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {villa.categories.map((category) => (
              <p key={category.label.en} className="flex items-baseline justify-between gap-4 border-b border-white/15 pb-3 text-sm">
                <span>{t(locale, category.label)}</span>
                <span className="font-semibold text-gold">{category.score.toFixed(1)}</span>
              </p>
            ))}
          </div>
          <a href={site.airbnb} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block text-sm underline underline-offset-4">
            {locale === "es" ? "Leer las reseñas en Airbnb" : "Read the reviews on Airbnb"}
          </a>
        </Container>
      </section>

      <section className="bg-sand py-16 md:py-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>{locale === "es" ? "Alrededor" : "Around the house"}</Eyebrow>
              <h2 className="mt-3 font-display text-4xl text-ocean md:text-5xl">
                {locale === "es" ? "Ideas para los días." : "Ideas for the days."}
              </h2>
              <p className="mt-3 max-w-xl text-muted">
                {locale === "es"
                  ? "Chef, pesca, traslados y tours — para organizar con tu anfitrión u operadores locales. Aquí no se reservan."
                  : "Chef, fishing, transfers, and tours — arrange with your host or local operators. Not booked on this site."}
              </p>
            </div>
            <LocaleLink locale={locale} href="/experiences" className="text-sm font-semibold text-ocean underline underline-offset-4">
              {locale === "es" ? "Ver todas" : "See all"}
            </LocaleLink>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((item) => (
              <LocaleLink
                key={item.slug}
                locale={locale}
                href={`/experiences/${item.slug}`}
                className="group flex min-h-44 flex-col justify-between rounded-[1.6rem] bg-ocean p-6 text-sand transition hover:-translate-y-0.5"
              >
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-gold">{t(locale, categoryLabel[item.category])}</p>
                  <h3 className="mt-3 font-display text-3xl leading-none">{t(locale, item.title)}</h3>
                  <p className="mt-3 text-sm text-sand/80">{t(locale, item.summary)}</p>
                </div>
                <span className="mt-6 text-sm opacity-80 group-hover:underline">
                  {locale === "es" ? "Leer más" : "Read more"}
                </span>
              </LocaleLink>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 md:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <Eyebrow>Jacó</Eyebrow>
            <h2 className="mt-3 font-display text-4xl text-ocean md:text-5xl">
              {locale === "es" ? "El pueblo, a la distancia justa." : "The town, at the right distance."}
            </h2>
            <ul className="mt-8 space-y-4">
              {villa.nearby.map((place) => (
                <li key={place.name.en} className="border-b border-line pb-4">
                  <p className="font-medium text-ocean">{t(locale, place.name)}</p>
                  <p className="mt-1 text-sm text-muted">{t(locale, place.detail)}</p>
                </li>
              ))}
            </ul>
            <LocaleLink locale={locale} href="/guide" className="mt-6 inline-block text-sm font-semibold text-ocean underline underline-offset-4">
              {locale === "es" ? "Guía de Jacó" : "Jacó guide"}
            </LocaleLink>
          </div>
          <iframe
            title={locale === "es" ? "Ubicación aproximada en Jacó" : "Approximate location in Jacó"}
            className="h-80 w-full rounded-[1.6rem] border-0 lg:h-full lg:min-h-[28rem]"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=-84.655%2C9.595%2C-84.600%2C9.640&layer=mapnik&marker=${site.map.lat}%2C${site.map.lng}`}
          />
        </Container>
      </section>

      <section className="relative overflow-hidden py-20 text-sand md:py-28">
        <Image src={homeHero.src} alt={t(locale, homeHero.alt)} fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-ocean-deep/65" />
        <Container className="relative max-w-2xl">
          <Eyebrow light>{locale === "es" ? "Tu semana" : "Your week"}</Eyebrow>
          <h2 className="mt-3 font-display text-4xl md:text-6xl">
            {locale === "es" ? "El Pacífico a un corto paseo. La piscina es tuya." : "The Pacific is a short walk. The pool is yours."}
          </h2>
          <p className="mt-4 text-sand/85">
            {locale === "es"
              ? "Reservá Casa Jannat en Airbnb. La reserva directa desde este sitio llega pronto."
              : "Book Casa Jannat on Airbnb. Direct booking from this site is coming soon."}
          </p>
          <AirbnbCta locale={locale} size="lg" variant="light" className="mt-8" showNote={false} />
          <p className="mt-8 text-sm text-sand/75">
            {locale === "es"
              ? "Dejá un correo y te escribimos cuando una semana esté abierta."
              : "Leave an email and we will write when a week is open."}
          </p>
          <Newsletter locale={locale} />
          <LocaleLink locale={locale} href="/contact" className="mt-4 inline-block text-sm underline underline-offset-4">
            {locale === "es" ? "O escribe directo" : "Or write directly"}
          </LocaleLink>
        </Container>
      </section>

      <SeenStayEmbed locale={locale} />
    </>
  );
}
