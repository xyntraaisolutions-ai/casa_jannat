import { c, type Copy } from "./copy";
import { stayNights } from "./dates";

/**
 * Direct-booking rates for Casa Jannat.
 * Change numbers here — the house page, packages, and trip all read this file.
 * Confirm them against your channel manager before taking payment.
 */
export const rates = {
  green: 249,
  high: 349,
  peak: 429,
  cleaning: 165,
  iva: 0.13,
  depositRate: 0.3,
  securityDeposit: 400,
  minNights: 2,
  balanceDaysBefore: 14,
  promoCode: "JANNAT10",
  promoPercent: 0.1,
  promoMinNights: 3,
};

/** Inclusive nights the house is already held. Leave empty until the live calendar is connected. */
export const blockedRanges: { start: string; end: string }[] = [];

export function isBlocked(iso: string): boolean {
  return blockedRanges.some((range) => iso >= range.start && iso <= range.end);
}

export function nightlyRate(iso: string): number {
  const month = Number(iso.slice(5, 7));
  const day = Number(iso.slice(8, 10));
  if ((month === 12 && day >= 20) || (month === 1 && day <= 4)) return rates.peak;
  if (month === 12 || month <= 4) return rates.high;
  return rates.green;
}

export function lodgingDiscount(
  code: string,
  lodging: number,
  nights: number,
): { amount: number; error?: Copy } {
  const key = code.trim().toUpperCase();
  if (!key) return { amount: 0 };
  if (key === rates.promoCode) {
    if (nights < rates.promoMinNights) {
      return {
        amount: 0,
        error: c(
          `${rates.promoCode} applies to stays of ${rates.promoMinNights} nights or more.`,
          `${rates.promoCode} aplica a estadías de ${rates.promoMinNights} noches o más.`,
        ),
      };
    }
    return { amount: Math.round(lodging * rates.promoPercent) };
  }
  return {
    amount: 0,
    error: c("That code isn't active.", "Ese código no está activo."),
  };
}

export type StayQuote = {
  ok: true;
  nights: number;
  lodging: number;
  discount: number;
  cleaning: number;
  iva: number;
  total: number;
  dueNow: number;
  balance: number;
  securityDeposit: number;
  average: number;
  promoError?: Copy;
};

export function quoteStay(
  checkIn: string,
  checkOut: string,
  promo = "",
  payInFull = false,
): StayQuote | { ok: false; error: Copy } {
  const nights = stayNights(checkIn, checkOut);
  if (nights.length < 1) {
    return { ok: false, error: c("Choose a departure after arrival.", "Elige una salida posterior a la llegada.") };
  }
  if (nights.length < rates.minNights) {
    return {
      ok: false,
      error: c(
        `The house asks for at least ${rates.minNights} nights.`,
        `La casa pide un mínimo de ${rates.minNights} noches.`,
      ),
    };
  }
  if (nights.some(isBlocked)) {
    return {
      ok: false,
      error: c(
        "Those dates include a night that is already held.",
        "Esas fechas incluyen una noche que ya está apartada.",
      ),
    };
  }
  const lodging = nights.reduce((sum, night) => sum + nightlyRate(night), 0);
  const discountResult = lodgingDiscount(promo, lodging, nights.length);
  const discount = discountResult.amount;
  const cleaning = rates.cleaning;
  const taxable = lodging - discount + cleaning;
  const iva = Math.round(taxable * rates.iva);
  const total = taxable + iva;
  const dueNow = payInFull ? total : Math.round(total * rates.depositRate);
  return {
    ok: true,
    nights: nights.length,
    lodging,
    discount,
    cleaning,
    iva,
    total,
    dueNow,
    balance: total - dueNow,
    securityDeposit: rates.securityDeposit,
    average: Math.round(lodging / nights.length),
    promoError: discountResult.error,
  };
}
