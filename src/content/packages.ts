import { c, type Copy } from "@/lib/copy";
import { lineTotal, optionById, getExperience } from "@/content/experiences";
import { rates } from "@/lib/rates";

export type PackageItem = {
  experienceSlug: string;
  optionId: string;
  dayOffset: number;
  time: string;
  groupSize: number;
};

export type StayPackage = {
  slug: string;
  title: Copy;
  occasion: string;
  summary: Copy;
  nights: number;
  guests: number;
  /** Fraction off the experience lines, not off the house. */
  experienceDiscount: number;
  items: PackageItem[];
  days: { title: Copy; detail: Copy }[];
};

export const packages: StayPackage[] = [
  {
    slug: "bachelor-weekend",
    title: c("Bachelor weekend", "Fin de semana de soltero"),
    occasion: "bachelor",
    summary: c(
      "Three nights, a loud arrival, dinner at the house, an afternoon on a boat, and a DJ who ends on time.",
      "Tres noches, una llegada ruidosa, cena en la casa, una tarde en bote y un DJ que termina a tiempo.",
    ),
    nights: 3,
    guests: 8,
    experienceDiscount: 0.15,
    items: [
      { experienceSlug: "party-bus", optionId: "bus-sjo", dayOffset: 0, time: "14:00", groupSize: 8 },
      { experienceSlug: "grocery-prestock", optionId: "shop-l", dayOffset: 0, time: "09:00", groupSize: 8 },
      { experienceSlug: "private-chef", optionId: "di-l", dayOffset: 0, time: "18:30", groupSize: 8 },
      { experienceSlug: "party-yacht", optionId: "yacht-aft", dayOffset: 1, time: "13:00", groupSize: 8 },
      { experienceSlug: "dj", optionId: "dj-4", dayOffset: 2, time: "18:00", groupSize: 8 },
      { experienceSlug: "airport-transfer", optionId: "van", dayOffset: 3, time: "10:00", groupSize: 8 },
    ],
    days: [
      {
        title: c("Land loud, eat quietly", "Llegar fuerte, cenar en calma"),
        detail: c(
          "The party bus meets the flight. The kitchen is already stocked. A chef serves dinner at the house so the first night does not depend on a reservation in town.",
          "El bus de fiesta recoge el vuelo. La cocina ya está surtida. Un chef sirve la cena en la casa para que la primera noche no dependa de una reserva en el pueblo.",
        ),
      },
      {
        title: c("The boat", "El bote"),
        detail: c(
          "An afternoon charter for the group. Back at the pool before anyone needs a plan.",
          "Un charter de tarde para el grupo. De vuelta en la piscina antes de que alguien necesite un plan.",
        ),
      },
      {
        title: c("Music, then sleep", "Música y luego dormir"),
        detail: c(
          "A DJ at the house for four hours. The set ends before quiet hours. The van to the airport is the next morning.",
          "Un DJ en la casa por cuatro horas. El set termina antes del silencio. La van al aeropuerto es a la mañana siguiente.",
        ),
      },
    ],
  },
  {
    slug: "family-week",
    title: c("Family beach week", "Semana de playa en familia"),
    occasion: "family",
    summary: c(
      "Seven nights, the kitchen ready, one breakfast cooked for you, and a day in Manuel Antonio.",
      "Siete noches, la cocina lista, un desayuno cocinado para ustedes y un día en Manuel Antonio.",
    ),
    nights: 7,
    guests: 6,
    experienceDiscount: 0.1,
    items: [
      { experienceSlug: "airport-transfer", optionId: "van-rt", dayOffset: 0, time: "12:00", groupSize: 6 },
      { experienceSlug: "grocery-prestock", optionId: "shop-l", dayOffset: 0, time: "09:00", groupSize: 6 },
      { experienceSlug: "private-chef", optionId: "bk-l", dayOffset: 1, time: "08:00", groupSize: 6 },
      { experienceSlug: "manuel-antonio", optionId: "ma-p", dayOffset: 3, time: "07:00", groupSize: 6 },
      { experienceSlug: "housekeeping", optionId: "tidy", dayOffset: 4, time: "09:00", groupSize: 6 },
    ],
    days: [
      {
        title: c("Arrive to a stocked kitchen", "Llegar a una cocina surtida"),
        detail: c(
          "A van both ways. Groceries are put away before you land, so the first evening is sandwiches, not a hunt for a store.",
          "Van de ida y vuelta. Los víveres quedan guardados antes de aterrizar, así que la primera noche es un sándwich y no una búsqueda de súper.",
        ),
      },
      {
        title: c("One breakfast you do not cook", "Un desayuno que no cocinas"),
        detail: c(
          "The second morning, a chef handles breakfast for the group. The other mornings are yours.",
          "La segunda mañana, un chef hace el desayuno del grupo. Las demás mañanas son de ustedes.",
        ),
      },
      {
        title: c("Manuel Antonio, then a reset", "Manuel Antonio y luego un reinicio"),
        detail: c(
          "A private guide and van south for the park. The next day the house is tidied while you are out.",
          "Guía y van privados hacia el sur, al parque. Al día siguiente la casa se ordena mientras salen.",
        ),
      },
    ],
  },
  {
    slug: "fishing-escape",
    title: c("Fishing escape", "Escapada de pesca"),
    occasion: "fishing",
    summary: c(
      "Four nights, a private boat out of Los Sueños, dinner when you get back, and the airport handled.",
      "Cuatro noches, un bote privado desde Los Sueños, cena al regresar y el aeropuerto resuelto.",
    ),
    nights: 4,
    guests: 4,
    experienceDiscount: 0.12,
    items: [
      { experienceSlug: "airport-transfer", optionId: "van-rt", dayOffset: 0, time: "11:00", groupSize: 4 },
      { experienceSlug: "deep-sea-fishing", optionId: "fish-full-p", dayOffset: 1, time: "06:30", groupSize: 4 },
      { experienceSlug: "private-chef", optionId: "di-s", dayOffset: 1, time: "18:30", groupSize: 4 },
      { experienceSlug: "massage", optionId: "60", dayOffset: 2, time: "16:00", groupSize: 1 },
    ],
    days: [
      {
        title: c("Settle", "Instalarse"),
        detail: c(
          "The van from SJO. An easy evening at the pool so the boat day starts with sleep.",
          "La van desde el SJO. Una tarde fácil en la piscina para que el día de bote empiece con sueño.",
        ),
      },
      {
        title: c("The boat, then dinner", "El bote y luego la cena"),
        detail: c(
          "A private full-day charter. A chef has dinner ready when the marina is behind you.",
          "Un charter privado de día completo. Un chef tiene la cena lista cuando la marina ya quedó atrás.",
        ),
      },
      {
        title: c("Do very little", "Hacer muy poco"),
        detail: c(
          "A massage at the house. The other hours are unstructured on purpose.",
          "Un masaje en la casa. Las otras horas quedan libres a propósito.",
        ),
      },
    ],
  },
];

