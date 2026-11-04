import { faqs } from "@/content/faqs";
import { homeHero, photos, villa } from "@/content/villa";
import type { Locale } from "./copy";
import { site } from "./site";

function sameAs(): string[] {
  const links = [site.airbnb];
  if (site.instagram) links.push(site.instagram);
  if (site.facebook) links.push(site.facebook);
  return links;
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    email: site.email,
    logo: `${site.url}/icon-512.png`,
    description: site.description.en,
    sameAs: sameAs(),
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.countryCode,
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.description.en,
    inLanguage: ["en", "es"],
    publisher: { "@type": "Organization", name: site.name, url: site.url },
  };
}

export function vacationRentalSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LodgingBusiness", "VacationRental", "Accommodation"],
    name: site.house,
    alternateName: `${site.house} · ${site.name}`,
    description: villa.summary.en,
    url: `${site.url}/stays/casa-jannat`,
    sameAs: sameAs(),
    image: photos.map((photo) => `${site.url}${photo.src}`),
    photo: `${site.url}${homeHero.src}`,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.map.lat,
      longitude: site.map.lng,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: villa.rating.score,
      reviewCount: villa.rating.count,
      bestRating: 5,
      worstRating: 1,
    },
    numberOfRooms: villa.bedrooms,
    numberOfBathroomsTotal: villa.bathrooms,
    occupancy: {
      "@type": "QuantitativeValue",
      maxValue: villa.maxGuests,
    },
    amenityFeature: villa.highlights.map((item) => ({
      "@type": "LocationFeatureSpecification",
      name: item.en,
      value: true,
    })),
    checkinTime: site.checkIn,
    checkoutTime: site.checkOut,
    petsAllowed: false,
    smokingAllowed: false,
    publicAccess: false,
    tourBookingPage: site.airbnb,
    brand: { "@type": "Brand", name: site.name },
  };
}

export function faqPageSchema(locale: Locale = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale === "es" ? "es" : "en",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: locale === "es" ? faq.question.es : faq.question.en,
      acceptedAnswer: {
        "@type": "Answer",
        text: locale === "es" ? faq.answer.es : faq.answer.en,
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.path
        ? { item: `${site.url}${item.path === "/" ? "" : item.path}` }
        : {}),
    })),
  };
}
