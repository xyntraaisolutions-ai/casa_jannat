import { HomePage } from "@/components/HomePage";
import { JsonLd } from "@/components/JsonLd";
import { villa } from "@/content/villa";
import { getLocale } from "@/lib/locale";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { rates } from "@/lib/rates";

export async function generateMetadata() {
  const locale = await getLocale();
  return buildMetadata({
    locale,
    path: "/",
    absolute: true,
    title: locale === "es" ? "Casa Jannat — Un pedacito de paraíso en Jacó" : "Casa Jannat — A Little Piece of Paradise in Jacó",
    description:
      locale === "es"
        ? "Piscina privada, cuatro recámaras y la playa a unos minutos en Jacó, Costa Rica. Reserva directa."
        : "Private pool, four bedrooms, and the beach just minutes away in Jacó, Costa Rica. Book direct.",
  });
}

export default async function Page() {
  const locale = await getLocale();
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": ["LodgingBusiness", "VacationRental"],
          name: "Casa Jannat",
          description: villa.summary.en,
          url: site.url,
          image: [`${site.url}/images/casa-jannat/hero-pool.jpg`],
          address: {
            "@type": "PostalAddress",
            addressLocality: "Jacó",
            addressRegion: "Puntarenas",
            addressCountry: "CR",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: villa.rating.score,
            reviewCount: villa.rating.count,
            bestRating: 5,
          },
          numberOfRooms: villa.bedrooms,
          priceRange: `$${rates.green}+`,
        }}
      />
      <HomePage locale={locale} />
    </>
  );
}