export type PackageQuote = {
  lodging: number;
  cleaning: number;
  iva: number;
  experiences: number;
  discount: number;
  total: number;
  lines: { slug: string; optionId: string; label: Copy; amount: number }[];
};

export function quotePackage(pkg: StayPackage): PackageQuote {
  const lines = pkg.items.map((item) => {
    const experience = getExperience(item.experienceSlug);
    const option = experience ? optionById(experience, item.optionId) : undefined;
    if (!experience || !option) {
      throw new Error(`Package ${pkg.slug} references ${item.experienceSlug}/${item.optionId}`);
    }
    return {
      slug: experience.slug,
      optionId: option.id,
      label: option.label,
      amount: lineTotal(option, item.groupSize),
    };
  });
  const experiencesTotal = lines.reduce((sum, line) => sum + line.amount, 0);
  const discount = Math.round(experiencesTotal * pkg.experienceDiscount);
  const lodging = rates.green * pkg.nights;
  const cleaning = rates.cleaning;
  const iva = Math.round((lodging + cleaning) * rates.iva);
  return {
    lodging,
    cleaning,
    iva,
    experiences: experiencesTotal,
    discount,
    total: lodging + cleaning + iva + experiencesTotal - discount,
    lines,
  };
}

export function getPackage(slug: string): StayPackage | undefined {
  return packages.find((item) => item.slug === slug);
}
