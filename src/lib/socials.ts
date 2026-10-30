// Configure only verified owner-provided contact URLs here.
export const SOCIAL_URLS: Record<'whatsapp' | 'instagram' | 'facebook' | 'tiktok' | 'youtube', string> = {
  whatsapp: '', instagram: '', facebook: '', tiktok: '', youtube: '',
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