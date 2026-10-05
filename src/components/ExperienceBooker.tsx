"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { addDays, formatMoney, jacoToday } from "@/lib/dates";
import { localizeHref, t, type Locale } from "@/lib/copy";
import { lineTotal, type Experience } from "@/content/experiences";
import { useTrip } from "./TripProvider";

export function ExperienceBooker({ locale, experience }: { locale: Locale; experience: Experience }) {
  const router = useRouter();
  const { addLine, trip } = useTrip();
  const [optionId, setOptionId] = useState(experience.options[0]?.id ?? "");
  const option = experience.options.find((item) => item.id === optionId) ?? experience.options[0];
  const [groupSize, setGroupSize] = useState(option?.groupMin ?? 1);
  const [date, setDate] = useState(trip.villa?.checkIn || addDays(jacoToday(), 14));
  const [time, setTime] = useState(experience.timeSlots[0] ?? "09:00");
  const [notes, setNotes] = useState("");
  const [added, setAdded] = useState(false);

  const clampedGroup = Math.min(option.groupMax, Math.max(option.groupMin, groupSize));
  const total = useMemo(() => lineTotal(option, clampedGroup), [option, clampedGroup]);

  function add(goToTrip: boolean) {
    addLine({
      slug: experience.slug,
      optionId: option.id,
      date,
      time,
      groupSize: clampedGroup,
      notes,
    });
    setAdded(true);
    if (goToTrip) router.push(localizeHref(locale, "/trip"));
  }

  return (
    <div className="rounded-3xl bg-white p-5 shadow-card">
      <p className="text-sm text-muted">{locale === "es" ? "Precio de esta opción" : "Price for this option"}</p>
      <p className="font-display text-4xl text-ocean">{formatMoney(total, locale)}</p>
      <div className="mt-4 space-y-2">
        {experience.options.map((item) => (
          <label key={item.id} className={`flex cursor-pointer items-center justify-between gap-3 rounded-2xl border px-3 py-3 text-sm ${item.id === option.id ? "border-ocean bg-sand" : "border-line"}`}>
            <span className="flex items-center gap-2">
              <input
                type="radio"
                name="option"
                checked={item.id === option.id}
                onChange={() => {
                  setOptionId(item.id);
                  setGroupSize(item.groupMin);
                }}
              />
              {t(locale, item.label)}
            </span>
            <span className="shrink-0 font-medium">
              {formatMoney(item.price, locale)}
              {item.basis === "person" ? (locale === "es" ? " / persona" : " / person") : ""}
            </span>
          </label>
        ))}
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="text-sm">
          <span className="mb-1 block text-muted">{locale === "es" ? "Fecha" : "Date"}</span>
          <input type="date" min={jacoToday()} value={date} onChange={(event) => setDate(event.target.value)} className="w-full rounded-xl border border-line px-3 py-2" />
        </label>
        <label className="text-sm">
          <span className="mb-1 block text-muted">{locale === "es" ? "Hora" : "Time"}</span>
          <select value={time} onChange={(event) => setTime(event.target.value)} className="w-full rounded-xl border border-line px-3 py-2">
            {experience.timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="mt-3 flex items-center justify-between text-sm">
        <span>{locale === "es" ? "Personas" : "People"}</span>
        <span className="flex items-center gap-3">
          <button type="button" className="h-8 w-8 rounded-full border border-line" onClick={() => setGroupSize(Math.max(option.groupMin, clampedGroup - 1))} aria-label={locale === "es" ? "Menos personas" : "Fewer people"}>−</button>
          <span>{clampedGroup}</span>
          <button type="button" className="h-8 w-8 rounded-full border border-line" onClick={() => setGroupSize(Math.min(option.groupMax, clampedGroup + 1))} aria-label={locale === "es" ? "Más personas" : "More people"}>+</button>
        </span>
      </div>
      <label className="mt-3 block text-sm">
        <span className="mb-1 block text-muted">{locale === "es" ? "Notas" : "Notes"}</span>
        <textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows={3} className="w-full rounded-xl border border-line px-3 py-2" />
      </label>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <button type="button" onClick={() => add(false)} className="rounded-full bg-ocean px-4 py-3 text-sm font-semibold text-sand">
          {locale === "es" ? "Sumar al viaje" : "Add to trip"}
        </button>
        <button type="button" onClick={() => add(true)} className="rounded-full border border-ocean px-4 py-3 text-sm font-semibold text-ocean">
          {locale === "es" ? "Sumar e ir al viaje" : "Add and view trip"}
        </button>
      </div>
      {added ? <p className="mt-3 text-sm text-jungle">{locale === "es" ? "Quedó en el viaje." : "Added to the trip."}</p> : null}
    </div>
  );
}
