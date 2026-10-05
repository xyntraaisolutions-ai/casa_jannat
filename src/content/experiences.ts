import { c, type Copy } from "@/lib/copy";

export type ExpCategory =
  | "kitchen"
  | "nightlife"
  | "arrival"
  | "wellness"
  | "house"
  | "ocean"
  | "jungle"
  | "parks"
  | "air"
  | "town";

export type ExpOption = {
  id: string;
  label: Copy;
  groupMin: number;
  groupMax: number;
  price: number;
  basis: "group" | "person";
};

export type Experience = {
  slug: string;
  title: Copy;
  type: "service" | "tour";
  category: ExpCategory;
  summary: Copy;
  description: Copy;
  duration: Copy;
  pickupIncluded: boolean;
  meeting: Copy;
  featured?: boolean;
  options: ExpOption[];
  timeSlots: string[];
  includes: Copy[];
  excludes: Copy[];
  bring: Copy[];
  itinerary: { time: string; step: Copy }[];
  policy: "standard" | "weather" | "active";
  pairsWith: string[];
};

const opt = (
  id: string,
  en: string,
  es: string,
  groupMin: number,
  groupMax: number,
  price: number,
  basis: "group" | "person" = "group",
): ExpOption => ({ id, label: c(en, es), groupMin, groupMax, price, basis });

export const categoryLabel: Record<ExpCategory, Copy> = {
  kitchen: c("At the table", "En la mesa"),
  nightlife: c("After dark", "De noche"),
  arrival: c("Arrival", "Llegada"),
  wellness: c("Wellness", "Bienestar"),
  house: c("The house", "La casa"),
  ocean: c("Ocean", "Mar"),
  jungle: c("Hills and rivers", "Cerros y ríos"),
  parks: c("Parks", "Parques"),
  air: c("From the air", "Desde el aire"),
  town: c("In town", "En el pueblo"),
};

