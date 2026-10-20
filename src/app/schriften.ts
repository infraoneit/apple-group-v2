import { Cormorant, Inter } from 'next/font/google';

/**
 * Schriften werden von next/font beim Build heruntergeladen und selbst ausgeliefert.
 * Keine Verbindung zu Google beim Besuch der Seite (Datenschutz).
 * Cormorant für Überschriften: ein feiner, gravierter Serifenschnitt für die
 * Vitrinen-Gestaltung, Inter bleibt für Fliesstext, Formulare und Navigation.
 */
export const schriftText = Inter({
  subsets: ['latin'],
  variable: '--font-text',
  display: 'swap',
});

export const schriftUeberschrift = Cormorant({
  subsets: ['latin'],
  variable: '--font-ueberschrift',
  weight: ['600', '700'],
  display: 'swap',
});
