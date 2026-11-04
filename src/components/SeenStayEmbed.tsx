import { loadSeenStayUpstreamUrl, SEENSTAY_PROXY_PATH } from "@/lib/seenstayEmbed";
import { Container, Eyebrow } from "./ui";

/** SeenStay score — same-origin proxy so HTTPS production can frame the badge. */
export function SeenStayEmbed({ locale }: { locale: "en" | "es" }) {
  const upstream = loadSeenStayUpstreamUrl();
  if (!upstream) return null;

  return (
    <section
      className="border-b border-line bg-sand-2/60 py-12 md:py-16"
      aria-labelledby="seenstay-heading"
    >
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>{locale === "es" ? "Visibilidad en IA" : "AI visibility"}</Eyebrow>
          <h2
            id="seenstay-heading"
            className="mt-3 font-display text-3xl text-ocean md:text-4xl"
          >
            {locale === "es"
              ? "Cómo te encuentran las respuestas de IA."
              : "How AI answers find this house."}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/90 md:text-lg">
            {locale === "es"
              ? "SeenStay mide cuántas veces Jaco Escape aparece en respuestas de búsqueda con IA. Es una señal de visibilidad, no un ranking de Google."
              : "SeenStay tracks how often Jaco Escape shows up in AI search answers. It is a visibility signal — not a Google ranking."}
          </p>
        </div>

        <div className="mt-8 w-full max-w-[44rem]">
          <iframe
            src={SEENSTAY_PROXY_PATH}
            title={locale === "es" ? "Informe SeenStay de visibilidad en IA" : "SeenStay AI visibility report"}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="block w-full border-0 bg-transparent"
            style={{ height: 480, minHeight: 480 }}
          />
        </div>
      </Container>
    </section>
  );
}
