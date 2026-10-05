"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getExperience, lineTotal, optionById } from "@/content/experiences";
import { formatDate, formatMoney, formatTime } from "@/lib/dates";
import { localizeHref, t, type Locale } from "@/lib/copy";
import { quoteStay } from "@/lib/rates";
import { hostAction, hostHref } from "@/lib/site";
import { REQUEST_KEY, sanitizeTrip, type GuestDetails, type TripState } from "@/lib/trip";

type Stored = {
  trip: TripState;
  guest: GuestDetails;
  totals: { grand: number; dueNow: number };
};

export function Confirmation({ locale }: { locale: Locale }) {
  const [stored, setStored] = useState<Stored | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem(REQUEST_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as Stored;
      setStored({ ...parsed, trip: sanitizeTrip(parsed.trip) });
    } catch {
      setStored(null);
    }
  }, []);

  if (!stored) {
    return (
      <p>
        {locale === "es" ? "No hay una solicitud en este navegador. " : "There is no request in this browser. "}
        <Link href={localizeHref(locale, "/trip")} className="underline">
          {locale === "es" ? "Volver al viaje" : "Back to the trip"}
        </Link>
      </p>
    );
  }

  const { trip, guest, totals } = stored;
  const stay = trip.villa ? quoteStay(trip.villa.checkIn, trip.villa.checkOut, trip.villa.promo, guest.payInFull) : null;
  const lines = trip.lines.map((line) => {
    const experience = getExperience(line.slug);
    const option = experience ? optionById(experience, line.optionId) : undefined;
    return { line, experience, option, amount: option ? lineTotal(option, line.groupSize) : 0 };
  });

  const body = [
    locale === "es" ? "Solicitud de Casa Jannat" : "Casa Jannat request",
    `${guest.name} · ${guest.email} · ${guest.phone}`,
    guest.flight ? `${locale === "es" ? "Vuelo" : "Flight"}: ${guest.flight}` : "",
    trip.villa
      ? `${locale === "es" ? "Casa" : "House"}: ${trip.villa.checkIn} → ${trip.villa.checkOut}, ${trip.villa.guests} ${locale === "es" ? "huéspedes" : "guests"}${trip.villa.promo ? `, ${trip.villa.promo}` : ""}`
      : "",
    ...lines.map((item) =>
      item.experience && item.option
        ? `${t(locale, item.experience.title)} — ${t(locale, item.option.label)} — ${item.line.date} ${item.line.time} — ${item.line.groupSize} — ${formatMoney(item.amount, locale)}`
        : "",
    ),
    `${guest.payInFull ? (locale === "es" ? "Pago completo" : "Pay in full") : locale === "es" ? "Apartar con 30%" : "Hold with 30%"}: ${formatMoney(totals.dueNow, locale)}`,
    `${locale === "es" ? "Total mostrado" : "Total shown"}: ${formatMoney(totals.grand, locale)}`,
    guest.notes,
  ]
    .filter(Boolean)
    .join("\n");

  const ics = trip.villa
    ? [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Casa Jannat//EN",
        "BEGIN:VEVENT",
        `DTSTART;VALUE=DATE:${trip.villa.checkIn.replaceAll("-", "")}`,
        `DTEND;VALUE=DATE:${trip.villa.checkOut.replaceAll("-", "")}`,
        "SUMMARY:Casa Jannat",
        "LOCATION:Jacó\\, Puntarenas\\, Costa Rica",
        "END:VEVENT",
        "END:VCALENDAR",
      ].join("\r\n")
    : "";

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div>
        <h2 className="font-display text-4xl text-ocean">{locale === "es" ? "La solicitud está lista para enviarse." : "The request is ready to send."}</h2>
        <p className="mt-3 max-w-xl text-muted">
          {locale === "es"
            ? "Esto abre un mensaje al anfitrión con el plan. Las fechas se apartan cuando respondemos y se paga el depósito."
            : "This opens a message to the host with the plan. Dates are held when we reply and the deposit is paid."}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={hostHref(body, "Casa Jannat request")} className="rounded-full bg-coral-deep px-5 py-3 text-sm font-semibold text-white">
            {hostAction(locale)}
          </a>
          <button
            type="button"
            className="rounded-full border border-ocean px-5 py-3 text-sm font-semibold"
            onClick={() => navigator.clipboard.writeText(body)}
          >
            {locale === "es" ? "Copiar el texto" : "Copy the text"}
          </button>
          {ics ? (
            <a
              className="rounded-full border border-ocean px-5 py-3 text-sm font-semibold"
              href={`data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`}
              download="casa-jannat.ics"
            >
              {locale === "es" ? "Agregar al calendario" : "Add to calendar"}
            </a>
          ) : null}
        </div>
      </div>
      <aside className="rounded-3xl bg-white p-5 text-sm">
        {trip.villa ? (
          <p>
            Casa Jannat · {formatDate(trip.villa.checkIn, locale, true)} – {formatDate(trip.villa.checkOut, locale, true)}
          </p>
        ) : null}
        <ul className="mt-3 space-y-2">
          {lines.map((item) =>
            item.experience ? (
              <li key={item.line.id}>
                {t(locale, item.experience.title)} · {formatDate(item.line.date, locale)} · {formatTime(item.line.time, locale)} · {formatMoney(item.amount, locale)}
              </li>
            ) : null,
          )}
        </ul>
        {stay && stay.ok ? <p className="mt-3">{locale === "es" ? "Estadía" : "Stay"} {formatMoney(stay.total, locale)}</p> : null}
        <p className="mt-2 font-semibold">
          {locale === "es" ? "Total" : "Total"} {formatMoney(totals.grand, locale)}
        </p>
      </aside>
    </div>
  );
}
