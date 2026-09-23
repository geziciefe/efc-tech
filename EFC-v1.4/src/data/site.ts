// FIRST DRAFT: replace null values only with client-confirmed information.
export type ContactConfig = {
  phone: string | null;
  email: string | null;
  address: string | null;
  hours: string | null;
  mapUrl: string | null;
  whatsapp: string | null;
};
export const site = {
  name: 'EFC Technology',
  version: '1.3.2',
  draft: { showAssetLabels: true },
  logo: '/assets/efc-logo.webp',
  // All states derive from the supplied mark, with the same alpha geometry.
  logos: {
    light: '/assets/efc-logo-light.webp',
    active: '/assets/efc-logo-active.webp',
    color: '/assets/efc-logo-transparent.webp',
    width: 1175,
    height: 540,
  },
  contact: {
    phone: '+90 532 244 75 55',
    email: null,
    address: null,
    hours: null,
    mapUrl: null,
    whatsapp: '905322447555',
  } as ContactConfig,
  heroImage: null as string | null,
  companyImage: '/assets/editorial/homepage-about.jpg' as string | null,
  legal: { privacy: null as string | null, kvkk: null as string | null },
};
export const navigation = [
  { key: 'home', path: '/' },
  { key: 'products', path: '/products/' },
  { key: 'about', path: '/about/' },
  { key: 'references', path: '/references/' },
  { key: 'contact', path: '/contact/' },
] as const;
export const localizedPath = (path: string, lang: string) => (lang === 'en' ? '/en' + path : path);
