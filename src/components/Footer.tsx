import { FacebookIcon, InstagramIcon, JacoLogo } from "./Logo";
import { Container, LocaleLink } from "./ui";
import { t, type Locale } from "@/lib/copy";
import { site } from "@/lib/site";
import { occasions } from "@/content/occasions";

export function Footer({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ocean-deep text-sand">
      <Container className="grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <LocaleLink locale={locale} href="/" aria-label="Jaco Escape" className="inline-flex max-w-full">
            <JacoLogo locale={locale} variant="footer" />
          </LocaleLink>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-sand/75">
            {locale === "es"
              ? "Estadías y experiencias en el Pacífico. Casa Jannat es la casa: piscina privada en Jacó, y el resto del viaje se arma en el mismo lugar."
              : "Stays and experiences on the Pacific. Casa Jannat is the house: a private pool in Jacó, and the rest of the trip is arranged in the same place."}
          </p>
        </div>
        <div className="md:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{locale === "es" ? "Quedarse" : "Stay"}</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><LocaleLink locale={locale} href="/stays/casa-jannat" className="hover:text-gold">Casa Jannat</LocaleLink></li>
            <li><LocaleLink locale={locale} href="/experiences" className="hover:text-gold">{locale === "es" ? "Experiencias" : "Experiences"}</LocaleLink></li>
            <li><LocaleLink locale={locale} href="/packages" className="hover:text-gold">{locale === "es" ? "Paquetes" : "Packages"}</LocaleLink></li>
            <li><LocaleLink locale={locale} href="/guide" className="hover:text-gold">{locale === "es" ? "Guía" : "Guide"}</LocaleLink></li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{locale === "es" ? "Ocasiones" : "Occasions"}</p>
          <ul className="mt-4 space-y-2 text-sm">
            {occasions.map((occasion) => (
              <li key={occasion.slug}>
                <LocaleLink locale={locale} href={`/occasions/${occasion.slug}`} className="hover:text-gold">
                  {t(locale, occasion.title)}
                </LocaleLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{locale === "es" ? "Escribir" : "Write"}</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a className="hover:text-gold" href={`mailto:${site.email}`}>{site.email}</a></li>
            {site.phoneDisplay && site.phoneTel ? (
              <li><a className="hover:text-gold" href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a></li>
            ) : null}
            <li><LocaleLink locale={locale} href="/contact" className="hover:text-gold">{locale === "es" ? "Contacto" : "Contact"}</LocaleLink></li>
            <li><LocaleLink locale={locale} href="/plan-my-trip" className="hover:text-gold">{locale === "es" ? "Planear mi viaje" : "Plan my trip"}</LocaleLink></li>
            <li><LocaleLink locale={locale} href="/faq" className="hover:text-gold">FAQ</LocaleLink></li>
            <li><LocaleLink locale={locale} href="/about" className="hover:text-gold">{locale === "es" ? "La historia" : "The story"}</LocaleLink></li>
          </ul>
          <div className="mt-4 flex gap-3">
            {site.instagram ? (
              <a href={site.instagram} className="rounded-full border border-white/20 p-2 hover:text-gold" aria-label="Instagram">
                <InstagramIcon />
              </a>
            ) : null}
            {site.facebook ? (
              <a href={site.facebook} className="rounded-full border border-white/20 p-2 hover:text-gold" aria-label="Facebook">
                <FacebookIcon />
              </a>
            ) : null}
          </div>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-5 text-xs text-sand/60 md:flex-row md:items-center md:justify-between">
          <p>© {year} Jaco Escape · Jacó, Costa Rica</p>
          <ul className="flex flex-wrap gap-4">
            <li><LocaleLink locale={locale} href="/policies/cancellation" className="hover:text-sand">{locale === "es" ? "Cancelación" : "Cancellation"}</LocaleLink></li>
            <li><LocaleLink locale={locale} href="/policies/house-rules" className="hover:text-sand">{locale === "es" ? "Reglas" : "House rules"}</LocaleLink></li>
            <li><LocaleLink locale={locale} href="/policies/privacy" className="hover:text-sand">{locale === "es" ? "Privacidad" : "Privacy"}</LocaleLink></li>
            <li><LocaleLink locale={locale} href="/policies/terms" className="hover:text-sand">{locale === "es" ? "Términos" : "Terms"}</LocaleLink></li>
          </ul>
        </Container>
      </div>
    </footer>
  );
}
