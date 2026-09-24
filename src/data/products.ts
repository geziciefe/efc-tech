export type Localized = { tr: string; en: string };
export type Product = {
  slug: string;
  name: Localized;
  category: string;
  model: string | null;
  description: Localized;
  images: { src: string; alt: Localized }[];
  specifications: { label: Localized; value: Localized }[];
  documents: { title: Localized; url: string }[];
  videoIds: string[];
  featured: boolean;
};

export type Category = {
  id: string;
  name: Localized;
  description: Localized;
  image: string | null;
  path: string;
  focalPoint: string;
  mobileFocalPoint: string;
  assetSubject: Localized;
  tone: 'ocean' | 'slate' | 'deep';
};

const productImage = (file: string, tr: string, en: string) => ({
  src: `/assets/products/${file}`,
  alt: { tr, en },
});

export const categories: Category[] = [
  {
    id: 'underwater-imaging',
    image: '/assets/categories/category-underwater-imaging.jpg',
    path: '/products/?category=underwater-imaging',
    focalPoint: '58% 48%',
    mobileFocalPoint: '65% 50%',
    assetSubject: { tr: 'Sualtı görüntüleme ekipmanları', en: 'Underwater imaging equipment' },
    tone: 'ocean',
    name: { tr: 'Su Altı Görüntüleme', en: 'Underwater Imaging' },
    description: {
      tr: 'Kameralar, LED aydınlatmalar ve taşınabilir görüntüleme sistemleri.',
      en: 'Cameras, LED lighting and portable imaging systems.',
    },
  },
  {
    id: 'diver-communication-control',
    image: '/assets/categories/category-cables-power.png',
    path: '/products/?category=diver-communication-control',
    focalPoint: '50% 54%',
    mobileFocalPoint: '52% 52%',
    assetSubject: {
      tr: 'Dalgıç haberleşme ve kontrol sistemi',
      en: 'Diver communication and control system',
    },
    tone: 'slate',
    name: { tr: 'Dalgıç Haberleşme & Kontrol', en: 'Diver Communication & Control' },
    description: {
      tr: 'Taşınabilir haberleşme sistemleri ile kontrol ve pnömo panelleri.',
      en: 'Portable communication systems plus control and pneumo panels.',
    },
  },
  {
    id: 'cables-power-accessories',
    image: '/assets/categories/category-diver-control.jpg',
    path: '/products/?category=cables-power-accessories',
    focalPoint: '48% 50%',
    mobileFocalPoint: '53% 50%',
    assetSubject: {
      tr: 'Kablo, güç ve aksesuar ürünleri',
      en: 'Cable, power and accessory products',
    },
    tone: 'deep',
    name: { tr: 'Kablo, Güç & Aksesuar', en: 'Cables, Power & Accessories' },
    description: {
      tr: 'Bağlantı kabloları, taşınabilir güç ürünleri ve sistem aksesuarları.',
      en: 'Connection cables, portable power products and system accessories.',
    },
  },
];

