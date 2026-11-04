import { FacebookIcon, InstagramIcon, JacoLogo } from "./Logo";
import { Container, LocaleLink } from "./ui";
import type { Locale } from "@/lib/copy";
import { site } from "@/lib/site";

export function Footer({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ocean-deep text-sand">
      <Container className="grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <LocaleLink locale={locale} href="/" aria-label="Jaco Escape" className="inline-flex max-w-full">
            <JacoLogo locale={locale} variant="footer" />
          </LocaleLink>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-sand/75">
            {locale === "es"
              ? "Jaco Escape presenta Casa Jannat: una casa de cuatro recámaras con piscina privada en Jacó. Reserva en Airbnb; la reserva directa llega pronto."
              : "Jaco Escape presents Casa Jannat: a four-bedroom private-pool house in Jacó. Book on Airbnb; direct booking is coming soon."}
          </p>
          <a
            href={site.airbnb}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex rounded-full bg-sand px-5 py-2.5 text-sm font-semibold text-ocean hover:bg-white"
          >
            {locale === "es" ? "Reservar en Airbnb" : "Book on Airbnb"}
          </a>
        </div>
        <div className="md:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{locale === "es" ? "La casa" : "The house"}</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <LocaleLink locale={locale} href="/stays/casa-jannat" className="hover:text-gold">
                Casa Jannat
              </LocaleLink>
            </li>
            <li>
              <LocaleLink locale={locale} href="/experiences" className="hover:text-gold">
                {locale === "es" ? "Qué hacer" : "Things to do"}
              </LocaleLink>
            </li>
            <li>
              <LocaleLink locale={locale} href="/guide" className="hover:text-gold">
                {locale === "es" ? "Guía de Jacó" : "Jacó guide"}
              </LocaleLink>
            </li>
          </ul>
        </div>
        <div className="md:col-span-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{locale === "es" ? "Escribir" : "Write"}</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                className="hover:text-gold"
                href={`mailto:${site.email}?subject=${encodeURIComponent("Casa Jannat")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {site.email}
              </a>
            </li>
            {site.phoneDisplay && site.phoneTel ? (
              <li>
                <a className="hover:text-gold" href={`tel:${site.phoneTel}`}>
                  {site.phoneDisplay}
                </a>
              </li>
            ) : null}
            <li>
              <LocaleLink locale={locale} href="/contact" className="hover:text-gold">
                {locale === "es" ? "Contacto" : "Contact"}
              </LocaleLink>
            </li>
            <li>
              <LocaleLink locale={locale} href="/faq" className="hover:text-gold">
                FAQ
              </LocaleLink>
            </li>
            <li>
              <LocaleLink locale={locale} href="/about" className="hover:text-gold">
                {locale === "es" ? "La historia" : "The story"}
              </LocaleLink>
            </li>
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
          <p>
            © {year} Jaco Escape · Casa Jannat · Jacó, Costa Rica
          </p>
          <ul className="flex flex-wrap gap-4">
            <li>
              <LocaleLink locale={locale} href="/policies/cancellation" className="hover:text-sand">
                {locale === "es" ? "Cancelación" : "Cancellation"}
              </LocaleLink>
            </li>
            <li>
              <LocaleLink locale={locale} href="/policies/house-rules" className="hover:text-sand">
                {locale === "es" ? "Reglas" : "House rules"}
              </LocaleLink>
            </li>
            <li>
              <LocaleLink locale={locale} href="/policies/privacy" className="hover:text-sand">
                {locale === "es" ? "Privacidad" : "Privacy"}
              </LocaleLink>
            </li>
            <li>
              <LocaleLink locale={locale} href="/policies/terms" className="hover:text-sand">
                {locale === "es" ? "Términos" : "Terms"}
              </LocaleLink>
            </li>
          </ul>
        </Container>
      </div>
    </footer>
  );
}
