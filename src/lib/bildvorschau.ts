import 'server-only';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

/**
 * UNSCHARFE VORSCHAU FÜR DIE ERSTEN BILDER
 *
 * Erzeugt aus einem Bild unter public/ eine winzige, unscharfe Fassung (rund 300 Byte) als
 * Data-URL. next/image zeigt sie sofort an (placeholder="blur"), bis das eigentliche Bild
 * geladen ist. Der Besuch sieht so ab dem ersten Moment ein Bild statt einer leeren Fläche,
 * ohne zusätzliche Anfrage und ohne spürbar grösseres HTML.
 *
 * Die Seiten werden beim Build statisch erzeugt, die Vorschau entsteht also einmal beim Build.
 * Fehlt die Datei oder sharp (z. B. zur Laufzeit in einer Funktion), gibt es einfach keine
 * Vorschau, die Seite funktioniert trotzdem.
 */
const zwischenspeicher = new Map<string, string | undefined>();

export async function unscharfeVorschau(src: string | null | undefined): Promise<string | undefined> {
  if (!src || !src.startsWith('/bilder/') || /\.svg$/i.test(src)) return undefined;
  if (zwischenspeicher.has(src)) return zwischenspeicher.get(src);

  let ergebnis: string | undefined;
  try {
    const datei = path.join(process.cwd(), 'public', src);
    if (existsSync(datei)) {
      const sharp = (await import('sharp')).default;
      const puffer = await sharp(readFileSync(datei), { failOn: 'none' })
        .resize(24, 24, { fit: 'inside' })
        .webp({ quality: 40 })
        .toBuffer();
      ergebnis = `data:image/webp;base64,${puffer.toString('base64')}`;
    }
  } catch {
    ergebnis = undefined;
  }
  zwischenspeicher.set(src, ergebnis);
  return ergebnis;
}