export const products: Product[] = [
  {
    slug: 'efc-021-underwater-camera',
    name: { tr: 'EFC-021 Su Altı Kamerası', en: 'EFC-021 Underwater Camera' },
    category: 'underwater-imaging',
    model: 'EFC-021',
    description: {
      tr: 'Su altı görüntüleme kurulumları için kompakt EFC kamera ünitesi.',
      en: 'A compact EFC camera unit for underwater imaging installations.',
    },
    images: [
      productImage(
        'efc-021-camera-front.jpg',
        'EFC-021 su altı kamerası ön görünüm',
        'Front view of the EFC-021 underwater camera',
      ),
      productImage(
        'efc-021-camera-angle.jpg',
        'EFC-021 su altı kamerası açılı görünüm',
        'Angled view of the EFC-021 underwater camera',
      ),
    ],
    specifications: [],
    documents: [],
    videoIds: [],
    featured: true,
  },
  {
    slug: 'underwater-led-light-heads',
    name: { tr: 'Su Altı LED Aydınlatma Başlıkları', en: 'Underwater LED Light Heads' },
    category: 'underwater-imaging',
    model: null,
    description: {
      tr: 'Su altı kamera kurulumlarına eşlik eden kompakt LED aydınlatma başlıkları.',
      en: 'Compact LED light heads designed to accompany underwater camera installations.',
    },
    images: [
      productImage(
        'underwater-led-light-set.jpg',
        'Su altı LED aydınlatma başlıkları',
        'Underwater LED light heads',
      ),
      productImage(
        'underwater-led-light-connector.jpg',
        'Su altı LED aydınlatma başlığı bağlantı görünümü',
        'Connector view of an underwater LED light head',
      ),
      productImage(
        'datasheets/efc-36w-underwater-led-light.jpeg',
        'EFC-36W su altı LED ışığı teknik bilgi formu',
        'EFC-36W underwater LED light data sheet',
      ),
    ],
    specifications: [],
    documents: [{ title: { tr: 'EFC-36W Teknik Bilgi Formu', en: 'EFC-36W Data Sheet' }, url: '/assets/products/datasheets/efc-36w-underwater-led-light.jpeg' }],
    videoIds: [],
    featured: false,
  },
  {
    slug: 'camera-light-bracket-system',
    name: { tr: 'Kamera ve Aydınlatma Braket Sistemi', en: 'Camera and Light Bracket System' },
    category: 'underwater-imaging',
    model: null,
    description: {
      tr: 'Kamera ile aydınlatma başlığını tek taşıyıcı üzerinde bir araya getiren montaj sistemi.',
      en: 'A mounting system that brings a camera and light head together on one support.',
    },
    images: [
      productImage(
        'camera-light-bracket.jpg',
        'Kamera ve aydınlatma braket sistemi',
        'Camera and light bracket system',
      ),
    ],
    specifications: [],
    documents: [],
    videoIds: [],
    featured: false,
  },
  {
    slug: 'portable-imaging-viewing-system',
    name: {
      tr: 'Taşınabilir Görüntüleme ve Kayıt Sistemi',
      en: 'Portable Imaging and Recording System',
    },
    category: 'underwater-imaging',
    model: null,
    description: {
      tr: 'Görüntüleme, izleme ve kayıt bileşenlerini korumalı mavi taşıma çantasında birleştiren taşınabilir sistem.',
      en: 'A portable system combining imaging, viewing and recording components in a protective blue case.',
    },
    images: [
      productImage(
        'portable-imaging-system-active.jpg',
        'Çalışır durumda taşınabilir görüntüleme ve kayıt sistemi',
        'Portable imaging and recording system in operation',
      ),
      productImage(
        'portable-imaging-system-front.jpg',
        'Taşınabilir görüntüleme sistemi ön görünüm',
        'Front view of the portable imaging system',
      ),
      productImage(
        'portable-imaging-system-angle.jpg',
        'Taşınabilir görüntüleme sistemi açılı görünüm',
        'Angled view of the portable imaging system',
      ),
      productImage(
        'datasheets/efc-7320-portable-imaging-system.jpeg',
        'EFC-7320 taşınabilir görüntüleme sistemi teknik bilgi formu',
        'EFC-7320 portable imaging system data sheet',
      ),
    ],
    specifications: [],
    documents: [{ title: { tr: 'EFC-7320 Teknik Bilgi Formu', en: 'EFC-7320 Data Sheet' }, url: '/assets/products/datasheets/efc-7320-portable-imaging-system.jpeg' }],
    videoIds: [],
    featured: true,
  },
  {
    slug: 'efc-2112-portable-diver-communication-system',
    name: {
      tr: 'EFC-2112 Taşınabilir Dalgıç Haberleşme Sistemi',
      en: 'EFC-2112 Portable Diver Communication System',
    },
    category: 'diver-communication-control',
    model: 'EFC-2112',
    description: {
      tr: 'Saha kullanımı için korumalı taşıma çantasına entegre taşınabilir dalgıç haberleşme sistemi.',
      en: 'A portable diver communication system integrated into a protective case for field use.',
    },
    images: [
      productImage(
        'efc-2112-front.jpg',
        'EFC-2112 taşınabilir haberleşme sistemi ön görünüm',
        'Front view of the EFC-2112 portable communication system',
      ),
      productImage(
        'efc-2112-angle.jpg',
        'EFC-2112 taşınabilir haberleşme sistemi açılı görünüm',
        'Angled view of the EFC-2112 portable communication system',
      ),
      productImage(
        'datasheets/efc-2112-diver-communication-system.jpeg',
        'EFC-2112 dalgıç haberleşme sistemi teknik bilgi formu',
        'EFC-2112 diver communication system data sheet',
      ),
    ],
    specifications: [],
    documents: [{ title: { tr: 'EFC-2112 Teknik Bilgi Formu', en: 'EFC-2112 Data Sheet' }, url: '/assets/products/datasheets/efc-2112-diver-communication-system.jpeg' }],
    videoIds: [],
    featured: true,
  },
  {
    slug: 'efc-2509-communication-panel',
    name: { tr: 'EFC-2509 Haberleşme Paneli', en: 'EFC-2509 Communication Panel' },
    category: 'diver-communication-control',
    model: 'EFC-2509',
    description: {
      tr: 'Çoklu bağlantı ve kanal düzenine sahip EFC haberleşme paneli.',
      en: 'An EFC communication panel with a multi-connection, multi-channel layout.',
    },
    images: [
      productImage(
        'efc-2509-panel.jpg',
        'EFC-2509 haberleşme paneli',
        'EFC-2509 communication panel',
      ),
    ],
    specifications: [],
    documents: [],
    videoIds: [],
    featured: false,
  },
  {
    slug: 'efc-2610-control-pneumo-panel',
    name: { tr: 'EFC-2610 Kontrol ve Pnömo Paneli', en: 'EFC-2610 Control and Pneumo Panel' },
    category: 'diver-communication-control',
    model: 'EFC-2610',
    description: {
      tr: 'Basınç göstergeleri, bağlantılar ve dijital ekranı bir araya getiren kontrol ve pnömo paneli.',
      en: 'A control and pneumo panel combining pressure gauges, connections and a digital display.',
    },
    images: [
      productImage(
        'efc-2610-control-panel.jpg',
        'EFC-2610 kontrol ve pnömo paneli',
        'EFC-2610 control and pneumo panel',
      ),
      productImage(
        'datasheets/efc-2610-diver-air-control-panel.jpeg',
        'EFC-2610 dalgıç hava kontrol paneli teknik bilgi formu',
        'EFC-2610 diver air control panel data sheet',
      ),
    ],
    specifications: [],
    documents: [{ title: { tr: 'EFC-2610 Teknik Bilgi Formu', en: 'EFC-2610 Data Sheet' }, url: '/assets/products/datasheets/efc-2610-diver-air-control-panel.jpeg' }],
    videoIds: [],
    featured: false,
  },
  {
    slug: 'black-connector-cable-set',
    name: { tr: 'Siyah Konnektörlü Kablo Seti', en: 'Black Connector Cable Set' },
    category: 'cables-power-accessories',
    model: null,
    description: {
      tr: 'Sistem bağlantıları için çoklu siyah konnektörlü kablo seti.',
      en: 'A cable set with multiple black connectors for system connections.',
    },
    images: [
      productImage(
        'black-connector-cable-set.jpg',
        'Siyah konnektörlü kablo seti',
        'Black connector cable set',
      ),
    ],
    specifications: [],
    documents: [],
    videoIds: [],
    featured: false,
  },
  {
    slug: 'multicolor-cable-bundle',
    name: { tr: 'Umblical', en: 'Umblical' },
    category: 'cables-power-accessories',
    model: null,
    description: {
      tr: 'Saha ve sistem bağlantıları için düzenlenmiş çok renkli kablo ailesi.',
      en: 'A multicolor cable family arranged for field and system connections.',
    },
    images: [
      productImage(
        'multicolor-cable-bundle.jpg',
        'Bağlanmış çok renkli kablo demeti',
        'Bundled multicolor cable',
      ),
      productImage(
        'multicolor-cable-coil.jpg',
        'Sarılmış çok renkli kablo',
        'Coiled multicolor cable',
      ),
    ],
    specifications: [],
    documents: [],
    videoIds: [],
    featured: true,
  },
  {
    slug: 'audio-video-light-control-cable',
    name: {
      tr: 'Ses Görüntü Işık Kontrol Kablosu',
      en: 'Audio, Video and Light Control Cable',
    },
    category: 'cables-power-accessories',
    model: null,
    description: {
      tr: 'Ses, görüntü ve ışık kontrol bağlantıları için çok konnektörlü kablo.',
      en: 'A multi-connector cable for audio, video and light control connections.',
    },
    images: [
      productImage(
        'audio-video-light-control-cable.jpeg',
        'Ses görüntü ışık kontrol kablosu',
        'Audio, video and light control cable',
      ),
    ],
    specifications: [],
    documents: [],
    videoIds: [],
    featured: false,
  },
  {
    slug: 'swit-pc-u130b2-portable-charger',
    name: { tr: 'SWIT PC-U130B2 Taşınabilir Şarj Cihazı', en: 'SWIT PC-U130B2 Portable Charger' },
    category: 'cables-power-accessories',
    model: 'PC-U130B2',
    description: {
      tr: 'Taşınabilir sistem güç ihtiyaçları için SWIT şarj cihazı.',
      en: 'A SWIT charger for portable system power requirements.',
    },
    images: [
      productImage(
        'swit-pc-u130b2-charger.jpg',
        'SWIT PC-U130B2 taşınabilir şarj cihazı',
        'SWIT PC-U130B2 portable charger',
      ),
    ],
    specifications: [],
    documents: [],
    videoIds: [],
    featured: false,
  },
  {
    slug: 'swit-pb-m98s-battery',
    name: { tr: 'SWIT PB-M98S Batarya', en: 'SWIT PB-M98S Battery' },
    category: 'cables-power-accessories',
    model: 'PB-M98S',
    description: {
      tr: 'Taşınabilir ekipmanlar için kompakt SWIT batarya.',
      en: 'A compact SWIT battery for portable equipment.',
    },
    images: [
      productImage('swit-pb-m98s-battery.jpg', 'SWIT PB-M98S batarya', 'SWIT PB-M98S battery'),
    ],
    specifications: [],
    documents: [],
    videoIds: [],
    featured: true,
  },
];

export const categoryFor = (id: string) => categories.find((c) => c.id === id)!;
