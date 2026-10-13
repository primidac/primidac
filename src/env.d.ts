/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_PLAUSIBLE_DOMAIN?: string;
  readonly RESEND_API_KEY?: string;
  readonly SENTRY_DSN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  showConfirm: (message: string, onConfirm: () => void) => void;
}
