import { c, type Copy } from "@/lib/copy";
import { site } from "@/lib/site";

export type Faq = {
  id: string;
  category: Copy;
  question: Copy;
  answer: Copy;
};

export const faqs: Faq[] = [
  {
    id: "where",
    category: c("The house", "La casa"),
    question: c("Where is Casa Jannat?", "¿Dónde queda Casa Jannat?"),
    answer: c(
      "In Jacó, Puntarenas, Costa Rica — walking distance to the beach and to restaurants. The map on the house page is the neighborhood. The street address and the lockbox code arrive after the stay is confirmed on Airbnb.",
      "En Jacó, Puntarenas, Costa Rica, a una distancia caminable de la playa y de restaurantes. El mapa en la página de la casa es el barrio. La dirección y el código de la caja llegan cuando la estadía está confirmada en Airbnb.",
    ),
  },
  {
    id: "sleep",
    category: c("The house", "La casa"),
    question: c("How many people can sleep here?", "¿Cuántas personas pueden dormir?"),
    answer: c(
      "The listing sleeps up to 8: a king, three queens, and a sofa bed. Bedrooms 1–3 have their own air conditioning. The mezzanine queen is cooled by the living room. If your group is more than six, confirm the setup with the host before you book.",
      "El anuncio duerme hasta 8: una king, tres queens y un sofá cama. Las recámaras 1 a 3 tienen aire propio. La queen del mezzanine se refresca con la sala. Si el grupo pasa de seis, confirma la distribución con el anfitrión antes de reservar.",
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
      "Book Casa Jannat on Airbnb — that is where live dates, rates, and payment live today. Direct booking on this website is coming soon. For questions that do not fit Airbnb messaging, write by email or WhatsApp when those contacts are listed.",
      "Reserva Casa Jannat en Airbnb: ahí están las fechas, tarifas y el pago por ahora. La reserva directa en este sitio llega pronto. Para preguntas que no caben en Airbnb, escribe por correo o WhatsApp cuando esos contactos estén publicados.",
    ),
  },
  {
    id: "price",
    category: c("Booking", "Reservas"),
    question: c("Where do I see the price?", "¿Dónde veo el precio?"),
    answer: c(
      "Live nightly rates, cleaning fees, and taxes are shown on the Airbnb listing for the dates you choose. This site does not quote or charge stays.",
      "Las tarifas por noche, limpieza e impuestos se muestran en el anuncio de Airbnb para las fechas que elijas. Este sitio no cotiza ni cobra estadías.",
    ),
  },
  {
    id: "direct",
    category: c("Booking", "Reservas"),
    question: c("Will I be able to book here later?", "¿Podré reservar aquí después?"),
    answer: c(
      "Yes — direct booking is planned. Until then, Airbnb is the way to reserve the house. The listing has public reviews (4.9 from 49 stays) if you want to read guest notes.",
      "Sí: la reserva directa está planeada. Hasta entonces, Airbnb es la forma de reservar la casa. El anuncio tiene reseñas públicas (4.9 de 49 estadías) si quieres leer notas de huéspedes.",
    ),
  },
  {
    id: "experiences",
    category: c("Experiences", "Experiencias"),
    question: c("Can I add a chef or a fishing day?", "¿Puedo agregar un chef o un día de pesca?"),
    answer: c(
      "The experiences pages are ideas only — not a cart. After you book the house on Airbnb, write to the host or a local operator to arrange chef, boat, transfer, or tours.",
      "Las páginas de experiencias son ideas, no un carrito. Después de reservar la casa en Airbnb, escribe al anfitrión o a un operador local para coordinar chef, bote, traslado o tours.",
    ),
  },
  {
    id: "weather",
    category: c("Experiences", "Experiencias"),
    question: c("What if the ocean is closed?", "¿Qué pasa si el mar está cerrado?"),
    answer: c(
      "Fishing, boats, and other weather-dependent days are usually moved or refunded when the operator cancels. Confirm the policy with whoever you arrange the day with.",
      "La pesca, los botes y los días que dependen del clima suelen moverse o reembolsarse cuando el operador cancela. Confirma la política con quien organices el día.",
    ),
  },
  {
    id: "cancel",
    category: c("Policies", "Políticas"),
    question: c("What is the cancellation policy?", "¿Cuál es la política de cancelación?"),
    answer: c(
      "Cancellation for the house follows the Airbnb listing for your booking. House rules on this site (quiet hours, no glass at the pool) still apply to the stay. See the cancellation and house-rules pages for more detail.",
      "La cancelación de la casa sigue el anuncio de Airbnb de tu reserva. Las reglas de la casa en este sitio (silencio, sin vidrio en la piscina) siguen aplicando. Ver las páginas de cancelación y reglas para más detalle.",
    ),
  },
  {
    id: "party",
    category: c("Policies", "Políticas"),
    question: c("Can we have a party?", "¿Podemos hacer una fiesta?"),
    answer: c(
      "A gathering can be arranged — tell the host before you book, not the night of. Overnight guests stay within the reservation. Quiet hours run from 10:00 p.m. to 8:00 a.m. No glass at the pool.",
      "Se puede armar una reunión: dímelo al anfitrión antes de reservar, no la misma noche. Quien duerme se queda dentro de la reserva. El silencio va de las 10:00 p.m. a las 8:00 a.m. Sin vidrio en la piscina.",
    ),
  },
];

export const faqCategories = Array.from(new Set(faqs.map((faq) => faq.category.en))).map((en) => {
  const match = faqs.find((faq) => faq.category.en === en);
  return match?.category ?? c(en, en);
});
