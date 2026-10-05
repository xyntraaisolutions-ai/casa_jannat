import { c, type Copy, type Locale, t } from "@/lib/copy";
import { formatMoney } from "@/lib/dates";
import { rates } from "@/lib/rates";
import { site } from "@/lib/site";

export type PolicySection = { heading: string; paragraphs: string[] };

export type PolicyDoc = {
  slug: string;
  title: Copy;
  description: Copy;
  sections: (locale: Locale) => PolicySection[];
};

const money = (amount: number, locale: Locale) => formatMoney(amount, locale);

export const policies: PolicyDoc[] = [
  {
    slug: "cancellation",
    title: c("Cancellation", "Cancelación"),
    description: c(
      "When a stay or an experience can be changed, and what is still due.",
      "Cuándo se puede cambiar una estadía o una experiencia, y qué sigue debiéndose.",
    ),
    sections: (locale) => [
      {
        heading: t(locale, c("The house", "La casa")),
        paragraphs: [
          t(
            locale,
            c(
              "Cancel free of charge until 14 days before check-in. We return anything you have paid toward the stay.",
              "Cancela sin cargo hasta 14 días antes de la entrada. Devolvemos lo que hayas pagado de la estadía.",
            ),
          ),
          t(
            locale,
            c(
              "Inside 14 days, 50% of the lodging total (nightly rate after any promo, cleaning, and IVA) is due. If you already paid more than that, we return the difference.",
              "Dentro de los 14 días, se debe el 50% del total del hospedaje (tarifa por noche después de cualquier promo, limpieza e IVA). Si ya pagaste más, devolvemos la diferencia.",
            ),
          ),
          t(
            locale,
            c(
              "Inside 48 hours of check-in, or after you have arrived, the stay total is non-refundable.",
              "Dentro de las 48 horas previas a la entrada, o si ya llegaste, el total de la estadía no es reembolsable.",
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
              "Cancel or move an experience until 72 hours before it starts and we refund that line. Inside 72 hours, the line is due unless the operator cancels.",
              "Cancela o mueve una experiencia hasta 72 horas antes de que empiece y reembolsamos esa línea. Dentro de las 72 horas, la línea se debe, salvo que el operador cancele.",
            ),
          ),
          t(
            locale,
            c(
              "If weather, park closures, or sea conditions cancel a day, we move it or refund it. You are not charged again to try the next morning.",
              "Si el clima, un cierre de parque o el estado del mar cancelan un día, lo movemos o lo reembolsamos. No se cobra de nuevo por intentar a la mañana siguiente.",
            ),
          ),
        ],
      },
      {
        heading: t(locale, c("The security deposit", "El depósito de seguridad")),
        paragraphs: [
          t(
            locale,
            c(
              `A refundable hold of ${money(rates.securityDeposit, locale)} is taken with a confirmed stay and released after checkout if the house is as you found it. It is not a cleaning fee and it is not part of the nightly rate.`,
              `Una retención reembolsable de ${money(rates.securityDeposit, locale)} se toma con la estadía confirmada y se libera después de la salida si la casa está como la encontraste. No es la limpieza ni parte de la tarifa por noche.`,
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
              "The reservation is the guest list. Overnight stays stay within the count we confirmed — up to 8, and tell us if you are more than six so the beds are right. Visitors during the day are fine when they are expected. They do not stay the night unless they are on the booking.",
              "La reserva es la lista de huéspedes. Quien duerme se queda en el número que confirmamos — hasta 8, y dinos si pasan de seis para que las camas queden bien. Las visitas de día están bien si se esperan. No se quedan a dormir si no están en la reserva.",
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
              "A celebration can be part of the stay if we have agreed to it before you arrive. A DJ ends with quiet hours. Smoking is outside. The neighbor's night is not an amenity.",
              "Una celebración puede ser parte de la estadía si la acordamos antes de que llegues. Un DJ termina con las horas de silencio. Se fuma afuera. La noche del vecino no es una amenidad.",
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
      "What we collect when you plan a stay, and what we do not do with it.",
      "Qué recopilamos cuando planeas una estadía y qué no hacemos con eso.",
    ),
    sections: (locale) => [
      {
        heading: t(locale, c("What you send us", "Lo que nos envías")),
        paragraphs: [
          t(
            locale,
            c(
              "A reservation request includes your name, email, phone, travel dates, group size, and anything you type about flights or celebrations. We use it to answer and to arrange the house and the experiences. The trip plan is also stored in this browser until you clear it, so a refresh does not erase the dates.",
              "Una solicitud incluye tu nombre, correo, teléfono, fechas, tamaño del grupo y lo que escribas sobre vuelos o celebraciones. Lo usamos para responder y para coordinar la casa y las experiencias. El plan del viaje también se guarda en este navegador hasta que lo borres, para que un refresh no borre las fechas.",
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
              "Operators see what they need to run their day: a chef gets the menu notes and the headcount, a driver gets the flight, a captain gets the group size. We do not sell the list. If analytics are enabled and you allow them, a measurement tool may see pages you visit — not the message you drafted.",
              "Los operadores ven lo que necesitan para su día: un chef recibe las notas del menú y el número de personas, un conductor el vuelo, un capitán el tamaño del grupo. No vendemos la lista. Si las analíticas están activas y las permites, una herramienta de medición puede ver las páginas que visitas, no el mensaje que redactaste.",
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
              `Write to ${site.email} to ask what we hold about you, or to ask us to delete a request we have not already had to share with an operator.`,
              `Escribe a ${site.email} para preguntar qué tenemos sobre ti, o para pedir que borremos una solicitud que todavía no hayamos tenido que compartir con un operador.`,
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
      "The direct-booking terms for Casa Jannat and the experiences arranged with the stay.",
      "Los términos de reserva directa de Casa Jannat y de las experiencias que se coordinan con la estadía.",
    ),
    sections: (locale) => [
      {
        heading: t(locale, c("A request is not yet a hold", "Una solicitud todavía no aparta")),
        paragraphs: [
          t(
            locale,
            c(
              "Sending a trip from this site asks us to confirm dates. The nights are held when we say they are held, and when the deposit we agree is paid. Until then the calendar can still change. Prices shown are USD and include the line items in the breakdown. IVA at 13% applies to the stay. Experience rates are the arranged price in the catalog.",
              "Enviar un viaje desde este sitio nos pide confirmar fechas. Las noches quedan apartadas cuando decimos que lo están y cuando se paga el depósito acordado. Hasta entonces el calendario puede cambiar. Los precios están en USD e incluyen las líneas del desglose. El IVA del 13% aplica a la estadía. Las tarifas de experiencias son el precio coordinado del catálogo.",
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
              `You are booking an entire home in Jacó for the confirmed guests. House rules, quiet hours, and the no-glass pool rule are part of the stay. The security deposit is ${money(rates.securityDeposit, locale)}. Damage beyond that is still your responsibility. The exact address is shared after confirmation.`,
              `Reservas una casa completa en Jacó para los huéspedes confirmados. Las reglas, el silencio y la prohibición de vidrio en la piscina son parte de la estadía. El depósito de seguridad es de ${money(rates.securityDeposit, locale)}. Un daño mayor sigue siendo tu responsabilidad. La dirección exacta se comparte después de confirmar.`,
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
              "Tours and services are arranged by us and delivered by operators. Their safety briefing is binding. If a day is cancelled for weather or a park closure, the remedy is a new time or a refund of that line, as described in the cancellation policy. Medical visits, including a mobile IV, happen only if the licensed clinician agrees they are appropriate.",
              "Los tours y servicios los coordinamos nosotros y los entregan operadores. Su charla de seguridad es obligatoria. Si un día se cancela por clima o por cierre de parque, el remedio es un nuevo horario o el reembolso de esa línea, como dice la política de cancelación. Las visitas médicas, incluido un suero a domicilio, ocurren solo si el clínico con licencia está de acuerdo en que corresponden.",
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
