import { c, type Copy } from "@/lib/copy";

export type Occasion = {
  slug: string;
  title: Copy;
  kicker: Copy;
  summary: Copy;
  intro: Copy;
  photo: string;
  photoAlt: Copy;
  packageSlug: string | null;
  points: Copy[];
  days: { title: Copy; detail: Copy }[];
};

export const occasions: Occasion[] = [
  {
    slug: "bachelor",
    title: c("Bachelor", "Soltero"),
    kicker: c("The weekend, contained", "El fin de semana, contenido"),
    summary: c(
      "A house with a pool, a boat, and a night that ends when the street needs it to.",
      "Una casa con piscina, un bote y una noche que termina cuando la calle lo necesita.",
    ),
    intro: c(
      "Casa Jannat works as a base because the pool is private and the town is walkable when you want it. Celebrations are welcome when they are arranged ahead. Quiet hours still hold, glass stays off the deck, and the guest list overnight matches the reservation.",
      "Casa Jannat sirve de base porque la piscina es privada y el pueblo se camina cuando quieres. Las celebraciones son bienvenidas si se acuerdan antes. Las horas de silencio siguen en pie, el vidrio no va a la terraza y quien duerme coincide con la reserva.",
    ),
    photo: "/images/casa-jannat/pool-day.jpg",
    photoAlt: c(
      "The private pool and garden at Casa Jannat",
      "La piscina privada y el jardín de Casa Jannat",
    ),
    packageSlug: "bachelor-weekend",
    points: [
      c("Arrive together instead of in four taxis.", "Llegar juntos, no en cuatro taxis."),
      c("Eat the first dinner at the house.", "Cenar la primera noche en la casa."),
      c("Put the loud hours on a boat or a timed DJ set.", "Poner las horas ruidosas en un bote o en un set de DJ con hora de cierre."),
    ],
    days: [
      {
        title: c("Day 1 — Land", "Día 1 — Llegar"),
        detail: c("Airport ride, a stocked kitchen, dinner cooked for you.", "Traslado, cocina surtida y cena hecha para ustedes."),
      },
      {
        title: c("Day 2 — Water", "Día 2 — Agua"),
        detail: c("A private boat in the afternoon. The pool after.", "Un bote privado por la tarde. La piscina después."),
      },
      {
        title: c("Day 3 — Night", "Día 3 — Noche"),
        detail: c("Music at the house, ended before quiet hours.", "Música en la casa, terminada antes del silencio."),
      },
      {
        title: c("Day 4 — Out", "Día 4 — Salida"),
        detail: c("A normal van to SJO. Nobody is navigating Route 27.", "Una van normal al SJO. Nadie está adivinando la ruta 27."),
      },
    ],
  },
  {
    slug: "bachelorette",
    title: c("Bachelorette", "Soltera"),
    kicker: c("The house first", "Primero la casa"),
    summary: c(
      "Sunset at the spa, a long lunch, and one planned night — not a schedule that shouts.",
      "Atardecer en el spa, un almuerzo largo y una noche planeada, no un horario que grita.",
    ),
    intro: c(
      "The useful version of this weekend is a beautiful house and two or three things done well: a chef, a boat or a beach morning, and a dinner you do not have to find. Jacó is there when you want the town. It is not required.",
      "La versión útil de este fin de semana es una casa hermosa y dos o tres cosas bien hechas: un chef, un bote o una mañana de playa, y una cena que no hay que buscar. Jacó está ahí cuando quieres el pueblo. No es obligatorio.",
    ),
    photo: "/images/casa-jannat/hero-pool.jpg",
    photoAlt: c(
      "Spa and pool at Casa Jannat under a sunset sky",
      "Spa y piscina de Casa Jannat bajo un cielo de atardecer",
    ),
    packageSlug: null,
    points: [
      c("The spa and pool are private to the house.", "El spa y la piscina son privados de la casa."),
      c("A chef keeps one meal from becoming a project.", "Un chef evita que una comida se vuelva un proyecto."),
      c("Add massages in a bedroom with the air on.", "Suma masajes en una recámara con el aire encendido."),
    ],
    days: [
      {
        title: c("Day 1 — Arrive slow", "Día 1 — Llegar despacio"),
        detail: c("Transfer, groceries, sunset at the pool.", "Traslado, víveres y atardecer en la piscina."),
      },
      {
        title: c("Day 2 — Table", "Día 2 — Mesa"),
        detail: c("A long lunch at the house. Town only if you want it.", "Un almuerzo largo en la casa. El pueblo solo si lo quieren."),
      },
      {
        title: c("Day 3 — Water", "Día 3 — Agua"),
        detail: c("A yacht afternoon or surf in the morning, then nothing.", "Una tarde en yate o surf en la mañana, y luego nada."),
      },
      {
        title: c("Day 4 — Breakfast and the road", "Día 4 — Desayuno y la ruta"),
        detail: c("An easy checkout and a van that already knows the flight.", "Una salida fácil y una van que ya conoce el vuelo."),
      },
    ],
  },
  {
    slug: "weddings",
    title: c("Weddings", "Bodas"),
    kicker: c("A small promise, well fed", "Una promesa pequeña, bien servida"),
    summary: c(
      "Not a ballroom. A house for the people who are actually in the wedding, with dinner cooked on site.",
      "No es un salón. Es una casa para quienes de verdad están en la boda, con la cena cocinada ahí.",
    ),
    intro: c(
      "Casa Jannat fits a rehearsal dinner, a morning-after brunch, or a wedding party that wants the ocean nearby and the guest list small. It is not a licensed event hall. If you need a ceremony site, we help you find one and keep the house as the place everyone returns to.",
      "Casa Jannat cabe para una cena de ensayo, un brunch del día siguiente o una fiesta de boda que quiere el mar cerca y la lista corta. No es un salón con licencia de eventos. Si necesitas un lugar para la ceremonia, te ayudamos a buscarlo y la casa queda como el sitio al que todos regresan.",
    ),
    photo: "/images/casa-jannat/living-kitchen.jpg",
    photoAlt: c(
      "Living room, dining table, and kitchen at Casa Jannat",
      "Sala, comedor y cocina de Casa Jannat",
    ),
    packageSlug: null,
    points: [
      c("The dining table already seats a real dinner.", "La mesa ya da para una cena de verdad."),
      c("A chef and a bartender are easier than a banquet.", "Un chef y un bartender son más fáciles que un banquete."),
      c("Overnight capacity stays at eight. Day guests are a separate conversation.", "A dormir siguen siendo ocho. Los invitados de día son otra conversación."),
    ],
    days: [
      {
        title: c("Welcome", "Bienvenida"),
        detail: c("Transfers in, a stocked kitchen, a quiet swim.", "Traslados, cocina surtida y un nado en calma."),
      },
      {
        title: c("The dinner", "La cena"),
        detail: c("Chef, bartender, and the playlist kept human.", "Chef, bartender y la música a volumen de casa."),
      },
      {
        title: c("The morning after", "La mañana siguiente"),
        detail: c("Breakfast at the house. No one is checking out of a hotel banquet.", "Desayuno en la casa. Nadie está saliendo de un salón de hotel."),
      },
    ],
  },
  {
    slug: "family",
    title: c("Family", "Familia"),
    kicker: c("Room to be bored, nicely", "Espacio para aburrirse, bien"),
    summary: c(
      "Four bedrooms, a pool nobody else is using, and the beach close enough for a before-lunch swim.",
      "Cuatro recámaras, una piscina que no comparte nadie y la playa tan cerca que da para un nado antes del almuerzo.",
    ),
    intro: c(
      "Families use the house as a base and leave it for one big day — Manuel Antonio, Carara, or simply the beach. The sofa bed covers an extra child or a grandparent who would rather not climb to the mezzanine. Groups larger than six should say so when they request the stay, so the beds are set the way you actually sleep.",
      "Las familias usan la casa de base y salen un día grande: Manuel Antonio, Carara o simplemente la playa. El sofá cama cubre un niño más o un abuelo que prefiere no subir al mezzanine. Los grupos de más de seis deberían decirlo al pedir la estadía, para que las camas queden como de verdad duermen.",
    ),
    photo: "/images/casa-jannat/living-kitchen.jpg",
    photoAlt: c(
      "The open kitchen and living room, with the pool visible outside",
      "La cocina abierta y la sala, con la piscina afuera",
    ),
    packageSlug: "family-week",
    points: [
      c("Self check-in, so a late flight does not need a handshake.", "Entrada autónoma, para que un vuelo tarde no necesite un saludo."),
      c("A grocery shop before you land.", "Una compra de súper antes de aterrizar."),
      c("One guided day, and the rest unscheduled.", "Un día guiado y el resto sin agenda."),
    ],
    days: [
      {
        title: c("Days 1–2", "Días 1–2"),
        detail: c("Pool, beach walk, groceries already in the fridge.", "Piscina, caminata a la playa y el súper ya en la refri."),
      },
      {
        title: c("Day 3", "Día 3"),
        detail: c("Manuel Antonio or Carara, home for a normal dinner.", "Manuel Antonio o Carara, y una cena normal en casa."),
      },
      {
        title: c("The rest", "El resto"),
        detail: c("Surf lessons if someone insists. Naps if they do not.", "Clases de surf si alguien insiste. Siestas si no."),
      },
    ],
  },
  {
    slug: "corporate",
    title: c("Corporate", "Empresas"),
    kicker: c("An offsite with a pool, not a ballroom", "Un offsite con piscina, no un salón"),
    summary: c(
      "Eight people, a table, working Wi-Fi, and the kind of day that ends in the water.",
      "Ocho personas, una mesa, Wi-Fi que sirve y un día que termina en el agua.",
    ),
    intro: c(
      "The house is a small offsite: a dining table that can hold laptops in the morning and dinner at night, a quiet street, and experiences you can add without building a separate program. It is not a conference center. If the group is larger than eight overnight, we should talk before you promise anyone a bed.",
      "La casa es un offsite pequeño: una mesa que aguanta laptops en la mañana y la cena en la noche, una calle tranquila y experiencias que se suman sin armar otro programa. No es un centro de convenciones. Si el grupo duerme más de ocho, hay que hablarlo antes de prometer camas.",
    ),
    photo: "/images/casa-jannat/living-kitchen.jpg",
    photoAlt: c(
      "Dining table and living room at Casa Jannat",
      "Comedor y sala de Casa Jannat",
    ),
    packageSlug: null,
    points: [
      c("Wi-Fi and a real table.", "Wi-Fi y una mesa de verdad."),
      c("A chef so the agenda is not 'find lunch'.", "Un chef para que la agenda no sea 'buscar almuerzo'."),
      c("One shared outing — fishing, a boat, or Carara.", "Una salida compartida: pesca, un bote o Carara."),
    ],
    days: [
      {
        title: c("Morning", "Mañana"),
        detail: c("Work at the table. Air conditioning on.", "Trabajo en la mesa. Aire encendido."),
      },
      {
        title: c("Afternoon", "Tarde"),
        detail: c("A planned outing, or the pool and nothing else.", "Una salida planeada, o la piscina y nada más."),
      },
      {
        title: c("Evening", "Noche"),
        detail: c("Dinner at the house. Town is optional.", "Cena en la casa. El pueblo es opcional."),
      },
    ],
  },
  {
    slug: "fishing",
    title: c("Fishing", "Pesca"),
    kicker: c("Sleep near the marina", "Dormir cerca de la marina"),
    summary: c(
      "Los Sueños is a short drive south. The house is where you sleep, eat, and stop smelling like bait.",
      "Los Sueños queda a un trayecto corto al sur. La casa es donde se duerme, se come y se deja de oler a carnada.",
    ),
    intro: c(
      "A fishing trip fails when the lodging is an afterthought. Here the boat day starts with a 6:30 pickup and ends with dinner at home. Shared seats and private charters are both in the catalog. Billfish are released unless you and the captain agree otherwise.",
      "Un viaje de pesca falla cuando el hospedaje es un pendiente. Aquí el día de bote empieza con una recogida a las 6:30 y termina con cena en casa. Hay cupos compartidos y charters privados. Los picudos se liberan, salvo que tú y el capitán acuerden otra cosa.",
    ),
    photo: "/images/casa-jannat/pool-day.jpg",
    photoAlt: c(
      "Pool and palms at Casa Jannat, the base between boat days",
      "Piscina y palmeras en Casa Jannat, la base entre días de bote",
    ),
    packageSlug: "fishing-escape",
    points: [
      c("Marina access without sleeping in a hotel corridor.", "Acceso a la marina sin dormir en un pasillo de hotel."),
      c("A private boat if the group wants the radio to themselves.", "Un bote privado si el grupo quiere la radio para sí."),
      c("Dinner handled on the night you are tired.", "La cena resuelta la noche en que ya están cansados."),
    ],
    days: [
      {
        title: c("Arrival", "Llegada"),
        detail: c("Van from SJO. Early night.", "Van desde el SJO. Noche temprana."),
      },
      {
        title: c("Boat day", "Día de bote"),
        detail: c("Full-day private charter. Chef on the return.", "Charter privado de día completo. Chef al regreso."),
      },
      {
        title: c("Buffer", "Día de margen"),
        detail: c("A second fishing day, or nothing, if the weather took the first.", "Un segundo día de pesca, o nada, si el clima se llevó el primero."),
      },
    ],
  },
];

export function getOccasion(slug: string): Occasion | undefined {
  return occasions.find((item) => item.slug === slug);
}
