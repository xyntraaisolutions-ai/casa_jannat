import { HomePage } from "@/components/HomePage";
import { JsonLd } from "@/components/JsonLd";
import { jacoView } from "@/content/villa";
import { getLocale } from "@/lib/locale";
import { breadcrumbSchema, faqPageSchema, vacationRentalSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export async function generateMetadata() {
  const locale = await getLocale();
  return buildMetadata({
    locale,
    path: "/",
    absolute: true,
    title: locale === "es" ? "Casa Jannat — Un pedacito de paraíso en Jacó" : "Casa Jannat — A Little Piece of Paradise in Jacó",
    description: site.description[locale],
    image: {
      url: jacoView.src,
      width: jacoView.width,
      height: jacoView.height,
      alt: locale === "es" ? jacoView.alt.es : jacoView.alt.en,
    },
  });
}

export default async function Page() {
  const locale = await getLocale();
  return (
    <>
      <JsonLd data={vacationRentalSchema()} />
      <JsonLd data={faqPageSchema(locale)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: locale === "es" ? "Inicio" : "Home", path: "/" },
          { name: "Casa Jannat" },
        ])}
      />
      <HomePage locale={locale} />
    </>
  );
}
