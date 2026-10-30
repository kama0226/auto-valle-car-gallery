import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent, type ReactNode, type SVGProps } from "react";
import { ArrowRight, Facebook, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { CATEGORY_OPTIONS } from "@/lib/vehicles";
import { SOCIAL_URLS } from "@/lib/socials";
import { ValleHeader } from "@/components/valle-header";
import sedanCategory from "@/assets/category-sedan.jpg";
import suvCategory from "@/assets/category-suv.jpg";
import vanCategory from "@/assets/category-van.jpg";
import workCategory from "@/assets/category-work.jpg";
import sportsCategory from "@/assets/category-sports.jpg";
import cover from "@/assets/auto-valle-cover-3.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AUTO VALLE — Descubre todas nuestras opciones" },
      { name: "description", content: "AUTO VALLE: catálogo de autos americanos, sedan, SUV, vans, camionetas de trabajo y deportivos." },
      { property: "og:title", content: "AUTO VALLE — Descubre todas nuestras opciones" },
      { property: "og:description", content: "Explora los automóviles americanos de AUTO VALLE y consulta sus detalles." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const CATEGORY_IMAGES = { sedan: sedanCategory, suv: suvCategory, van: vanCategory, trabajo: workCategory, deportivos: sportsCategory };

function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

function TikTokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

const SOCIALS: { id: keyof typeof SOCIAL_URLS; label: string; Icon: (p: SVGProps<SVGSVGElement>) => ReactNode }[] = [
  { id: "whatsapp", label: "WhatsApp", Icon: WhatsAppIcon },
  { id: "instagram", label: "Instagram", Icon: (p) => <Instagram {...p} /> },
  { id: "facebook", label: "Facebook", Icon: (p) => <Facebook {...p} /> },
  { id: "tiktok", label: "TikTok", Icon: TikTokIcon },
  { id: "youtube", label: "YouTube", Icon: (p) => <Youtube {...p} /> },
];

const schema = z.object({
  nombre: z.string().trim().min(2, "Escribe tu nombre (mínimo 2 letras).").max(100, "Máximo 100 caracteres."),
  correo: z.string().trim().email("Escribe un correo válido.").max(255),
  mensaje: z.string().trim().min(10, "El mensaje debe tener al menos 10 caracteres.").max(1000, "Máximo 1000 caracteres."),
});

function Index() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [ok, setOk] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const r = schema.safeParse(Object.fromEntries(fd));
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => (errs[String(i.path[0])] ??= i.message));
      setErrors(errs);
      setOk(false);
      return;
    }
    setErrors({});
    setOk(true);
    e.currentTarget.reset();
  };

  const field = "w-full rounded-xl border border-input bg-background px-4 py-3 text-base outline-none focus:ring-2 focus:ring-ring";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ValleHeader />

      <section id="inicio" className="valle-cover">
        <img src={cover.url} alt="Auto deportivo blanco con logotipo AUTO VALLE frente a las montañas al atardecer" width={1799} height={874} fetchPriority="high" className="valle-cover-image" />
        <div className="valle-cover-shade" />
        <div className="valle-cover-content text-hero-foreground">
          <p className="valle-cover-eyebrow">Autos americanos</p>
           <h1 className="valle-cover-title font-display"><span>DESCUBRE TODAS</span><span className="text-cover-highlight">NUESTRAS OPCIONES</span></h1>
           <p className="valle-cover-description">Carros deportivos, camionetas y sedanes para todos los gustos.</p>
          <Button asChild className="valle-cover-button">
            <Link to="/catalogo">Ver catálogo <ArrowRight aria-hidden="true" /></Link>
          </Button>
        </div>
      </section>

      <section aria-labelledby="cat-t" className="mx-auto max-w-[1600px] px-4 sm:px-8 lg:px-12 py-20">
        <h2 id="cat-t" className="font-display text-5xl">Categorías</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 min-[480px]:grid-cols-2 lg:grid-cols-6">
          {CATEGORY_OPTIONS.map(({ id, label }, index) => (
            <Link key={id} to="/catalogo" search={{ cat: id }} className={`group relative block h-64 min-w-0 overflow-hidden rounded-2xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:h-72 ${index < 2 ? 'lg:col-span-3' : 'lg:col-span-2'} ${index === 4 ? 'min-[480px]:col-span-2' : ''}`}>
              <img src={CATEGORY_IMAGES[id]} alt="" loading="lazy" width={1024} height={768} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105 motion-reduce:transition-none" />
              <div className="absolute inset-0 bg-hero-overlay" />
              <span className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-2 font-display text-3xl leading-tight text-hero-foreground"><span>{label}</span><ArrowRight className="mb-1 size-6 shrink-0" aria-hidden="true" /></span>
            </Link>
          ))}
        </div>
      </section>

      <section id="ventajas" className="mx-auto max-w-[1600px] px-4 sm:px-8 lg:px-12 py-20">
        <h2 className="font-display text-5xl">¿Por qué elegir un auto americano?</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            ["Potencia", "Motores V6 y V8 reconocidos por su fuerza y desempeño."],
            ["Espacio y comodidad", "Interiores amplios pensados para viajes largos y familias."],
            ["Historia y estilo", "Diseños icónicos que forman parte de la cultura del automóvil."],
          ].map(([t, d], i) => (
            <div key={t} className="rounded-2xl border border-border bg-card p-8 transition hover:-translate-y-1 hover:border-primary">
              <span className="font-display text-5xl text-primary">0{i + 1}</span>
              <h3 className="mt-2 text-xl font-bold">{t}</h3>
              <p className="mt-2 text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contacto" className="bg-muted py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-8">
          <h2 className="font-display text-5xl">Contacto</h2>
          <p className="mt-2 text-muted-foreground">Nota: este formulario es demostrativo y por ahora no envía mensajes.</p>
          <form onSubmit={submit} noValidate className="mt-8 space-y-5 rounded-2xl bg-card p-6 shadow-card sm:p-8">
            {([["nombre", "Nombre", "text"], ["correo", "Correo electrónico", "email"]] as const).map(([n, l, t]) => (
              <div key={n}>
                <label htmlFor={n} className="mb-1 block font-semibold">{l}</label>
                <input id={n} name={n} type={t} aria-invalid={!!errors[n]} className={field} />
                {errors[n] && <p className="mt-1 text-sm text-destructive">{errors[n]}</p>}
              </div>
            ))}
            <div>
              <label htmlFor="mensaje" className="mb-1 block font-semibold">Mensaje</label>
              <textarea id="mensaje" name="mensaje" rows={5} aria-invalid={!!errors["mensaje"]} className={field} />
              {errors["mensaje"] && <p className="mt-1 text-sm text-destructive">{errors["mensaje"]}</p>}
            </div>
            <button type="submit" className="w-full rounded-full bg-primary py-4 text-lg font-semibold text-primary-foreground transition hover:opacity-90">
              Validar mensaje
            </button>
            {ok && (
              <p role="status" className="rounded-xl bg-accent p-4 text-center font-medium">
                ¡Datos correctos! Este formulario es de ejemplo y el mensaje no fue enviado.
              </p>
            )}
          </form>
        </div>
      </section>

      <footer className="border-t border-border py-14">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 text-center">
          <div>
            <a href="#inicio" className="font-display text-3xl tracking-wide">
              AUTO <span className="text-primary">VALLE</span>
            </a>
            <p className="mt-1 text-sm text-muted-foreground">Pasión por los autos americanos</p>
          </div>
          <div>
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Síguenos y contáctanos
            </p>
            <ul className="flex flex-wrap items-center justify-center gap-4">
              {SOCIALS.map(({ id, label, Icon }) => (
                <li key={id}>
                  <a
                    href={SOCIAL_URLS[id] || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visitar ${label} de AUTO VALLE (se abre en una pestaña nueva)`}
                    title={label}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-card transition duration-300 hover:scale-110 hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 AUTO VALLE · Precios ilustrativos</p>
        </div>
      </footer>
    </div>
  );
}
