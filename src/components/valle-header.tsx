import { Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const NAV = [['inicio', 'Inicio'], ['catalogo', 'Catálogo'], ['ventajas', 'Ventajas'], ['contacto', 'Contacto']] as const;
const navProps = (id: typeof NAV[number][0]) => (id === 'catalogo' ? { to: '/catalogo' as const } : { to: '/' as const, hash: id });
let preferredDark = false;
export function ValleHeader() {
  const [dark, setDark] = useState(false);
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    preferredDark = sessionStorage.getItem('valle-theme') === 'dark';
    setDark(preferredDark);
    document.documentElement.classList.toggle('dark', preferredDark);
  }, []);
  function toggleTheme() {
    preferredDark = !dark;
    setDark(preferredDark);
    sessionStorage.setItem('valle-theme', preferredDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', preferredDark);
  }
  return <header className="sticky top-0 z-50 border-b border-border bg-brand-header text-hero-foreground">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
      <Link to="/" hash="inicio" className="shrink-0 font-display text-3xl">AUTO <span className="text-cover-highlight">VALLE</span></Link>
      <nav aria-label="Principal" className="hidden gap-8 md:flex">{NAV.map(([id, label]) => <Link key={id} {...navProps(id)} className="font-medium hover:text-primary">{label}</Link>)}</nav>
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={toggleTheme} aria-label={dark ? 'Activar modo claro' : 'Activar modo oscuro'} className="h-auto rounded-full border-hero-foreground/30 bg-transparent px-4 py-2 text-sm font-semibold hover:bg-hero-foreground/10 hover:text-hero-foreground">{dark ? '☀ Claro' : '☾ Oscuro'}</Button>
        <Button variant="outline" className="h-auto rounded-full border-hero-foreground/30 bg-transparent px-3 py-2 hover:bg-hero-foreground/10 hover:text-hero-foreground md:hidden" aria-label={menu ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menu} onClick={() => setMenu(!menu)}>☰</Button>
      </div>
    </div>
    {menu && <nav aria-label="Móvil" className="flex flex-col border-t border-border px-4 pb-4 md:hidden">{NAV.map(([id, label]) => <Link key={id} {...navProps(id)} onClick={() => setMenu(false)} className="py-3 text-lg font-medium">{label}</Link>)}</nav>}
  </header>;
}