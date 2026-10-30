import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { CARS, CATEGORY_OPTIONS, isUnavailable, priceLabel } from "@/lib/vehicles";
import { ValleHeader } from "@/components/valle-header";

const CAT_IDS = ["sedan", "suv", "van", "trabajo", "deportivos"] as const;
const searchSchema = z.object({ cat: z.enum(CAT_IDS).optional().catch(undefined) });

export const Route = createFileRoute("/catalogo")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Catálogo — AUTO VALLE" },
      { name: "description", content: "Catálogo de autos americanos de AUTO VALLE: sedan, SUV, vans, camionetas de trabajo y deportivos." },
      { property: "og:title", content: "Catálogo — AUTO VALLE" },
      { property: "og:description", content: "Filtra y busca autos americanos por categoría en AUTO VALLE." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Catalogo,
});

const CATS = [{ id: undefined, label: "Todos" }, ...CATEGORY_OPTIONS] as const;

function Catalogo() {
  const { cat } = Route.useSearch();
  const navigate = useNavigate({ from: "/catalogo" });
  const [q, setQ] = useState("");
  const cars = useMemo(
    () => CARS.filter((c) => (!cat || c.cat === cat) && c.name.toLowerCase().includes(q.trim().toLowerCase())),
    [cat, q],
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ValleHeader />
      <main className="mx-auto w-full max-w-[1600px] px-4 py-12 sm:px-8 lg:px-12">
        <Button asChild variant="link" className="mb-4 h-auto p-0 text-muted-foreground"><Link to="/"><ArrowLeft />Volver a Inicio</Link></Button>
        <h1 className="font-display text-6xl">Catálogo</h1>
        <p className="mt-2 text-muted-foreground">El precio de cada vehículo indica su moneda; los precios de ejemplo están identificados.</p>
        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div role="group" aria-label="Filtrar por categoría" className="flex flex-wrap gap-2">
            {CATS.map((c) => (
              <Button
                variant="ghost"
                key={c.label}
                onClick={() => navigate({ search: c.id ? { cat: c.id } : {} })}
                aria-pressed={cat === c.id}
                className={`h-auto min-h-10 max-w-full whitespace-normal rounded-full px-5 py-2 text-left font-semibold transition ${cat === c.id ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground" : "bg-card hover:bg-accent"}`}
              >
                {c.label}
              </Button>
            ))}
          </div>
          <label className="lg:w-80">
            <span className="sr-only">Buscar por nombre</span>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar auto por nombre…" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-base outline-none focus:ring-2 focus:ring-ring" />
          </label>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {cars.map((c) => {
            const unavailable = isUnavailable(c);
            return (
            <article key={c.slug} className={`group relative overflow-hidden rounded-2xl bg-card text-card-foreground shadow-card transition duration-300 hover:-translate-y-2 ${unavailable ? "opacity-75 grayscale" : ""}`}>
              <Link to="/autos/$slug" params={{ slug: c.slug }} aria-label={`Ver detalles de ${c.name} ${c.year}${unavailable ? " (No disponible)" : ""}`} className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset">
                <div className="relative overflow-hidden">
                  <img src={c.img} alt={c.name} loading="lazy" width={1024} height={768} className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105" />
                  {unavailable && <span className="absolute left-4 top-4 rounded-full bg-foreground px-4 py-1.5 text-sm font-bold uppercase text-background">No disponible</span>}
                </div>
                <div className="p-6">
                  <div className="flex items-baseline justify-between gap-2">
                    <h2 className="font-display text-3xl">{c.name}</h2>
                    <span className="text-sm font-semibold text-muted-foreground">{c.year}</span>
                  </div>
                  <p className="mt-2 text-muted-foreground">{c.desc}</p>
                  <p className="mt-4 text-2xl font-bold text-primary">{priceLabel(c)}</p>
                </div>
              </Link>
            </article>
            );
          })}
        </div>
        {cars.length === 0 && <p className="mt-10 text-center text-lg text-muted-foreground">{q.trim() ? "No encontramos autos con esa búsqueda." : "Por ahora no hay vehículos registrados en esta categoría."}</p>}
      </main>
    </div>
  );
}
