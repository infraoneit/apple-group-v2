import type { Metadata, Viewport } from 'next';
import { DOMAIN, SPRACHE } from '@/site.config';
import { schriftText, schriftUeberschrift } from './schriften';

export const metadata: Metadata = {
  metadataBase: new URL(DOMAIN),
};

export const viewport: Viewport = {
  themeColor: '#2c2319',
};

/** Verhindert den Farbwechsel-Blitz beim Laden: setzt data-theme, bevor React startet. */
const THEME_SKRIPT = `try{if(localStorage.getItem('theme')==='light')document.documentElement.dataset.theme='light'}catch(e){}`;

/**
 * Wurzel-Layout: nur html und body.
 * globals.css wird bewusst erst in (website)/layout.tsx und not-found.tsx geladen,
 * damit Tailwind die Keystatic-Oberfläche unter /keystatic nicht verändert.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={SPRACHE} className={`${schriftText.variable} ${schriftUeberschrift.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SKRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
