import type { Locale } from "./copy";

export function jacoToday(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Costa_Rica",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export function addDays(iso: string, days: number): string {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function nightsBetween(checkIn: string, checkOut: string): number {
  const start = Date.parse(`${checkIn}T00:00:00Z`);
  const end = Date.parse(`${checkOut}T00:00:00Z`);
  if (Number.isNaN(start) || Number.isNaN(end)) return 0;
  return Math.round((end - start) / 86_400_000);
}

export function stayNights(checkIn: string, checkOut: string): string[] {
  const count = nightsBetween(checkIn, checkOut);
  return Array.from({ length: Math.max(0, count) }, (_, index) => addDays(checkIn, index));
}

export function formatDate(iso: string, locale: Locale, withYear = false): string {
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return iso;
  return new Intl.DateTimeFormat(locale === "es" ? "es-CR" : "en-US", {
    timeZone: "UTC",
    month: "short",
    day: "numeric",
    year: withYear ? "numeric" : undefined,
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

export function formatTime(hhmm: string, locale: Locale): string {
  const [hour, minute] = hhmm.split(":").map(Number);
  if (Number.isNaN(hour) || Number.isNaN(minute)) return hhmm;
  return new Intl.DateTimeFormat(locale === "es" ? "es-CR" : "en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(2026, 0, 1, hour, minute)));
}

export function formatMoney(amount: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === "es" ? "es-CR" : "en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function monthLabel(year: number, monthIndex: number, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "es" ? "es-CR" : "en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, monthIndex, 1)));
}

export function weekdayInitials(locale: Locale): string[] {
  const sunday = new Date(Date.UTC(2026, 0, 4));
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(sunday);
    date.setUTCDate(sunday.getUTCDate() + index);
    return new Intl.DateTimeFormat(locale === "es" ? "es-CR" : "en-US", {
      weekday: "narrow",
      timeZone: "UTC",
    }).format(date);
  });
}

export function buildMonth(year: number, monthIndex: number): (string | null)[] {
  const first = new Date(Date.UTC(year, monthIndex, 1));
  const startPad = first.getUTCDay();
  const days = new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();
  const cells: (string | null)[] = Array.from({ length: startPad }, () => null);
  for (let day = 1; day <= days; day += 1) {
    const month = String(monthIndex + 1).padStart(2, "0");
    const date = String(day).padStart(2, "0");
    cells.push(`${year}-${month}-${date}`);
  }
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export function isIsoDate(value: string | undefined): value is string {
  return Boolean(value && /^\d{4}-\d{2}-\d{2}$/.test(value));
}
