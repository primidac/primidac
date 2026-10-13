export const siteConfig = {
  name: 'Primidac',
  title: 'Primidac — Product Engineer · Cyber Security & AI Automation',
  description: 'Product engineer building secure software and AI automations. Selected work, writing and contact.',
  url: 'https://primidac.com',
  ogImage: 'https://primidac.com/og.jpg',
  nav: [
    {
      label: 'WORK',
      href: '#work',
    },
    {
      label: 'ABOUT',
      href: '#about',
    },
    {
      label: 'WRITING',
      href: '/writing',
    },
    {
      label: 'CONTACT',
      href: '#contact',
    },
  ],
  tagline: 'I build secure products and AI automations.',
  social: {
    github: 'https://github.com/primidac',
    linkedin: 'https://linkedin.com',
    x: 'https://x.com',
  },
  cta: {
    label: 'Book a call',
    href: '#contact',
  },
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
export type NavChild = { label: string; href: string; description: string };
