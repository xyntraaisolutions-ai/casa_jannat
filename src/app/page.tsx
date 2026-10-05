import { HomePage } from "@/components/HomePage";
import { JsonLd } from "@/components/JsonLd";
import { homeHero, villa } from "@/content/villa";
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
    description: site.description[locale],
    image: {
      url: homeHero.src,
      width: homeHero.width,
      height: homeHero.height,
      alt: locale === "es" ? homeHero.alt.es : homeHero.alt.en,
    },
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
          image: [`${site.url}${homeHero.src}`],
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
