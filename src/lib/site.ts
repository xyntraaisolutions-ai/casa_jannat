import type { Locale } from "./copy";
import { optionalProp, requireProp } from "./parseProperties";

/**
 * Site config from root `constant.properties` (loaded in next.config.ts).
 * Edit that file for Airbnb URL, support email, phones, social, analytics, etc.
 */
function loadProps(): Record<string, string> {
  const raw = process.env.NEXT_PUBLIC_SITE_CONSTANTS;
  if (!raw) {
    throw new Error(
      "constant.properties not loaded. Restart the Next.js dev server or rebuild so next.config.ts can inject NEXT_PUBLIC_SITE_CONSTANTS.",
    );
  }
  return JSON.parse(raw) as Record<string, string>;
}

const p = loadProps();

export const site = {
  name: requireProp(p, "site.name"),
  house: requireProp(p, "site.house"),
  slogan: {
    en: requireProp(p, "site.slogan.en"),
    es: requireProp(p, "site.slogan.es"),
  },
  collection: {
    en: requireProp(p, "site.collection.en"),
    es: requireProp(p, "site.collection.es"),
  },
  description: {
    en: requireProp(p, "site.description.en"),
    es: requireProp(p, "site.description.es"),
  },
  url: requireProp(p, "site.url"),
  /** Show the top “website in development” bar when true. Prefer layout prop (fresh file read). */
  showWebsiteDevInProgress: optionalProp(p, "show_website_dev_in_progress", "false").toLowerCase() === "true",
  email: requireProp(p, "support.email"),
  /** Digits only, country code included, no plus. Leave empty until the host line is live. */
  whatsapp: optionalProp(p, "support.whatsapp"),
  phoneDisplay: optionalProp(p, "support.phone.display"),
  phoneTel: optionalProp(p, "support.phone.tel"),
  instagram: optionalProp(p, "social.instagram"),
  facebook: optionalProp(p, "social.facebook"),
  airbnb: requireProp(p, "airbnb.url"),
  airbnbId: requireProp(p, "airbnb.id"),
  /**
   * SeenStay report embed URL. Empty hides the section.
   * Localhost / 127.0.0.1 URLs are dropped in production so a broken iframe never ships.
   */
  seenstayEmbedUrl: (() => {
    const url = optionalProp(p, "seenstay.embedUrl").trim();
    if (!url) return "";
    if (process.env.NODE_ENV === "production" && /^(https?:\/\/)?(localhost|127\.0\.0\.1)(:\d+)?\b/i.test(url)) {
      return "";
    }
    return url;
  })(),
  ga4: optionalProp(p, "analytics.ga4"),
  metaPixel: optionalProp(p, "analytics.metaPixel"),
  address: {
    locality: requireProp(p, "address.locality"),
    region: requireProp(p, "address.region"),
    country: requireProp(p, "address.country"),
    countryCode: requireProp(p, "address.countryCode"),
  },
  checkIn: requireProp(p, "checkIn"),
  checkOut: requireProp(p, "checkOut"),
  /** Approximate neighborhood pin — the street address is shared after a confirmed stay. */
  map: {
    lat: Number(requireProp(p, "map.lat")),
    lng: Number(requireProp(p, "map.lng")),
  },
};

/** Opens WhatsApp when configured; otherwise mailto for the OS / browser mail app. */
export function hostHref(body: string, subject = "Casa Jannat"): string {
  if (site.whatsapp) {
    return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(body)}`;
  }
  return mailHref(subject, body);
}

/** Always mailto — desktop Mail/Outlook, mobile mail apps, or browser mail in a new tab. */
export function mailHref(subject = "Casa Jannat", body = ""): string {
  const parts = [
    `subject=${encodeURIComponent(subject)}`,
    body ? `body=${encodeURIComponent(body)}` : "",
  ].filter(Boolean);
  return `mailto:${site.email}?${parts.join("&")}`;
}

export function hostAction(locale: Locale): string {
  if (site.whatsapp) {
    return locale === "es" ? "Enviar por WhatsApp" : "Send on WhatsApp";
  }
  return locale === "es" ? "Enviar por correo" : "Email the host";
}
