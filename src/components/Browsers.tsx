"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { categoryLabel, experienceFromIsPerPerson, experienceFromPrice, experiences, type ExpCategory } from "@/content/experiences";
import { photos, villa } from "@/content/villa";
import { formatMoney } from "@/lib/dates";
import { localizeHref, t, type Locale } from "@/lib/copy";
import { rates } from "@/lib/rates";

export function StaysBrowser({ locale }: { locale: Locale }) {
  const [guests, setGuests] = useState(2);
  const [pool, setPool] = useState(false);
  const [walk, setWalk] = useState(false);
  const [party, setParty] = useState(false);
  const [map, setMap] = useState(false);

  const matches =
    guests <= villa.maxGuests &&
    (!pool || villa.pool) &&
    (!walk || villa.walkToBeach) &&
    (!party || villa.celebrations);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <label className="rounded-full bg-white px-3 py-2 text-sm">
            {locale === "es" ? "Huéspedes" : "Guests"}
            <input
              type="number"
              min={1}
              max={12}
              value={guests}
              onChange={(event) => setGuests(Number(event.target.value))}
              className="ml-2 w-12 bg-transparent"
            />
          </label>
          <Filter on={pool} onClick={() => setPool((value) => !value)} label={locale === "es" ? "Piscina" : "Pool"} />
          <Filter on={walk} onClick={() => setWalk((value) => !value)} label={locale === "es" ? "A pie a la playa" : "Walk to the beach"} />
          <Filter on={party} onClick={() => setParty((value) => !value)} label={locale === "es" ? "Celebraciones" : "Celebrations"} />
        </div>
        <div className="flex rounded-full bg-white p-1 text-sm">
          <button type="button" className={`rounded-full px-3 py-1 ${!map ? "bg-ocean text-sand" : ""}`} onClick={() => setMap(false)}>
            {locale === "es" ? "Lista" : "List"}
          </button>
          <button type="button" className={`rounded-full px-3 py-1 ${map ? "bg-ocean text-sand" : ""}`} onClick={() => setMap(true)}>
            {locale === "es" ? "Mapa" : "Map"}
          </button>
        </div>
      </div>
      {matches ? (
        <div className={`mt-8 grid gap-6 ${map ? "lg:grid-cols-2" : ""}`}>
          <Link href={localizeHref(locale, "/stays/casa-jannat")} className="group overflow-hidden rounded-3xl bg-white shadow-card">
            <div className="relative h-72">
              <Image src="/images/casa-jannat/hero-pool.jpg" alt={t(locale, photos[0].alt)} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="(min-width: 1024px) 50vw, 100vw" />
            </div>
            <div className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-jungle">Jacó</p>
              <h2 className="mt-2 font-display text-4xl text-ocean">Casa Jannat</h2>
              <p className="mt-2 text-muted">{t(locale, villa.summary)}</p>
              <p className="mt-4 text-sm">
                {villa.maxGuests} {locale === "es" ? "huéspedes" : "guests"} · {villa.bedrooms} {locale === "es" ? "recámaras" : "bedrooms"} · {villa.bathrooms} {locale === "es" ? "baños" : "baths"}
              </p>
              <p className="mt-2 font-medium">{locale === "es" ? "Desde" : "From"} {formatMoney(rates.green, locale)} {locale === "es" ? "/ noche" : "/ night"}</p>
            </div>
          </Link>
          {map ? (
            <iframe
              title={locale === "es" ? "Ubicación aproximada de Casa Jannat en Jacó" : "Approximate location of Casa Jannat in Jacó"}
              className="h-full min-h-80 w-full rounded-3xl border-0"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-84.655%2C9.595%2C-84.600%2C9.640&layer=mapnik&marker=9.616%2C-84.629"
            />
          ) : null}
        </div>
      ) : (
        <p className="mt-10 max-w-xl text-lg">
          {locale === "es"
            ? "Casa Jannat duerme 8, con piscina y la playa a un corto paseo. Si el grupo es más grande, escríbenos y te decimos qué cabe."
            : "Casa Jannat sleeps 8, with a pool and the beach a short walk away. If the group is larger, write and we will say what fits."}
        </p>
      )}
    </div>
  );
}

function Filter({ on, onClick, label }: { on: boolean; onClick: () => void; label: string }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={on} className={`rounded-full px-3 py-2 text-sm ${on ? "bg-ocean text-sand" : "bg-white"}`}>
      {label}
    </button>
  );
}

export function ExperienceBrowser({ locale }: { locale: Locale }) {
  const [kind, setKind] = useState<"all" | "service" | "tour">("all");
  const [category, setCategory] = useState<ExpCategory | "all">("all");
  const [query, setQuery] = useState("");
  const categories = Array.from(new Set(experiences.map((item) => item.category)));
  const visible = useMemo(
    () =>
      experiences.filter((item) => {
        if (kind !== "all" && item.type !== kind) return false;
        if (category !== "all" && item.category !== category) return false;
        if (!query.trim()) return true;
        const haystack = `${t(locale, item.title)} ${t(locale, item.summary)}`.toLowerCase();
        return haystack.includes(query.trim().toLowerCase());
      }),
    [category, kind, locale, query],
  );

  return (
    <div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {(["all", "service", "tour"] as const).map((value) => (
            <button key={value} type="button" onClick={() => setKind(value)} className={`rounded-full px-3 py-2 text-sm ${kind === value ? "bg-ocean text-sand" : "bg-white"}`}>
              {value === "all" ? (locale === "es" ? "Todo" : "All") : value === "service" ? (locale === "es" ? "En la casa" : "At the house") : locale === "es" ? "Tours" : "Tours"}
            </button>
          ))}
        </div>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={locale === "es" ? "Buscar" : "Search"}
          className="rounded-full border border-line bg-white px-4 py-2 text-sm"
          aria-label={locale === "es" ? "Buscar experiencias" : "Search experiences"}
        />
      </div>
      <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
        <button type="button" onClick={() => setCategory("all")} className={`shrink-0 rounded-full px-3 py-1.5 text-xs ${category === "all" ? "bg-jungle text-white" : "bg-white"}`}>
          {locale === "es" ? "Todas" : "Every kind"}
        </button>
        {categories.map((item) => (
          <button key={item} type="button" onClick={() => setCategory(item)} className={`shrink-0 rounded-full px-3 py-1.5 text-xs ${category === item ? "bg-jungle text-white" : "bg-white"}`}>
            {t(locale, categoryLabel[item])}
          </button>
        ))}
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item) => (
          <Link key={item.slug} href={localizeHref(locale, `/experiences/${item.slug}`)} className="flex min-h-56 flex-col justify-between rounded-3xl bg-ocean p-6 text-sand transition hover:-translate-y-0.5">
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-gold">{t(locale, categoryLabel[item.category])}</p>
              <h2 className="mt-3 font-display text-3xl">{t(locale, item.title)}</h2>
              <p className="mt-3 text-sm text-sand/80">{t(locale, item.summary)}</p>
            </div>
            <p className="mt-6 text-sm">
              {locale === "es" ? "Desde" : "From"} {formatMoney(experienceFromPrice(item), locale)}
              {experienceFromIsPerPerson(item) ? (locale === "es" ? " / persona" : " / person") : ""}
            </p>
          </Link>
        ))}
      </div>
      {visible.length === 0 ? <p className="mt-8 text-muted">{locale === "es" ? "Nada con ese filtro." : "Nothing matches that filter."}</p> : null}
    </div>
  );
}
