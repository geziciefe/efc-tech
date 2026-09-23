import { t, type Lang } from '../data/translations';
const currentLanguage = (): Lang => (document.documentElement.lang === 'en' ? 'en' : 'tr');

export function initializeCarousels() {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (hero) {
    const slides = Array.from(hero.querySelectorAll<HTMLElement>('[data-hero-slide]'));
    const titles = Array.from(hero.querySelectorAll<HTMLElement>('[data-hero-title]'));
    const summaries = Array.from(hero.querySelectorAll<HTMLElement>('[data-hero-description]'));
    const dots = Array.from(hero.querySelectorAll<HTMLButtonElement>('[data-hero-dot]'));
    const status = hero.querySelector<HTMLElement>('[data-hero-status]')!;
    let index = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let hover = false;
    const autoplay = hero.dataset.autoplay === 'true';
    const interval = Math.max(5000, Number(hero.dataset.interval) || 8000);
    const clearTimer = () => {
      if (timer) clearTimeout(timer);
      timer = undefined;
    };
    function schedule() {
      clearTimer();
      if (autoplay && !hover && !document.hidden && !reduced.matches)
        timer = setTimeout(() => {
          show(index + 1, false);
          schedule();
        }, interval);
    }
    function show(next: number, announce = true) {
      index = (next + slides.length) % slides.length;
      [slides, titles, summaries].forEach((group) =>
        group.forEach((el, i) => {
          el.classList.toggle('is-active', i === index);
          el.setAttribute('aria-hidden', String(i !== index));
          if (group === slides) el.inert = i !== index;
        }),
      );
      dots.forEach((dot, i) => dot.setAttribute('aria-pressed', String(i === index)));
      hero!.dataset.activeSlide = String(index);
      if (announce) {
        const title = titles[index].querySelector(`.lang-${currentLanguage()}`)?.textContent ?? '';
        status.textContent = `${t('slide', currentLanguage())} ${index + 1} / ${slides.length}: ${title}`;
      }
    }
    hero.querySelector('[data-hero-prev]')?.addEventListener('click', () => {
      show(index - 1);
      schedule();
    });
    hero.querySelector('[data-hero-next]')?.addEventListener('click', () => {
      show(index + 1);
      schedule();
    });
    dots.forEach((dot, i) =>
      dot.addEventListener('click', () => {
        show(i);
        schedule();
      }),
    );
    hero.addEventListener('mouseenter', () => {
      hover = true;
      clearTimer();
    });
    hero.addEventListener('mouseleave', () => {
      hover = false;
      schedule();
    });
    hero.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        show(index + (event.key === 'ArrowRight' ? 1 : -1));
        schedule();
      }
    });
    let touchStart: { x: number; y: number } | null = null;
    hero.addEventListener(
      'touchstart',
      (event) => {
        const touch = event.touches[0];
        if (!touch) return;
        touchStart = { x: touch.clientX, y: touch.clientY };
        clearTimer();
      },
      { passive: true },
    );
    hero.addEventListener(
      'touchend',
      (event) => {
        if (!touchStart) return;
        const touch = event.changedTouches[0];
        if (!touch) return;
        const dx = touch.clientX - touchStart.x;
        const dy = touch.clientY - touchStart.y;
        if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.4) show(index + (dx < 0 ? 1 : -1));
        touchStart = null;
        schedule();
      },
      { passive: true },
    );
    document.addEventListener('visibilitychange', schedule);
    document.addEventListener('efc:language', () => {
      if (status.textContent) show(index);
    });
    reduced.addEventListener('change', schedule);
    show(0, false);
    schedule();
  }

  document.querySelectorAll<HTMLElement>('[data-product-carousel]').forEach((carousel) => {
    const rail = carousel.querySelector<HTMLElement>('[data-product-rail]')!;
    const track = carousel.querySelector<HTMLElement>('[data-product-track]')!;
    const prev = carousel.querySelector<HTMLButtonElement>('[data-products-prev]')!;
    const next = carousel.querySelector<HTMLButtonElement>('[data-products-next]')!;
    let busy = false;
    function move(direction: number) {
      if (busy) return;
      const items = Array.from(track.children) as HTMLElement[];
      if (items.length < 2) return;
      const railWidth = rail.clientWidth;
      const width = items[0].getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      const step = width + gap;
      // More items than fit: preserve native touch scrolling and scroll-snap.
      if (track.scrollWidth > railWidth + 5) {
        const max = rail.scrollWidth - railWidth;
        let left = rail.scrollLeft + direction * step;
        if (direction > 0 && rail.scrollLeft >= max - 3) left = 0;
        if (direction < 0 && rail.scrollLeft <= 3) left = max;
        rail.scrollTo({
          left: Math.max(0, Math.min(max, left)),
          behavior: reduced.matches ? 'instant' : 'smooth',
        });
        return;
      }
      // Exactly three desktop products: rotate real items, with one transient
      // inert duplicate to keep the trailing edge filled during the transition.
      const item = direction > 0 ? items[0] : items[items.length - 1];
      if (reduced.matches || step === 0) {
        direction > 0 ? track.append(item) : track.prepend(item);
        return;
      }
      busy = true;
      rail.classList.add('is-rotating');
      const clone = item.cloneNode(true) as HTMLElement;
      clone.setAttribute('aria-hidden', 'true');
      clone.inert = true;
      clone.tabIndex = -1;
      clone.dataset.carouselClone = '';
      clone
        .querySelectorAll<HTMLElement>('a,button,[tabindex]')
        .forEach((el) => (el.tabIndex = -1));
      track.style.transition = 'none';
      if (direction > 0) track.append(clone);
      else {
        track.prepend(clone);
        track.style.transform = `translateX(-${step}px)`;
      }
      track.getBoundingClientRect();
      requestAnimationFrame(() => {
        track.style.transition = 'transform 400ms cubic-bezier(.2,.65,.3,1)';
        track.style.transform = direction > 0 ? `translateX(-${step}px)` : 'translateX(0)';
      });
      setTimeout(() => {
        track.style.transition = 'none';
        if (direction > 0) track.insertBefore(item, clone);
        else track.prepend(item);
        clone.remove();
        track.style.transform = '';
        rail.scrollLeft = 0;
        rail.classList.remove('is-rotating');
        busy = false;
      }, 420);
    }
    prev.addEventListener('click', () => move(-1));
    next.addEventListener('click', () => move(1));
    rail.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        move(event.key === 'ArrowRight' ? 1 : -1);
      }
    });
    if (track.children.length < 2) {
      prev.disabled = true;
      next.disabled = true;
    }
  });

}
