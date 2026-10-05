"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar } from "./Calendar";
import { useTrip } from "./TripProvider";
import { formatDate, formatMoney, isIsoDate } from "@/lib/dates";
import { quoteStay, rates } from "@/lib/rates";
import { localizeHref, t, type Locale } from "@/lib/copy";
import { villa } from "@/content/villa";
import { occasions } from "@/content/occasions";

export function BookingCard({
  locale,
  initialCheckIn = "",
  initialCheckOut = "",
  initialGuests = 2,
  initialOccasion = "",
}: {
  locale: Locale;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
  initialOccasion?: string;
}) {
  const router = useRouter();
  const { setVilla } = useTrip();
  const [checkIn, setCheckIn] = useState(isIsoDate(initialCheckIn) ? initialCheckIn : "");
  const [checkOut, setCheckOut] = useState(isIsoDate(initialCheckOut) ? initialCheckOut : "");
  const [guests, setGuests] = useState(Math.min(villa.maxGuests, Math.max(1, initialGuests || 2)));
  const [occasion, setOccasion] = useState(initialOccasion);
  const [promo, setPromo] = useState("");
  const [open, setOpen] = useState(false);

  const quote = useMemo(
    () => (checkIn && checkOut ? quoteStay(checkIn, checkOut, promo) : null),
    [checkIn, checkOut, promo],
  );

  function reserve() {
    if (!checkIn || !checkOut || !quote || !quote.ok) return;
    setVilla({
      slug: villa.slug,
      checkIn,
      checkOut,
      guests,
      occasion,
      promo: promo.trim().toUpperCase(),
    });
    router.push(localizeHref(locale, "/trip"));
  }

  return (
    <section id="reserve" className="rounded-3xl border border-line bg-white p-5 shadow-card">
      <div className="flex items-end justify-between gap-3">
        <p>
          <span className="font-display text-4xl text-ocean">{formatMoney(rates.green, locale)}</span>
          <span className="text-sm text-muted"> {locale === "es" ? "/ noche" : "/ night"}</span>
        </p>
        <p className="text-sm text-muted">
          ★ {villa.rating.score} · {villa.rating.count}
        </p>
      </div>
      <p className="mt-1 text-xs text-muted">
        {locale === "es"
          ? "Tarifa de temporada verde. Diciembre a abril es más alta. Se confirma antes de cobrar."
          : "Green-season rate. December through April is higher. Confirmed before anything is charged."}
      </p>
      <div className="mt-4 grid grid-cols-2 overflow-hidden rounded-2xl border border-line">
        <button type="button" className="px-3 py-3 text-left hover:bg-sand" onClick={() => setOpen((value) => !value)}>
          <span className="block text-[0.65rem] font-semibold uppercase tracking-wider text-muted">{locale === "es" ? "Llegada" : "Arrive"}</span>
          <span className="mt-1 block text-sm">{checkIn ? formatDate(checkIn, locale) : locale === "es" ? "Elegir" : "Add date"}</span>
        </button>
        <button type="button" className="border-l border-line px-3 py-3 text-left hover:bg-sand" onClick={() => setOpen((value) => !value)}>
          <span className="block text-[0.65rem] font-semibold uppercase tracking-wider text-muted">{locale === "es" ? "Salida" : "Leave"}</span>
          <span className="mt-1 block text-sm">{checkOut ? formatDate(checkOut, locale) : locale === "es" ? "Elegir" : "Add date"}</span>
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
      <div className="mt-3 flex items-center justify-between rounded-2xl border border-line px-3 py-3">
        <span className="text-sm">{locale === "es" ? "Huéspedes" : "Guests"}</span>
        <span className="flex items-center gap-3">
          <button type="button" className="h-8 w-8 rounded-full border border-line" onClick={() => setGuests((value) => Math.max(1, value - 1))} aria-label={locale === "es" ? "Menos huéspedes" : "Fewer guests"}>
            −
          </button>
          <span className="w-4 text-center">{guests}</span>
          <button type="button" className="h-8 w-8 rounded-full border border-line" onClick={() => setGuests((value) => Math.min(villa.maxGuests, value + 1))} aria-label={locale === "es" ? "Más huéspedes" : "More guests"}>
            +
          </button>
        </span>
      </div>
      <label className="mt-3 block text-sm">
        <span className="mb-1 block text-muted">{locale === "es" ? "Ocasión" : "Occasion"}</span>
        <select
          value={occasion}
          onChange={(event) => setOccasion(event.target.value)}
          className="w-full rounded-2xl border border-line bg-white px-3 py-3"
        >
          <option value="">{locale === "es" ? "Solo la casa" : "Just the house"}</option>
          {occasions.map((item) => (
            <option key={item.slug} value={item.slug}>
              {t(locale, item.title)}
            </option>
          ))}
        </select>
      </label>
      {quote && !quote.ok ? <p className="mt-3 text-sm text-coral-deep">{t(locale, quote.error)}</p> : null}
      {quote && quote.ok ? (
        <div className="mt-4 space-y-2 text-sm">
          <Row label={`${formatMoney(quote.average, locale)} × ${quote.nights}`} value={formatMoney(quote.lodging, locale)} />
          {quote.discount > 0 ? <Row label={rates.promoCode} value={`−${formatMoney(quote.discount, locale)}`} /> : null}
          <Row label={locale === "es" ? "Limpieza" : "Cleaning"} value={formatMoney(quote.cleaning, locale)} />
          <Row label="IVA 13%" value={formatMoney(quote.iva, locale)} />
          <div className="flex justify-between border-t border-line pt-2 font-semibold">
            <span>{locale === "es" ? "Total" : "Total"}</span>
            <span>{formatMoney(quote.total, locale)}</span>
          </div>
          <Row label={locale === "es" ? "Para apartar, 30%" : "To hold the dates, 30%"} value={formatMoney(quote.dueNow, locale)} />
          <p className="text-xs text-muted">
            {locale === "es"
              ? `Depósito de seguridad reembolsable de ${formatMoney(quote.securityDeposit, locale)}, aparte. No se cobra en esta página.`
              : `Refundable security deposit of ${formatMoney(quote.securityDeposit, locale)}, held separately. Nothing is charged on this page.`}
          </p>
          <label className="mt-2 block">
            <span className="mb-1 block text-xs uppercase tracking-wider text-muted">{locale === "es" ? "Código" : "Code"}</span>
            <input
              value={promo}
              onChange={(event) => setPromo(event.target.value)}
              placeholder={rates.promoCode}
              className="w-full rounded-xl border border-line px-3 py-2 uppercase"
            />
          </label>
          {quote.promoError ? <p className="text-xs text-coral-deep">{t(locale, quote.promoError)}</p> : null}
        </div>
      ) : null}
      <button
        type="button"
        onClick={reserve}
        disabled={!quote || !quote.ok}
        className="mt-4 w-full rounded-full bg-coral-deep px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
      >
        {locale === "es" ? "Pedir estas fechas" : "Request these dates"}
      </button>
      <p className="mt-2 text-center text-xs text-muted">
        {locale === "es" ? `Mínimo ${rates.minNights} noches. Código ${rates.promoCode} en estadías de ${rates.promoMinNights}+.` : `${rates.minNights}-night minimum. ${rates.promoCode} on stays of ${rates.promoMinNights}+.`}
      </p>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-muted">{label}</span>
      <span>{value}</span>
    </div>
  );
}
