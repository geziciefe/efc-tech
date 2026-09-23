import { site, localizedPath } from '../data/site';
import { t, type Lang } from '../data/translations';
import { initializeCarousels } from './carousels';
import { initializeChrome } from './chrome';
import { products, categories } from '../data/products';
let lang: Lang = document.documentElement.lang === 'en' ? 'en' : 'tr';
const all = <T extends Element = HTMLElement>(selector: string) =>
  Array.from(document.querySelectorAll<T>(selector));
function applyLanguage(next: Lang, changeUrl = false) {
  lang = next;
  document.documentElement.lang = lang;
  try {
    localStorage.setItem('efc-language', lang);
  } catch {}
  document.title = document.body.dataset[lang === 'tr' ? 'titleTr' : 'titleEn'] ?? 'EFC Technology';
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute('content', t('footerDesc', lang));
  all('[data-lang]').forEach((el) =>
    el.setAttribute('aria-pressed', String((el as HTMLElement).dataset.lang === lang)),
  );
  all<HTMLAnchorElement>('[data-route]').forEach(
    (el) => (el.href = localizedPath(el.dataset.route!, lang) + (el.dataset.query ?? '')),
  );
  for (const [attr, key] of [
    ['aria-label', 'aria'],
    ['placeholder', 'placeholder'],
    ['alt', 'alt'],
  ])
    all(`[data-${key}-tr]`).forEach((el) =>
      el.setAttribute(attr, el.getAttribute(`data-${key}-${lang}`) ?? ''),
    );
  all('[data-text-tr]').forEach((el) => (el.textContent = el.getAttribute(`data-text-${lang}`)));
  if (changeUrl && document.body.dataset.pagePath !== '/404/')
    history.replaceState(
      null,
      '',
      localizedPath(document.body.dataset.pagePath ?? '/', lang) + location.search + location.hash,
    );
  document.querySelector('#mobile-nav')?.setAttribute('aria-label', t('menu', lang));
  syncMenuLabel();
  if (formValidated) validateForm(false);
  filterProducts();
  document.dispatchEvent(new Event('efc:language'));
}
let formValidated = false;
all<HTMLButtonElement>('[data-lang]').forEach((b) =>
  b.addEventListener('click', () => applyLanguage(b.dataset.lang as Lang, true)),
);
const menu = document.querySelector<HTMLButtonElement>('.menu-button');
const mobileNav = document.querySelector<HTMLElement>('#mobile-nav');
let menuScroll = { x: 0, y: 0 };
function syncMenuLabel() {
  if (!menu) return;
  const key = menu.getAttribute('aria-expanded') === 'true' ? 'closeMenu' : 'menu';
  menu.dataset.ariaTr = t(key, 'tr');
  menu.dataset.ariaEn = t(key, 'en');
  menu.setAttribute('aria-label', t(key, lang));
}
function setMenu(open: boolean) {
  if (!menu || !mobileNav || open === (menu.getAttribute('aria-expanded') === 'true')) return;
  if (open) {
    menuScroll = { x: window.scrollX, y: window.scrollY };
    document.body.style.setProperty('--menu-offset', `${-menuScroll.y}px`);
  }
  menu.setAttribute('aria-expanded', String(open));
  mobileNav.hidden = !open;
  document.body.classList.toggle('menu-open', open);
  all<HTMLElement>('main,.site-footer').forEach((el) => (el.inert = open));
  if (!open) {
    document.body.style.removeProperty('--menu-offset');
    window.scrollTo({ left: menuScroll.x, top: menuScroll.y, behavior: 'instant' });
  }
  syncMenuLabel();
  document.dispatchEvent(new Event('efc:menu'));
}
const closeMenu = () => setMenu(false);
menu?.addEventListener('click', () => {
  setMenu(menu.getAttribute('aria-expanded') !== 'true');
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menu.focus();
  }
});
document.addEventListener('click', (e) => {
  if (
    menu?.getAttribute('aria-expanded') === 'true' &&
    !(e.target as Element).closest('.site-header')
  )
    closeMenu();
});
matchMedia('(min-width:1181px)').addEventListener('change', (e) => {
  if (e.matches) closeMenu();
});
window.addEventListener('resize', () => {
  if (menu && getComputedStyle(menu).display === 'none') closeMenu();
});
// A page restored from the back/forward cache must never retain a locked drawer.
window.addEventListener('pageshow', closeMenu);
const search = document.querySelector<HTMLInputElement>('#product-search');
let category = new URLSearchParams(location.search).get('category') ?? 'all';
if (!['all', ...categories.map((c) => c.id)].includes(category)) category = 'all';
function filterProducts() {
  if (!search) return;
  let count = 0;
  const needle = search.value.trim().toLocaleLowerCase(lang === 'tr' ? 'tr-TR' : 'en-US');
  all<HTMLElement>('#catalogue-grid [data-product-card]').forEach((card) => {
    const hay = (card.getAttribute(`data-search-${lang}`) ?? '').toLocaleLowerCase(
      lang === 'tr' ? 'tr-TR' : 'en-US',
    );
    const show = (category === 'all' || card.dataset.category === category) && hay.includes(needle);
    card.hidden = !show;
    if (show) count++;
  });
  const counter = document.querySelector('#result-count');
  if (counter) counter.textContent = String(count);
  const empty = document.querySelector<HTMLElement>('#empty-state');
  if (empty) empty.hidden = count > 0;
  all('[data-filter]').forEach((b) =>
    b.setAttribute('aria-pressed', String((b as HTMLElement).dataset.filter === category)),
  );
}
function updateCategory(value: string) {
  category = value;
  const url = new URL(location.href);
  if (value === 'all') url.searchParams.delete('category');
  else url.searchParams.set('category', value);
  history.replaceState(null, '', url.pathname + url.search);
  filterProducts();
}
search?.addEventListener('input', filterProducts);
all<HTMLButtonElement>('[data-filter]').forEach((b) =>
  b.addEventListener('click', () => updateCategory(b.dataset.filter!)),
);
document.querySelector('[data-reset]')?.addEventListener('click', () => {
  if (search) search.value = '';
  updateCategory('all');
  search?.focus();
});
const dialog = document.querySelector<HTMLDialogElement>('#whatsapp-notice');
all('[data-whatsapp]').forEach((b) =>
  b.addEventListener('click', () => {
    const number = site.contact.whatsapp?.replace(/\D/g, '');
    if (!number) {
      dialog?.showModal();
      return;
    }
    const product = products.find((p) => p.slug === document.body.dataset.product);
    const message = product
      ? t('waProduct', lang).replace('{product}', product.name[lang])
      : t('waMessage', lang);
    window.open(
      `https://wa.me/${number}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer',
    );
  }),
);
dialog?.querySelector('[data-close]')?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', (e) => {
  if (e.target === dialog) dialog.close();
});
const cookieNotice = document.querySelector<HTMLElement>('[data-cookie-notice]');
if (cookieNotice) {
  let savedChoice: string | null = null;
  try {
    savedChoice = localStorage.getItem('efc-cookie-choice');
  } catch {}
  cookieNotice.hidden = savedChoice === 'accepted' || savedChoice === 'rejected';
  all<HTMLButtonElement>('[data-cookie-choice]').forEach((button) =>
    button.addEventListener('click', () => {
      try {
        localStorage.setItem('efc-cookie-choice', button.dataset.cookieChoice!);
      } catch {}
      cookieNotice.hidden = true;
    }),
  );
}
all<HTMLButtonElement>('[data-gallery-src]').forEach((b) =>
  b.addEventListener('click', () => {
    const im = document.querySelector<HTMLImageElement>('#gallery-image');
    if (im) {
      im.src = b.dataset.gallerySrc!;
      im.dataset.altTr = b.dataset.galleryAltTr;
      im.dataset.altEn = b.dataset.galleryAltEn;
      im.alt = b.getAttribute(`data-gallery-alt-${lang}`) ?? '';
    }
    all('[data-gallery-src]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
  }),
);
const form = document.querySelector<HTMLFormElement>('#enquiry-form');
const interest = document.querySelector<HTMLSelectElement>('#interest');
const productId = new URLSearchParams(location.search).get('product');
if (interest && products.some((p) => p.slug === productId)) interest.value = productId!;
function validateForm(focus: boolean) {
  if (!form) return false;
  let first: HTMLInputElement | HTMLTextAreaElement | null = null;
  all<HTMLInputElement | HTMLTextAreaElement>('#enquiry-form input,#enquiry-form textarea').forEach(
    (input) => {
      let error = '';
      if (input.type === 'checkbox' && !(input as HTMLInputElement).checked)
        error = t('consentRequired', lang);
      else if (input.required && !input.value.trim()) error = t('required', lang);
      else if (
        input.type === 'email' &&
        input.value &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)
      )
        error = t('invalidEmail', lang);
      else if (
        input.type === 'tel' &&
        input.value.trim() &&
        !/^[+()\d\s.-]{7,30}$/.test(input.value)
      )
        error = t('invalidPhone', lang);
      const field = document.getElementById(`${input.id}-error`);
      if (field) {
        field.textContent = error;
        field.hidden = !error;
      }
      input.setAttribute('aria-invalid', String(!!error));
      if (error && !first) first = input;
    },
  );
  if (focus && first) (first as HTMLElement).focus();
  return !first;
}
form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  formValidated = true;
  const valid = validateForm(true);
  const result = document.querySelector<HTMLElement>('#form-result');
  const resultText = document.querySelector<HTMLElement>('#form-result-text');
  const button = form.querySelector<HTMLButtonElement>('[type=submit]');
  if (!valid) {
    if (result) result.hidden = true;
    return;
  }

  if (button) {
    button.disabled = true;
    button.setAttribute('aria-busy', 'true');
  }
  if (result) result.hidden = true;

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) throw new Error(`Form submit failed: ${response.status}`);
    if (resultText) resultText.textContent = t('submitted', lang);
    if (result) {
      result.hidden = false;
      result.focus();
    }
    form.reset();
    formValidated = false;
  } catch (error) {
    console.error(error);
    if (resultText) resultText.textContent = t('submitError', lang);
    if (result) {
      result.hidden = false;
      result.focus();
    }
  } finally {
    if (button) {
      button.disabled = false;
      button.removeAttribute('aria-busy');
    }
  }
});
form?.addEventListener('input', () => {
  document.querySelector<HTMLElement>('#form-result')!.hidden = true;
  if (formValidated) validateForm(false);
});
const submitButton = form?.querySelector<HTMLButtonElement>('[type=submit]');
if (submitButton) submitButton.disabled = false;
applyLanguage(lang);
filterProducts();

mobileNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
  if (event.key !== 'Tab' || menu?.getAttribute('aria-expanded') !== 'true') return;
  const focusable = all<HTMLElement>('.site-header a,.site-header button').filter(
    (el) => el.getClientRects().length > 0,
  );
  const first = focusable[0],
    last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last?.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first?.focus();
  }
});
initializeChrome();
initializeCarousels();
