import Image from "next/image";
import { Container, PageMain } from "@/components/ui";
import { photos } from "@/content/villa";
import { t } from "@/lib/copy";
import { getLocale } from "@/lib/locale";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const locale = await getLocale();
  return buildMetadata({
    locale,
    path: "/about",
    title: locale === "es" ? "La historia" : "The story",
    description:
      locale === "es"
        ? "Jannat significa paraíso. Casa es la casa. Juntas, en Jacó."
        : "Jannat means paradise. Casa is the house. Together, in Jacó.",
  });
}

export default async function AboutPage() {
  const locale = await getLocale();
  return (
    <PageMain className="pb-24">
      <Container className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-jungle">{locale === "es" ? "El nombre" : "The name"}</p>
          <h1 className="mt-3 font-display text-5xl leading-tight text-ocean md:text-6xl">
            {locale === "es" ? "Una palabra hindi, una casa en la costa." : "A Hindi word, a house on this coast."}
          </h1>
          <div className="mt-6 space-y-4 leading-relaxed">
            <p>
              {locale === "es"
                ? "Jannat llegó del árabe al hindi y al urdu, y significa paraíso. Casa es la palabra española para la casa. Casa Jannat es el punto donde se encuentran: una piscina privada en Jacó, no un eslogan prestado."
                : "Jannat traveled from Arabic into Hindi and Urdu, and it means paradise. Casa is the Spanish word for house. Casa Jannat is where they meet: a private pool in Jacó, not a borrowed slogan."}
            </p>
            <p>
              {locale === "es"
                ? "La casa duerme hasta ocho, con cuatro recámaras, un sofá cama, una casa de huéspedes y un portón para un carro. El mar queda a un corto paseo. Cuarenta y nueve huéspedes la calificaron 4.9."
                : "The house sleeps up to eight, with four bedrooms, a sofa bed, a guest house, and a gate for one car. The ocean is a short walk. Forty-nine guests rated it 4.9."}
            </p>
            <p>
              {locale === "es"
                ? "Si más adelante hay otra casa, seguirá llamándose así la primera. La colección puede crecer. El nombre ya cabe."
                : "If another house comes later, this one keeps the name. The collection can grow. The name already fits."}
            </p>
          </div>
        </div>
        <div className="arch relative min-h-[520px] overflow-hidden">
          <Image src={photos[0].src} alt={t(locale, photos[0].alt)} fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
        </div>
      </Container>
    </PageMain>
  );
}
