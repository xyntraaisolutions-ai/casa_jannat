import type { Locale } from "./copy";

export const site = {
  name: "Casa Jannat",
  slogan: { en: "A Little Piece of Paradise", es: "Un Pedacito de Paraíso" },
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://casajannatjaco.com",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "stay@casajannat.com",
  /** Digits only, country code included, no plus. Leave empty until the host line is live. */
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "",
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? "",
  phoneTel: process.env.NEXT_PUBLIC_PHONE_TEL ?? "",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM ?? "",
  facebook: process.env.NEXT_PUBLIC_FACEBOOK ?? "",
  airbnb: "https://www.airbnb.com/rooms/1310243367711997885",
  airbnbId: "1310243367711997885",
  ga4: process.env.NEXT_PUBLIC_GA4_ID ?? "",
  metaPixel: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
  address: {
    locality: "Jacó",
    region: "Puntarenas",
    country: "Costa Rica",
    countryCode: "CR",
  },
  checkIn: "15:00",
  checkOut: "11:00",
  /** Approximate neighborhood pin — the street address is shared after a confirmed stay. */
  map: { lat: 9.616, lng: -84.629 },
};

export function hostHref(body: string, subject = "Casa Jannat"): string {
  if (site.whatsapp) {
    return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(body)}`;
  }
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function hostAction(locale: Locale): string {
  if (site.whatsapp) {
    return locale === "es" ? "Enviar por WhatsApp" : "Send on WhatsApp";
  }
  return locale === "es" ? "Enviar por correo" : "Email the host";
}
