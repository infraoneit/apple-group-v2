/**
 * ZENTRALE PROJEKT-EINSTELLUNGEN
 *
 * Diese Datei ist die einzige Stelle, die pro Projekt angepasst werden muss,
 * bevor Keystatic, GitHub und Netlify verbunden werden.
 * `npm run pruefen:konfiguration` kontrolliert die Werte.
 *
 * Wichtig: Diese Datei darf keine Imports enthalten. Sie wird auch direkt von
 * den Prüfskripten in /scripts gelesen.
 */

/** Anzeigename des Projekts (Kopfzeile in Keystatic, Ersatz für den SEO-Titel). */
export const PROJEKT_NAME = 'Apple Property Group AG';

/** Produktive Domain ohne Schrägstrich am Ende, z. B. https://muster.ch */
export const DOMAIN = 'https://www.apple-group.ch';

/** GitHub-Repository im Format besitzer/repo-name, z. B. infraoneit/muster-website */
export const GITHUB_REPO = 'infraoneit/apple-group-v2';

/**
 * SPEICHERMODUS VON KEYSTATIC
 *
 * 'automatisch'  Empfohlen. Lokal (npm run dev) werden Inhalte direkt in die
 *                Dateien geschrieben. Auf Netlify speichert Keystatic über GitHub.
 * 'lokal'        Erzwingt lokales Speichern, auch im Build. Auf Netlify verboten,
 *                der Build bricht dann bewusst ab.
 * 'github'       Erzwingt GitHub auch lokal. Nur nötig, um die GitHub-App
 *                einzurichten oder den GitHub-Login lokal zu testen.
 */
export const KEYSTATIC_MODUS: 'automatisch' | 'lokal' | 'github' = 'automatisch';

/** Sprache für <html lang> und Open Graph. */
export const SPRACHE = 'de-CH';
export const OG_LOCALE = 'de_CH';
