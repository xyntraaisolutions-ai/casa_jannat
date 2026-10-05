import { c, type Copy } from "@/lib/copy";

export type Photo = {
  src: string;
  width: number;
  height: number;
  alt: Copy;
  room: "pool" | "living" | "bedrooms" | "bath";
};

export const photos: Photo[] = [
  {
    src: "/images/casa-jannat/hero-pool.jpg",
    width: 1200,
    height: 1600,
    room: "pool",
    alt: c(
      "Round spa and private pool at Casa Jannat in Jacó, with palms and a sunset sky",
      "Spa circular y piscina privada en Casa Jannat, Jacó, con palmeras y cielo de atardecer",
    ),
  },
  {
    src: "/images/casa-jannat/living-kitchen.jpg",
    width: 1200,
    height: 900,
    room: "living",
    alt: c(
      "Open living room, dining table, and white kitchen looking toward the pool",
      "Sala, comedor y cocina blanca abiertos hacia la piscina",
    ),
  },
  {
    src: "/images/casa-jannat/bedroom-1-king.jpg",
    width: 1200,
    height: 1600,
    room: "bedrooms",
    alt: c(
      "Primary bedroom with a king bed, ceiling fan, and a small sitting area",
      "Recámara principal con cama king, ventilador de techo y un pequeño rincón para sentarse",
    ),
  },
  {
    src: "/images/casa-jannat/pool-day.jpg",
    width: 1200,
    height: 1600,
    room: "pool",
    alt: c(
      "Private pool and garden at Casa Jannat, with a stair rail, palms, and flowering plants",
      "Piscina privada y jardín de Casa Jannat, con barandal, palmeras y plantas en flor",
    ),
  },
  {
    src: "/images/casa-jannat/bathroom.jpg",
    width: 1200,
    height: 1600,
    room: "bath",
    alt: c(
      "Bathroom with a white vessel sink, mirror, and warm tile",
      "Baño con lavamanos blanco, espejo y azulejo cálido",
    ),
  },
  {
    src: "/images/casa-jannat/bedroom-2-queen.jpg",
    width: 1200,
    height: 1600,
    room: "bedrooms",
    alt: c(
      "Queen bedroom with a wood-beamed ceiling and a mirrored closet",
      "Recámara queen con techo de vigas de madera y clóset con espejo",
    ),
  },
  {
    src: "/images/casa-jannat/bedroom-3-queen.jpg",
    width: 1200,
    height: 1600,
    room: "bedrooms",
    alt: c(
      "Queen bedroom with its own air conditioner and a wood-beamed ceiling",
      "Recámara queen con aire acondicionado propio y techo de vigas de madera",
    ),
  },
  {
    src: "/images/casa-jannat/bedroom-4-mezzanine.jpg",
    width: 1200,
    height: 1600,
    room: "bedrooms",
    alt: c(
      "Mezzanine queen bedroom with warm wood floors and a metal bed frame",
      "Recámara queen en el mezzanine, con pisos de madera y cama de metal",
    ),
  },
];

export const roomLabels: Record<Photo["room"], Copy> = {
  pool: c("Pool and outdoors", "Piscina y exterior"),
  living: c("Living and kitchen", "Sala y cocina"),
  bedrooms: c("Bedrooms", "Recámaras"),
  bath: c("Bathrooms", "Baños"),
};

