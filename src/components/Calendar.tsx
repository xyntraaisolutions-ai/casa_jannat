"use client";

import { useState } from "react";
import { buildMonth, formatDate, jacoToday, monthLabel, weekdayInitials } from "@/lib/dates";
import { isBlocked } from "@/lib/rates";
import type { Locale } from "@/lib/copy";

export function Calendar({
  locale,
  checkIn,
  checkOut,
  onChange,
}: {
  locale: Locale;
  checkIn: string;
  checkOut: string;
  onChange: (checkIn: string, checkOut: string) => void;
}) {
  const today = jacoToday();
  const [cursor, setCursor] = useState(() => {
    const source = checkIn || today;
    return { year: Number(source.slice(0, 4)), month: Number(source.slice(5, 7)) - 1 };
  });

  const months = [cursor, { year: cursor.month === 11 ? cursor.year + 1 : cursor.year, month: (cursor.month + 1) % 12 }];

  function shift(delta: number) {
    const date = new Date(Date.UTC(cursor.year, cursor.month + delta, 1));
    setCursor({ year: date.getUTCFullYear(), month: date.getUTCMonth() });
  }

  function pick(iso: string) {
    if (!checkIn || (checkIn && checkOut) || iso < checkIn) {
      onChange(iso, "");
      return;
    }
    onChange(checkIn, iso);
  }

  const labels = weekdayInitials(locale);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {months.map((month, index) => (
        <div key={`${month.year}-${month.month}`}>
          <div className="mb-3 flex items-center justify-between">
            {index === 0 ? (
              <button type="button" className="rounded-full px-2 py-1 text-sm hover:bg-sand-2" onClick={() => shift(-1)} aria-label={locale === "es" ? "Mes anterior" : "Previous month"}>
                ‹
              </button>
            ) : (
              <span className="w-8" />
            )}
            <p className="font-display text-lg capitalize">{monthLabel(month.year, month.month, locale)}</p>
            {index === months.length - 1 ? (
              <button type="button" className="rounded-full px-2 py-1 text-sm hover:bg-sand-2" onClick={() => shift(1)} aria-label={locale === "es" ? "Mes siguiente" : "Next month"}>
                ›
              </button>
            ) : (
              <span className="w-8" />
            )}
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-[0.7rem] uppercase tracking-wider text-muted">
            {labels.map((label, dayIndex) => (
              <span key={`${label}-${dayIndex}`}>{label}</span>
            ))}
          </div>
          <div className="mt-1 grid grid-cols-7 gap-1">
            {buildMonth(month.year, month.month).map((iso, cell) => {
              if (!iso) return <span key={`empty-${cell}`} />;
              const disabled = iso < today || isBlocked(iso);
              const selected = iso === checkIn || iso === checkOut;
              const inRange = checkIn && checkOut && iso > checkIn && iso < checkOut;
              return (
                <button
                  key={iso}
                  type="button"
                  disabled={disabled}
                  onClick={() => pick(iso)}
                  aria-label={formatDate(iso, locale, true)}
                  aria-pressed={selected}
                  className={`h-9 rounded-full text-sm ${
                    disabled
                      ? "cursor-not-allowed text-muted/40"
                      : selected
                        ? "bg-ocean text-sand"
                        : inRange
                          ? "bg-sand-2 text-ocean"
                          : "hover:bg-sand-2"
                  }`}
                >
                  {Number(iso.slice(8, 10))}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
