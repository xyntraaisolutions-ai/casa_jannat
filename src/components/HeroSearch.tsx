"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar } from "./Calendar";
import { occasions } from "@/content/occasions";
import { villa } from "@/content/villa";
import { formatDate } from "@/lib/dates";
import { localizeHref, t, type Locale } from "@/lib/copy";

export function HeroSearch({ locale }: { locale: Locale }) {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [occasion, setOccasion] = useState("");
  const [open, setOpen] = useState(false);

  function go() {
    const params = new URLSearchParams();
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    params.set("guests", String(guests));
    if (occasion) params.set("occasion", occasion);
    router.push(localizeHref(locale, `/stays/casa-jannat?${params.toString()}#reserve`));
  }

  return (
    <div className="glass mt-8 rounded-3xl p-3 text-ink md:p-4">
      <div className="grid gap-2 md:grid-cols-[1fr_1fr_0.7fr_1fr_auto] md:items-end">
        <button type="button" onClick={() => setOpen((value) => !value)} className="rounded-2xl px-3 py-2 text-left hover:bg-white/50">
          <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted">{locale === "es" ? "Llegada" : "Arrive"}</span>
          <span className="mt-1 block text-sm">{checkIn ? formatDate(checkIn, locale) : locale === "es" ? "Elegir fecha" : "Add date"}</span>
        </button>
        <button type="button" onClick={() => setOpen((value) => !value)} className="rounded-2xl px-3 py-2 text-left hover:bg-white/50">
          <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted">{locale === "es" ? "Salida" : "Leave"}</span>
          <span className="mt-1 block text-sm">{checkOut ? formatDate(checkOut, locale) : locale === "es" ? "Elegir fecha" : "Add date"}</span>
        </button>
        <label className="rounded-2xl px-3 py-2">
          <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted">{locale === "es" ? "Huéspedes" : "Guests"}</span>
          <select value={guests} onChange={(event) => setGuests(Number(event.target.value))} className="mt-1 w-full bg-transparent text-sm outline-none">
            {Array.from({ length: villa.maxGuests }, (_, index) => index + 1).map((count) => (
              <option key={count} value={count}>
                {count}
              </option>
            ))}
          </select>
        </label>
        <label className="rounded-2xl px-3 py-2">
          <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted">{locale === "es" ? "Ocasión" : "Occasion"}</span>
          <select value={occasion} onChange={(event) => setOccasion(event.target.value)} className="mt-1 w-full bg-transparent text-sm outline-none">
            <option value="">{locale === "es" ? "Solo la casa" : "Just the house"}</option>
            {occasions.map((item) => (
              <option key={item.slug} value={item.slug}>
                {t(locale, item.title)}
              </option>
            ))}
          </select>
        </label>
        <button type="button" onClick={go} className="rounded-full bg-coral-deep px-5 py-3 text-sm font-semibold text-white">
          {locale === "es" ? "Ver fechas" : "Check dates"}
        </button>
      </div>
      {open ? (
        <div className="mt-3 rounded-2xl bg-sand p-3">
          <Calendar
            locale={locale}
            checkIn={checkIn}
            checkOut={checkOut}
            onChange={(nextIn, nextOut) => {
              setCheckIn(nextIn);
              setCheckOut(nextOut);
              if (nextIn && nextOut) setOpen(false);
            }}
          />
        </div>
      ) : null}
    </div>
  );
}