export const villa = {
  slug: "casa-jannat",
  name: "Casa Jannat",
  tagline: c("A Little Piece of Paradise", "Un Pedacito de Paraíso"),
  location: c("Jacó, Puntarenas, Costa Rica", "Jacó, Puntarenas, Costa Rica"),
  /** Airbnb's public header says 8. The written description has also said 6. Confirm before launch. */
  maxGuests: 8,
  bedrooms: 4,
  beds: 4,
  sofaBeds: 1,
  bathrooms: 3,
  pool: true,
  walkToBeach: true,
  celebrations: true,
  rating: { score: 4.9, count: 49, fiveStarShare: 0.92 },
  categories: [
    { label: c("Cleanliness", "Limpieza"), score: 4.9 },
    { label: c("Accuracy", "Precisión"), score: 4.7 },
    { label: c("Check-in", "Llegada"), score: 4.9 },
    { label: c("Communication", "Comunicación"), score: 5 },
    { label: c("Location", "Ubicación"), score: 4.8 },
    { label: c("Value", "Calidad-precio"), score: 4.7 },
  ],
  summary: c(
    "An entire house in Jacó with a private pool, four bedrooms, and the beach a short walk away.",
    "Una casa completa en Jacó con piscina privada, cuatro recámaras y la playa a un corto paseo.",
  ),
  paragraphs: [
    c(
      "Jannat means paradise — a word that traveled from Arabic into Hindi and Urdu. Casa is the house, in the Spanish of this coast. Together they are a private pool, a kitchen big enough for a long lunch, and Jacó close enough that dinner can be a walk.",
      "Jannat significa paraíso: una palabra que pasó del árabe al hindi y al urdu. Casa es la casa, en el español de esta costa. Juntas son una piscina privada, una cocina para un almuerzo largo, y Jacó tan cerca que la cena puede ser a pie.",
    ),
    c(
      "The home sleeps up to eight across four bedrooms and a sofa bed. Bedrooms one, two, and three have their own air conditioning. The mezzanine queen is cooled by the living-room unit. There is a round spa beside the pool, a grill, a bathroom by the water, a separate guest house, and one parking space behind an electric gate.",
      "La casa duerme hasta ocho personas entre cuatro recámaras y un sofá cama. Las recámaras uno, dos y tres tienen aire acondicionado propio. La queen del mezzanine se refresca con el equipo de la sala. Hay un spa circular junto a la piscina, parrilla, baño junto al agua, una casa de huéspedes aparte y un espacio de parqueo detrás de un portón eléctrico.",
    ),
    c(
      "You let yourself in with a lockbox. Forty-nine guests have left a 4.9 rating. What they mention most is the welcome, how clean the rooms feel, the pool, and being able to walk to the beach and to restaurants.",
      "Entras con una caja de seguridad. Cuarenta y nueve huéspedes dejaron una calificación de 4.9. Lo que más mencionan es la bienvenida, lo limpias que se sienten las habitaciones, la piscina y poder caminar a la playa y a los restaurantes.",
    ),
  ],
  bedroomsDetail: [
    {
      name: c("Bedroom 1", "Recámara 1"),
      bed: c("King", "King"),
      ac: true,
      note: c("Its own air conditioning, a ceiling fan, and room to sit.", "Aire acondicionado propio, ventilador de techo y espacio para sentarse."),
      photo: photos[2],
    },
    {
      name: c("Bedroom 2", "Recámara 2"),
      bed: c("Queen", "Queen"),
      ac: true,
      note: c("Its own air conditioning under a wood-beamed ceiling.", "Aire acondicionado propio bajo un techo de vigas de madera."),
      photo: photos[5],
    },
    {
      name: c("Bedroom 3", "Recámara 3"),
      bed: c("Queen", "Queen"),
      ac: true,
      note: c("Its own air conditioning, with the unit on the wall.", "Aire acondicionado propio, con el equipo en la pared."),
      photo: photos[6],
    },
    {
      name: c("Bedroom 4, mezzanine", "Recámara 4, mezzanine"),
      bed: c("Queen", "Queen"),
      ac: false,
      note: c(
        "Cooled by the living-room air conditioning rather than its own unit.",
        "Se refresca con el aire acondicionado de la sala, no con un equipo propio.",
      ),
      photo: photos[7],
    },
  ],
  sofa: c(
    "One sofa bed in the living room, for the eighth guest or an afternoon nap.",
    "Un sofá cama en la sala, para el octavo huésped o una siesta.",
  ),
  highlights: [
    c("Private pool and spa", "Piscina y spa privados"),
    c("Four bedrooms, three with their own A/C", "Cuatro recámaras, tres con aire propio"),
    c("Guest house", "Casa de huéspedes"),
    c("Gated parking for one car", "Parqueo con portón para un auto"),
    c("Walk to the beach and restaurants", "A pie a la playa y a restaurantes"),
    c("Self check-in with a lockbox", "Entrada autónoma con caja de seguridad"),
  ],
  amenities: [
    {
      category: c("Outdoors", "Exterior"),
      items: [
        c("Private pool", "Piscina privada"),
        c("Round spa beside the pool", "Spa circular junto a la piscina"),
        c("Grill", "Parrilla"),
        c("Pool-side bathroom", "Baño junto a la piscina"),
        c("Garden", "Jardín"),
      ],
    },
    {
      category: c("Kitchen and living", "Cocina y sala"),
      items: [
        c("Full kitchen", "Cocina completa"),
        c("Refrigerator", "Refrigeradora"),
        c("Dining table", "Mesa de comedor"),
        c("Sofa bed", "Sofá cama"),
        c("Wi-Fi and a place to work", "Wi-Fi y un lugar para trabajar"),
      ],
    },
    {
      category: c("Bedrooms", "Recámaras"),
      items: [
        c("King bed and three queens", "Cama king y tres queens"),
        c("Air conditioning in bedrooms 1–3", "Aire acondicionado en recámaras 1 a 3"),
        c("Living-room air conditioning for the mezzanine", "Aire de la sala para el mezzanine"),
        c("Ceiling fans", "Ventiladores de techo"),
        c("Television in the primary bedroom", "Televisor en la recámara principal"),
      ],
    },
    {
      category: c("Bathrooms", "Baños"),
      items: [
        c("Three bathrooms", "Tres baños"),
        c("Two inside and one by the pool", "Dos adentro y uno junto a la piscina"),
        c("Hot water", "Agua caliente"),
      ],
    },
    {
      category: c("Arrival and parking", "Llegada y parqueo"),
      items: [
        c("Self check-in with a lockbox", "Entrada autónoma con caja de seguridad"),
        c("One private space behind an electric gate", "Un espacio privado detrás de un portón eléctrico"),
        c("Fully equipped guest house", "Casa de huéspedes equipada"),
      ],
    },
  ],
  nearby: [
    {
      name: c("Jacó beach", "Playa Jacó"),
      detail: c("A short walk from the house.", "Un corto paseo desde la casa."),
    },
    {
      name: c("Restaurants", "Restaurantes"),
      detail: c("Walkable — sodas, the town strip, and a grocery run.", "Se llega caminando: sodas, la calle del pueblo y el súper."),
    },
    {
      name: c("Juan Santamaría Airport (SJO)", "Aeropuerto Juan Santamaría (SJO)"),
      detail: c("About an hour and a half by car, longer on a Friday or a holiday.", "Como hora y media en carro, más un viernes o un feriado."),
    },
    {
      name: c("Los Sueños Marina", "Marina Los Sueños"),
      detail: c("South in Herradura, usually under half an hour by car.", "Al sur, en Herradura, por lo general menos de media hora en carro."),
    },
    {
      name: c("Carara National Park", "Parque Nacional Carara"),
      detail: c("North of town, a short drive, best in the morning for macaws.", "Al norte del pueblo, un trayecto corto, mejor en la mañana por las lapas."),
    },
    {
      name: c("Manuel Antonio", "Manuel Antonio"),
      detail: c("About an hour and a quarter south, a full day done properly.", "Como una hora y cuarto al sur; bien hecho, ocupa el día."),
    },
  ],
  themes: [
    c("The welcome — guests mention how the stay is hosted.", "La bienvenida: los huéspedes hablan de cómo se siente la estadía."),
    c("Clean rooms, called out often in the 4.9 cleanliness score.", "Habitaciones limpias, un tema frecuente en la nota de 4.9 en limpieza."),
    c("The private pool, which is not common on every street in town.", "La piscina privada, que no es común en cada calle del pueblo."),
    c("Walking out for the beach, coffee, and dinner.", "Salir caminando a la playa, al café y a cenar."),
  ],
};
