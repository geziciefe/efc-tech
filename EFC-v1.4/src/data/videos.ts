import type { Localized } from './products';
export type Video = {
  id: string;
  title: Localized;
  productId: string;
  thumbnail: string | null;
  duration: string | null;
  url: string | null;
  provider: 'youtube' | 'vimeo' | 'self-hosted' | null;
};
// Draft topics only; no video exists yet. Populate duration and URL only after confirmation.
export const videos: Video[] = [
  {
    id: 'video-01',
    title: { tr: 'Ürün tanıtımı', en: 'Product overview' },
    productId: 'product-01',
    thumbnail: null,
    duration: null,
    url: null,
    provider: null,
  },
  {
    id: 'video-02',
    title: { tr: 'Kurulum ve bağlantılar', en: 'Setup and connections' },
    productId: 'product-02',
    thumbnail: null,
    duration: null,
    url: null,
    provider: null,
  },
  {
    id: 'video-03',
    title: { tr: 'Kullanım ve bakım', en: 'Use and maintenance' },
    productId: 'product-03',
    thumbnail: null,
    duration: null,
    url: null,
    provider: null,
  },
];
