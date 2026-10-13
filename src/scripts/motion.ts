import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Initialize cursor spotlight tracking on all spotlight cards
 */
function initSpotlightTracking(): void {
  const cards = document.querySelectorAll<HTMLElement>('.spotlight-card');
  if (!cards.length) return;

  const handleMouseMove = (e: MouseEvent) => {
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  };

  window.addEventListener('mousemove', handleMouseMove, { passive: true });
}

/**
 * Hero entrance animation using GSAP timeline
 */
function initHeroTimeline(): void {
  const heroBadge = document.querySelector('[data-hero-badge]');
  const heroTitle = document.querySelector('[data-hero-title]');
  const heroSub = document.querySelector('[data-hero-sub]');
  const heroCtas = document.querySelector('[data-hero-ctas]');
  const heroVisual = document.querySelector('[data-hero-visual]');
  const heroTelemetry = document.querySelector('[data-hero-telemetry]');

  if (!heroTitle) return;

  const tl = gsap.timeline({
    defaults: { ease: 'power3.out', duration: 0.8 },
  });

  if (heroBadge) {
    tl.fromTo(heroBadge, { opacity: 0, y: -15 }, { opacity: 1, y: 0, duration: 0.6 });
  }

  tl.fromTo(
    heroTitle,
    { opacity: 0, y: 30, filter: 'blur(10px)' },
    { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.0 },
    '-=0.3'
  );

  if (heroSub) {
    tl.fromTo(heroSub, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6');
  }

  if (heroCtas) {
    tl.fromTo(heroCtas, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.5');
  }

  if (heroVisual) {
    tl.fromTo(
      heroVisual,
      { opacity: 0, scale: 0.94, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: 'expo.out' },
      '-=0.7'
    );
  }

  if (heroTelemetry) {
    tl.fromTo(
      heroTelemetry,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.5'
    );
  }
}

/**
 * ScrollTrigger reveals for sections & cards
 */
function initScrollReveals(): void {
  const revealElements = document.querySelectorAll<HTMLElement>('[data-reveal]');

  revealElements.forEach((el) => {
    const animation = el.dataset.reveal || 'fade-up';
    const delay = parseFloat(el.dataset.revealDelay || '0');
    const duration = parseFloat(el.dataset.revealDuration || '0.75');

    let fromVars: gsap.TweenVars = { opacity: 0, y: 35 };

    if (animation === 'fade-in') fromVars = { opacity: 0 };
    if (animation === 'scale') fromVars = { opacity: 0, scale: 0.95 };
    if (animation === 'slide-left') fromVars = { opacity: 0, x: -35 };
    if (animation === 'slide-right') fromVars = { opacity: 0, x: 35 };

    gsap.fromTo(
      el,
      fromVars,
      {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        duration,
        delay,
        ease: 'power2.out',
        immediateRender: true,
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
      }
    );
  });

  // Stagger grid containers
  document.querySelectorAll<HTMLElement>('[data-stagger]').forEach((container) => {
    const children = container.querySelectorAll(':scope > *');
    if (!children.length) return;

    gsap.fromTo(
      children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: 'power2.out',
        immediateRender: true,
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          once: true,
        },
      }
    );
  });

  // Refresh ScrollTrigger after a slight delay to ensure layout is fully computed
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);
}

/**
 * Interactive Sphere Tab Switcher on Homepage
 */
function initSphereSwitcher(): void {
  const tabs = document.querySelectorAll<HTMLButtonElement>('[data-sphere-tab]');
  const panels = document.querySelectorAll<HTMLElement>('[data-sphere-panel]');

  if (!tabs.length || !panels.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.sphereTab;
      if (!target) return;

      // Update active tab styles
      tabs.forEach((t) => {
        const isActive = t === tab;
        t.setAttribute('aria-selected', String(isActive));
        if (isActive) {
          t.classList.add('bg-blue-600', 'text-white', 'shadow-glow-sm');
          t.classList.remove('bg-transparent', 'text-slate-400');
        } else {
          t.classList.remove('bg-blue-600', 'text-white', 'shadow-glow-sm');
          t.classList.add('bg-transparent', 'text-slate-400');
        }
      });

      // Switch panels with smooth GSAP crossfade
      panels.forEach((panel) => {
        if (panel.dataset.spherePanel === target) {
          panel.classList.remove('hidden');
          gsap.fromTo(
            panel,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
          );
        } else {
          panel.classList.add('hidden');
        }
      });
    });
  });
}

/**
 * Main motion initializer
 */
export function initMotion(): void {
  if (prefersReducedMotion()) {
    document.querySelectorAll<HTMLElement>('[data-reveal], [data-hero-badge], [data-hero-title], [data-hero-sub], [data-hero-ctas], [data-hero-visual], [data-hero-telemetry]').forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.filter = 'none';
    });
    return;
  }

  initSpotlightTracking();
  initHeroTimeline();
  initScrollReveals();
  initSphereSwitcher();
}
