"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Search } from "lucide-react";
import { barePath, LOCALE_COOKIE, localizeHref, t, type Locale } from "@/lib/copy";
import { occasions } from "@/content/occasions";
import { JacoLogo } from "./Logo";
import { useTrip } from "./TripProvider";
import { SearchDialog } from "./SearchDialog";

const links = [
  { href: "/stays", en: "The house", es: "La casa" },
  { href: "/experiences", en: "Experiences", es: "Experiencias" },
  { href: "/packages", en: "Packages", es: "Paquetes" },
  { href: "/guide", en: "Jacó guide", es: "Guía de Jacó" },
];

export function Header({ locale, path }: { locale: Locale; path: string }) {
  const bare = barePath(path);
  const home = bare === "/";
  const { count } = useTrip();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [occasionsOpen, setOccasionsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setOpen(false);
    setOccasionsOpen(false);
  }, [path]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open || searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, searchOpen]);

  const solid = !home || scrolled || open;
  const [pathname, query = ""] = path.split("?");
  const bareOnly = barePath(pathname);
  const querySuffix = query ? `?${query}` : "";
  const englishHref = `${bareOnly === "/" ? "/" : bareOnly}${querySuffix}`;
  const spanishHref = `${bareOnly === "/" ? "/es" : `/es${bareOnly}`}${querySuffix}`;

  function rememberLocale(next: Locale) {
    document.cookie = `${LOCALE_COOKIE}=${next}; Path=/; Max-Age=31536000; SameSite=Lax`;
  }

  return (
    <header className={`fixed inset-x-0 top-0 z-40 ${solid ? "bg-sand/95 text-ocean shadow-[0_1px_0_rgba(14,59,67,0.08)] backdrop-blur" : "bg-transparent text-sand"}`}>
      <p className="bg-ocean px-4 py-2 text-center text-[0.72rem] font-semibold tracking-wide text-sand">
        {locale === "es" ? "Este sitio web está en fase de desarrollo." : "This website is in development."}
      </p>
      <div className={`hidden items-center justify-between px-8 text-[0.72rem] tracking-wide md:flex ${solid ? "text-muted" : "text-sand/80"} h-8`}>
        <p>Jacó, Puntarenas, Costa Rica</p>
        <p>{locale === "es" ? "Reserva directa · precios en USD" : "Direct booking · prices in USD"}</p>
      </div>
      <div className="flex h-16 items-center justify-between gap-4 px-5 md:h-[4.25rem] md:px-8">
        <Link
          href={localizeHref(locale, "/")}
          aria-label="Jaco Escape"
          className={`min-w-0 shrink ${
            solid
              ? ""
              : "rounded-2xl bg-sand px-2.5 py-1.5 text-ocean shadow-[0_12px_28px_-14px_rgb(8_38_44/0.85)] ring-1 ring-white/80 md:px-3 md:py-2"
          }`}
        >
          <JacoLogo locale={locale} light={false} />
        </Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label={locale === "es" ? "Principal" : "Primary"}>
          {links.map((link) => {
            const active = bare === link.href || bare.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={localizeHref(locale, link.href)}
                aria-current={active ? "page" : undefined}
                className={`text-sm font-medium ${active ? "underline decoration-gold decoration-2 underline-offset-8" : "hover:opacity-70"}`}
              >
                {t(locale, link)}
              </Link>
            );
          })}
          <div className="relative" onMouseLeave={() => setOccasionsOpen(false)}>
            <button
              type="button"
              className="text-sm font-medium hover:opacity-70"
              aria-expanded={occasionsOpen}
              onClick={() => setOccasionsOpen((value) => !value)}
              onMouseEnter={() => setOccasionsOpen(true)}
            >
              {locale === "es" ? "Ocasiones" : "Occasions"}
            </button>
            {occasionsOpen ? (
              <div className="absolute left-1/2 top-full z-20 w-64 -translate-x-1/2 pt-3">
                <ul className="rounded-2xl bg-sand p-2 text-ocean shadow-card">
                  {occasions.map((occasion) => (
                    <li key={occasion.slug}>
                      <Link
                        href={localizeHref(locale, `/occasions/${occasion.slug}`)}
                        className="block rounded-xl px-3 py-2 text-sm hover:bg-sand-2"
                      >
                        {t(locale, occasion.title)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </nav>
        <div className="flex items-center gap-2 md:gap-3">
          <button
            type="button"
            className="rounded-full p-2 hover:bg-black/5"
            onClick={() => setSearchOpen(true)}
            aria-label={locale === "es" ? "Buscar" : "Search"}
          >
            <Search className="h-5 w-5" />
          </button>
          <div
            className={`flex items-center rounded-full border p-0.5 text-[0.65rem] font-semibold tracking-wider ${solid ? "border-ocean/20" : "border-sand/40"}`}
            role="group"
            aria-label={locale === "es" ? "Idioma" : "Language"}
          >
            <a
              href={englishHref}
              hrefLang="en"
              lang="en"
              aria-current={locale === "en" ? "true" : undefined}
              onClick={() => rememberLocale("en")}
              className={`rounded-full px-2 py-1 ${locale === "en" ? (solid ? "bg-ocean text-sand" : "bg-sand text-ocean") : "opacity-70"}`}
            >
              EN
            </a>
            <a
              href={spanishHref}
              hrefLang="es"
              lang="es"
              aria-current={locale === "es" ? "true" : undefined}
              onClick={() => rememberLocale("es")}
              className={`rounded-full px-2 py-1 ${locale === "es" ? (solid ? "bg-ocean text-sand" : "bg-sand text-ocean") : "opacity-70"}`}
            >
              ES
            </a>
          </div>
          <Link
            href={localizeHref(locale, "/trip")}
            className={`relative hidden rounded-full px-3 py-2 text-sm font-semibold sm:inline ${solid ? "text-ocean" : "text-sand"}`}
          >
            {locale === "es" ? "Viaje" : "Trip"}
            {count > 0 ? (
              <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-coral-deep px-1 text-xs text-white">
                {count}
              </span>
            ) : null}
          </Link>
          <Link
            href={localizeHref(locale, "/stays/casa-jannat#reserve")}
            className="hidden rounded-full bg-coral-deep px-4 py-2 text-sm font-semibold text-white hover:bg-ocean md:inline"
          >
            {locale === "es" ? "Reservar" : "Book"}
          </Link>
          <button
            type="button"
            className="rounded-full p-2 lg:hidden"
            aria-expanded={open}
            aria-label={open ? (locale === "es" ? "Cerrar menú" : "Close menu") : locale === "es" ? "Abrir menú" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open ? (
        <div className="max-h-[calc(100svh-6.5rem)] overflow-y-auto border-t border-line bg-sand px-5 py-6 text-ocean lg:hidden">
          <ul className="space-y-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={localizeHref(locale, link.href)} className="block py-3 font-display text-3xl">
                  {t(locale, link)}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-jungle">
            {locale === "es" ? "Ocasiones" : "Occasions"}
          </p>
          <ul className="mt-2 grid grid-cols-2 gap-2">
            {occasions.map((occasion) => (
              <li key={occasion.slug}>
                <Link href={localizeHref(locale, `/occasions/${occasion.slug}`)} className="block py-2 text-sm">
                  {t(locale, occasion.title)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={localizeHref(locale, "/plan-my-trip")} className="rounded-full border border-ocean px-4 py-2 text-sm font-semibold">
              {locale === "es" ? "Planear mi viaje" : "Plan my trip"}
            </Link>
            <Link href={localizeHref(locale, "/trip")} className="rounded-full border border-ocean px-4 py-2 text-sm font-semibold">
              {locale === "es" ? `Viaje (${count})` : `Trip (${count})`}
            </Link>
            <a
              href={locale === "en" ? spanishHref : englishHref}
              hrefLang={locale === "en" ? "es" : "en"}
              onClick={() => rememberLocale(locale === "en" ? "es" : "en")}
              className="rounded-full border border-line px-4 py-2 text-sm font-semibold"
            >
              {locale === "en" ? "Español" : "English"}
            </a>
          </div>
        </div>
      ) : null}
      {searchOpen ? <SearchDialog locale={locale} onClose={() => setSearchOpen(false)} /> : null}
    </header>
  );
}
