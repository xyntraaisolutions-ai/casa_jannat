import Image from "next/image";
import Link from "next/link";
import { categoryLabel, experienceFromIsPerPerson, experienceFromPrice, experiences } from "@/content/experiences";
import { occasions } from "@/content/occasions";
import { packages, quotePackage } from "@/content/packages";
import { homeHero, photos, villa } from "@/content/villa";
import { t, type Locale } from "@/lib/copy";
import { formatMoney } from "@/lib/dates";
import { rates } from "@/lib/rates";
import { QuickAdd } from "./AddButtons";
import { HeroSearch } from "./HeroSearch";
import { Newsletter } from "./Forms";
import { CasaBanner } from "./Logo";
import { Container, Eyebrow, LocaleLink } from "./ui";

export function HomePage({ locale }: { locale: Locale }) {
  const featured = experiences.filter((item) => item.featured);
  return (
    <>
      <section className="relative min-h-[100svh] text-sand">
        <Image
          src={homeHero.src}
          alt={t(locale, homeHero.alt)}
          fill
          priority
          sizes="100vw"
          quality={90}
          className="object-cover object-[center_58%] md:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep via-ocean-deep/35 to-ocean-deep/25" />
        <Container className="relative flex min-h-[100svh] flex-col justify-end pb-36 pt-28 md:pb-10 md:pt-32">
          <Eyebrow light>{t(locale, villa.tagline)}</Eyebrow>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.95] md:text-7xl">
            {locale === "es" ? (
              <>
                Casa Jannat
                <span className="mt-2 block text-3xl italic text-sand/90 md:text-5xl">un pedacito de paraíso en Jacó</span>
              </>
            ) : (
              <>
                Casa Jannat
                <span className="mt-2 block text-3xl italic text-sand/90 md:text-5xl">a little piece of paradise in Jacó</span>
              </>
            )}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-sand/85">
            {locale === "es"
              ? "Piscina privada, cuatro recámaras y la playa a unos minutos."
              : "Private pool, four bedrooms, and the beach just minutes away."}
          </p>
          <HeroSearch locale={locale} />
        </Container>
      </section>

      <section className="border-b border-line bg-white" aria-label="Casa Jannat">
        <Container className="flex justify-center px-5 py-12 sm:py-16 md:py-20">
          <CasaBanner locale={locale} />
        </Container>
      </section>

      <section className="border-b border-line bg-sand">
        <Container className="grid gap-4 py-5 text-sm sm:grid-cols-2 lg:grid-cols-4">
          {[
            `★ ${villa.rating.score} · ${villa.rating.count} ${locale === "es" ? "huéspedes" : "guests"}`,
            locale === "es" ? "Piscina privada" : "Private pool",
            locale === "es" ? "Entrada con caja de seguridad" : "Lockbox check-in",
            locale === "es" ? `Código ${rates.promoCode} al reservar directo` : `Code ${rates.promoCode} when you book direct`,
          ].map((item) => (
            <p key={item} className="border-line sm:border-l sm:pl-4 first:border-0 first:pl-0">
              {item}
            </p>
          ))}
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow>{locale === "es" ? "La casa" : "The house"}</Eyebrow>
            <h2 className="mt-4 font-display text-5xl leading-tight text-ocean md:text-6xl">
              {locale === "es" ? "Jannat es la palabra para paraíso." : "Jannat is the word for paradise."}
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-ink/90">
              {villa.paragraphs.slice(0, 2).map((paragraph) => (
                <p key={paragraph.en}>{t(locale, paragraph)}</p>
              ))}
            </div>
            <p className="mt-6 font-display text-3xl text-ocean">
              {locale === "es" ? "Desde" : "From"} {formatMoney(rates.green, locale)}
              <span className="ml-2 font-sans text-base text-muted">{locale === "es" ? "/ noche, temporada verde" : "/ night, green season"}</span>
            </p>
            <LocaleLink locale={locale} href="/stays/casa-jannat" className="mt-6 inline-flex rounded-full bg-ocean px-5 py-3 text-sm font-semibold text-sand">
              {locale === "es" ? "Ver la casa" : "See the house"}
            </LocaleLink>
          </div>
          <div className="grid grid-cols-2 gap-3 lg:col-span-7">
            <div className="arch relative col-span-2 min-h-[420px] overflow-hidden">
              <Image src={photos[3].src} alt={t(locale, photos[3].alt)} fill className="object-cover" sizes="(min-width: 1024px) 40vw, 100vw" />
            </div>
            <div className="relative min-h-48 overflow-hidden rounded-3xl">
              <Image src={photos[1].src} alt={t(locale, photos[1].alt)} fill className="object-cover" sizes="30vw" />
            </div>
            <div className="relative min-h-48 overflow-hidden rounded-3xl">
              <Image src={photos[2].src} alt={t(locale, photos[2].alt)} fill className="object-cover" sizes="30vw" />
            </div>
          </div>
        </Container>
        <Container className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {villa.highlights.map((item) => (
            <p key={item.en} className="rounded-full bg-white px-4 py-3 text-sm">
              {t(locale, item)}
            </p>
          ))}
        </Container>
      </section>

      <section className="bg-ocean py-20 text-sand">
        <Container>
          <Eyebrow light>{locale === "es" ? "Para qué vienes" : "What you came for"}</Eyebrow>
          <h2 className="mt-3 font-display text-5xl">{locale === "es" ? "Planea la ocasión." : "Plan the occasion."}</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {occasions.map((occasion) => (
              <LocaleLink key={occasion.slug} locale={locale} href={`/occasions/${occasion.slug}`} className="group relative min-h-64 overflow-hidden rounded-3xl">
                <Image src={occasion.photo} alt={t(locale, occasion.photoAlt)} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(min-width: 1024px) 30vw, 100vw" />
                <span className="absolute inset-0 bg-gradient-to-t from-ocean-deep/85 to-ocean-deep/10" />
                <span className="absolute inset-x-0 bottom-0 p-5">
                  <span className="block text-xs uppercase tracking-[0.16em] text-gold">{t(locale, occasion.kicker)}</span>
                  <span className="mt-1 block font-display text-4xl">{t(locale, occasion.title)}</span>
                </span>
              </LocaleLink>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <div>
              <Eyebrow>{locale === "es" ? "Alrededor de la casa" : "Around the house"}</Eyebrow>
              <h2 className="mt-3 font-display text-5xl text-ocean">{locale === "es" ? "Experiencias que se suman al viaje." : "Experiences that join the trip."}</h2>
            </div>
            <LocaleLink locale={locale} href="/experiences" className="hidden text-sm underline md:inline">
              {locale === "es" ? "Ver todas" : "See all"}
            </LocaleLink>
          </div>
        </Container>
        <div className="mt-8 flex gap-4 overflow-x-auto px-5 pb-4 md:px-8">
          {featured.map((item) => (
            <article key={item.slug} className="flex w-[280px] shrink-0 flex-col justify-between rounded-3xl bg-ocean p-5 text-sand">
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.16em] text-gold">{t(locale, categoryLabel[item.category])}</p>
                <h3 className="mt-3 font-display text-3xl">
                  <LocaleLink locale={locale} href={`/experiences/${item.slug}`}>
                    {t(locale, item.title)}
                  </LocaleLink>
                </h3>
                <p className="mt-3 text-sm text-sand/75">{t(locale, item.summary)}</p>
              </div>
              <div className="mt-6 flex items-center justify-between gap-2">
                <p className="text-sm">
                  {locale === "es" ? "Desde" : "From"} {formatMoney(experienceFromPrice(item), locale)}
                  {experienceFromIsPerPerson(item) ? (locale === "es" ? " / persona" : " / person") : ""}
                </p>
                <QuickAdd locale={locale} slug={item.slug} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-sand-2 py-20">
        <Container>
          <Eyebrow>{locale === "es" ? "Paquetes" : "Packages"}</Eyebrow>
          <h2 className="mt-3 max-w-xl font-display text-5xl text-ocean">{locale === "es" ? "Tres formas de no armarlo pieza por pieza." : "Three ways to skip assembling it piece by piece."}</h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {packages.map((pkg) => {
              const quote = quotePackage(pkg);
              return (
                <LocaleLink key={pkg.slug} locale={locale} href={`/packages/${pkg.slug}`} className="flex flex-col rounded-3xl bg-white p-6 shadow-card">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-coral-deep">
                    {locale === "es" ? "Ahorras" : "Save"} {formatMoney(quote.discount, locale)}
                  </p>
                  <h3 className="mt-3 font-display text-3xl text-ocean">{t(locale, pkg.title)}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{t(locale, pkg.summary)}</p>
                  <p className="mt-6 text-sm">
                    {locale === "es" ? "Desde" : "From"} {formatMoney(quote.total, locale)} · {pkg.nights} {locale === "es" ? "noches" : "nights"}
                  </p>
                </LocaleLink>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container className="grid gap-8 md:grid-cols-3">
          {[
            {
              n: "01",
              title: locale === "es" ? "Elige la casa" : "Pick the house",
              body: locale === "es" ? "Fechas, huéspedes y la ocasión. El precio se arma de la misma tabla en todas partes." : "Dates, guests, and the occasion. The price is built from the same table everywhere.",
            },
            {
              n: "02",
              title: locale === "es" ? "Suma los días" : "Add the days",
              body: locale === "es" ? "Chef, bote, traslado, lo que sea. Cada uno guarda fecha, hora y tamaño del grupo." : "Chef, boat, transfer, whichever. Each one keeps a date, a time, and a group size.",
            },
            {
              n: "03",
              title: locale === "es" ? "Llega" : "Arrive",
              body: locale === "es" ? "Confirmamos el calendario, mandamos el pago y la caja de seguridad te espera." : "We confirm the calendar, send payment, and the lockbox is waiting.",
            },
          ].map((step) => (
            <div key={step.n}>
              <p className="font-display text-5xl text-jungle">{step.n}</p>
              <h3 className="mt-3 font-display text-3xl text-ocean">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
            </div>
          ))}
        </Container>
      </section>

      <section className="bg-white py-20">
        <Container>
          <Eyebrow>Airbnb · {villa.rating.count}</Eyebrow>
          <h2 className="mt-3 font-display text-5xl text-ocean">
            {villa.rating.score} <span className="text-3xl text-muted">{locale === "es" ? "de 49 estadías" : "from 49 stays"}</span>
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted">
            {locale === "es"
              ? "Las notas son públicas en Airbnb. Aquí están las categorías, no citas inventadas."
              : "The scores are public on Airbnb. These are the categories, not invented quotations."}
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {villa.categories.map((category) => (
              <div key={category.label.en}>
                <div className="flex justify-between text-sm">
                  <span>{t(locale, category.label)}</span>
                  <span>{category.score.toFixed(1)}</span>
                </div>
                <div className="mt-2 h-1 rounded-full bg-sand-2">
                  <div className="h-1 rounded-full bg-ocean" style={{ width: `${(category.score / 5) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {villa.themes.map((theme) => (
              <p key={theme.en} className="rounded-3xl bg-sand p-5 text-sm leading-relaxed">
                {t(locale, theme)}
              </p>
            ))}
          </div>
          <a href="https://www.airbnb.com/rooms/1310243367711997885" className="mt-6 inline-block text-sm underline">
            {locale === "es" ? "Leer las reseñas en Airbnb" : "Read the reviews on Airbnb"}
          </a>
        </Container>
      </section>

      <section className="py-20">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <Eyebrow>Jacó</Eyebrow>
            <h2 className="mt-3 font-display text-5xl text-ocean">{locale === "es" ? "El pueblo, a la distancia justa." : "The town, at the right distance."}</h2>
            <ul className="mt-6 divide-y divide-line">
              {villa.nearby.map((place) => (
                <li key={place.name.en} className="flex items-baseline justify-between gap-4 py-3">
                  <span className="font-medium">{t(locale, place.name)}</span>
                  <span className="text-right text-sm text-muted">{t(locale, place.detail)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted">
              {locale === "es"
                ? "El mapa marca el barrio. La dirección llega con la confirmación."
                : "The map marks the neighborhood. The address arrives with confirmation."}
            </p>
          </div>
          <iframe
            title={locale === "es" ? "Mapa aproximado de Jacó" : "Approximate map of Jacó"}
            className="min-h-80 w-full rounded-3xl border-0"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-84.655%2C9.595%2C-84.600%2C9.640&layer=mapnik&marker=9.616%2C-84.629"
          />
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <h2 className="font-display text-4xl text-ocean">{locale === "es" ? "La casa, de cerca" : "The house, up close"}</h2>
          <div className="mt-6 grid grid-cols-2 gap-2 md:grid-cols-4">
            {photos.slice(0, 4).map((photo) => (
              <LocaleLink key={photo.src} locale={locale} href="/stays/casa-jannat" aria-label={t(locale, photo.alt)} className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                <Image src={photo.src} alt={t(locale, photo.alt)} fill className="object-cover" sizes="25vw" />
              </LocaleLink>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative min-h-[70vh] text-sand">
        <Image src={homeHero.src} alt="" fill className="object-cover object-center" sizes="100vw" quality={90} />
        <div className="absolute inset-0 bg-ocean-deep/70" />
        <Container className="relative py-24">
          <h2 className="max-w-2xl font-display text-5xl leading-tight md:text-6xl">
            {locale === "es" ? "El Pacífico queda a un corto paseo. La piscina es tuya." : "The Pacific is a short walk. The pool is yours."}
          </h2>
          <p className="mt-4 max-w-lg text-sand/80">
            {locale === "es"
              ? "Deja el correo y te escribimos cuando haya una semana abierta — y el traslado de llegada en una reserva directa."
              : "Leave an email and we will write when a week is open — and about the airport ride on a direct booking."}
          </p>
          <Newsletter locale={locale} />
          <Link href={locale === "es" ? "/es/contact" : "/contact"} className="mt-4 inline-block text-sm underline">
            {locale === "es" ? "O escribe directo" : "Or write directly"}
          </Link>
        </Container>
      </section>
    </>
  );
}
