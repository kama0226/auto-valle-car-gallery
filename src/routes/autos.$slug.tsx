import { createFileRoute, Link, notFound, redirect } from '@tanstack/react-router';
import { ArrowLeft, ArrowRight, Car, Gauge, MapPin, Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ValleHeader } from '@/components/valle-header';
import { VehicleGallery } from '@/components/vehicle-gallery';
import { VehicleContact } from '@/components/vehicle-contact';
import { getVehicle, relatedVehicles, SPEC_LABELS, vehicleSpec, categoryLabel, priceLabel } from '@/lib/vehicles';

export const Route = createFileRoute('/autos/$slug')({
  loader: ({ params }) => { if (params.slug === 'ford-mustang-gt') throw redirect({ to: '/autos/$slug', params: { slug: 'volkswagen-jetta-2018' } }); if (params.slug === 'chevrolet-corvette-stingray') throw redirect({ to: '/autos/$slug', params: { slug: 'toyota-corolla-2017' } }); if (params.slug === 'ford-f-150') throw redirect({ to: '/autos/$slug', params: { slug: 'toyota-sienna-2017' } }); if (params.slug === 'chevrolet-bel-air') throw redirect({ to: '/autos/$slug', params: { slug: 'nissan-rogue-2018' } }); const car = getVehicle(params.slug); if (!car) throw notFound(); return { car }; },
  head: ({ loaderData }) => {
    const car = loaderData?.car;
    const title = car ? `${car.name} ${car.year} — AUTO VALLE` : 'Vehículo no encontrado — AUTO VALLE';
    const description = car ? `${car.desc} Consulta fotografías, información y disponibilidad de este ${car.name} ${car.year} en AUTO VALLE.${car.price === null || car.priceConfirmed ? '' : ' Precio ilustrativo.'}` : 'Consulta el catálogo de vehículos de AUTO VALLE.';
    return { meta: [{ title }, { name: 'description', content: description }, { property: 'og:title', content: title }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] };
  },
  component: VehicleDetail,
  notFoundComponent: () => <DetailUnavailable />,
  errorComponent: ({ reset }) => <DetailUnavailable retry={reset} />,
});

function DetailUnavailable({ retry }: { retry?: () => void }) {
  return <><ValleHeader /><main className="mx-auto max-w-[1600px] px-4 sm:px-8 lg:px-12 py-20"><h1 className="font-display text-5xl">Vehículo no disponible</h1><p className="my-6 text-muted-foreground">Consulta otros vehículos en nuestro catálogo.</p><Button asChild><Link to="/catalogo"><ArrowLeft />Volver al catálogo</Link></Button>{retry && <Button variant="outline" className="ml-3" onClick={retry}>Intentar de nuevo</Button>}</main></>;
}

function VehicleDetail() {
  const { car } = Route.useLoaderData();
  return <div className="min-h-screen bg-background text-foreground">
    <ValleHeader />
    <main className="mx-auto max-w-[1600px] px-4 sm:px-8 lg:px-12 pb-16 pt-8">
      <Button asChild variant="link" className="mb-6 h-auto p-0 text-muted-foreground"><Link to="/catalogo"><ArrowLeft />Volver al catálogo</Link></Button>
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div><p className="mb-2 text-sm font-semibold uppercase text-primary">{categoryLabel(car.cat)} · {car.year}</p><h1 className="font-display text-5xl sm:text-6xl">{car.name}</h1></div>
        <p className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="size-4 shrink-0" />Ubicación: {vehicleSpec(car, 'Ubicación')}</p>
      </div>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <VehicleGallery key={car.slug} car={car} />
        <aside className="lg:sticky lg:top-24">
          {car.price === null ? <><p className="text-sm text-muted-foreground">Precio</p><p className="mt-2 text-2xl font-bold text-primary">{priceLabel(car)}</p></> : <><p className="text-sm text-muted-foreground">{car.priceConfirmed ? 'Precio en pesos mexicanos' : 'Precio ilustrativo en dólares'}</p>
          <p className="mt-2 text-4xl font-bold text-primary">{car.price} <span className="text-base font-medium">{car.currency ?? 'USD'}</span></p>
          <p className="mt-1 text-xs text-muted-foreground">{car.priceConfirmed ? (car.sellerNotes?.find(note => note === 'Precio poco negociable') ?? 'Precio indicado por el vendedor.') : 'Precio de ejemplo; confirmar el precio de esta unidad.'}</p></>}
          <div className="my-6 border-y border-border py-4"><p className="text-sm font-semibold">Disponibilidad</p><p className="mt-1 text-muted-foreground">{vehicleSpec(car, 'Disponibilidad')}</p></div>
          <VehicleContact key={car.slug} car={car} />
        </aside>
      </div>
      <section className="mt-12 border-t border-border pt-9" aria-labelledby="description-title"><h2 id="description-title" className="font-display text-3xl">Conoce este vehículo</h2><p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">{car.desc}</p>{car.equipment ? <><h3 className="mt-6 text-lg font-semibold">Equipamiento</h3><ul className="mt-3 grid list-inside list-disc gap-2 text-muted-foreground sm:grid-cols-2">{car.equipment.map(item => <li key={item}>{item}</li>)}</ul></> : <p className="mt-3 text-sm text-muted-foreground">Equipamiento y detalles de esta unidad: Consultar información.</p>}{car.sellerNotes && <><h3 className="mt-6 text-lg font-semibold">Información del vendedor</h3><ul className="mt-3 list-inside list-disc space-y-2 text-muted-foreground">{car.sellerNotes.map(item => <li key={item}>{item}</li>)}</ul></>}</section>
      <section className="mt-10" aria-labelledby="spec-title"><h2 id="spec-title" className="font-display text-3xl">Información del automóvil</h2><dl className="mt-5 grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">{SPEC_LABELS.map((label, i) => { const Icon = i % 3 === 0 ? Car : i % 3 === 1 ? Gauge : Settings2; return <div key={label} className="flex gap-3 border-b border-border py-5"><Icon className="mt-1 size-5 shrink-0 text-primary" /><div className="min-w-0"><dt className="text-sm text-muted-foreground">{label}</dt><dd className="mt-1 break-words font-semibold">{vehicleSpec(car, label)}</dd></div></div>; })}</dl></section>
      <section className="mt-14 border-t border-border pt-10" aria-labelledby="related-title"><h2 id="related-title" className="font-display text-4xl">También te puede interesar</h2><div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{relatedVehicles(car).map(other => <article key={other.slug} className="overflow-hidden rounded-lg bg-card shadow-card"><Link to="/autos/$slug" params={{ slug: other.slug }} aria-label={`Ver ${other.name}`}><img src={other.img} alt={other.name} loading="lazy" className="aspect-[4/3] w-full object-cover" /></Link><div className="p-5"><p className="text-sm text-muted-foreground">{other.year}</p><h3 className="mt-1 font-display text-3xl">{other.name}</h3><p className="mt-3 text-xl font-bold text-primary">{priceLabel(other)}</p><Button asChild variant="link" className="mt-4 p-0"><Link to="/autos/$slug" params={{ slug: other.slug }}>Consultar detalles<ArrowRight /></Link></Button></div></article>)}</div></section>
    </main>
    <footer className="border-t border-border px-4 py-8 text-center text-sm text-muted-foreground">© 2026 AUTO VALLE</footer>
  </div>;
}