"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getExperience, lineTotal, optionById } from "@/content/experiences";
import { formatDate, formatMoney, formatTime } from "@/lib/dates";
import { localizeHref, t, type Locale } from "@/lib/copy";
import { quoteStay, rates } from "@/lib/rates";
import { REQUEST_KEY, type GuestDetails } from "@/lib/trip";
import { useTrip } from "./TripProvider";

export function TripView({ locale }: { locale: Locale }) {
  const router = useRouter();
  const { trip, ready, updateLine, removeLine, clear, setVilla } = useTrip();
  const [payInFull, setPayInFull] = useState(false);
  const [guest, setGuest] = useState<GuestDetails>({ name: "", email: "", phone: "", flight: "", notes: "", payInFull: false });
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState("");

  const stay = trip.villa ? quoteStay(trip.villa.checkIn, trip.villa.checkOut, trip.villa.promo, payInFull) : null;
  const lines = trip.lines
    .map((line) => {
      const experience = getExperience(line.slug);
      const option = experience ? optionById(experience, line.optionId) : undefined;
      if (!experience || !option) return null;
      return { line, experience, option, amount: lineTotal(option, line.groupSize) };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const experienceTotal = lines.reduce((sum, item) => sum + item.amount, 0);
  const stayTotal = stay && stay.ok ? stay.total : 0;
  const grand = stayTotal + experienceTotal;
  const dueNow = payInFull ? grand : Math.round(grand * rates.depositRate);

  const conflicts = useMemo(() => {
    if (!trip.villa) return [];
    return lines.filter((item) => item.line.date < trip.villa!.checkIn || item.line.date > trip.villa!.checkOut);
  }, [lines, trip.villa]);

  function prepare() {
    if (!guest.name.trim() || !guest.email.includes("@") || guest.phone.trim().length < 6) {
      setError(locale === "es" ? "Nombre, un correo válido y un teléfono." : "Name, a valid email, and a phone number.");
      return;
    }
    if (!accepted) {
      setError(locale === "es" ? "Acepta las reglas y los términos." : "Accept the house rules and terms.");
      return;
    }
    if (!trip.villa && lines.length === 0) {
      setError(locale === "es" ? "El viaje está vacío." : "The trip is empty.");
      return;
    }
    if (trip.villa && stay && !stay.ok) {
      setError(t(locale, stay.error));
      return;
    }
    if (conflicts.length) {
      setError(locale === "es" ? "Hay experiencias fuera de las fechas de la casa." : "Some experiences sit outside the stay.");
      return;
    }
    const payload = {
      trip,
      guest: { ...guest, payInFull },
      totals: { grand, dueNow, experienceTotal },
      createdAt: new Date().toISOString(),
    };
    sessionStorage.setItem(REQUEST_KEY, JSON.stringify(payload));
    router.push(localizeHref(locale, "/trip/confirmation"));
  }

  if (!ready) return <p className="text-muted">{locale === "es" ? "Abriendo tu viaje…" : "Opening your trip…"}</p>;

  if (!trip.villa && trip.lines.length === 0) {
    return (
      <div className="rounded-3xl bg-white p-8">
        <h2 className="font-display text-4xl text-ocean">{locale === "es" ? "Todavía no hay nada aquí." : "Nothing in the trip yet."}</h2>
        <p className="mt-3 max-w-lg text-muted">
          {locale === "es"
            ? "Empieza por las fechas de la casa, o por una experiencia si todavía no sabes las noches."
            : "Start with dates at the house, or with an experience if the nights are still loose."}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={localizeHref(locale, "/stays/casa-jannat#reserve")} className="rounded-full bg-coral-deep px-4 py-2 text-sm font-semibold text-white">
            {locale === "es" ? "Ver la casa" : "See the house"}
          </Link>
          <Link href={localizeHref(locale, "/experiences")} className="rounded-full border border-ocean px-4 py-2 text-sm font-semibold">
            {locale === "es" ? "Ver experiencias" : "See experiences"}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
      <div className="space-y-4">
        {trip.villa ? (
          <article className="rounded-3xl bg-white p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-jungle">{locale === "es" ? "La casa" : "The house"}</p>
                <h2 className="font-display text-3xl text-ocean">Casa Jannat</h2>
                <p className="mt-1 text-sm text-muted">
                  {formatDate(trip.villa.checkIn, locale, true)} – {formatDate(trip.villa.checkOut, locale, true)} · {trip.villa.guests}{" "}
                  {locale === "es" ? "huéspedes" : "guests"}
                </p>
              </div>
              <button type="button" className="text-sm underline" onClick={() => setVilla({ ...trip.villa!, promo: "" })}>
                {locale === "es" ? "Quitar código" : "Clear code"}
              </button>
            </div>
            {stay && !stay.ok ? <p className="mt-3 text-sm text-coral-deep">{t(locale, stay.error)}</p> : null}
            {stay && stay.ok ? (
              <dl className="mt-4 space-y-1 text-sm">
                <Line label={`${formatMoney(stay.average, locale)} × ${stay.nights}`} value={formatMoney(stay.lodging, locale)} />
                {stay.discount > 0 ? <Line label={trip.villa.promo || rates.promoCode} value={`−${formatMoney(stay.discount, locale)}`} /> : null}
                <Line label={locale === "es" ? "Limpieza" : "Cleaning"} value={formatMoney(stay.cleaning, locale)} />
                <Line label="IVA 13%" value={formatMoney(stay.iva, locale)} />
                <Line label={locale === "es" ? "Estadía" : "Stay"} value={formatMoney(stay.total, locale)} strong />
                <p className="pt-2 text-xs text-muted">
                  {locale === "es"
                    ? `Depósito de seguridad ${formatMoney(stay.securityDeposit, locale)}, aparte.`
                    : `Security deposit ${formatMoney(stay.securityDeposit, locale)}, held separately.`}
                </p>
              </dl>
            ) : null}
            <Link href={localizeHref(locale, "/stays/casa-jannat#reserve")} className="mt-3 inline-block text-sm underline">
              {locale === "es" ? "Cambiar fechas" : "Change dates"}
            </Link>
          </article>
        ) : null}
        {lines.map(({ line, experience, option, amount }) => {
          const outside = trip.villa && (line.date < trip.villa.checkIn || line.date > trip.villa.checkOut);
          return (
            <article key={line.id} className="rounded-3xl bg-white p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-2xl text-ocean">{t(locale, experience.title)}</h3>
                  <p className="text-sm text-muted">{t(locale, option.label)}</p>
                </div>
                <button type="button" className="text-sm underline" onClick={() => removeLine(line.id)}>
                  {locale === "es" ? "Quitar" : "Remove"}
                </button>
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                <input type="date" value={line.date} onChange={(event) => updateLine(line.id, { date: event.target.value })} className="rounded-xl border border-line px-2 py-2 text-sm" aria-label={locale === "es" ? "Fecha" : "Date"} />
                <select value={line.time} onChange={(event) => updateLine(line.id, { time: event.target.value })} className="rounded-xl border border-line px-2 py-2 text-sm" aria-label={locale === "es" ? "Hora" : "Time"}>
                  {experience.timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {formatTime(slot, locale)}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  min={option.groupMin}
                  max={option.groupMax}
                  value={line.groupSize}
                  onChange={(event) => updateLine(line.id, { groupSize: Number(event.target.value) })}
                  className="rounded-xl border border-line px-2 py-2 text-sm"
                  aria-label={locale === "es" ? "Personas" : "People"}
                />
              </div>
              {outside ? (
                <p className="mt-2 text-sm text-coral-deep">
                  {locale === "es" ? "Esta fecha cae fuera de la estadía." : "This date falls outside the stay."}
                </p>
              ) : null}
              <p className="mt-3 text-sm font-medium">{formatMoney(amount, locale)}</p>
            </article>
          );
        })}
        <button type="button" onClick={clear} className="text-sm text-muted underline">
          {locale === "es" ? "Vaciar el viaje" : "Clear the trip"}
        </button>
      </div>
      <aside className="h-fit rounded-3xl bg-ocean p-5 text-sand lg:sticky lg:top-40">
        <h2 className="font-display text-3xl">{locale === "es" ? "Enviar la solicitud" : "Send the request"}</h2>
        <p className="mt-2 text-sm text-sand/75">
          {locale === "es"
            ? "Nada se cobra aquí. Confirmamos el calendario y luego mandamos el pago."
            : "Nothing is charged here. We confirm the calendar, then send payment."}
        </p>
        <fieldset className="mt-4 space-y-2 text-sm">
          <legend className="sr-only">{locale === "es" ? "Pago" : "Payment"}</legend>
          <label className="flex gap-2">
            <input type="radio" name="pay" checked={!payInFull} onChange={() => setPayInFull(false)} />
            {locale === "es" ? `Apartar con ${formatMoney(dueNow, locale)} (30%)` : `Hold with ${formatMoney(dueNow, locale)} (30%)`}
          </label>
          <label className="flex gap-2">
            <input type="radio" name="pay" checked={payInFull} onChange={() => setPayInFull(true)} />
            {locale === "es" ? `Pagar ${formatMoney(grand, locale)} completo` : `Pay ${formatMoney(grand, locale)} in full`}
          </label>
        </fieldset>
        <div className="mt-4 space-y-2">
          <Field label={locale === "es" ? "Nombre" : "Name"} value={guest.name} onChange={(name) => setGuest({ ...guest, name })} />
          <Field label={locale === "es" ? "Correo" : "Email"} value={guest.email} onChange={(email) => setGuest({ ...guest, email })} type="email" />
          <Field label={locale === "es" ? "Teléfono" : "Phone"} value={guest.phone} onChange={(phone) => setGuest({ ...guest, phone })} type="tel" />
          <Field label={locale === "es" ? "Vuelo (opcional)" : "Flight (optional)"} value={guest.flight} onChange={(flight) => setGuest({ ...guest, flight })} optional />
          <label className="block text-sm">
            <span className="mb-1 block text-sand/70">{locale === "es" ? "Notas" : "Notes"}</span>
            <textarea value={guest.notes} onChange={(event) => setGuest({ ...guest, notes: event.target.value })} rows={3} className="w-full rounded-xl bg-white px-3 py-2 text-ink" />
          </label>
        </div>
        <label className="mt-3 flex gap-2 text-sm">
          <input type="checkbox" checked={accepted} onChange={(event) => setAccepted(event.target.checked)} />
          <span>
            {locale === "es" ? "Acepto las " : "I accept the "}
            <Link href={localizeHref(locale, "/policies/house-rules")} className="underline">
              {locale === "es" ? "reglas" : "house rules"}
            </Link>
            {locale === "es" ? " y los " : " and "}
            <Link href={localizeHref(locale, "/policies/terms")} className="underline">
              {locale === "es" ? "términos" : "terms"}
            </Link>
            .
          </span>
        </label>
        {error ? <p className="mt-3 text-sm text-gold">{error}</p> : null}
        <button type="button" onClick={prepare} className="mt-4 w-full rounded-full bg-sand px-4 py-3 text-sm font-semibold text-ocean">
          {locale === "es" ? "Preparar la solicitud" : "Prepare the request"}
        </button>
        <p className="mt-3 text-xs text-sand/60">
          {locale === "es" ? `El saldo queda para ${rates.balanceDaysBefore} días antes de llegar, después de confirmar.` : `The balance is due ${rates.balanceDaysBefore} days before arrival, after we confirm.`}
        </p>
      </aside>
    </div>
  );
}

function Line({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`flex justify-between gap-4 ${strong ? "border-t border-line pt-2 font-semibold" : ""}`}>
      <span className="text-muted">{label}</span>
      <span>{value}</span>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  optional = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  optional?: boolean;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-sand/70">{label}</span>
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} className="w-full rounded-xl bg-white px-3 py-2 text-ink" required={!optional} />
    </label>
  );
}
