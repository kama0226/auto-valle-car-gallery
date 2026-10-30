import jetta from "@/assets/volkswagen-jetta-2018.png.asset.json";
import rogueExtra1 from "@/assets/nissan-rogue-2018-extra-1.png.asset.json";
import rogueExtra2 from "@/assets/nissan-rogue-2018-extra-2.png.asset.json";
import rogueExtra3 from "@/assets/nissan-rogue-2018-extra-3.png.asset.json";
import rogueExtra4 from "@/assets/nissan-rogue-2018-extra-4.png.asset.json";
import rogueExtra5 from "@/assets/nissan-rogue-2018-extra-5.png.asset.json";
import rogueExtra6 from "@/assets/nissan-rogue-2018-extra-6.png.asset.json";
import rogueExtra7 from "@/assets/nissan-rogue-2018-extra-7.png.asset.json";
import corollaExtra1 from "@/assets/toyota-corolla-2017-extra-1.png.asset.json";
import corollaExtra2 from "@/assets/toyota-corolla-2017-extra-2.png.asset.json";
import corollaExtra3 from "@/assets/toyota-corolla-2017-extra-3.png.asset.json";
import corollaExtra4 from "@/assets/toyota-corolla-2017-extra-4.png.asset.json";
import corollaExtra5 from "@/assets/toyota-corolla-2017-extra-5.png.asset.json";
import siennaExtra1 from "@/assets/toyota-sienna-2017-extra-1.png.asset.json";
import siennaExtra2 from "@/assets/toyota-sienna-2017-extra-2.png.asset.json";
import siennaExtra3 from "@/assets/toyota-sienna-2017-extra-3.png.asset.json";
import siennaExtra4 from "@/assets/toyota-sienna-2017-extra-4.png.asset.json";
import siennaExtra5 from "@/assets/toyota-sienna-2017-extra-5.png.asset.json";
import jetta2018Extra1 from "@/assets/volkswagen-jetta-2018-extra-1.png.asset.json";
import jetta2018Extra2 from "@/assets/volkswagen-jetta-2018-extra-2.png.asset.json";
import jetta2018Extra3 from "@/assets/volkswagen-jetta-2018-extra-3.png.asset.json";
import jetta2018Extra4 from "@/assets/volkswagen-jetta-2018-extra-4.png.asset.json";
import jetta2018Extra5 from "@/assets/volkswagen-jetta-2018-extra-5.png.asset.json";
import jetta2018Extra6 from "@/assets/volkswagen-jetta-2018-extra-6.png.asset.json";
import corolla from "@/assets/toyota-corolla-2017.png.asset.json";
import sienna from "@/assets/toyota-sienna-2017.png.asset.json";
import rogue from "@/assets/nissan-rogue-2018.png.asset.json";
import jetta2016 from "@/assets/volkswagen-jetta-2016.png.asset.json";
import jetta2017Front from "@/assets/volkswagen-jetta-2017-1.png.asset.json";
import jetta2017ThreeQuarter from "@/assets/volkswagen-jetta-2017-2.png.asset.json";
import jetta2017RearThreeQuarter from "@/assets/volkswagen-jetta-2017-3.png.asset.json";
import jetta2017Rear from "@/assets/volkswagen-jetta-2017-4.png.asset.json";
import jetta2017Dashboard from "@/assets/volkswagen-jetta-2017-5.png.asset.json";
import jetta2017Seats from "@/assets/volkswagen-jetta-2017-6.png.asset.json";

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
  /** Owner-supplied photos shown after the cover photo in the gallery. */
  extraPhotos?: { src: string; label: string }[];
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
    extraPhotos: [jetta2018Extra1, jetta2018Extra2, jetta2018Extra3, jetta2018Extra4, jetta2018Extra5, jetta2018Extra6].map((photo, index) => ({
      src: photo.url,
      label: `Fotografía adicional ${index + 1}`,
    })),
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
    extraPhotos: [corollaExtra1, corollaExtra2, corollaExtra3, corollaExtra4, corollaExtra5].map((photo, index) => ({
      src: photo.url,
      label: `Fotografía adicional ${index + 1}`,
    })),
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
    extraPhotos: [siennaExtra1, siennaExtra2, siennaExtra3, siennaExtra4, siennaExtra5].map((photo, index) => ({
      src: photo.url,
      label: `Fotografía adicional ${index + 1}`,
    })),
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
    slug: "volkswagen-jetta-2016",
    name: "Volkswagen Jetta",
    brand: "Volkswagen",
    model: "Jetta GLI",
    year: 2016,
    cat: "sedan",
    img: jetta2016.url,
    desc: "Volkswagen Jetta GLI 2016, 4 cilindros, automático, con 69.000 km, quemacocos y sonido Fender.",
    price: "$195,000",
    currency: "MXN",
    priceConfirmed: true,
    specs: {
      Kilometraje: "69.000 km",
      Cilindros: "4",
      Transmisión: "Automática",
      "Color exterior": "Negro",
      "Color interior": "Negro",
      "Estado general": "Excelentes condiciones",
      Disponibilidad: "No disponible",
      Ubicación: "Culiacán Rosales, Sinaloa",
    },
    equipment: [
      "Cambios al volante",
      "Aire acondicionado",
      "Cámara de reversa",
      "Sensores de proximidad",
      "Clúster digital",
      "Apple CarPlay y Android Auto de agencia",
      "Faros LED delanteros secuenciales",
      "Calaveras traseras LED",
      "Quemacocos",
      "Asientos de piel con costuras rojas",
      "Sonido Fender",
      "Encendido de botón",
      "Llave de presencia",
    ],
    sellerNotes: [
      "Muy bonito, sin detalles",
      "Se va rodando a donde quiera",
      "Legalizado por pedimento",
      "Listo para factura y placas a su nombre",
    ],
  },
  {
    slug: "nissan-rogue-2018",
    name: "Nissan Rogue",
    brand: "Nissan",
    model: "Rogue (X-Trail) SV AWD",
    year: 2018,
    cat: "suv",
    img: rogue.url,
    extraPhotos: [rogueExtra1, rogueExtra2, rogueExtra3, rogueExtra4, rogueExtra5, rogueExtra6, rogueExtra7].map((photo, index) => ({
      src: photo.url,
      label: `Fotografía adicional ${index + 1}`,
    })),
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
    img: jetta2017Front.url,
    extraPhotos: [
      { src: jetta2017ThreeQuarter.url, label: "Vista frontal lateral" },
      { src: jetta2017RearThreeQuarter.url, label: "Vista trasera lateral" },
      { src: jetta2017Rear.url, label: "Vista trasera" },
      { src: jetta2017Dashboard.url, label: "Tablero y quemacocos" },
      { src: jetta2017Seats.url, label: "Asientos delanteros" },
    ],
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
export const CARS: Vehicle[] = records.map((car: Omit<Vehicle, "photos">) => ({
  ...car,
  photos: [{ src: car.img, label: "Fotografía del catálogo" }, ...(car.extraPhotos ?? [])],
}));
export const getVehicle = (slug: string) => CARS.find((car) => car.slug === slug);
export const isUnavailable = (car: Vehicle) => car.specs["Disponibilidad"] === "No disponible";
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
