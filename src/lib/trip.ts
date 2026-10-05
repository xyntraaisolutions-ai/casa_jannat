export type VillaHold = {
  slug: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  occasion: string;
  promo: string;
};

export type LineHold = {
  id: string;
  slug: string;
  optionId: string;
  date: string;
  time: string;
  groupSize: number;
  notes: string;
};

export type TripState = {
  villa: VillaHold | null;
  lines: LineHold[];
  packageSlug: string | null;
};

export const emptyTrip: TripState = { villa: null, lines: [], packageSlug: null };

export function sanitizeTrip(value: unknown): TripState {
  if (!value || typeof value !== "object") return emptyTrip;
  const record = value as Partial<TripState>;
  const villa = record.villa;
  const safeVilla =
    villa &&
    typeof villa.slug === "string" &&
    typeof villa.checkIn === "string" &&
    typeof villa.checkOut === "string" &&
    typeof villa.guests === "number"
      ? {
          slug: villa.slug,
          checkIn: villa.checkIn,
          checkOut: villa.checkOut,
          guests: villa.guests,
          occasion: typeof villa.occasion === "string" ? villa.occasion : "",
          promo: typeof villa.promo === "string" ? villa.promo : "",
        }
      : null;
  const lines = Array.isArray(record.lines)
    ? record.lines.filter(
        (line): line is LineHold =>
          Boolean(line) &&
          typeof line.id === "string" &&
          typeof line.slug === "string" &&
          typeof line.optionId === "string" &&
          typeof line.date === "string",
      )
    : [];
  return {
    villa: safeVilla,
    lines,
    packageSlug: typeof record.packageSlug === "string" ? record.packageSlug : null,
  };
}

export type GuestDetails = {
  name: string;
  email: string;
  phone: string;
  flight: string;
  notes: string;
  payInFull: boolean;
};

export const REQUEST_KEY = "casa-jannat-request";
