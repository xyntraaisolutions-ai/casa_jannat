import { c, type Copy, type Locale, t } from "@/lib/copy";
import { site } from "@/lib/site";

export type PolicySection = { heading: string; paragraphs: string[] };

export type PolicyDoc = {
  slug: string;
  title: Copy;
  description: Copy;
  sections: (locale: Locale) => PolicySection[];
};

export const policies: PolicyDoc[] = [
  {
    slug: "cancellation",
    title: c("Cancellation", "Cancelación"),
    description: c(
      "How cancellations work while Casa Jannat is booked on Airbnb.",
      "Cómo funcionan las cancelaciones mientras Casa Jannat se reserva en Airbnb.",
    ),
    sections: (locale) => [
      {
        heading: t(locale, c("The house", "La casa")),
        paragraphs: [
          t(
            locale,
            c(
              "Stays are booked on Airbnb. Cancellation, refunds, and payment timing follow the Airbnb listing and Airbnb’s policies for your reservation.",
              "Las estadías se reservan en Airbnb. Cancelación, reembolsos y tiempos de pago siguen el anuncio de Airbnb y las políticas de Airbnb para tu reserva.",
            ),
          ),
          t(
            locale,
            c(
              "Direct booking on this website is coming soon. When that launches, cancellation terms for direct stays will be published here.",
              "La reserva directa en este sitio llega pronto. Cuando se lance, los términos de cancelación para estadías directas se publicarán aquí.",
            ),
          ),
        ],
      },
      {
        heading: t(locale, c("Experiences", "Experiencias")),
        paragraphs: [
          t(
            locale,
            c(
              "Chef, boat, transfer, and tour ideas on this site are informational. When you arrange one with a host or local operator, their cancellation terms apply.",
              "Las ideas de chef, bote, traslado y tours en este sitio son informativas. Cuando las organices con el anfitrión o un operador local, aplican sus términos de cancelación.",
            ),
          ),
        ],
      },
    ],
  },
  {
    slug: "house-rules",
    title: c("House rules", "Reglas de la casa"),
    description: c(
      "How Casa Jannat is used: quiet hours, the pool, parking, and gatherings.",
      "Cómo se usa Casa Jannat: silencio, piscina, parqueo y reuniones.",
    ),
    sections: (locale) => [
      {
        heading: t(locale, c("Hours", "Horarios")),
        paragraphs: [
          t(
            locale,
            c(
              "Check-in is 3:00 p.m. with a lockbox. Checkout is 11:00 a.m. Quiet hours are 10:00 p.m. to 8:00 a.m.",
              "La entrada es a las 3:00 p.m. con caja de seguridad. La salida es a las 11:00 a.m. El silencio va de las 10:00 p.m. a las 8:00 a.m.",
            ),
          ),
        ],
      },
      {
        heading: t(locale, c("People", "Personas")),
        paragraphs: [
          t(
            locale,
            c(
              "The reservation is the guest list. Overnight stays stay within the count confirmed on Airbnb — up to 8, and tell the host if you are more than six so the beds are right. Day visitors are fine when expected. They do not stay the night unless they are on the booking.",
              "La reserva es la lista de huéspedes. Quien duerme se queda en el número confirmado en Airbnb — hasta 8, y dile al anfitrión si pasan de seis para que las camas queden bien. Las visitas de día están bien si se esperan. No se quedan a dormir si no están en la reserva.",
            ),
          ),
        ],
      },
      {
        heading: t(locale, c("Pool", "Piscina")),
        paragraphs: [
          t(
            locale,
            c(
              "The pool and spa are private to the house. No glass on the deck or in the water. Children in the water need an adult who is actually watching. The pool bathroom is there so sandy feet do not cross the living room.",
              "La piscina y el spa son privados de la casa. Sin vidrio en la terraza ni en el agua. Los niños en el agua necesitan un adulto que de verdad esté mirando. El baño de la piscina está para que los pies con arena no crucen la sala.",
            ),
          ),
        ],
      },
      {
        heading: t(locale, c("Gatherings", "Reuniones")),
        paragraphs: [
          t(
            locale,
            c(
              "A celebration can be part of the stay if the host has agreed to it before you arrive. A DJ ends with quiet hours. Smoking is outside. The neighbor's night is not an amenity.",
              "Una celebración puede ser parte de la estadía si el anfitrión la acordó antes de que llegues. Un DJ termina con las horas de silencio. Se fuma afuera. La noche del vecino no es una amenidad.",
            ),
          ),
        ],
      },
      {
        heading: t(locale, c("Parking and the gate", "Parqueo y portón")),
        paragraphs: [
          t(
            locale,
            c(
              "One vehicle behind the electric gate. If you also want a golf cart, say so — it has to fit the same plan. Do not block the street.",
              "Un vehículo detrás del portón eléctrico. Si también quieres un carrito de golf, dilo: tiene que caber en el mismo plan. No bloquees la calle.",
            ),
          ),
        ],
      },
    ],
  },
  {
    slug: "privacy",
    title: c("Privacy", "Privacidad"),
    description: c(
      "What we collect when you write to us, and what we do not do with it.",
      "Qué recopilamos cuando nos escribes y qué no hacemos con eso.",
    ),
    sections: (locale) => [
      {
        heading: t(locale, c("What you send us", "Lo que nos envías")),
        paragraphs: [
          t(
            locale,
            c(
              "When you email or use the contact form, we receive your name, email, and whatever you write about dates or the group. We use it to answer. House bookings made on Airbnb are processed under Airbnb’s privacy policy.",
              "Cuando escribes por correo o usas el formulario de contacto, recibimos tu nombre, correo y lo que cuentes sobre fechas o el grupo. Lo usamos para responder. Las reservas de la casa hechas en Airbnb se procesan bajo la política de privacidad de Airbnb.",
            ),
          ),
        ],
      },
      {
        heading: t(locale, c("Who else sees it", "Quién más lo ve")),
        paragraphs: [
          t(
            locale,
            c(
              "If you ask us to help arrange a chef, transfer, or tour, we share only what that operator needs. We do not sell contact lists. If analytics are enabled and you allow them, a measurement tool may see pages you visit — not the message you drafted.",
              "Si pides ayuda para coordinar un chef, traslado o tour, compartimos solo lo que ese operador necesita. No vendemos listas de contacto. Si las analíticas están activas y las permites, una herramienta de medición puede ver las páginas que visitas, no el mensaje que redactaste.",
            ),
          ),
        ],
      },
      {
        heading: t(locale, c("How to ask", "Cómo preguntar")),
        paragraphs: [
          t(
            locale,
            c(
              `Write to ${site.email} to ask what we hold about you, or to ask us to delete a message we have not already had to share with an operator.`,
              `Escribe a ${site.email} para preguntar qué tenemos sobre ti, o para pedir que borremos un mensaje que todavía no hayamos tenido que compartir con un operador.`,
            ),
          ),
        ],
      },
    ],
  },
  {
    slug: "terms",
    title: c("Terms", "Términos"),
    description: c(
      "How this site presents Casa Jannat and points you to Airbnb to book.",
      "Cómo este sitio presenta Casa Jannat y te dirige a Airbnb para reservar.",
    ),
    sections: (locale) => [
      {
        heading: t(locale, c("This website", "Este sitio")),
        paragraphs: [
          t(
            locale,
            c(
              "Jaco Escape operates this marketing site for Casa Jannat. Stays are booked on Airbnb today. Direct booking on this website is coming soon and is not available yet. Nothing on these pages charges a stay.",
              "Jaco Escape opera este sitio de marketing para Casa Jannat. Las estadías se reservan hoy en Airbnb. La reserva directa en este sitio llega pronto y todavía no está disponible. Nada en estas páginas cobra una estadía.",
            ),
          ),
        ],
      },
      {
        heading: t(locale, c("The house", "La casa")),
        paragraphs: [
          t(
            locale,
            c(
              "You are booking an entire home in Jacó for the guests on your Airbnb reservation. House rules, quiet hours, and the no-glass pool rule on this site apply to the stay. Security deposit and live rates are shown on Airbnb. The exact address is shared after confirmation.",
              "Reservas una casa completa en Jacó para los huéspedes de tu reserva de Airbnb. Las reglas, el silencio y la prohibición de vidrio en la piscina de este sitio aplican a la estadía. El depósito de seguridad y las tarifas vigentes están en Airbnb. La dirección exacta se comparte después de confirmar.",
            ),
          ),
        ],
      },
      {
        heading: t(locale, c("Experiences", "Experiencias")),
        paragraphs: [
          t(
            locale,
            c(
              "Experience pages describe ideas only. Tours and services, if arranged, are delivered by operators under their own terms. Their safety briefing is binding.",
              "Las páginas de experiencias describen ideas. Los tours y servicios, si se coordinan, los entregan operadores bajo sus propios términos. Su charla de seguridad es obligatoria.",
            ),
          ),
        ],
      },
      {
        heading: t(locale, c("Law", "Ley")),
        paragraphs: [
          t(
            locale,
            c(
              "These terms are governed by the laws of Costa Rica. If a sentence here conflicts with a right you cannot waive, that right wins. The host to write to is the email on the contact page.",
              "Estos términos se rigen por las leyes de Costa Rica. Si una frase de aquí choca con un derecho al que no puedes renunciar, gana ese derecho. El anfitrión al que se escribe es el correo de la página de contacto.",
            ),
          ),
        ],
      },
    ],
  },
];

export function getPolicy(slug: string): PolicyDoc | undefined {
  return policies.find((policy) => policy.slug === slug);
}
