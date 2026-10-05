import { c, type Copy } from "@/lib/copy";

export type PostBlock =
  | { type: "p"; text: Copy }
  | { type: "h2"; text: Copy }
  | { type: "ul"; items: Copy[] };

export type Post = {
  slug: string;
  title: Copy;
  description: Copy;
  date: string;
  tags: Copy[];
  blocks: PostBlock[];
};

export const posts: Post[] = [
  {
    slug: "things-to-do-in-jaco",
    title: c("Things to do in Jacó, from a house that walks to the beach", "Qué hacer en Jacó, desde una casa que camina a la playa"),
    description: c(
      "The beach, the morning for macaws, a heavier wave just south, and the nights that are optional.",
      "La playa, la mañana de las lapas, una ola más pesada justo al sur y las noches que son opcionales.",
    ),
    date: "2026-10-04",
    tags: [c("Jacó", "Jacó"), c("Planning", "Planeación")],
    blocks: [
      {
        type: "p",
        text: c(
          "Jacó is a beach town that fits in a walk. That is the point of staying at Casa Jannat: the pool is private, and the Pacific, a soda, and a grocery run are not a drive. You do not need a packed itinerary. You need one or two days that leave the house, and the rest can be unstructured.",
          "Jacó es un pueblo de playa que cabe en una caminata. Por eso tiene sentido quedarse en Casa Jannat: la piscina es privada, y el Pacífico, una soda y el súper no son un traslado. No hace falta un itinerario lleno. Hacen falta uno o dos días fuera de la casa; el resto puede quedar suelto.",
        ),
      },
      {
        type: "h2",
        text: c("The beach, and the beach next door", "La playa, y la playa de al lado"),
      },
      {
        type: "p",
        text: c(
          "Jacó's own break is a reasonable place to learn. Lessons in the morning are kinder than the afternoon wind. Playa Hermosa, just south, is a different wave — heavier, and a poor idea for a first lesson. Herradura and the marina sit a little further south if the plan is a boat rather than a board.",
          "La ola de Jacó es un lugar razonable para aprender. Las clases de la mañana son más amables que el viento de la tarde. Playa Hermosa, justo al sur, es otra ola: más pesada, y una mala idea para una primera clase. Herradura y la marina quedan un poco más al sur si el plan es un bote y no una tabla.",
        ),
      },
      {
        type: "h2",
        text: c("A wild morning that still gets you home for lunch", "Una mañana de naturaleza que igual te deja en casa para almorzar"),
      },
      {
        type: "p",
        text: c(
          "Carara National Park is north of town, where dry forest meets rainforest. Go early if you care about scarlet macaws. It is the easiest wild day from this house. The Tárcoles river, famous for large crocodiles and better than its reputation for birds, is the same direction if you would rather sit in a boat than walk.",
          "El Parque Nacional Carara queda al norte del pueblo, donde el bosque seco se encuentra con el lluvioso. Ve temprano si te importan las lapas rojas. Es el día de naturaleza más fácil desde esta casa. El río Tárcoles, famoso por cocodrilos grandes y mejor de lo que dice su fama para las aves, va en la misma dirección si prefieres sentarte en un bote que caminar.",
        ),
      },
      {
        type: "h2",
        text: c("The day you give away", "El día que sí entregas"),
      },
      {
        type: "p",
        text: c(
          "Manuel Antonio is about an hour and a quarter south and deserves the whole date: the park limits visitors, the beach inside is the reward, and the road back is happier if you are not rushing a dinner reservation. Book it before you fly in the busy months.",
          "Manuel Antonio queda como a una hora y cuarto al sur y merece la fecha completa: el parque limita visitantes, la playa de adentro es el premio, y el regreso es más feliz si no vas corriendo a una reserva de cena. Resérvalo antes de volar en los meses ocupados.",
        ),
      },
      {
        type: "h2",
        text: c("Night", "La noche"),
      },
      {
        type: "p",
        text: c(
          "The town has music, bars, and restaurants within a short ride, and often within a walk. It is also fine to eat at the house. A private chef is the version of Jacó nightlife we recommend when the group is eight people who like each other and do not want to split the check four ways.",
          "El pueblo tiene música, bares y restaurantes a un trayecto corto, y a menudo a pie. También está bien cenar en la casa. Un chef privado es la versión de la noche en Jacó que recomendamos cuando el grupo son ocho personas que se caen bien y no quieren dividir la cuenta en cuatro.",
        ),
      },
    ],
  },
  {
    slug: "plan-a-bachelor-party-in-costa-rica",
    title: c("How to plan a bachelor party in Jacó without losing the house", "Cómo planear una despedida de soltero en Jacó sin perder la casa"),
    description: c(
      "A pool, a boat, one loud arrival, and a night that ends. The version that still gets the deposit back.",
      "Una piscina, un bote, una llegada ruidosa y una noche que termina. La versión que igual devuelve el depósito.",
    ),
    date: "2026-09-12",
    tags: [c("Celebrations", "Celebraciones"), c("Planning", "Planeación")],
    blocks: [
      {
        type: "p",
        text: c(
          "A good Jacó weekend is not twelve activities. It is a private pool, one ocean day, and a night with an ending. Casa Jannat can hold that, including a celebration, when it is arranged before you arrive. The house is still a house on a street. Quiet hours apply. Glass does not go in the pool. The people who sleep here are the people on the reservation.",
          "Un buen fin de semana en Jacó no son doce actividades. Es una piscina privada, un día de mar y una noche con final. Casa Jannat puede con eso, celebración incluida, si se acuerda antes de llegar. La casa sigue siendo una casa en una calle. Hay horas de silencio. El vidrio no entra a la piscina. Quien duerme aquí es quien está en la reserva.",
        ),
      },
      {
        type: "h2",
        text: c("Put the noise where it belongs", "Pon el ruido donde corresponde"),
      },
      {
        type: "ul",
        items: [
          c("A party bus for the airport, not for 2 a.m. laps of the neighborhood.", "Un bus de fiesta para el aeropuerto, no para vueltas al barrio a las 2 a.m."),
          c("A private boat in the afternoon, when the group still has energy and the street does not have to hear it.", "Un bote privado por la tarde, cuando el grupo todavía tiene energía y la calle no tiene que oírlo."),
          c("A DJ at the house for a set number of hours, packed down before quiet time.", "Un DJ en la casa por un número fijo de horas, recogido antes del silencio."),
          c("Dinner cooked at home the first night, so nobody is negotiating a restaurant for eight.", "Cena cocinada en casa la primera noche, para que nadie esté negociando un restaurante para ocho."),
        ],
      },
      {
        type: "h2",
        text: c("Book the house and the days together", "Reserva la casa y los días juntos"),
      },
      {
        type: "p",
        text: c(
          "The failure mode is a villa from one site and a boat from a cousin's screenshot. When the house, the transfer, the chef, and the charter live on one plan, a rain delay is a phone call instead of four. Ask for the bachelor weekend package, or build the same shape in the trip planner and change the pieces.",
          "El fallo es una villa de un sitio y un bote de la captura de un primo. Cuando la casa, el traslado, el chef y el charter viven en un solo plan, un retraso por lluvia es una llamada y no cuatro. Pide el paquete de fin de semana, o arma la misma forma en el planificador y cambia las piezas.",
        ),
      },
      {
        type: "p",
        text: c(
          "Tell us the real guest count. Eight is the overnight maximum. If the group is six, say six — the beds and the chef both get better. If someone is thinking of inviting the bar back to the house, that is a conversation before the deposit, not a surprise at midnight.",
          "Dinos el número real. Ocho es el máximo para dormir. Si el grupo es de seis, di seis: las camas y el chef salen mejor. Si alguien piensa invitar el bar de regreso a la casa, esa conversación es antes del depósito, no una sorpresa a medianoche.",
        ),
      },
    ],
  },
  {
    slug: "sjo-to-jaco",
    title: c("Getting from SJO to Jacó", "Cómo llegar del SJO a Jacó"),
    description: c(
      "About an hour and a half when Route 27 is kind, and longer when it is not. What to book, and what to skip.",
      "Como hora y media cuando la ruta 27 está amable, y más cuando no. Qué reservar y qué saltarse.",
    ),
    date: "2026-08-20",
    tags: [c("Arrival", "Llegada")],
    blocks: [
      {
        type: "p",
        text: c(
          "Fly into Juan Santamaría (SJO), outside San José. Liberia is the other international airport and it is the wrong direction for Jacó. From SJO, the usual line is the toll highway, Route 27, toward the Pacific, then the coastal road south into town.",
          "Vuela al Juan Santamaría (SJO), a las afueras de San José. Liberia es el otro aeropuerto internacional y queda en la dirección equivocada para Jacó. Desde el SJO, la vía usual es la autopista de peaje, la ruta 27, hacia el Pacífico, y luego la costanera al sur hasta el pueblo.",
        ),
      },
      {
        type: "h2",
        text: c("How long it actually takes", "Cuánto tarda de verdad"),
      },
      {
        type: "p",
        text: c(
          "About an hour and a half is a fair planning number when the road is moving. Friday afternoons, Sunday returns, and holiday weekends are not that number. If your flight lands after 4 p.m. on a Friday in high season, tell the driver the truth and do not book a 6 p.m. dinner in town.",
          "Hora y media es un número justo para planear cuando la vía se mueve. Los viernes por la tarde, los regresos del domingo y los feriados no son ese número. Si tu vuelo aterriza después de las 4 p.m. un viernes de temporada alta, dile la verdad al conductor y no reserves una cena a las 6 en el pueblo.",
        ),
      },
      {
        type: "h2",
        text: c("What we would book", "Lo que nosotros reservaríamos"),
      },
      {
        type: "ul",
        items: [
          c("A private van for a family or a group with boards and bags. Sedan if you are two with carry-ons.", "Una van privada para una familia o un grupo con tablas y maletas. Sedán si son dos con equipaje de mano."),
          c("The flight number, so a late plane is the driver's problem.", "El número de vuelo, para que un avión tarde sea problema del conductor."),
          c("A party bus only if the arrival itself is the event. It is a worse idea at midnight than at 2 p.m.", "Un bus de fiesta solo si la llegada es el evento. Es peor idea a medianoche que a las 2 p.m."),
          c("A public bus if you are traveling light and unhurried. With eight people and a week's luggage, it is the expensive way to save money.", "Un bus público si viajas ligero y sin prisa. Con ocho personas y el equipaje de una semana, es la forma cara de ahorrar."),
        ],
      },
      {
        type: "p",
        text: c(
          "Rental cars work if someone in the group likes driving in the rain and reading toll lanes. You do not need one to enjoy the house. Town is walkable, and the days that leave Jacó can include their own transport.",
          "El carro de alquiler funciona si a alguien del grupo le gusta manejar bajo lluvia y leer los carriles de peaje. No lo necesitas para disfrutar la casa. El pueblo se camina, y los días que salen de Jacó pueden incluir su propio transporte.",
        ),
      },
      {
        type: "h2",
        text: c("The last ten minutes", "Los últimos diez minutos"),
      },
      {
        type: "p",
        text: c(
          "Check-in is a lockbox, from 3:00 p.m. The driver can wait through the explanation if you arrive after that. There is one parking space behind an electric gate — useful if you did rent a car, and not a second space if you also asked for a golf cart. Tell us which one you are bringing.",
          "La entrada es con caja de seguridad, desde las 3:00 p.m. El conductor puede esperar la explicación si llegas después. Hay un espacio de parqueo detrás de un portón eléctrico: útil si alquilaste carro, y no es un segundo espacio si también pediste un carrito de golf. Dinos cuál vas a traer.",
        ),
      },
    ],
  },
  {
    slug: "pacific-fishing-calendar",
    title: c("When to fish the Pacific from Jacó", "Cuándo pescar el Pacífico desde Jacó"),
    description: c(
      "Sailfish, marlin, dorado, and the honest version of a season. The marina is twenty-odd minutes south.",
      "Pez vela, marlín, dorado y la versión honesta de una temporada. La marina queda a poco más de veinte minutos al sur.",
    ),
    date: "2026-07-08",
    tags: [c("Fishing", "Pesca"), c("Seasons", "Temporadas")],
    blocks: [
      {
        type: "p",
        text: c(
          "Los Sueños Marina, in Herradura, is the fleet you want from Casa Jannat. It is usually under half an hour by car. You can fish other months from other docks; this is the practical one.",
          "La Marina Los Sueños, en Herradura, es la flota que conviene desde Casa Jannat. Por lo general queda a menos de media hora en carro. Se puede pescar otros meses desde otros muelles; este es el práctico.",
        ),
      },
      {
        type: "h2",
        text: c("A season, not a promise", "Una temporada, no una promesa"),
      },
      {
        type: "p",
        text: c(
          "Sailfish are the headline on this coast and are caught year-round, with the stronger months often running from about December into April. Blue and black marlin show in that same broader offshore season, some years better than others. Dorado (mahi) tends to like the warmer months. Yellowfin and roosters are part of the conversation inshore and offshore depending on the week. None of this is a booking guarantee. The captain's report that week beats a calendar written in July.",
          "El pez vela es el titular de esta costa y se pesca todo el año, con los meses más fuertes a menudo de diciembre a abril. El marlín azul y el negro aparecen en esa misma temporada de altamar, unos años mejor que otros. El dorado suele preferir los meses más cálidos. El atún aleta amarilla y el pez gallo entran en la conversación, cerca o lejos de la costa, según la semana. Nada de esto es una garantía de reserva. El reporte del capitán esa semana le gana a un calendario escrito en julio.",
        ),
      },
      {
        type: "h2",
        text: c("Shared seat or the whole boat", "Cupo compartido o el bote entero"),
      },
      {
        type: "p",
        text: c(
          "A shared half day is the right first look if only one or two of you are serious. A private charter is the right look if the group wants to decide when to stop, what to target, and whether the radio plays. Full days leave the dock early. Book the massage and the chef for the return, not for 7 a.m.",
          "Un medio día compartido es la primera mirada correcta si solo uno o dos van en serio. Un charter privado es la mirada correcta si el grupo quiere decidir cuándo parar, a qué ir y si suena la radio. Los días completos salen temprano del muelle. Reserva el masaje y el chef para el regreso, no para las 7 a.m.",
        ),
      },
      {
        type: "ul",
        items: [
          c("Billfish are released unless you and the captain have a real reason not to.", "Los picudos se liberan, salvo que tú y el capitán tengan una razón de verdad para no hacerlo."),
          c("If you get seasick, bring the medicine that works for you and take it before the marina.", "Si te mareas, lleva la medicina que te funciona y tómala antes de la marina."),
          c("A weather cancellation should move or refund the day. That is the policy on fishing in this catalog.", "Una cancelación por clima debe mover o reembolsar el día. Esa es la política de pesca en este catálogo."),
        ],
      },
      {
        type: "p",
        text: c(
          "Stay at the house, not in a corridor at the marina. You will want a shower that is yours and a dinner that does not require a clean shirt you do not have.",
          "Quédate en la casa, no en un pasillo de la marina. Vas a querer una ducha que sea tuya y una cena que no exija una camisa limpia que no tienes.",
        ),
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}
