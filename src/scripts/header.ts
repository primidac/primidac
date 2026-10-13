/**
 * Header behavior:
 * - Scroll-aware background (glass effect appears after scrolling)
 * - Mobile menu toggle
 * - Desktop dropdown (Spheres)
 * - Keyboard navigation (Escape to close)
 */
export function initHeader(): void {
  const header = document.getElementById('site-header');
  if (!header) return;

  // --- Scroll-aware background ---
  const updateHeaderBg = () => {
    const scrolled = window.scrollY > 15;
    if (scrolled) {
      header.classList.add('shadow-subtle');
    } else {
      header.classList.remove('shadow-subtle');
    }
  };
  updateHeaderBg();
  window.addEventListener('scroll', updateHeaderBg, { passive: true });

  // --- Mobile menu ---
  const toggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const iconOpen = toggle?.querySelector('[data-menu-icon-open]') as HTMLElement | null;
  const iconClose = toggle?.querySelector('[data-menu-icon-close]') as HTMLElement | null;

  if (toggle && mobileMenu && iconOpen && iconClose) {
    toggle.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden', isOpen);
      toggle.setAttribute('aria-expanded', String(!isOpen));
      iconOpen.classList.toggle('hidden', !isOpen);
      iconClose.classList.toggle('hidden', isOpen);
    });
  }

  // --- Mobile dropdowns ---
  document.querySelectorAll('[data-mobile-dropdown]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const menu = btn.nextElementSibling as HTMLElement | null;
      const icon = btn.querySelector('[data-mobile-dropdown-icon]') as HTMLElement | null;
      if (menu) {
        const isOpen = !menu.classList.contains('hidden');
        menu.classList.toggle('hidden', isOpen);
        if (icon) {
          icon.style.transform = isOpen ? '' : 'rotate(180deg)';
        }
      }
    });
  });

  // --- Desktop dropdowns ---
  document.querySelectorAll('[data-dropdown]').forEach((dropdown) => {
    const btn = dropdown.querySelector('button');
    const menu = dropdown.querySelector('[data-dropdown-menu]') as HTMLElement | null;
    const icon = dropdown.querySelector('[data-dropdown-icon]') as HTMLElement | null;

    if (!btn || !menu) return;

    let isOpen = false;
    let closeTimer: ReturnType<typeof setTimeout>;

    const open = () => {
      clearTimeout(closeTimer);
      isOpen = true;
      btn.setAttribute('aria-expanded', 'true');
      menu.style.opacity = '1';
      menu.style.visibility = 'visible';
      menu.style.transform = 'translateY(0)';
      menu.style.pointerEvents = 'auto';
      if (icon) icon.style.transform = 'rotate(180deg)';
    };

    const close = () => {
      closeTimer = setTimeout(() => {
        isOpen = false;
        btn.setAttribute('aria-expanded', 'false');
        menu.style.opacity = '0';
        menu.style.visibility = 'hidden';
        menu.style.transform = 'translateY(4px)';
        menu.style.pointerEvents = 'none';
        if (icon) icon.style.transform = '';
      }, 150);
    };

    dropdown.addEventListener('mouseenter', open);
    dropdown.addEventListener('mouseleave', close);
    btn.addEventListener('focus', open);
    menu.addEventListener('focusin', () => clearTimeout(closeTimer));
    menu.addEventListener('focusout', close);

    btn.addEventListener('click', () => {
      if (isOpen) close();
      else open();
    });
  });

  // --- Escape key to close everything ---
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      // Close mobile menu
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        toggle?.setAttribute('aria-expanded', 'false');
        if (iconOpen) iconOpen.classList.remove('hidden');
        if (iconClose) iconClose.classList.add('hidden');
      }

      // Close desktop dropdowns
      document.querySelectorAll('[data-dropdown]').forEach((dropdown) => {
        const btn = dropdown.querySelector('button');
        const menu = dropdown.querySelector('[data-dropdown-menu]') as HTMLElement | null;
        const icon = dropdown.querySelector('[data-dropdown-icon]') as HTMLElement | null;
        if (btn && menu) {
          btn.setAttribute('aria-expanded', 'false');
          menu.style.opacity = '0';
          menu.style.visibility = 'hidden';
          menu.style.transform = 'translateY(4px)';
          menu.style.pointerEvents = 'none';
          if (icon) icon.style.transform = '';
        }
      });
    }
  });
}
