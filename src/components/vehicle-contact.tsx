import { useState } from 'react';
import { CalendarDays, Copy, Download, Heart, MessageCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { SOCIAL_URLS, whatsappLink } from '@/lib/socials';
import type { Vehicle } from '@/lib/vehicles';

export function VehicleContact({ car }: { car: Vehicle }) {
  const [intent, setIntent] = useState('');
  const [date, setDate] = useState('');
  const [copied, setCopied] = useState(false);
  const message = `Hola, ${intent === 'Agendar una visita' ? 'quisiera agendar una visita para ver' : 'quisiera consultar la disponibilidad y recibir información sobre'} el ${car.name}, modelo ${car.model}, año ${car.year}.${date && intent === 'Agendar una visita' ? ` Fecha propuesta: ${date} (por confirmar).` : ''}`;
  const whatsapp = whatsappLink(SOCIAL_URLS.whatsapp, message);
  function open(label: string) { setIntent(label); setDate(''); setCopied(false); }
  async function copy() { try { await navigator.clipboard.writeText(message); setCopied(true); } catch { setCopied(false); } }
  function download() {
    const url = URL.createObjectURL(new Blob([message], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = `consulta-${car.slug}.txt`; link.click(); URL.revokeObjectURL(url);
  }
  return <>
    <div className="grid gap-3" aria-label="Contactar sobre este vehículo">
      <Button size="lg" className="h-12 w-full" onClick={() => open('Me interesa este vehículo')}><Heart />Me interesa este vehículo</Button>
      <Button variant="outline" size="lg" className="h-12 w-full" onClick={() => open('Consultar por WhatsApp')}><MessageCircle />Consultar por WhatsApp</Button>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <Button variant="outline" className="h-12" onClick={() => open('Solicitar información')}><Send />Solicitar información</Button>
        <Button variant="outline" className="h-12" onClick={() => open('Agendar una visita')}><CalendarDays />Agendar una visita</Button>
      </div>
    </div>
    <Dialog open={Boolean(intent)} onOpenChange={open => { if (!open) setIntent(''); }}>
      <DialogContent className="max-h-[90vh] w-[calc(100%-2rem)] overflow-y-auto rounded-lg">
        <DialogTitle>{intent}</DialogTitle>
        <DialogDescription>{car.name} · {car.year}</DialogDescription>
        {intent === 'Agendar una visita' && <label className="grid gap-2 text-sm font-semibold">Fecha propuesta<input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full rounded-md border border-input bg-background p-3" /><span className="font-normal text-muted-foreground">La visita requiere confirmación de AUTO VALLE.</span></label>}
        <label className="grid gap-2 text-sm font-semibold">Tu consulta<textarea readOnly value={message} rows={5} className="w-full resize-none rounded-md border border-input bg-muted p-3 font-normal" /></label>
        {whatsapp ? <Button asChild><a href={whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle />Abrir WhatsApp</a></Button> : <p role="status" className="text-sm text-muted-foreground">El contacto de WhatsApp aún no está disponible. Puedes guardar tu consulta; no se enviará ni se reservará una visita.</p>}
        <div className="flex flex-wrap gap-2"><Button variant="outline" onClick={copy}><Copy />{copied ? 'Copiado' : 'Copiar consulta'}</Button><Button variant="outline" onClick={download}><Download />Guardar consulta</Button></div>
      </DialogContent>
    </Dialog>
  </>;
}