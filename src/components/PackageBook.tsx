"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addDays, formatDate, jacoToday } from "@/lib/dates";
import { localizeHref, type Locale } from "@/lib/copy";
import type { StayPackage } from "@/content/packages";
import { villa } from "@/content/villa";
import { useTrip } from "./TripProvider";

export function PackageBook({ locale, pkg }: { locale: Locale; pkg: StayPackage }) {
  const router = useRouter();
  const { replaceTrip, trip } = useTrip();
  const [checkIn, setCheckIn] = useState(addDays(jacoToday(), 30));
  const [confirming, setConfirming] = useState(false);
  const checkOut = addDays(checkIn, pkg.nights);
  const occupied = Boolean(trip.villa || trip.lines.length);

  function book() {
    if (occupied && !confirming) {
      setConfirming(true);
      return;
    }
    replaceTrip({
      packageSlug: pkg.slug,
      villa: {
        slug: villa.slug,
        checkIn,
        checkOut,
        guests: Math.min(villa.maxGuests, pkg.guests),
        occasion: pkg.occasion,
        promo: "",
      },
      lines: pkg.items.map((item) => ({
        id: `${item.experienceSlug}-${item.optionId}-${item.dayOffset}`,
        slug: item.experienceSlug,
        optionId: item.optionId,
        date: addDays(checkIn, item.dayOffset),
        time: item.time,
        groupSize: item.groupSize,
        notes: "",
      })),
    });
    router.push(localizeHref(locale, "/trip"));
  }

  return (
    <div className="rounded-3xl bg-white p-5 shadow-card">
      <label className="block text-sm">
        <span className="mb-1 block text-muted">{locale === "es" ? "Llegada" : "Arrival"}</span>
        <input type="date" min={jacoToday()} value={checkIn} onChange={(event) => setCheckIn(event.target.value)} className="w-full rounded-xl border border-line px-3 py-2" />
      </label>
      <p className="mt-3 text-sm text-muted">
        {locale === "es" ? "Salida" : "Departure"} {formatDate(checkOut, locale, true)} · {pkg.nights}{" "}
        {locale === "es" ? "noches" : "nights"} · {pkg.guests} {locale === "es" ? "huéspedes" : "guests"}
      </p>
      <button type="button" onClick={book} className="mt-4 w-full rounded-full bg-coral-deep px-4 py-3 text-sm font-semibold text-white">
        {confirming
          ? locale === "es"
            ? "Reemplazar el viaje actual"
            : "Replace the current trip"
          : locale === "es"
            ? "Armar este paquete"
            : "Build this package"}
      </button>
      {occupied && !confirming ? (
        <p className="mt-2 text-xs text-muted">
          {locale === "es" ? "Si ya tienes un viaje, el siguiente clic lo reemplaza." : "If a trip is already open, the next click replaces it."}
        </p>
      ) : null}
    </div>
  );
}
