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
    <div className="rounded-[1.6rem] bg-white p-2 text-ink shadow-[0_28px_70px_-32px_rgb(8_38_44/0.55)] ring-1 ring-ocean/10 md:p-3">
      <div className="grid gap-1 md:grid-cols-[1.15fr_1.15fr_0.75fr_1.2fr_auto] md:items-stretch">
        <button type="button" onClick={() => setOpen((value) => !value)} className="rounded-2xl px-4 py-3 text-left hover:bg-sand">
          <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted">{locale === "es" ? "Llegada" : "Arrive"}</span>
          <span className="mt-1 block text-sm font-medium">{checkIn ? formatDate(checkIn, locale) : locale === "es" ? "Elegir fecha" : "Add date"}</span>
        </button>
        <button type="button" onClick={() => setOpen((value) => !value)} className="rounded-2xl px-4 py-3 text-left hover:bg-sand md:border-l md:border-line">
          <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted">{locale === "es" ? "Salida" : "Leave"}</span>
          <span className="mt-1 block text-sm font-medium">{checkOut ? formatDate(checkOut, locale) : locale === "es" ? "Elegir fecha" : "Add date"}</span>
        </button>
        <label className="rounded-2xl px-4 py-3 md:border-l md:border-line">
          <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted">{locale === "es" ? "Huéspedes" : "Guests"}</span>
          <select value={guests} onChange={(event) => setGuests(Number(event.target.value))} className="mt-1 w-full bg-transparent text-sm font-medium outline-none">
            {Array.from({ length: villa.maxGuests }, (_, index) => index + 1).map((count) => (
              <option key={count} value={count}>
                {count}
              </option>
            ))}
          </select>
        </label>
        <label className="rounded-2xl px-4 py-3 md:border-l md:border-line">
          <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted">{locale === "es" ? "Ocasión" : "Occasion"}</span>
          <select value={occasion} onChange={(event) => setOccasion(event.target.value)} className="mt-1 w-full bg-transparent text-sm font-medium outline-none">
            <option value="">{locale === "es" ? "Solo la casa" : "Just the house"}</option>
            {occasions.map((item) => (
              <option key={item.slug} value={item.slug}>
                {t(locale, item.title)}
              </option>
            ))}
          </select>
        </label>
        <button type="button" onClick={go} className="rounded-full bg-coral-deep px-6 py-3 text-sm font-semibold text-white md:self-center">
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
