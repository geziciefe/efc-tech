// Reference relationships supplied by the client. A source URL verifies the
// institution/company identity; it does not imply a public endorsement of EFC.
import type { Localized } from './products';

export type Reference = {
  id: string;
  name: Localized;
  logo: string;
  source: string;
  projectDescription: Localized | null;
};

export const references: Reference[] = [
  { id: 'aksaz', name: { tr: 'Aksaz Deniz Üs Komutanlığı', en: 'Aksaz Deniz Üs Komutanlığı' }, logo: '/assets/references/deniz-kuvvetleri.png', source: 'https://www.msb.gov.tr/SlaytHaber/532019-76275', projectDescription: null },
  { id: 'kegm', name: { tr: 'Kıyı Emniyeti Genel Müdürlüğü', en: 'Kıyı Emniyeti Genel Müdürlüğü' }, logo: '/assets/references/kiyi-emniyeti.png', source: 'https://www.kiyiemniyeti.gov.tr/logo', projectDescription: null },
  { id: 'golcuk', name: { tr: 'Gölcük Deniz Üs Komutanlığı', en: 'Gölcük Deniz Üs Komutanlığı' }, logo: '/assets/references/deniz-kuvvetleri.png', source: 'https://www.msb.gov.tr/Ihale/ilanSonucDetay/c9a610a8-492f-4478-9e9d-f97d58b188b3', projectDescription: null },
  { id: 'kirici', name: { tr: 'Kırıcı Denizcilik', en: 'Kırıcı Denizcilik' }, logo: '', source: 'client-supplied reference list', projectDescription: null },
  { id: 'alesta', name: { tr: 'Alesta Dalgıçlık', en: 'Alesta Dalgıçlık' }, logo: '/assets/references/alesta.png', source: 'https://www.alestadalgiclik.com/', projectDescription: null },
  { id: 'cagan', name: { tr: 'Çağan Dalgıçlık', en: 'Çağan Dalgıçlık' }, logo: '', source: 'https://iskenderun.denizticaretodasi.org.tr/tr/meslek-grubu/grup/08', projectDescription: null },
  { id: 'dipsan', name: { tr: 'Dipsan Sualtı Hizmetleri', en: 'Dipsan Sualtı Hizmetleri' }, logo: '', source: 'https://www.dipsan.net/', projectDescription: null },
  { id: 'ege-sualti', name: { tr: 'Ege Sualtı Hizmetleri', en: 'Ege Sualtı Hizmetleri' }, logo: '/assets/references/ege-sualti.png', source: 'https://www.egeteknikdalgiclik.com/', projectDescription: null },
  { id: 'derin', name: { tr: 'Derin Dalgıçlık', en: 'Derin Dalgıçlık' }, logo: '', source: 'https://derindalgic.com/', projectDescription: null },
  { id: 'munzur', name: { tr: 'Munzur Üniversitesi', en: 'Munzur Üniversitesi' }, logo: '/assets/references/munzur.png', source: 'https://www.munzur.edu.tr/', projectDescription: null },
  { id: 'penta', name: { tr: 'Penta Denizcilik Ltd. Şti.', en: 'Penta Denizcilik Ltd. Şti.' }, logo: '/assets/references/penta.png', source: 'https://pentamarine.com.tr/', projectDescription: null },
  { id: 'tuzla', name: { tr: 'Tuzla Dalgıçlık', en: 'Tuzla Dalgıçlık' }, logo: '', source: 'https://www.tuzladalgiclik.com/iletisim.asp', projectDescription: null },
  { id: 'deep-sea', name: { tr: 'Deep Sea Dalgıçlık', en: 'Deep Sea Dalgıçlık' }, logo: '', source: 'client-supplied reference list', projectDescription: null },
  { id: 'parilti', name: { tr: 'Parıltı Denizcilik ve Dalgıçlık', en: 'Parıltı Denizcilik ve Dalgıçlık' }, logo: '/assets/references/parilti.png', source: 'https://www.pariltidenizcilik.com.tr/', projectDescription: null },
  { id: 'piri-reis', name: { tr: 'Piri Reis Üniversitesi', en: 'Piri Reis Üniversitesi' }, logo: '/assets/references/piri-reis.png', source: 'https://pirireis.edu.tr/', projectDescription: null },
];
