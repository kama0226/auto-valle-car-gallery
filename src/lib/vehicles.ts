import jetta from "@/assets/volkswagen-jetta-2018.png.asset.json";
import corolla from "@/assets/toyota-corolla-2017.png.asset.json";
import sienna from "@/assets/toyota-sienna-2017.png.asset.json";
import rogue from "@/assets/nissan-rogue-2018.png.asset.json";
import ram from "@/assets/ram-1500.jpg";
import jetta2017 from "@/assets/volkswagen-jetta-2017.png.asset.json";

export const CATEGORY_OPTIONS = [
  { id: "sedan", label: "SEDAN" },
  { id: "suv", label: "SUV" },
  { id: "van", label: "CAMIONETAS FAMILIARES (VAN)" },
  { id: "trabajo", label: "CAMIONETAS DE TRABAJO" },
  { id: "deportivos", label: "DEPORTIVOS" },
] as const;
export type CatalogCat = (typeof CATEGORY_OPTIONS)[number]["id"];
export type Cat = CatalogCat | "clasicos";
export const categoryLabel = (cat: Cat) => CATEGORY_OPTIONS.find((option) => option.id === cat)?.label ?? "Clásicos";
export type Vehicle = {
  slug: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  cat: Cat;
  img: string;
  desc: string;
  price: string | null;
  photos: { src: string; label: string }[];
  specs: Partial<Record<string, string>>;
  currency?: "MXN";
  priceConfirmed?: boolean;
  equipment?: string[];
  sellerNotes?: string[];
};
const records = [
  {
    slug: "volkswagen-jetta-2018",
    name: "Volkswagen Jetta",
    brand: "Volkswagen",
    model: "Jetta TSI SEL",
    year: 2018,
    cat: "sedan",
    img: jetta.url,
    desc: "Volkswagen Jetta TSI, versión SEL (más equipado), con motor 1.8 turbo y transmisión automática.",
    price: "$178,000",
    currency: "MXN",
    priceConfirmed: true,
    specs: {
      Kilometraje: "72.000 km",
      Motor: "1.8 TSI (Turbo)",
      Cilindros: "4",
      Transmisión: "Automática",
      Combustible: "Gasolina",
      "Color exterior": "Azul",
      "Color interior": "Negro",
      "Estado general": "Excelentes condiciones",
      Disponibilidad: "Disponible",
      Ubicación: "Culiacán Rosales, Sinaloa",
    },
    equipment: [
      "Quemacocos",
      "Interiores de piel eléctricos",
      "Aire de doble zona",
      "Rines de lujo de 17 pulgadas",
      "Llave de presencia",
      "Encendido de botón",
      "Sensores de rebase",
      "Sensores de radar frontal",
      "Cámara de reversa",
      "Sistema de navegación de agencia",
      "Apple CarPlay",
      "Android Auto",
    ],
    sellerNotes: [
      "Legalizado por pedimento (Aduana)",
      "Puede emplacar en cualquier estado de México",
      "Garantía total en documentos",
      "Precio poco negociable",
      "No cambios",
    ],
  },
  {
    slug: "toyota-corolla-2017",
    name: "Toyota Corolla",
    brand: "Toyota",
    model: "Corolla Sport",
    year: 2017,
    cat: "sedan",
    img: corolla.url,
    desc: "Toyota Corolla Sport 2017, automático, con 82.000 km, cámara de reversa y faros LED.",
    price: "$208,000",
    currency: "MXN",
    priceConfirmed: true,
    specs: {
      Kilometraje: "82.000 km",
      Cilindros: "4",
      Transmisión: "Automática",
      Combustible: "Gasolina",
      "Color exterior": "Rojo",
      "Color interior": "Negro",
      "Estado general": "Excelentes Condiciones",
      Disponibilidad: "Disponible",
      Ubicación: "Culiacán Rosales, Sinaloa",
    },
    equipment: [
      "Rines de lujo de 17 pulgadas",
      "Pantalla",
      "Cámara de reversa",
      "Sensor frontal de alcance",
      "Faros LED",
      "Faros de niebla LED",
    ],
    sellerNotes: [
      "Legalizado por pedimento (Aduana)",
      "Sale facturado a nombre del comprador",
      "No paga cambio de propietario",
      "Puede emplacar en cualquier estado de México",
      "No cambios, solo venta",
    ],
  },
  {
    slug: "toyota-sienna-2017",
    name: "Toyota Sienna",
    brand: "Toyota",
    model: "Sienna SE (Sport Edition)",
    year: 2017,
    cat: "van",
    img: sienna.url,
    desc: "Toyota Sienna SE (Sport Edition) 2017, automática, con 87.000 km, interiores de piel y aire de triple zona.",
    price: null,
    specs: {
      Kilometraje: "87.000 km",
      Cilindros: "6",
      Transmisión: "Automática",
      Combustible: "Gasolina",
      "Color exterior": "Blanco",
      "Color interior": "Negro",
      "Estado general": "Excelentes condiciones",
      Disponibilidad: "Disponible",
      Ubicación: "Culiacán Rosales, Sinaloa",
    },
    equipment: [
      "Modo Eco",
      "Faros LED",
      "Pantalla",
      "Cámara de reversa",
      "Apple CarPlay",
      "Android Auto",
      "Puertas eléctricas",
      "Aire de triple zona",
      "Rines de lujo de 19 pulgadas",
      "Interiores de piel color negro",
    ],
    sellerNotes: [
      "A toda prueba",
      "Muy limpia por dentro",
      "Legalizada por pedimento (Aduana)",
      "Sale facturada a nombre del comprador",
    ],
  },
  {
    slug: "ram-1500",
    name: "Ram 1500",
    brand: "Ram",
    model: "1500",
    year: 2023,
    cat: "trabajo",
    img: ram,
    desc: "Confort de lujo con gran capacidad de remolque.",
    price: "$45,500",
    specs: {},
  },
  {
    slug: "nissan-rogue-2018",
    name: "Nissan Rogue",
    brand: "Nissan",
    model: "Rogue (X-Trail) SV AWD",
    year: 2018,
    cat: "suv",
    img: rogue.url,
    desc: "Nissan Rogue (X-Trail) SV AWD 2018, automática, con 85.000 km, tracción integral y llantas nuevas.",
    price: "$195,000",
    currency: "MXN",
    priceConfirmed: true,
    specs: {
      Kilometraje: "85.000 km",
      Cilindros: "4",
      Transmisión: "Automática",
      Combustible: "Gasolina",
      Tracción: "AWD",
      "Color exterior": "Azul",
      "Color interior": "Negro",
      "Estado general": "Excelentes condiciones",
      Disponibilidad: "Disponible",
    },
    equipment: [
      "Modo Eco",
      "Pantalla",
      "Cámara de reversa",
      "Sensores de rebase",
      "Sensor radar de alcance",
      "Llave de presencia",
      "Encendido de botón",
      "Llantas nuevas",
      "Rines de lujo",
      "Barras de techo con porta equipajes",
    ],
    sellerNotes: [
      "Sin detalles",
      "Interiores impecables",
      "Legalizada por pedimento (Aduana)",
      "Saldría facturada a nombre del comprador",
      "Lista para placas de cualquier Estado de México",
    ],
  },
  {
    slug: "volkswagen-jetta-2017",
    name: "Volkswagen Jetta",
    brand: "Volkswagen",
    model: "Jetta TSI",
    year: 2017,
    cat: "sedan",
    img: jetta2017.url,
    desc: "Volkswagen Jetta TSI 2017, versión equipada, motor 1.4 TSI de 4 cilindros, automático, con 82.000 km.",
    price: "$182,000",
    currency: "MXN",
    priceConfirmed: true,
    specs: {
      Kilometraje: "82.000 km",
      Motor: "1.4 TSI",
      Cilindros: "4",
      Transmisión: "Automática",
      "Color exterior": "Negro",
      "Color interior": "Negro",
      "Estado general": "Excelentes condiciones",
      Disponibilidad: "Disponible",
      Ubicación: "Culiacán Rosales, Sinaloa",
    },
    equipment: [
      "Pantalla",
      "Cámara de reversa",
      "Sensores de rebase",
      "Sensores de tráfico cruzado",
      "Interiores en piel",
      "Llave de presencia",
      "Encendido de botón",
    ],
    sellerNotes: [
      "Legalizado por pedimento",
      "Título limpio",
      "Sale factura a nombre del comprador",
    ],
  },
] satisfies Omit<Vehicle, "photos">[];
export const CARS: Vehicle[] = records.map((car) => ({
  ...car,
  photos: [{ src: car.img, label: "Fotografía del catálogo" }],
}));
export const getVehicle = (slug: string) => CARS.find((car) => car.slug === slug);
export const SPEC_LABELS = [
  "Marca",
  "Modelo",
  "Año",
  "Precio",
  "Kilometraje",
  "Motor",
  "Cilindros",
  "Transmisión",
  "Combustible",
  "Tracción",
  "Color exterior",
  "Color interior",
  "Puertas",
  "Estado general",
  "Ubicación",
  "VIN",
  "Disponibilidad",
];
export const priceLabel = (car: Vehicle) =>
  car.price === null
    ? "Consultar información"
    : `${car.price} ${car.currency ?? "USD"}${car.priceConfirmed ? "" : " (precio de ejemplo)"}`;
export function vehicleSpec(car: Vehicle, label: string): string {
  const known: Record<string, string> = {
    Marca: car.brand,
    Modelo: car.model,
    Año: String(car.year),
    Precio: priceLabel(car),
  };
  return known[label] ?? car.specs[label] ?? "Consultar información";
}
export function relatedVehicles(car: Vehicle) {
  return CARS.filter((other) => other.slug !== car.slug)
    .sort((a, b) => Number(b.cat === car.cat) - Number(a.cat === car.cat))
    .slice(0, 3);
}
