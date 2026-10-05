import { FaqList } from "@/components/Forms";
import { JsonLd } from "@/components/JsonLd";
import { Container, PageMain } from "@/components/ui";
import { faqs } from "@/content/faqs";
import { getLocale } from "@/lib/locale";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const locale = await getLocale();
  return buildMetadata({
    locale,
    path: "/faq",
    title: "FAQ",
    description:
      locale === "es"
        ? "La casa, la reserva, las experiencias y las reglas, en preguntas cortas."
        : "The house, booking, experiences, and the rules, in short questions.",
  });
}

export default async function FaqPage() {
  const locale = await getLocale();
  return (
    <PageMain className="pb-24">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question.en,
            acceptedAnswer: { "@type": "Answer", text: faq.answer.en },
          })),
        }}
      />
      <Container className="max-w-3xl">
        <h1 className="font-display text-5xl text-ocean">{locale === "es" ? "Preguntas que ya nos hacen." : "Questions we already get."}</h1>
        <div className="mt-10">
          <FaqList locale={locale} />
        </div>
      </Container>
    </PageMain>
  );
}