export const experiences: Experience[] = [
  {
    slug: "private-chef",
    title: c("Private chef", "Chef privado"),
    type: "service",
    category: "kitchen",
    featured: true,
    summary: c(
      "A cook at your table — breakfast, a long lunch, dinner, or the whole day.",
      "Alguien cocina en tu mesa: desayuno, un almuerzo largo, cena o el día completo.",
    ),
    description: c(
      "The chef comes to Casa Jannat, cooks with the kitchen you already have, and serves where you are sitting. Tell us how you eat and we shape the menu before you land. Groceries are separate, on the receipt, so the food can actually be yours.",
      "El chef llega a Casa Jannat, cocina en la cocina de la casa y sirve donde ya estás sentado. Cuéntanos cómo comes y armamos el menú antes de que aterrices. Los víveres van aparte, con la factura, para que la comida sea la tuya.",
    ),
    duration: c("One meal, or a full day", "Una comida, o el día completo"),
    pickupIncluded: false,
    meeting: c("The chef comes to the house.", "El chef llega a la casa."),
    options: [
      opt("bk-s", "Breakfast, 1–4 guests", "Desayuno, 1–4 huéspedes", 1, 4, 180),
      opt("bk-l", "Breakfast, 5–8 guests", "Desayuno, 5–8 huéspedes", 5, 8, 280),
      opt("lu-s", "Lunch, 1–4 guests", "Almuerzo, 1–4 huéspedes", 1, 4, 240),
      opt("lu-l", "Lunch, 5–8 guests", "Almuerzo, 5–8 huéspedes", 5, 8, 360),
      opt("di-s", "Dinner, 1–4 guests", "Cena, 1–4 huéspedes", 1, 4, 320),
      opt("di-l", "Dinner, 5–8 guests", "Cena, 5–8 huéspedes", 5, 8, 480),
      opt("day-s", "Full day, 1–4 guests", "Día completo, 1–4 huéspedes", 1, 4, 640),
      opt("day-l", "Full day, 5–8 guests", "Día completo, 5–8 huéspedes", 5, 8, 920),
    ],
    timeSlots: ["08:00", "12:00", "16:00", "18:30"],
    includes: [
      c("The chef, the cooking, and service", "El chef, la cocina y el servicio"),
      c("A menu agreed before arrival", "Un menú acordado antes de llegar"),
      c("Cleanup of the cooking", "Limpieza de lo cocinado"),
    ],
    excludes: [
      c("Groceries, at cost", "Víveres, al costo"),
      c("A tip, if you want to leave one", "Propina, si quieres dejarla"),
    ],
    bring: [c("Dietary notes when you book", "Notas de alimentación al reservar")],
    itinerary: [
      { time: "Before", step: c("We confirm the menu and the shop.", "Confirmamos el menú y la compra.") },
      { time: "Service", step: c("Cooking happens in the house kitchen.", "Se cocina en la cocina de la casa.") },
      { time: "After", step: c("The kitchen is left in order.", "La cocina queda en orden.") },
    ],
    policy: "standard",
    pairsWith: ["grocery-prestock", "bartender"],
  },
  {
    slug: "bartender",
    title: c("Bartender", "Bartender"),
    type: "service",
    category: "nightlife",
    summary: c(
      "Someone who knows the bar, for a dinner or a pool afternoon.",
      "Alguien que sabe la barra, para una cena o una tarde de piscina.",
    ),
    description: c(
      "A bartender sets up at the house for four hours. Spirits and mixers are quoted with your list, not buried in the fee. Glass stays off the pool deck.",
      "Un bartender se instala en la casa por cuatro horas. Licores y mezclas se cotizan con tu lista, no escondidos en la tarifa. El vidrio no va a la orilla de la piscina.",
    ),
    duration: c("4 hours", "4 horas"),
    pickupIncluded: false,
    meeting: c("They come to the house.", "Llegan a la casa."),
    options: [
      opt("bar-4", "Four hours, up to 8 guests", "Cuatro horas, hasta 8 huéspedes", 1, 8, 280),
      opt("bar-8", "Eight hours, up to 12 guests", "Ocho horas, hasta 12 huéspedes", 1, 12, 480),
    ],
    timeSlots: ["12:00", "16:00", "18:00"],
    includes: [c("Bartender and basic bar tools", "Bartender y herramientas básicas de barra"), c("A short menu of drinks", "Un menú corto de tragos")],
    excludes: [c("Alcohol and mixers", "Alcohol y mezclas"), c("Glassware you ask us to rent", "Cristalería que pidas rentar")],
    bring: [c("A drink list, if you have one", "Una lista de tragos, si la tienes")],
    itinerary: [
      { time: "Set", step: c("The bar is staged away from the pool edge.", "La barra se arma lejos del borde de la piscina.") },
      { time: "Service", step: c("Drinks for the hours you booked.", "Tragos durante las horas reservadas.") },
    ],
    policy: "standard",
    pairsWith: ["dj", "private-chef"],
  },
  {
    slug: "dj",
    title: c("DJ", "DJ"),
    type: "service",
    category: "nightlife",
    featured: true,
    summary: c(
      "Music at the house, sized for a villa and finished before quiet hours.",
      "Música en la casa, a escala de villa y terminada antes del silencio.",
    ),
    description: c(
      "A DJ brings a compact setup for the patio or the living room. The night is a house party, not a club: sound stays neighborly, and the set ends when the house rules say it does.",
      "Un DJ trae un equipo compacto para el patio o la sala. La noche es de casa, no de club: el volumen se queda amable con los vecinos y el set termina cuando lo dicen las reglas.",
    ),
    duration: c("4 hours", "4 horas"),
    pickupIncluded: false,
    meeting: c("The DJ comes to the house.", "El DJ llega a la casa."),
    options: [
      opt("dj-4", "Four-hour set", "Set de cuatro horas", 1, 20, 450),
      opt("dj-6", "Six-hour set", "Set de seis horas", 1, 20, 620),
    ],
    timeSlots: ["16:00", "18:00", "19:00"],
    includes: [c("DJ and a compact sound system", "DJ y un equipo de sonido compacto"), c("A playlist planned with you", "Una lista armada contigo")],
    excludes: [c("Extra lighting rigs", "Iluminación extra"), c("Hours past quiet time", "Horas después del silencio")],
    bring: [c("Songs you actually want", "Canciones que de verdad quieres")],
    itinerary: [
      { time: "Sound check", step: c("Levels are set for a house, not a street.", "El volumen se ajusta para una casa, no para la calle.") },
      { time: "Set", step: c("Music through the hours you booked.", "Música durante las horas reservadas.") },
      { time: "End", step: c("Packed down before quiet hours.", "Todo recogido antes de las horas de silencio.") },
    ],
    policy: "standard",
    pairsWith: ["bartender", "pool-party"],
  },
  {
    slug: "pool-party",
    title: c("Pool gathering", "Reunión en la piscina"),
    type: "service",
    category: "nightlife",
    summary: c(
      "The house dressed for a gathering: ice, timing, and the pool rules held.",
      "La casa lista para una reunión: hielo, tiempos y las reglas de la piscina en pie.",
    ),
    description: c(
      "We prepare Casa Jannat for people coming over — seating, ice, a run of house details — and stay available if the plan needs a hand. Add a bartender or a DJ if you want them. Glass does not go in the pool, and the evening still ends on time.",
      "Preparamos Casa Jannat para quien venga: asientos, hielo y los detalles de la casa, y seguimos disponibles si el plan pide una mano. Suma bartender o DJ si los quieres. El vidrio no entra a la piscina y la noche igual termina a tiempo.",
    ),
    duration: c("An afternoon into the evening", "De la tarde a la noche"),
    pickupIncluded: false,
    meeting: c("Everything happens at the house.", "Todo ocurre en la casa."),
    options: [opt("pool-day", "Gathering setup, up to 15 people", "Montaje, hasta 15 personas", 1, 15, 350)],
    timeSlots: ["12:00", "14:00", "16:00"],
    includes: [c("Setup and ice", "Montaje y hielo"), c("A host check during the event", "Una pasada del anfitrión durante el evento")],
    excludes: [c("Food, bar, and music — add those separately", "Comida, barra y música: se agregan aparte"), c("Guest count above the house maximum overnight", "Más personas de las que la casa duerme, si se quedan a dormir")],
    bring: [c("A guest list so we know who is expected", "Una lista para saber a quién esperar")],
    itinerary: [
      { time: "Before", step: c("The pool deck is set without glassware.", "La terraza queda lista, sin cristalería.") },
      { time: "During", step: c("We are reachable if something needs a fix.", "Estamos localizables si algo pide arreglo.") },
    ],
    policy: "standard",
    pairsWith: ["bartender", "dj"],
  },
  {
    slug: "airport-transfer",
    title: c("Airport transfer", "Traslado de aeropuerto"),
    type: "service",
    category: "arrival",
    featured: true,
    summary: c(
      "A private car from SJO to the gate, with your flight watched.",
      "Un carro privado del SJO al portón, con el vuelo vigilado.",
    ),
    description: c(
      "Juan Santamaría to Jacó is about an hour and a half when the road is kind, and longer on a Friday afternoon. A driver meets you in the arrivals hall, helps with bags, and brings you to the electric gate. Send the flight number and we adjust if the plane is late.",
      "Del Juan Santamaría a Jacó es como hora y media cuando la ruta está amable, y más un viernes por la tarde. Un conductor te encuentra en llegadas, ayuda con las maletas y te deja en el portón eléctrico. Mándanos el número de vuelo y ajustamos si el avión se atrasa.",
    ),
    duration: c("About 1.5–2.5 hours on the road", "Unas 1.5–2.5 horas de camino"),
    pickupIncluded: true,
    meeting: c("Arrivals hall at SJO, or the house for the return.", "Sala de llegadas del SJO, o la casa para el regreso."),
    options: [
      opt("sedan", "Private sedan, 1–3 guests, one way", "Sedán privado, 1–3, solo ida", 1, 3, 165),
      opt("van", "Private van, 1–8 guests, one way", "Van privada, 1–8, solo ida", 1, 8, 210),
      opt("van-rt", "Private van, round trip", "Van privada, ida y vuelta", 1, 8, 390),
    ],
    timeSlots: ["06:00", "09:00", "12:00", "15:00", "18:00", "21:00"],
    includes: [c("Private vehicle and driver", "Vehículo privado y conductor"), c("Flight tracking on arrival day", "Seguimiento del vuelo el día de llegada"), c("Bottled water", "Agua embotellada")],
    excludes: [c("Flights", "Vuelos"), c("Stops longer than a few minutes", "Paradas de más de unos minutos")],
    bring: [c("Flight number", "Número de vuelo"), c("WhatsApp that works on landing", "Un WhatsApp que funcione al aterrizar")],
    itinerary: [
      { time: "Land", step: c("The driver meets you with a sign.", "El conductor te encuentra con un letrero.") },
      { time: "Route 27", step: c("Toll highway toward the coast, then into Jacó.", "Autopista de peaje hacia la costa y luego a Jacó.") },
      { time: "Gate", step: c("You are walked through the lockbox if it is check-in time.", "Te explicamos la caja de seguridad si ya es hora de entrar.") },
    ],
    policy: "standard",
    pairsWith: ["grocery-prestock", "private-chef"],
  },
  {
    slug: "party-bus",
    title: c("Party bus", "Bus de fiesta"),
    type: "service",
    category: "arrival",
    summary: c(
      "A louder ride from the airport or around town, for the group that wants one.",
      "Un viaje más ruidoso desde el aeropuerto o por el pueblo, para el grupo que lo pide.",
    ),
    description: c(
      "For arrivals that should feel like the weekend has started, or a loop between the house, the marina, and town. Music is part of it. The highway still has rules, and so does the house when you get back.",
      "Para llegadas en las que el fin de semana ya empezó, o un recorrido entre la casa, la marina y el pueblo. La música va incluida. La autopista tiene reglas, y la casa también cuando regresan.",
    ),
    duration: c("Airport one way, or a 4-hour town loop", "Solo ida del aeropuerto, o 4 horas por el pueblo"),
    pickupIncluded: true,
    meeting: c("SJO arrivals, or the house.", "Llegadas del SJO, o la casa."),
    options: [
      opt("bus-sjo", "Airport one way, up to 15", "Aeropuerto solo ida, hasta 15", 8, 15, 480),
      opt("bus-loop", "Four-hour Jacó loop, up to 15", "Cuatro horas en Jacó, hasta 15", 8, 15, 560),
    ],
    timeSlots: ["10:00", "13:00", "16:00", "19:00"],
    includes: [c("Vehicle, driver, and a sound system", "Vehículo, conductor y equipo de sonido")],
    excludes: [c("Alcohol", "Alcohol"), c("Damage to the vehicle", "Daños al vehículo")],
    bring: [c("The guest count a day ahead", "El número de personas con un día de anticipación")],
    itinerary: [
      { time: "Pickup", step: c("Everyone is collected in one place.", "Todos salen del mismo punto.") },
      { time: "On board", step: c("Music for the group, a driver who is not part of the party.", "Música para el grupo y un conductor que no está de fiesta.") },
    ],
    policy: "standard",
    pairsWith: ["party-yacht", "dj"],
  },
  {
    slug: "vip-concierge",
    title: c("VIP concierge", "Conserjería VIP"),
    type: "service",
    category: "house",
    summary: c(
      "The whole stay designed: tables, boats, timing, and a person on call.",
      "La estadía completa diseñada: mesas, botes, horarios y una persona disponible.",
    ),
    description: c(
      "Before you fly, we build the days. During the stay, one person handles changes — a rain delay, a later dinner, a birthday that grew. This is the planning fee; boats, chefs, and cars are still their own rates.",
      "Antes del vuelo armamos los días. Durante la estadía, una persona resuelve los cambios: lluvia, una cena más tarde, un cumpleaños que creció. Esta es la tarifa de planeación; botes, chefs y carros siguen con su propio precio.",
    ),
    duration: c("The length of your stay", "Lo que dure tu estadía"),
    pickupIncluded: false,
    meeting: c("By message before you arrive, and on call once you land.", "Por mensaje antes de llegar, y disponibles al aterrizar."),
    options: [
      opt("vip-3", "Stay of up to 4 nights", "Estadía de hasta 4 noches", 1, 8, 250),
      opt("vip-7", "Stay of 5–8 nights", "Estadía de 5–8 noches", 1, 12, 400),
    ],
    timeSlots: ["09:00"],
    includes: [c("A written plan", "Un plan por escrito"), c("Reservations made in your name", "Reservas hechas a tu nombre"), c("One contact during the stay", "Un solo contacto durante la estadía")],
    excludes: [c("The experiences themselves", "Las experiencias en sí"), c("Meals and tickets", "Comidas y entradas")],
    bring: [c("How you want the days to feel", "Cómo quieres que se sientan los días")],
    itinerary: [
      { time: "Before", step: c("We trade notes and lock the skeleton of the week.", "Intercambiamos notas y fijamos el esqueleto de la semana.") },
      { time: "During", step: c("Changes go through one person.", "Los cambios pasan por una sola persona.") },
    ],
    policy: "standard",
    pairsWith: ["airport-transfer", "private-chef"],
  },
  {
    slug: "personal-concierge",
    title: c("Day concierge", "Conserje por un día"),
    type: "service",
    category: "house",
    summary: c(
      "A local with you for a day of reservations, timing, and the small fixes.",
      "Alguien local contigo un día: reservas, tiempos y los arreglos pequeños.",
    ),
    description: c(
      "Not the whole week — one day. Useful when a celebration has moving parts and you would rather be in the water than in the group chat.",
      "No es toda la semana: es un día. Sirve cuando una celebración tiene muchas piezas y prefieres estar en el agua que en el chat del grupo.",
    ),
    duration: c("8 hours", "8 horas"),
    pickupIncluded: false,
    meeting: c("They start at the house.", "Empiezan en la casa."),
    options: [opt("day-fix", "One day, up to 8 guests", "Un día, hasta 8 huéspedes", 1, 8, 180)],
    timeSlots: ["08:00", "10:00"],
    includes: [c("Eight hours of coordination", "Ocho horas de coordinación")],
    excludes: [c("Tickets, meals, and transport", "Entradas, comidas y transporte")],
    bring: [c("The day's must-happens", "Lo que sí o sí tiene que pasar ese día")],
    itinerary: [{ time: "Morning", step: c("The day is sequenced before anyone is hungry.", "El día queda ordenado antes de que alguien tenga hambre.") }],
    policy: "standard",
    pairsWith: ["golf-cart", "private-chef"],
  },
  {
    slug: "grocery-prestock",
    title: c("Grocery pre-stock", "Supermercado previo"),
    type: "service",
    category: "kitchen",
    summary: c(
      "The kitchen is stocked before you arrive. You pay the receipt, plus the shop.",
      "La cocina queda surtida antes de que llegues. Pagas la factura, más el servicio.",
    ),
    description: c(
      "Send a list, or ask for a starter: coffee, fruit, breakfast, beer, something for the first night. We shop and put it away. The service fee is for the time; groceries are the store total.",
      "Manda una lista, o pide lo básico: café, fruta, desayuno, cerveza, algo para la primera noche. Compramos y lo guardamos. La tarifa es por el tiempo; los víveres son el total del súper.",
    ),
    duration: c("Before check-in", "Antes del check-in"),
    pickupIncluded: false,
    meeting: c("Done before you reach the gate.", "Queda listo antes de que llegues al portón."),
    options: [
      opt("shop-s", "Starter shop, service fee", "Compra básica, tarifa de servicio", 1, 8, 45),
      opt("shop-l", "Full-kitchen shop, service fee", "Compra completa, tarifa de servicio", 1, 8, 85),
    ],
    timeSlots: ["09:00", "12:00"],
    includes: [c("Shopping and putting groceries away", "La compra y acomodar todo"), c("A photo of the receipt", "Una foto de la factura")],
    excludes: [c("The groceries themselves", "Los víveres en sí")],
    bring: [c("A list, and brands if you care", "Una lista, y marcas si te importan")],
    itinerary: [{ time: "Arrival", step: c("Coffee is already in the kitchen.", "El café ya está en la cocina.") }],
    policy: "standard",
    pairsWith: ["airport-transfer", "private-chef"],
  },
  {
    slug: "housekeeping",
    title: c("Mid-stay housekeeping", "Limpieza a media estadía"),
    type: "service",
    category: "house",
    summary: c(
      "A reset during the stay. Checkout cleaning is already in the house fee.",
      "Un reinicio durante la estadía. La limpieza de salida ya va en la tarifa de la casa.",
    ),
    description: c(
      "Kitchens, floors, towels, and bathrooms brought back to order while you are out for the day. This is not the departure clean — that one is included with the stay.",
      "Cocina, pisos, toallas y baños de nuevo en orden mientras sales el día. No es la limpieza de salida: esa ya viene con la estadía.",
    ),
    duration: c("A few hours while you are out", "Unas horas mientras sales"),
    pickupIncluded: false,
    meeting: c("The team comes to the house.", "El equipo llega a la casa."),
    options: [opt("tidy", "Mid-stay reset", "Reinicio a media estadía", 1, 8, 80)],
    timeSlots: ["09:00", "13:00"],
    includes: [c("Kitchen, baths, floors, and towel change", "Cocina, baños, pisos y cambio de toallas")],
    excludes: [c("Laundry of personal clothes", "Lavado de ropa personal")],
    bring: [c("A window when the house can be empty", "Un horario en que la casa pueda estar vacía")],
    itinerary: [{ time: "While you are out", step: c("The house is quiet and then it is reset.", "La casa está en silencio y luego queda lista.") }],
    policy: "standard",
    pairsWith: ["private-chef", "massage"],
  },
  {
    slug: "massage",
    title: c("Massage", "Masaje"),
    type: "service",
    category: "wellness",
    summary: c(
      "A therapist at the house, after the ocean or instead of going out.",
      "Un terapeuta en la casa, después del mar o en lugar de salir.",
    ),
    description: c(
      "Swedish or deep tissue, in a bedroom with the air on. Tell us about injuries when you book. This is bodywork, not a medical treatment.",
      "Sueco o de tejido profundo, en una recámara con el aire encendido. Cuéntanos de lesiones al reservar. Es trabajo corporal, no un tratamiento médico.",
    ),
    duration: c("60 or 90 minutes", "60 o 90 minutos"),
    pickupIncluded: false,
    meeting: c("The therapist comes to the house.", "El terapeuta llega a la casa."),
    options: [
      opt("60", "60 minutes", "60 minutos", 1, 1, 90, "person"),
      opt("90", "90 minutes", "90 minutos", 1, 1, 125, "person"),
    ],
    timeSlots: ["10:00", "13:00", "16:00"],
    includes: [c("Table, linens, and the session", "Camilla, sábanas y la sesión")],
    excludes: [c("Medical treatment", "Tratamiento médico")],
    bring: [c("Notes on pressure and injuries", "Notas sobre presión y lesiones")],
    itinerary: [{ time: "Session", step: c("One room is held for the hour.", "Una habitación se reserva para esa hora.") }],
    policy: "standard",
    pairsWith: ["surf-lessons", "private-chef"],
  },
  {
    slug: "hangover-iv",
    title: c("Mobile IV visit", "Visita de suero a domicilio"),
    type: "service",
    category: "wellness",
    summary: c(
      "A licensed clinician comes to the house and decides, on site, whether fluids are appropriate.",
      "Un clínico con licencia llega a la casa y decide ahí si el suero es apropiado.",
    ),
    description: c(
      "This is not an emergency service and not a promise of a cure. A licensed clinician visits, asks a short health screen, and only then — if it is appropriate — gives IV fluids. If they say no, you are not charged the clinical fee.",
      "No es un servicio de emergencia ni una promesa de cura. Un clínico con licencia visita, hace unas preguntas de salud y solo entonces — si corresponde — aplica el suero. Si dice que no, no se cobra la tarifa clínica.",
    ),
    duration: c("About an hour", "Como una hora"),
    pickupIncluded: false,
    meeting: c("The clinician comes to the house.", "El clínico llega a la casa."),
    options: [opt("iv", "Clinician visit, per person", "Visita del clínico, por persona", 1, 1, 180, "person")],
    timeSlots: ["09:00", "11:00", "14:00"],
    includes: [c("The visit and the health screen", "La visita y las preguntas de salud"), c("Fluids only if the clinician agrees", "Suero solo si el clínico está de acuerdo")],
    excludes: [c("Emergency care — call local emergency services", "Urgencias: llama a los servicios locales"), c("A guarantee about how you will feel", "Una garantía de cómo te vas a sentir")],
    bring: [c("A list of medicines you take", "Una lista de medicinas que tomas")],
    itinerary: [{ time: "Screen", step: c("The clinician decides. You can decline, and so can they.", "El clínico decide. Tú puedes decir que no, y ellos también.") }],
    policy: "standard",
    pairsWith: ["private-chef", "massage"],
  },
  {
    slug: "golf-cart",
    title: c("Golf cart", "Carrito de golf"),
    type: "service",
    category: "town",
    featured: true,
    summary: c(
      "A cart for town and the beach streets. Not for the highway.",
      "Un carrito para el pueblo y las calles de la playa. No para la autopista.",
    ),
    description: c(
      "Jacó is small enough that a golf cart covers dinner, the surf shop, and a grocery run. We deliver it to the gate. A licensed driver in your group is required, and the coastal highway is off limits.",
      "Jacó es lo bastante pequeño para cubrir la cena, la tienda de surf y el súper en carrito. Lo dejamos en el portón. Hace falta un conductor con licencia en el grupo, y la autopista costera no se usa.",
    ),
    duration: c("A day or a week", "Un día o una semana"),
    pickupIncluded: false,
    meeting: c("Delivered to the house.", "Se entrega en la casa."),
    options: [
      opt("cart-day", "One day", "Un día", 1, 4, 75),
      opt("cart-week", "Seven days", "Siete días", 1, 4, 420),
    ],
    timeSlots: ["09:00", "15:00"],
    includes: [c("The cart and a short briefing", "El carrito y una explicación corta"), c("Delivery and pickup at the house", "Entrega y recojo en la casa")],
    excludes: [c("Fuel beyond a full tank at delivery", "Combustible más allá del tanque lleno al entregar"), c("Damage and traffic fines", "Daños y multas")],
    bring: [c("A valid driver's license", "Una licencia de conducir vigente")],
    itinerary: [{ time: "Delivery", step: c("You get the controls, the brake, and the streets to avoid.", "Te explicamos los controles, el freno y las calles que no se toman.") }],
    policy: "standard",
    pairsWith: ["surf-lessons", "grocery-prestock"],
  },
  {
    slug: "deep-sea-fishing",
    title: c("Deep sea fishing", "Pesca en alta mar"),
    type: "tour",
    category: "ocean",
    featured: true,
    summary: c(
      "Out of Los Sueños for sailfish, marlin, dorado, and tuna, shared or with the boat to yourselves.",
      "Desde Los Sueños por pez vela, marlín, dorado y atún, compartido o con el bote para ustedes.",
    ),
    description: c(
      "The marina is south of Jacó, usually under half an hour by car. Shared seats join a boat; private charters keep the day for your group. Peak sailfish months often fall from December into April, and the fishery changes with the season — the captain will say what is realistic that week. Catch-and-release is the default for billfish.",
      "La marina queda al sur de Jacó, por lo general a menos de media hora. Los cupos compartidos se suben a un bote; el charter privado deja el día para tu grupo. Los meses fuertes de pez vela suelen ir de diciembre a abril, y la pesca cambia con la temporada: el capitán dice qué es realista esa semana. Para los picudos, la norma es captura y liberación.",
    ),
    duration: c("Half day or full day", "Medio día o día completo"),
    pickupIncluded: true,
    meeting: c("Pickup at the house, then Los Sueños Marina.", "Recogida en la casa y luego Marina Los Sueños."),
    options: [
      opt("fish-half-s", "Shared half day", "Medio día compartido", 2, 6, 195, "person"),
      opt("fish-full-s", "Shared full day", "Día completo compartido", 2, 6, 295, "person"),
      opt("fish-half-p", "Private boat, half day, up to 4", "Bote privado, medio día, hasta 4", 1, 4, 890),
      opt("fish-full-p", "Private boat, full day, up to 6", "Bote privado, día completo, hasta 6", 1, 6, 1350),
    ],
    timeSlots: ["06:30", "07:00", "12:30"],
    includes: [c("Captain, mate, and tackle", "Capitán, marinero y equipo"), c("Water and a light snack on shared trips", "Agua y un snack ligero en viajes compartidos"), c("Transport from the house", "Transporte desde la casa")],
    excludes: [c("Fishing license, when the boat requires it", "Licencia de pesca, cuando el bote la pide"), c("Lunch on private full days unless added", "Almuerzo en días privados completos, salvo que se agregue"), c("Gratuity for the crew", "Propina para la tripulación")],
    bring: [c("Motion medicine if you need it", "Medicina para el mareo si la necesitas"), c("Sunscreen, a hat, and soft-soled shoes", "Bloqueador, gorra y zapatos de suela suave")],
    itinerary: [
      { time: "Before dawn", step: c("Coffee at the house, then the marina.", "Café en la casa y luego la marina.") },
      { time: "Offshore", step: c("The captain works the grounds that are producing.", "El capitán trabaja las zonas que están dando.") },
      { time: "Back", step: c("Return to Jacó with the afternoon still open on a half day.", "Regreso a Jacó con la tarde libre si fue medio día.") },
    ],
    policy: "weather",
    pairsWith: ["airport-transfer", "private-chef"],
  },
  {
    slug: "party-yacht",
    title: c("Private yacht", "Yate privado"),
    type: "tour",
    category: "ocean",
    featured: true,
    summary: c(
      "A boat for your group: a sunset, an afternoon, or the whole day off Jacó.",
      "Un bote para tu grupo: un atardecer, una tarde o el día completo frente a Jacó.",
    ),
    description: c(
      "The Pacific here is for swimming when the captain says the cove is calm, and for sitting in the shade when it is not. Food and a bar can be added. This is a private boat, not a shared party cruise.",
      "El Pacífico aquí es para nadar cuando el capitán dice que la ensenada está en calma, y para sentarse a la sombra cuando no. Se puede sumar comida y barra. Es un bote privado, no un crucero compartido.",
    ),
    duration: c("4 hours, or a full day", "4 horas, o el día completo"),
    pickupIncluded: true,
    meeting: c("Pickup at the house for the marina.", "Recogida en la casa hacia la marina."),
    options: [
      opt("yacht-sun", "Sunset, up to 8", "Atardecer, hasta 8", 2, 8, 980),
      opt("yacht-aft", "Afternoon, up to 12", "Tarde, hasta 12", 4, 12, 1400),
      opt("yacht-day", "Full day, up to 12", "Día completo, hasta 12", 4, 12, 2200),
    ],
    timeSlots: ["09:00", "13:00", "15:00"],
    includes: [c("Captain and crew", "Capitán y tripulación"), c("Water, ice, and snorkeling gear when the water allows", "Agua, hielo y equipo de snorkel cuando el mar lo permite")],
    excludes: [c("Food and alcohol", "Comida y alcohol"), c("Marina fees quoted on the day if any", "Tarifas de marina del día, si las hay")],
    bring: [c("Sunscreen and a layer for the ride back", "Bloqueador y una capa para el regreso")],
    itinerary: [
      { time: "Cast off", step: c("A short ride to a calmer stretch of coast.", "Un trayecto corto a un tramo más calmado de costa.") },
      { time: "On anchor", step: c("Swim, shade, and the hours you booked.", "Nado, sombra y las horas que reservaste.") },
      { time: "Return", step: c("Back in Jacó before or after sunset, as booked.", "De vuelta en Jacó antes o después del atardecer, según lo reservado.") },
    ],
    policy: "weather",
    pairsWith: ["dj", "private-chef"],
  },
  {
    slug: "atv",
    title: c("ATV tour", "Tour en cuatrimoto"),
    type: "tour",
    category: "jungle",
    summary: c(
      "Quads into the hills behind the coast. Mud is part of the hour.",
      "Cuatrimotos hacia los cerros detrás de la costa. El barro es parte de la hora.",
    ),
    description: c(
      "A guided ride on country tracks, not a race. A valid driver's license is commonly required to drive your own machine. Closed-toe shoes. You will not stay clean, and that is the correct outcome.",
      "Un recorrido guiado por caminos de campo, no una carrera. Para manejar tu propia máquina suele pedirse licencia vigente. Zapatos cerrados. No vas a volver limpio, y ese es el resultado correcto.",
    ),
    duration: c("About 2 hours in the hills", "Unas 2 horas en los cerros"),
    pickupIncluded: true,
    meeting: c("Pickup at the house.", "Recogida en la casa."),
    options: [
      opt("atv-s", "Shared tour", "Tour compartido", 1, 8, 95, "person"),
      opt("atv-p", "Private group, up to 4 machines", "Grupo privado, hasta 4 máquinas", 2, 4, 340),
    ],
    timeSlots: ["08:00", "13:00"],
    includes: [c("Machine, helmet, and guide", "Máquina, casco y guía"), c("Hotel pickup", "Recogida en la casa")],
    excludes: [c("A change of clothes", "Ropa de cambio"), c("Photos unless the operator includes them", "Fotos, salvo que el operador las incluya")],
    bring: [c("Closed-toe shoes and a license if you will drive", "Zapatos cerrados y licencia si vas a manejar"), c("Clothes you can rinse", "Ropa que se pueda enjuagar")],
    itinerary: [
      { time: "Briefing", step: c("Brakes, spacing, and the rule about not passing the guide.", "Frenos, distancia y la regla de no pasar al guía.") },
      { time: "Hills", step: c("Dirt tracks, river crossings when the season allows, and views back to the Pacific.", "Caminos de tierra, cruces de río cuando la época lo permite y vista de regreso al Pacífico.") },
    ],
    policy: "active",
    pairsWith: ["waterfall-tour", "massage"],
  },
  {
    slug: "zipline",
    title: c("Zipline", "Tirolesa"),
    type: "tour",
    category: "jungle",
    summary: c(
      "A canopy circuit in the hills, with a guide who sets every clip.",
      "Un circuito de dosel en los cerros, con un guía que revisa cada clip.",
    ),
    description: c(
      "Cables, platforms, and a view that occasionally includes the ocean. Weight limits are the operator's, confirmed when you book. Not a day for flip-flops.",
      "Cables, plataformas y una vista que a veces incluye el mar. Los límites de peso son del operador y se confirman al reservar. No es un día de sandalias.",
    ),
    duration: c("About 2–3 hours on the course", "Unas 2–3 horas en el circuito"),
    pickupIncluded: true,
    meeting: c("Pickup at the house.", "Recogida en la casa."),
    options: [
      opt("zip-c", "Classic circuit", "Circuito clásico", 1, 10, 89, "person"),
      opt("zip-x", "Extended circuit", "Circuito extendido", 1, 10, 129, "person"),
    ],
    timeSlots: ["08:00", "12:30"],
    includes: [c("Harness, helmet, guides, and transport", "Arnés, casco, guías y transporte")],
    excludes: [c("GoPro rental", "Renta de cámara")],
    bring: [c("Closed shoes and clothes that can get damp", "Zapatos cerrados y ropa que pueda mojarse")],
    itinerary: [
      { time: "Gear", step: c("A proper fit before anyone leaves the ground.", "Un ajuste correcto antes de que alguien deje el suelo.") },
      { time: "Canopy", step: c("The circuit at the guide's pace.", "El circuito al ritmo del guía.") },
    ],
    policy: "active",
    pairsWith: ["waterfall-tour", "atv"],
  },
  {
    slug: "waterfall-rappelling",
    title: c("Waterfall rappelling", "Rappel en cascada"),
    type: "tour",
    category: "jungle",
    summary: c(
      "A guided descent beside falling water. You need steady legs and closed shoes.",
      "Un descenso guiado junto al agua. Hacen falta piernas firmes y zapatos cerrados.",
    ),
    description: c(
      "This is the active version of a waterfall day: harness on, guide on the rope, cold water. Say so if heights are a hard no. The pace is instructional, not extreme for its own sake.",
      "Es la versión activa de un día de cascada: arnés, guía en la cuerda, agua fría. Di si las alturas son un no rotundo. El ritmo es de instrucción, no extremo por deporte.",
    ),
    duration: c("About half a day", "Como medio día"),
    pickupIncluded: true,
    meeting: c("Pickup at the house.", "Recogida en la casa."),
    options: [opt("rap", "Guided rappel", "Rappel guiado", 1, 8, 149, "person")],
    timeSlots: ["07:30", "12:00"],
    includes: [c("Guide, harness, helmet, and transport", "Guía, arnés, casco y transporte")],
    excludes: [c("Lunch", "Almuerzo")],
    bring: [c("Shoes with grip and a change of clothes", "Zapatos con agarre y ropa de cambio")],
    itinerary: [
      { time: "Approach", step: c("A walk in before the first pitch.", "Una caminata antes del primer tramo.") },
      { time: "Descent", step: c("You go when the guide says, not before.", "Bajas cuando el guía lo dice, no antes.") },
    ],
    policy: "active",
    pairsWith: ["massage", "zipline"],
  },
  {
    slug: "rafting",
    title: c("White water rafting", "Rafting"),
    type: "tour",
    category: "jungle",
    summary: c(
      "A raft on a Pacific-slope river, class II–III, with a guide in the boat.",
      "Una balsa en un río de la vertiente del Pacífico, clase II–III, con guía a bordo.",
    ),
    description: c(
      "The river depends on rain. High water can move a trip up a class or cancel it; low water can turn it into a scenic float. We say which, the day before. You should be able to swim.",
      "El río depende de la lluvia. Con mucha agua el viaje puede subir de clase o cancelarse; con poca, puede volverse un paseo escénico. Lo decimos el día anterior. Hay que saber nadar.",
    ),
    duration: c("Half day on the water", "Medio día en el agua"),
    pickupIncluded: true,
    meeting: c("Pickup at the house.", "Recogida en la casa."),
    options: [
      opt("raft-m", "Milder section", "Tramo más suave", 1, 8, 115, "person"),
      opt("raft-f", "Longer day", "Día más largo", 1, 8, 145, "person"),
    ],
    timeSlots: ["07:30", "08:00"],
    includes: [c("Raft, guide, helmet, life jacket, and transport", "Balsa, guía, casco, chaleco y transporte")],
    excludes: [c("A waterproof phone case", "Funda impermeable para el teléfono")],
    bring: [c("Sandals with a strap, sunscreen, and a dry shirt for later", "Sandalias con correa, bloqueador y una camisa seca para después")],
    itinerary: [
      { time: "Put-in", step: c("A safety talk that is not optional.", "Una charla de seguridad que no es opcional.") },
      { time: "River", step: c("Rapids, flat water, and a guide who knows this season's line.", "Rápidos, agua plana y un guía que conoce la línea de esta temporada.") },
    ],
    policy: "active",
    pairsWith: ["massage", "private-chef"],
  },
  {
    slug: "manuel-antonio",
    title: c("Manuel Antonio", "Manuel Antonio"),
    type: "tour",
    category: "parks",
    featured: true,
    summary: c(
      "A day south: the national park, the beach inside it, and monkeys who already know the trail.",
      "Un día al sur: el parque nacional, la playa adentro y monos que ya conocen el sendero.",
    ),
    description: c(
      "From Jacó it is about an hour and a quarter to Quepos, then the park. Go with a guide if you want the wildlife named, or we can arrange the drive and the entry and leave you the pace. The park caps daily visitors, so this is not a same-morning decision in high season.",
      "Desde Jacó es como una hora y cuarto a Quepos, y luego el parque. Ve con guía si quieres que te nombren la fauna, o arreglamos el traslado y la entrada y te dejamos el ritmo. El parque limita las visitas del día, así que en temporada alta no es una decisión de la misma mañana.",
    ),
    duration: c("A full day", "Un día completo"),
    pickupIncluded: true,
    meeting: c("Pickup at the house.", "Recogida en la casa."),
    options: [
      opt("ma-s", "Shared day with guide", "Día compartido con guía", 1, 8, 109, "person"),
      opt("ma-p", "Private guide and van, up to 6", "Guía y van privados, hasta 6", 1, 6, 620),
    ],
    timeSlots: ["06:30", "07:00"],
    includes: [c("Transport and a naturalist guide on guided options", "Transporte y guía naturalista en las opciones guiadas"), c("Park entry on the private option", "Entrada al parque en la opción privada")],
    excludes: [c("Lunch", "Almuerzo"), c("Park entry on the shared tour if the operator bills it aboard", "Entrada al parque en el tour compartido si el operador la cobra aparte")],
    bring: [c("Passport or a photo of it — the park may ask", "Pasaporte o una foto: el parque puede pedirlo"), c("Reef-safe sunscreen and a swimsuit", "Bloqueador amable con el arrecife y traje de baño")],
    itinerary: [
      { time: "South", step: c("Early departure, before the Quepos road clots.", "Salida temprano, antes de que la vía a Quepos se sature.") },
      { time: "Park", step: c("Trail, beach, and wildlife at the forest's pace.", "Sendero, playa y fauna al ritmo del bosque.") },
      { time: "Home", step: c("Back in Jacó by evening.", "De vuelta en Jacó al anochecer.") },
    ],
    policy: "weather",
    pairsWith: ["private-chef", "surf-lessons"],
  },
  {
    slug: "carara",
    title: c("Carara National Park", "Parque Nacional Carara"),
    type: "tour",
    category: "parks",
    summary: c(
      "A morning with scarlet macaws, close enough to Jacó to be home for lunch.",
      "Una mañana con lapas rojas, tan cerca de Jacó que almuerzas en la casa.",
    ),
    description: c(
      "Carara sits just north of town, where dry forest and rainforest meet. Morning is when the macaws move. Trails are walkable. It is the easiest wild day from this house.",
      "Carara queda justo al norte del pueblo, donde se encuentran el bosque seco y el lluvioso. La mañana es cuando se mueven las lapas. Los senderos se caminan bien. Es el día de naturaleza más fácil desde esta casa.",
    ),
    duration: c("About 3–4 hours", "Unas 3–4 horas"),
    pickupIncluded: true,
    meeting: c("Pickup at the house.", "Recogida en la casa."),
    options: [
      opt("car-s", "Shared morning", "Mañana compartida", 1, 8, 95, "person"),
      opt("car-p", "Private guide, up to 6", "Guía privado, hasta 6", 1, 6, 480),
    ],
    timeSlots: ["06:30", "07:00"],
    includes: [c("Guide, transport, and park entry on private tours", "Guía, transporte y entrada en tours privados")],
    excludes: [c("Lunch back at the house", "El almuerzo de regreso en la casa")],
    bring: [c("Binoculars if you have them, and insect repellent", "Binoculares si tienes, y repelente")],
    itinerary: [
      { time: "Gate", step: c("In early, while the birds are speaking.", "Entrada temprano, cuando las aves están hablando.") },
      { time: "Trail", step: c("A slow walk. The point is to stop.", "Una caminata lenta. El punto es detenerse.") },
    ],
    policy: "weather",
    pairsWith: ["private-chef", "crocodile-safari"],
  },
  {
    slug: "tortuga-island",
    title: c("Tortuga Island", "Isla Tortuga"),
    type: "tour",
    category: "ocean",
    summary: c(
      "A boat day to a white-sand island in the Gulf of Nicoya.",
      "Un día en bote a una isla de arena blanca en el Golfo de Nicoya.",
    ),
    description: c(
      "The ride is part of the day. Snorkeling happens if the water is clear; lunch is usually on the island. It is a long, sunny one — bring the hat you think you will not need.",
      "El viaje es parte del día. El snorkel ocurre si el agua está clara; el almuerzo suele ser en la isla. Es un día largo y soleado: lleva el sombrero que crees que no vas a necesitar.",
    ),
    duration: c("A full day", "Un día completo"),
    pickupIncluded: true,
    meeting: c("Pickup at the house for the dock.", "Recogida en la casa hacia el muelle."),
    options: [opt("tortuga", "Island day", "Día de isla", 1, 12, 145, "person")],
    timeSlots: ["06:30"],
    includes: [c("Boat, lunch, and snorkeling gear", "Bote, almuerzo y equipo de snorkel"), c("Transport from Jacó", "Transporte desde Jacó")],
    excludes: [c("Alcoholic drinks", "Bebidas alcohólicas"), c("A private boat — ask if you want the island to yourselves", "Bote privado: pregunta si quieren la isla para ustedes")],
    bring: [c("Sunscreen, a towel, and cash for extras", "Bloqueador, toalla y efectivo para extras")],
    itinerary: [
      { time: "Dock", step: c("A morning ride into the gulf.", "Un viaje matutino hacia el golfo.") },
      { time: "Island", step: c("Beach time, a swim, lunch.", "Playa, un nado, almuerzo.") },
      { time: "Return", step: c("Back in Jacó by late afternoon.", "De vuelta en Jacó al final de la tarde.") },
    ],
    policy: "weather",
    pairsWith: ["massage", "private-chef"],
  },
  {
    slug: "surf-lessons",
    title: c("Surf lessons", "Clases de surf"),
    type: "tour",
    category: "ocean",
    featured: true,
    summary: c(
      "Jacó's beach break is a fair place to stand up. Lessons are in the morning.",
      "La ola de Jacó es un buen lugar para pararse por primera vez. Las clases son en la mañana.",
    ),
    description: c(
      "The beach is a short walk, which is why a lesson here makes more sense than a drive. Morning wind is kinder. Playa Hermosa, just south, is a different and heavier wave — we will not put a first lesson there.",
      "La playa queda a un corto paseo, por eso una clase aquí tiene más sentido que un traslado. El viento de la mañana es más amable. Playa Hermosa, justo al sur, es otra ola y más pesada: no ponemos ahí una primera clase.",
    ),
    duration: c("About 90 minutes in the water", "Unos 90 minutos en el agua"),
    pickupIncluded: false,
    meeting: c("Meet at the beach access, a short walk from the house.", "En el acceso a la playa, a un corto paseo de la casa."),
    options: [
      opt("surf-g", "Group lesson", "Clase en grupo", 1, 4, 75, "person"),
      opt("surf-p", "Private lesson", "Clase privada", 1, 2, 140),
    ],
    timeSlots: ["07:00", "08:30", "15:30"],
    includes: [c("Board, rash guard, and instructor", "Tabla, lycra e instructor")],
    excludes: [c("Photos", "Fotos")],
    bring: [c("Swimsuit and sunscreen", "Traje de baño y bloqueador")],
    itinerary: [
      { time: "Sand", step: c("How to stand, before the ocean is involved.", "Cómo pararse, antes de que entre el mar.") },
      { time: "Whitewater", step: c("Repetition in the small waves until one of them is yours.", "Repetición en las olas pequeñas hasta que una sea tuya.") },
    ],
    policy: "weather",
    pairsWith: ["massage", "golf-cart"],
  },
  {
    slug: "horseback",
    title: c("Horseback riding", "Cabalgata"),
    type: "tour",
    category: "jungle",
    summary: c(
      "A ride on the beach or inland toward a waterfall, matched to the riders you actually are.",
      "Un paseo por la playa o tierra adentro hacia una cascada, según los jinetes que de verdad son.",
    ),
    description: c(
      "Tell us if someone has never been on a horse. The beach ride is the gentler hour. The waterfall ride is longer and wetter. Both use helmets.",
      "Dinos si alguien nunca se ha subido a un caballo. El paseo de playa es la hora más suave. El de cascada es más largo y más mojado. En ambos se usa casco.",
    ),
    duration: c("1.5 to 3 hours", "1.5 a 3 horas"),
    pickupIncluded: true,
    meeting: c("Pickup at the house.", "Recogida en la casa."),
    options: [
      opt("horse-b", "Beach ride", "Paseo de playa", 1, 8, 85, "person"),
      opt("horse-w", "Waterfall ride", "Paseo a la cascada", 1, 8, 110, "person"),
    ],
    timeSlots: ["08:00", "14:00"],
    includes: [c("Horse, helmet, guide, and transport", "Caballo, casco, guía y transporte")],
    excludes: [c("Riding boots — closed shoes are enough", "Botas: bastan zapatos cerrados")],
    bring: [c("Long pants if you have them, and closed shoes", "Pantalón largo si tienes, y zapatos cerrados")],
    itinerary: [{ time: "Mount", step: c("A horse matched to the rider, then an unhurried line.", "Un caballo según el jinete, y luego una fila sin prisa.") }],
    policy: "active",
    pairsWith: ["private-chef", "massage"],
  },
  {
    slug: "canyoneering",
    title: c("Canyoneering", "Cañonismo"),
    type: "tour",
    category: "jungle",
    summary: c(
      "Rappels, swims, and a river canyon with a guide who has done the pitches that morning.",
      "Rappeles, nados y un cañón de río con un guía que ya bajó los tramos esa mañana.",
    ),
    description: c(
      "The most physical day in this catalog. You should be comfortable in water and fine with heights. If that is a question, choose the waterfall tour instead and enjoy the same forest from the path.",
      "El día más físico de este catálogo. Hay que sentirse bien en el agua y con las alturas. Si eso es una duda, elige el tour de cascadas y mira el mismo bosque desde el sendero.",
    ),
    duration: c("Most of a day", "Casi todo el día"),
    pickupIncluded: true,
    meeting: c("Pickup at the house.", "Recogida en la casa."),
    options: [opt("canyon", "Guided canyon", "Cañón guiado", 1, 8, 159, "person")],
    timeSlots: ["07:00"],
    includes: [c("Guide, technical gear, and transport", "Guía, equipo técnico y transporte")],
    excludes: [c("Lunch", "Almuerzo")],
    bring: [c("A swimsuit, closed shoes that can drain, and honesty about fitness", "Traje de baño, zapatos cerrados que drenen y honestidad sobre la condición física")],
    itinerary: [
      { time: "Approach", step: c("Gear check, then the walk in.", "Revisión de equipo y luego la caminata de entrada.") },
      { time: "Canyon", step: c("Rope, water, and the guide's sequence.", "Cuerda, agua y la secuencia del guía.") },
    ],
    policy: "active",
    pairsWith: ["massage", "private-chef"],
  },
  {
    slug: "waterfall-tour",
    title: c("Waterfall walk", "Caminata a cascadas"),
    type: "tour",
    category: "jungle",
    summary: c(
      "A guided walk to falls you can swim in, without a rope.",
      "Una caminata guiada a cascadas donde se puede nadar, sin cuerda.",
    ),
    description: c(
      "The quieter waterfall day. Trails can be slick. Swimming is optional and only where the guide says the current is friendly.",
      "El día de cascada más tranquilo. Los senderos pueden estar resbalosos. Nadar es opcional y solo donde el guía dice que la corriente está amable.",
    ),
    duration: c("About half a day", "Como medio día"),
    pickupIncluded: true,
    meeting: c("Pickup at the house.", "Recogida en la casa."),
    options: [opt("falls", "Guided walk", "Caminata guiada", 1, 10, 99, "person")],
    timeSlots: ["07:30", "12:30"],
    includes: [c("Guide, transport, and entry fees", "Guía, transporte y entradas")],
    excludes: [c("Water shoes if you want your own", "Zapatos de agua si quieres los tuyos")],
    bring: [c("Sandals with a strap, a swimsuit, and a small towel", "Sandalias con correa, traje de baño y una toalla pequeña")],
    itinerary: [{ time: "Trail", step: c("Walk, swim if you want, walk out.", "Caminar, nadar si quieres, caminar de regreso.") }],
    policy: "weather",
    pairsWith: ["carara", "private-chef"],
  },
  {
    slug: "crocodile-safari",
    title: c("Crocodile river", "Río de cocodrilos"),
    type: "tour",
    category: "jungle",
    summary: c(
      "A boat on the Tárcoles, where the crocodiles are as advertised.",
      "Un bote en el Tárcoles, donde los cocodrilos son tan reales como dicen.",
    ),
    description: c(
      "The river north of Jacó is famous for large American crocodiles, and also for birds if you look up. It is a boat with a guide, not a stunt. You stay seated.",
      "El río al norte de Jacó es famoso por cocodrilos americanos grandes, y también por aves si miras hacia arriba. Es un bote con guía, no un espectáculo. Te quedas sentado.",
    ),
    duration: c("About 2 hours on the water", "Unas 2 horas en el agua"),
    pickupIncluded: true,
    meeting: c("Pickup at the house.", "Recogida en la casa."),
    options: [opt("croc", "River boat", "Bote en el río", 1, 10, 75, "person")],
    timeSlots: ["08:00", "10:30", "14:00"],
    includes: [c("Boat, guide, and transport", "Bote, guía y transporte")],
    excludes: [c("The bridge stop souvenir shops", "Las tiendas de souvenirs del puente")],
    bring: [c("Binoculars and a lens you can steady on a boat", "Binoculares y un lente que puedas sostener en un bote")],
    itinerary: [{ time: "River", step: c("A slow pass. The animals are not in a hurry.", "Un paseo lento. Los animales no tienen prisa.") }],
    policy: "weather",
    pairsWith: ["carara", "coffee-tour"],
  },
  {
    slug: "monkey-mangrove",
    title: c("Mangrove and monkeys", "Manglar y monos"),
    type: "tour",
    category: "jungle",
    summary: c(
      "A shaded boat through mangrove canals, with monkeys when they feel social.",
      "Un bote a la sombra por canales de manglar, con monos cuando están sociables.",
    ),
    description: c(
      "A calmer wildlife hour than the open Pacific. Good for a mixed group, a hot afternoon, or anyone who wants animals without a hike. Sightings are wildlife, not a schedule.",
      "Una hora de fauna más calma que el Pacífico abierto. Sirve para un grupo mixto, una tarde caliente, o quien quiera animales sin caminata. Los avistamientos son fauna, no un horario.",
    ),
    duration: c("About 2 hours", "Unas 2 horas"),
    pickupIncluded: true,
    meeting: c("Pickup at the house.", "Recogida en la casa."),
    options: [opt("mangrove", "Mangrove boat", "Bote por el manglar", 1, 10, 85, "person")],
    timeSlots: ["08:00", "13:30"],
    includes: [c("Boat, guide, and transport", "Bote, guía y transporte")],
    excludes: [c("A promise of a particular animal", "La promesa de un animal en particular")],
    bring: [c("Repellent and a light shirt", "Repelente y una camisa ligera")],
    itinerary: [{ time: "Canals", step: c("Shade, birds, and the occasional troop overhead.", "Sombra, aves y de vez en cuando una tropa arriba.") }],
    policy: "weather",
    pairsWith: ["surf-lessons", "private-chef"],
  },
  {
    slug: "paragliding",
    title: c("Paragliding", "Parapente"),
    type: "tour",
    category: "air",
    summary: c(
      "A tandem flight above the coast when the wind agrees.",
      "Un vuelo en tándem sobre la costa, cuando el viento está de acuerdo.",
    ),
    description: c(
      "You fly with a pilot, not alone. Weight limits and the wind that day decide if it goes; we confirm before you are charged. If the air is wrong, the plan moves.",
      "Vuelas con un piloto, no solo. Los límites de peso y el viento del día deciden si sale; lo confirmamos antes de cobrarte. Si el aire no sirve, el plan se mueve.",
    ),
    duration: c("A few hours door to door, a shorter time in the air", "Unas horas de puerta a puerta y menos tiempo en el aire"),
    pickupIncluded: true,
    meeting: c("Pickup at the house for the launch hill.", "Recogida en la casa hacia la loma de despegue."),
    options: [opt("para", "Tandem flight", "Vuelo en tándem", 1, 1, 175, "person")],
    timeSlots: ["08:00", "11:00", "14:00"],
    includes: [c("Pilot, equipment, and transport", "Piloto, equipo y transporte")],
    excludes: [c("Photos and video unless added", "Fotos y video, salvo que se agreguen")],
    bring: [c("Closed shoes and a willingness to wait on the wind", "Zapatos cerrados y disposición a esperar el viento")],
    itinerary: [
      { time: "Hill", step: c("A briefing, then a launch when the cycle is right.", "Una explicación y el despegue cuando el ciclo es el correcto.") },
      { time: "Air", step: c("The coast from a height you do not get on the beach.", "La costa desde una altura que la playa no da.") },
    ],
    policy: "active",
    pairsWith: ["surf-lessons", "private-chef"],
  },
  {
    slug: "chocolate-tour",
    title: c("Chocolate tour", "Tour de chocolate"),
    type: "tour",
    category: "town",
    summary: c(
      "Cacao from fruit to cup, close enough that it does not spend the whole day.",
      "Cacao de la fruta a la taza, tan cerca que no se gasta el día entero.",
    ),
    description: c(
      "A small-farm visit: the pod, the ferment, the drink that does not taste like a candy bar. Easy walking. A good slow morning before the beach.",
      "Una visita a una finca pequeña: la mazorca, la fermentación, la bebida que no sabe a barra de dulce. Se camina fácil. Una buena mañana lenta antes de la playa.",
    ),
    duration: c("About 3 hours", "Unas 3 horas"),
    pickupIncluded: true,
    meeting: c("Pickup at the house.", "Recogida en la casa."),
    options: [opt("choc", "Farm visit", "Visita a la finca", 1, 8, 79, "person")],
    timeSlots: ["09:00", "13:00"],
    includes: [c("Tour, tasting, and transport", "Tour, degustación y transporte")],
    excludes: [c("Boxes of chocolate to ship home", "Cajas para enviar a casa")],
    bring: [c("An appetite and cash if you want to buy bars", "Apetito y efectivo si quieres comprar barras")],
    itinerary: [{ time: "Farm", step: c("Walk, taste, and a drink made while you watch.", "Caminar, probar y una bebida hecha frente a ti.") }],
    policy: "standard",
    pairsWith: ["surf-lessons", "coffee-tour"],
  },
  {
    slug: "coffee-tour",
    title: c("Coffee in the valley", "Café en el valle"),
    type: "tour",
    category: "town",
    summary: c(
      "A real coffee farm near the airport. From Jacó it takes the day — or pairs with a flight.",
      "Una finca de café de verdad cerca del aeropuerto. Desde Jacó ocupa el día, o se combina con un vuelo.",
    ),
    description: c(
      "The famous valley farms, including the Doka area, sit up by SJO, not in Jacó. We do this on a day you are already crossing the mountains, or we commit the date to it. You will taste coffee that has not been sitting in a pot.",
      "Las fincas famosas del valle, incluida la zona de Doka, están junto al SJO, no en Jacó. Lo hacemos un día en que ya cruzas las montañas, o le dedicamos la fecha. Vas a probar café que no lleva horas en una jarra.",
    ),
    duration: c("A full day from Jacó", "Un día completo desde Jacó"),
    pickupIncluded: true,
    meeting: c("Pickup at the house for the drive up.", "Recogida en la casa para subir."),
    options: [opt("coffee", "Valley day", "Día en el valle", 1, 8, 95, "person")],
    timeSlots: ["07:00"],
    includes: [c("Transport, farm tour, and a tasting", "Transporte, tour de finca y degustación")],
    excludes: [c("Lunch in the valley", "Almuerzo en el valle")],
    bring: [c("A light layer — the valley is cooler", "Una capa ligera: el valle es más fresco")],
    itinerary: [
      { time: "Up", step: c("Route 27 in reverse, toward the airport and the farms.", "La ruta 27 de regreso, hacia el aeropuerto y las fincas.") },
      { time: "Cup", step: c("The process, then a tasting you can actually tell apart.", "El proceso y luego una cata que sí se distingue.") },
    ],
    policy: "standard",
    pairsWith: ["airport-transfer", "crocodile-safari"],
  },
  {
    slug: "poas",
    title: c("Poás Volcano", "Volcán Poás"),
    type: "tour",
    category: "parks",
    summary: c(
      "The crater, on a day you are willing to spend. From Jacó it is an early start.",
      "El cráter, en un día que estés dispuesto a usar. Desde Jacó se sale temprano.",
    ),
    description: c(
      "Poás is in the Central Valley, not on the coast. The park opens limited tickets and closes when gas or cloud says so. We go early, and we do not pretend a clear crater is guaranteed. Pair it with a travel day if you can.",
      "El Poás está en el Valle Central, no en la costa. El parque abre cupos limitados y cierra cuando el gas o la nube lo dicen. Vamos temprano y no prometemos un cráter despejado. Combínalo con un día de viaje si puedes.",
    ),
    duration: c("A full day from Jacó", "Un día completo desde Jacó"),
    pickupIncluded: true,
    meeting: c("Very early pickup at the house.", "Recogida muy temprano en la casa."),
    options: [opt("poas", "Volcano day", "Día de volcán", 1, 6, 120, "person")],
    timeSlots: ["04:30"],
    includes: [c("Transport, guide, and park ticket when available", "Transporte, guía y entrada cuando hay cupo")],
    excludes: [c("A guaranteed view into the crater", "Una vista garantizada del cráter")],
    bring: [c("A jacket and shoes for a paved, sometimes wet viewpoint", "Una chaqueta y zapatos para un mirador pavimentado, a veces mojado")],
    itinerary: [
      { time: "Dark", step: c("Leave Jacó before breakfast is a civilized idea.", "Salir de Jacó antes de que el desayuno sea una idea civilizada.") },
      { time: "Crater", step: c("The viewpoint, for as long as the park allows that morning.", "El mirador, el tiempo que el parque permita esa mañana.") },
    ],
    policy: "weather",
    pairsWith: ["coffee-tour", "airport-transfer"],
  },
];

export function getExperience(slug: string): Experience | undefined {
  return experiences.find((item) => item.slug === slug);
}

export function experienceFromPrice(experience: Experience): number {
  return Math.min(...experience.options.map((option) => option.price));
}

export function experienceFromIsPerPerson(experience: Experience): boolean {
  const cheapest = [...experience.options].sort((a, b) => a.price - b.price)[0];
  return cheapest.basis === "person";
}

export function optionById(experience: Experience, id: string): ExpOption | undefined {
  return experience.options.find((option) => option.id === id);
}

export function lineTotal(option: ExpOption, groupSize: number): number {
  return option.basis === "person" ? option.price * groupSize : option.price;
}
