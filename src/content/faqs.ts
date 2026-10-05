import { c, type Copy } from "@/lib/copy";
import { rates } from "@/lib/rates";
import { site } from "@/lib/site";

export type Faq = {
  id: string;
  category: Copy;
  question: Copy;
  answer: Copy;
};

const deposit = `${Math.round(rates.depositRate * 100)}%`;

export const faqs: Faq[] = [
  {
    id: "where",
    category: c("The house", "La casa"),
    question: c("Where is Casa Jannat?", "¿Dónde queda Casa Jannat?"),
    answer: c(
      "In Jacó, Puntarenas, Costa Rica — walking distance to the beach and to restaurants. The map on the house page is the neighborhood. The street address and the lockbox code arrive after the stay is confirmed.",
      "En Jacó, Puntarenas, Costa Rica, a una distancia caminable de la playa y de restaurantes. El mapa en la página de la casa es el barrio. La dirección y el código de la caja llegan cuando la estadía está confirmada.",
    ),
  },
  {
    id: "sleep",
    category: c("The house", "La casa"),
    question: c("How many people can sleep here?", "¿Cuántas personas pueden dormir?"),
    answer: c(
      "The public listing sleeps up to 8: a king, three queens, and a sofa bed. Bedrooms 1–3 have their own air conditioning. The mezzanine queen is cooled by the living room. If your group is more than six, say so in the request so we confirm the setup before you pay.",
      "El anuncio público duerme hasta 8: una king, tres queens y un sofá cama. Las recámaras 1 a 3 tienen aire propio. La queen del mezzanine se refresca con la sala. Si el grupo pasa de seis, dilo en la solicitud para confirmar la distribución antes de pagar.",
    ),
  },
  {
    id: "pool",
    category: c("The house", "La casa"),
    question: c("Is the pool private?", "¿La piscina es privada?"),
    answer: c(
      "Yes. The pool and the round spa beside it are for the house, not a shared building. There is also a bathroom by the pool.",
      "Sí. La piscina y el spa circular a su lado son de la casa, no de un edificio compartido. También hay un baño junto a la piscina.",
    ),
  },
  {
    id: "checkin",
    category: c("The house", "La casa"),
    question: c("How do we get in?", "¿Cómo entramos?"),
    answer: c(
      `Self check-in with a lockbox, from ${site.checkIn.slice(0, 2)}:00 in the afternoon. Checkout is ${site.checkOut.slice(0, 2)}:00 in the morning. One car fits behind the electric gate.`,
      `Entrada autónoma con caja de seguridad, desde las ${site.checkIn.slice(0, 2)}:00. La salida es a las ${site.checkOut.slice(0, 2)}:00. Cabe un carro detrás del portón eléctrico.`,
    ),
  },
  {
    id: "book",
    category: c("Booking", "Reservas"),
    question: c("How do I book?", "¿Cómo reservo?"),
    answer: c(
      "Choose dates on the house page, add any experiences, and send the request from your trip. We confirm the nights against the live calendar and then send a way to pay. Nothing is charged on this website until that confirmation. You can also write on WhatsApp or email if a form is the wrong shape for the question.",
      "Elige fechas en la página de la casa, suma experiencias y envía la solicitud desde tu viaje. Confirmamos las noches contra el calendario real y luego mandamos la forma de pago. Este sitio no cobra nada hasta esa confirmación. También puedes escribir por WhatsApp o por correo si la pregunta no cabe en un formulario.",
    ),
  },
  {
    id: "price",
    category: c("Booking", "Reservas"),
    question: c("What is included in the price?", "¿Qué incluye el precio?"),
    answer: c(
      `The nightly rate, a cleaning fee of the amount shown at booking, and 13% IVA on the stay. A refundable security deposit is held separately and is not a fee. Experiences are quoted on their own lines. Code ${rates.promoCode} takes ${Math.round(rates.promoPercent * 100)}% off lodging on stays of ${rates.promoMinNights} nights or more.`,
      `La tarifa por noche, una limpieza por el monto que ves al reservar y el 13% de IVA sobre la estadía. Un depósito de seguridad reembolsable se aparta y no es una tarifa. Las experiencias van en sus propias líneas. El código ${rates.promoCode} quita ${Math.round(rates.promoPercent * 100)}% del hospedaje en estadías de ${rates.promoMinNights} noches o más.`,
    ),
  },
  {
    id: "deposit",
    category: c("Booking", "Reservas"),
    question: c("How much is due now?", "¿Cuánto se paga ahora?"),
    answer: c(
      `To hold dates after we confirm, ${deposit} of the stay and the experiences on the trip. The rest is due ${rates.balanceDaysBefore} days before arrival. You can also pay in full. The security deposit is a hold, not part of that percentage.`,
      `Para apartar las fechas después de confirmar, ${deposit} de la estadía y de las experiencias del viaje. El resto se paga ${rates.balanceDaysBefore} días antes de llegar. También puedes pagar todo. El depósito de seguridad es una retención, no entra en ese porcentaje.`,
    ),
  },
  {
    id: "direct",
    category: c("Booking", "Reservas"),
    question: c("Why book here instead of Airbnb?", "¿Por qué reservar aquí y no en Airbnb?"),
    answer: c(
      "The rate on this site is the direct rate, and the experiences sit on the same plan as the house. The Airbnb listing remains there — 4.9 from 49 reviews — and you are welcome to read it. The stay itself, if you want the chef and the boat on one itinerary, is simpler here.",
      "La tarifa de este sitio es la tarifa directa, y las experiencias quedan en el mismo plan que la casa. El anuncio de Airbnb sigue ahí — 4.9 de 49 reseñas — y puedes leerlo. La estadía, si quieres el chef y el bote en un solo itinerario, es más simple aquí.",
    ),
  },
  {
    id: "experiences",
    category: c("Experiences", "Experiencias"),
    question: c("Can I add a chef or a fishing day later?", "¿Puedo agregar un chef o un día de pesca después?"),
    answer: c(
      "Yes. Add them to the trip before you send it, or write once the house is confirmed. Prices in the catalog are the prices we quote — the same numbers on the card and in the breakdown.",
      "Sí. Agrégalos al viaje antes de enviarlo, o escribe cuando la casa ya esté confirmada. Los precios del catálogo son los que cotizamos: los mismos en la ficha y en el desglose.",
    ),
  },
  {
    id: "weather",
    category: c("Experiences", "Experiencias"),
    question: c("What if the ocean is closed?", "¿Qué pasa si el mar está cerrado?"),
    answer: c(
      "Fishing, boats, and other weather-dependent days are moved or refunded when the operator cancels. You do not pay twice to try again the next morning.",
      "La pesca, los botes y los días que dependen del clima se mueven o se reembolsan cuando el operador cancela. No pagas dos veces para intentar a la mañana siguiente.",
    ),
  },
  {
    id: "cancel",
    category: c("Policies", "Políticas"),
    question: c("What is the cancellation policy?", "¿Cuál es la política de cancelación?"),
    answer: c(
      "The stay can be cancelled free of charge until 14 days before check-in. Inside 14 days, half of the lodging total is due. Inside 48 hours, the stay is non-refundable. Experiences can be moved or refunded until 72 hours before they start. The full text is on the cancellation page.",
      "La estadía se puede cancelar sin cargo hasta 14 días antes de la entrada. Dentro de los 14 días, se debe la mitad del total del hospedaje. Dentro de las 48 horas, la estadía no es reembolsable. Las experiencias se pueden mover o reembolsar hasta 72 horas antes de empezar. El texto completo está en la página de cancelación.",
    ),
  },
  {
    id: "party",
    category: c("Policies", "Políticas"),
    question: c("Can we have a party?", "¿Podemos hacer una fiesta?"),
    answer: c(
      "A gathering can be arranged — tell us before you book, not the night of. Overnight guests stay within the reservation. Quiet hours run from 10:00 p.m. to 8:00 a.m. No glass at the pool. A DJ, if you add one, ends with those hours.",
      "Se puede armar una reunión: dínoslo antes de reservar, no la misma noche. Quien duerme se queda dentro de la reserva. El silencio va de las 10:00 p.m. a las 8:00 a.m. Sin vidrio en la piscina. Un DJ, si lo agregas, termina con esas horas.",
    ),
  },
];

export const faqCategories = Array.from(new Set(faqs.map((faq) => faq.category.en))).map((en) => {
  const match = faqs.find((faq) => faq.category.en === en);
  return match?.category ?? c(en, en);
});
