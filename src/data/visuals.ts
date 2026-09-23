import type { Localized } from './products';
import { site } from './site';

export type EditorialImage = {
  src: string | null;
  alt: Localized;
  focalPoint: string;
  mobileFocalPoint: string;
  subject: Localized;
  ratio: string;
  tone: 'ocean' | 'slate' | 'deep';
};
export type HeroSlide = {
  id: string;
  title: Localized;
  description: Localized;
  image: EditorialImage;
  category: string;
};
// Only approved EFC photographs belong here. No reference-site or stock images.
export const heroSlides: HeroSlide[] = [
  {
    id: 'imaging',
    title: { tr: 'Sualtı Görüntüleme Sistemleri', en: 'Underwater Imaging Systems' },
    description: {
      tr: 'Profesyonel kullanım için kameralar, sistemler ve ekipmanlar.',
      en: 'Cameras, systems and equipment for professional use.',
    },
    category: 'systems',
    image: {
      src: '/assets/hero-underwater-1.jpg',
      alt: { tr: 'EFC sualtı görüntüleme operasyonu', en: 'EFC underwater imaging operation' },
      focalPoint: '50% 50%',
      mobileFocalPoint: '60% 50%',
      subject: {
        tr: 'Buzlu su girişinde profesyonel dalgıç',
        en: 'Professional diver entering icy water',
      },
      ratio: '16:9 / 4:5',
      tone: 'ocean',
    },
  },
  {
    id: 'cameras',
    title: { tr: 'Profesyonel Sualtı Kameraları', en: 'Professional Underwater Cameras' },
    description: {
      tr: 'Sualtı görüntüleme ihtiyacınıza uygun ürünleri keşfedin.',
      en: 'Explore products for your underwater imaging requirements.',
    },
    category: 'cameras',
    image: {
      src: '/assets/hero-underwater-2.jpg',
      alt: { tr: 'EFC sualtı kamerası saha kullanımı', en: 'EFC underwater camera in the field' },
      focalPoint: '50% 58%',
      mobileFocalPoint: '55% 57%',
      subject: {
        tr: 'Balıkların arasında sualtı kamera kullanımı',
        en: 'Underwater camera operation among fish',
      },
      ratio: '16:9 / 4:5',
      tone: 'slate',
    },
  },
  {
    id: 'accessories',
    title: { tr: 'Teknik Çözümler ve Aksesuarlar', en: 'Technical Solutions and Accessories' },
    description: {
      tr: 'Görüntüleme ekipmanınız için tamamlayıcı ürünler.',
      en: 'Complementary products for your imaging equipment.',
    },
    category: 'accessories',
    image: {
      src: '/assets/hero-underwater-3.jpg',
      alt: { tr: 'EFC ekipman ve bağlantı detayları', en: 'EFC equipment and connection details' },
      focalPoint: '50% 50%',
      mobileFocalPoint: '65% 50%',
      subject: {
        tr: 'Balık sürüsünün içinde profesyonel dalış sahnesi',
        en: 'Professional dive scene inside a school of fish',
      },
      ratio: '16:9 / 4:5',
      tone: 'deep',
    },
  },
  {
    id: 'field',
    title: { tr: 'Sualtı Operasyonları', en: 'Underwater Operations' },
    description: {
      tr: 'Saha koşullarına uygun görüntüleme ve destek ekipmanları.',
      en: 'Imaging and support equipment for field conditions.',
    },
    category: 'systems',
    image: {
      src: '/assets/editorial/hero-underwater-4.jpg',
      alt: {
        tr: 'Sualtı yapısı çevresinde çalışan dalgıçlar',
        en: 'Divers working around an underwater structure',
      },
      focalPoint: '50% 52%',
      mobileFocalPoint: '60% 50%',
      subject: { tr: 'Sualtı saha operasyonu', en: 'Underwater field operation' },
      ratio: '16:9 / 4:5',
      tone: 'ocean',
    },
  },
];
export const heroSettings = { autoplay: true, interval: 5000 };
// Reserved for a client-approved underwater operation photograph. Never use
// Amron imagery or unrelated stock here. Shared by the home and catalogue intro.
export const productsIntroImage: EditorialImage = {
  src: '/assets/editorial/products-intro.jpg',
  alt: {
    tr: 'Sualtında görüntüleme ekipmanlarıyla çalışan dalgıç ekibi',
    en: 'Dive team working underwater with imaging equipment',
  },
  focalPoint: '54% 50%',
  mobileFocalPoint: '72% 50%',
  subject: {
    tr: 'EFC sualtı operasyon görseli eklenecek',
    en: 'EFC underwater operation image to be added',
  },
  ratio: '21:9 / 4:5',
  tone: 'deep',
};
export const capabilityImage: EditorialImage = {
  src: site.companyImage,
  alt: { tr: 'EFC saha çalışması', en: 'EFC field operation' },
  focalPoint: '50% 50%',
  mobileFocalPoint: '58% 50%',
  subject: {
    tr: 'EFC saha / kurulum fotoğrafı eklenecek',
    en: 'EFC field / installation photograph will be added',
  },
  ratio: '21:9 / 4:5',
  tone: 'slate',
};
export const aboutHeroImage: EditorialImage = {
  src: '/assets/editorial/about-main.jpg',
  alt: {
    tr: 'Sualtı yüzeyinden derinliğe yayılan gün ışığı',
    en: 'Sunlight reaching into the depth from the water surface',
  },
  focalPoint: '50% 42%',
  mobileFocalPoint: '54% 42%',
  subject: { tr: 'EFC sualtı çalışma ortamı', en: 'EFC underwater working environment' },
  ratio: '16:9 / 4:5',
  tone: 'ocean',
};

export const aboutFieldImage: EditorialImage = {
  src: '/assets/editorial/homepage-about.jpg',
  alt: {
    tr: 'Sualtı saha çalışmasındaki dalgıçlar',
    en: 'Divers during an underwater field operation',
  },
  focalPoint: '50% 50%',
  mobileFocalPoint: '58% 50%',
  subject: { tr: 'Sualtı saha çalışması', en: 'Underwater field operation' },
  ratio: '4:3 / 4:5',
  tone: 'ocean',
};
export const assetGuidance = {
  product: {
    tr: '4:3 · Beyaz / şeffaf fonda ürün',
    en: '4:3 · Product on white / transparent background',
  },
  company: { tr: '3:2 · EFC ekip / saha fotoğrafı', en: '3:2 · EFC team / field photograph' },
  video: { tr: '16:9 · Ürün eğitiminden bir kare', en: '16:9 · Frame from the product tutorial' },
  map: { tr: 'Doğrulanmış EFC adresi', en: 'Verified EFC address' },
};
