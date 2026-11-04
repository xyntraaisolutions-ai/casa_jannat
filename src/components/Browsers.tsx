"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { categoryLabel, experiences, type ExpCategory } from "@/content/experiences";
import { localizeHref, t, type Locale } from "@/lib/copy";

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
            <p className="mt-6 text-sm text-sand/70">
              {t(locale, item.duration)} · {locale === "es" ? "Informativo" : "Informational"}
            </p>
          </Link>
        ))}
      </div>
      {visible.length === 0 ? <p className="mt-8 text-muted">{locale === "es" ? "Nada con ese filtro." : "Nothing matches that filter."}</p> : null}
    </div>
  );
}
