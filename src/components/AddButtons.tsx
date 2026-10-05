"use client";

import { useState } from "react";
import { addDays, jacoToday } from "@/lib/dates";
import { getExperience } from "@/content/experiences";
import { useTrip } from "./TripProvider";
import type { Locale } from "@/lib/copy";

export function QuickAdd({ locale, slug }: { locale: Locale; slug: string }) {
  const experience = getExperience(slug);
  const { addLine, trip } = useTrip();
  const [added, setAdded] = useState(false);
  if (!experience) return null;
  const option = [...experience.options].sort((a, b) => a.price - b.price)[0];

  return (
    <button
      type="button"
      className="rounded-full bg-sand px-3 py-1.5 text-xs font-semibold text-ocean"
      onClick={() => {
        addLine({
          slug,
          optionId: option.id,
          date: trip.villa?.checkIn || addDays(jacoToday(), 21),
          time: experience.timeSlots[0] ?? "09:00",
          groupSize: option.groupMin,
          notes: "",
        });
        setAdded(true);
      }}
    >
      {added ? (locale === "es" ? "Sumado" : "Added") : locale === "es" ? "Sumar al viaje" : "Add to trip"}
    </button>
  );
}
