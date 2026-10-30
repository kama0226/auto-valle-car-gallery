import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Images } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Vehicle } from '@/lib/vehicles';

export function VehicleGallery({ car }: { car: Vehicle }) {
  const [ref, api] = useEmblaCarousel({ loop: car.photos.length > 1 });
  const [selected, setSelected] = useState(0);
  const update = useCallback(() => setSelected(api?.selectedScrollSnap() ?? 0), [api]);
  useEffect(() => { if (!api) return; update(); api.on('select', update); return () => { api.off('select', update); }; }, [api, update]);
  return <section aria-label={`Fotografías de ${car.name}`}>
    <div className="relative overflow-hidden rounded-lg bg-muted">
      <div ref={ref} className="overflow-hidden"><div className="flex touch-pan-y">{car.photos.map((photo, i) => <div key={`${photo.src}-${i}`} className="min-w-0 flex-[0_0_100%]"><img src={photo.src} alt={`${car.name} — ${photo.label}`} className="aspect-[4/3] w-full object-contain" fetchPriority={i === 0 ? 'high' : 'auto'} /></div>)}</div></div>
      <div className="absolute bottom-4 right-4 rounded-md bg-background/90 px-3 py-1 text-sm font-semibold">{selected + 1} / {car.photos.length}</div>
      <Button variant="outline" size="icon" title="Fotografía anterior" aria-label="Fotografía anterior" disabled={car.photos.length < 2} onClick={() => api?.scrollPrev()} className="absolute left-3 top-1/2 -translate-y-1/2 bg-background/90"><ChevronLeft /></Button>
      <Button variant="outline" size="icon" title="Fotografía siguiente" aria-label="Fotografía siguiente" disabled={car.photos.length < 2} onClick={() => api?.scrollNext()} className="absolute right-3 top-1/2 -translate-y-1/2 bg-background/90"><ChevronRight /></Button>
    </div>
    <div className="mt-3 flex gap-3 overflow-x-auto pb-2">{car.photos.map((photo, i) => <Button key={`${photo.src}-${i}`} variant="ghost" onClick={() => api?.scrollTo(i)} aria-label={`Ver fotografía ${i + 1}: ${photo.label}`} aria-pressed={selected === i} className={`h-20 w-28 shrink-0 overflow-hidden rounded-md border-2 p-0 ${selected === i ? 'border-primary' : 'border-transparent'}`}><img src={photo.src} alt="" className="h-full w-full object-cover" /></Button>)}</div>
    {car.photos.length === 1 && <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground"><Images className="size-4 shrink-0" />Fotografías adicionales: Consultar información.</p>}
  </section>;
}