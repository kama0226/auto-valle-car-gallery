// Configure only verified owner-provided contact URLs here.
export const SOCIAL_URLS: Record<'whatsapp' | 'instagram' | 'facebook' | 'tiktok' | 'youtube', string> = {
  whatsapp: 'https://wa.me',
  instagram: 'https://www.instagram.com/del_valle_cars_cln?psln=N2RmdXdnMTkxaWYw',
  facebook: 'https://www.facebook.com/?locale=es_LA',
  tiktok: 'https://www.tiktok.com/@s.millang',
  youtube: 'https://www.youtube.com/?app=desktop&hl=es',
};
export function whatsappLink(configured: string, message: string): string | undefined {
  if (!configured) return undefined;
  try {
    const url = new URL(configured);
    if (url.protocol !== 'https:' || !['wa.me', 'api.whatsapp.com'].includes(url.hostname)) return undefined;
    const number = url.hostname === 'wa.me' ? url.pathname.slice(1) : url.searchParams.get('phone');
    if (!number || !/^\d{7,15}$/.test(number)) return undefined;
    url.searchParams.set('text', message);
    return url.toString();
  } catch { return undefined; }
}