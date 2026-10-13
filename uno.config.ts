import { icons as lucide } from '@iconify-json/lucide';
import { icons as ph } from '@iconify-json/ph';
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWebFonts,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';

export default defineConfig({
  presets: [
    presetWind3(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
      collections: {
        lucide: () => lucide,
        ph: () => ph,
      },
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetTypography(),
    presetWebFonts({
      provider: 'none',
      fonts: {
        sans: ['Manrope', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
        display: ['Outfit', 'sans-serif'],
        tech: ['Orbitron', 'sans-serif'],
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],

  // --- Design System Theme Tokens (Redesign Playbook) ---
  theme: {
    colors: {
      paper: 'var(--paper)',
      surface: 'var(--surface)',
      'surface-subtle': 'var(--surface-subtle)',
      ink: 'var(--ink)',
      muted: 'var(--muted)',
      accent: 'var(--accent)',
      'accent-bg': 'var(--accent-bg)',
      hairline: 'var(--hairline)',
    },
    borderRadius: {
      'xs': '2px',
      'sm': '4px',
      'md': '8px',
      'lg': '12px',
      'xl': '16px',
      'full': '9999px',
    },
    boxShadow: {
      'subtle': '0 1px 3px rgba(0, 0, 0, 0.08)',
      'card': '0 4px 12px rgba(0, 0, 0, 0.06)',
      'button': '0 2px 4px rgba(0, 0, 0, 0.12)',
    },
  },

  // --- Engineered Shortcuts ---
  shortcuts: [
    // Layout
    {
      'page-container': 'max-w-[76rem] mx-auto px-5 sm:px-8 lg:px-12',
      'section-padding': 'py-20 md:py-28 lg:py-32',
      'section-padding-sm': 'py-12 md:py-16',
      'border-hairline': 'border border-[var(--hairline)]',
      'border-b-hairline': 'border-b border-[var(--hairline)]',
      'border-t-hairline': 'border-t border-[var(--hairline)]',
    },

    // Minimalist Components
    {
      'card-surface': 'bg-[var(--surface)] border border-[var(--hairline)] rounded-lg p-6 sm:p-8 transition-all duration-200',
      'mono-tag': 'inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono tracking-wider uppercase border border-[var(--hairline)] rounded-sm text-[var(--ink)] bg-transparent',
      'section-tag': 'inline-flex items-center gap-1.5 text-xs font-mono tracking-widest uppercase text-[var(--muted)]',
    },

    // Buttons
    {
      'btn-base': 'inline-flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)] disabled:opacity-50 disabled:pointer-events-none font-sans font-medium text-sm rounded-lg',
      'btn-primary': 'btn-base bg-[var(--ink)] text-[var(--paper)] hover:opacity-90 px-5 py-2.5 shadow-button active:translate-y-[1px]',
      'btn-accent': 'btn-base bg-[var(--accent)] text-[#161616] hover:opacity-90 px-5 py-2.5 font-semibold active:translate-y-[1px]',
      'btn-outline': 'btn-base bg-transparent hover:bg-[rgba(128,128,128,0.08)] text-[var(--ink)] border border-[var(--hairline)] px-5 py-2.5',
      'link-underline': 'text-[var(--ink)] underline underline-offset-4 decoration-[var(--hairline)] hover:decoration-[var(--accent)] transition-colors',
    },

    // Typography
    {
      'h1-display': 'font-display font-semibold text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.12] tracking-tight text-[var(--ink)]',
      'h2-display': 'font-display font-semibold text-[clamp(1.75rem,3.5vw,2.6rem)] leading-[1.2] tracking-tight text-[var(--ink)]',
      'body-editorial': 'font-sans text-[17px] sm:text-[18px] leading-[1.65] text-[var(--ink)] max-w-[65ch]',
      'body-muted': 'font-sans text-[15px] sm:text-[16px] leading-[1.6] text-[var(--muted)]',
    },
  ],
});
