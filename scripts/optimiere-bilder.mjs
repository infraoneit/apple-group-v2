/**
 * BILDER OPTIMIEREN
 *
 * Bringt alle Inhaltsbilder unter public/bilder in das Format, das die Website braucht:
 *
 *   JPG und PNG       werden zu WebP (höchstens 1920 px, unter 300 KB), der Verweis in den
 *                     Inhalten (content/**) wird automatisch angepasst, die Quelldatei entfernt
 *   WebP              wird neu komprimiert, wenn es grösser als 1920 px oder 450 KB ist
 *   Standardnamen     (bild.webp, titelbild.webp, foto.webp, wie Keystatic sie vergibt) werden
 *                     in einen sprechenden Namen aus dem Alt-Text umbenannt, z. B.
 *                     garten-mit-feuerstelle-am-abend-einfamilienhaus-winterthur.webp
 *   Projekte          erhalten ein Vorschaubild vorschau.jpg (1200 x 630) für soziale Netzwerke,
 *                     falls es fehlt oder älter als das Titelbild ist
 *
 * Unangetastet bleiben: public/bilder/firma (Logo, Signet, Vorschaubild der Firma), SVG, GIF,
 * vorschau.jpg und die Standortkarte.
 *
 * Läuft automatisch
 *   - vor jedem Build (npm run build, also auch auf Netlify): die Website wird immer mit
 *     optimierten Bildern gebaut, egal was die Kundschaft über Keystatic hochgeladen hat
 *   - als GitHub Action nach jedem Push mit Bildern: die optimierten Dateien werden ins
 *     Repository zurückgeschrieben, damit es klein bleibt
 * Von Hand: npm run bilder:optimieren
 */
import { existsSync, readdirSync, readFileSync, renameSync, statSync, unlinkSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { altTextAusJson, altTextAusMdoc, neuerBildname } from './lib/bildnamen.mjs';

const wurzel = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sharp = createRequire(import.meta.url)('sharp');
const BILDER = path.join(wurzel, 'public', 'bilder');
const INHALTE = path.join(wurzel, 'content');
const MAX_PX = 1920;
const ZIEL_KB = 300;
/* Bestehende WebP werden erst ab dieser Grösse angefasst, damit ein Bild knapp über dem Ziel
   nicht bei jedem Build erneut komprimiert wird und dabei Qualität verliert. */
const NEU_AB_KB = 450;
const QUALITAET = 78;
const QUALITAET_NOTFALL = 66;
const AUSGENOMMEN = [path.join(BILDER, 'firma')];

const dateien = (ordner, filter) => {
  const ergebnis = [];
  if (!existsSync(ordner)) return ergebnis;
  for (const eintrag of readdirSync(ordner)) {
    const voll = path.join(ordner, eintrag);
    if (statSync(voll).isDirectory()) ergebnis.push(...dateien(voll, filter));
    else if (filter(voll)) ergebnis.push(voll);
  }
  return ergebnis;
};
const oeffentlich = (datei) => '/' + path.relative(path.join(wurzel, 'public'), datei).split(path.sep).join('/');
const kb = (n) => Math.round(n / 1024);
const ausgenommen = (datei) => AUSGENOMMEN.some((o) => datei.startsWith(o + path.sep)) || /vorschau\.jpe?g$/i.test(datei);

/**
 * Erzeugt ein WebP, das möglichst unter ZIEL_KB bleibt, ohne Verlauf oder Transparenz zu zerstören.
 * Arbeitet bewusst mit einem Puffer statt dem Dateipfad: sharp hält die Datei sonst offen,
 * und Windows erlaubt dann kein Überschreiben oder Löschen.
 */
async function alsWebp(datei) {
  const daten = readFileSync(datei);
  const { hasAlpha } = await sharp(daten, { failOn: 'none' }).metadata();
  const basis = () => {
    let p = sharp(daten, { failOn: 'none' }).rotate().resize({ width: MAX_PX, height: MAX_PX, fit: 'inside', withoutEnlargement: true });
    if (!hasAlpha) p = p.flatten({ background: '#ffffff' });
    return p;
  };
  let puffer = await basis().webp({ quality: QUALITAET, effort: 6 }).toBuffer();
  if (puffer.length > ZIEL_KB * 1024) puffer = await basis().webp({ quality: QUALITAET_NOTFALL, effort: 6 }).toBuffer();
  return puffer;
}

/** Ersetzt einen Bildpfad in allen Inhaltsdateien. Gibt die Zahl der geänderten Dateien zurück. */
function verweiseErsetzen(alt, neu) {
  let geaendert = 0;
  for (const datei of dateien(INHALTE, (d) => /\.(json|mdoc|yaml|md)$/i.test(d))) {
    const text = readFileSync(datei, 'utf8');
    if (!text.includes(alt)) continue;
    writeFileSync(datei, text.split(alt).join(neu));
    geaendert++;
  }
  return geaendert;
}

let umgewandelt = 0;
let verkleinert = 0;
let vorschauen = 0;
let umbenannt = 0;
let gespart = 0;

// 1. JPG und PNG zu WebP, Verweise anpassen ------------------------------------------------
for (const datei of dateien(BILDER, (d) => /\.(jpe?g|png)$/i.test(d) && !ausgenommen(d))) {
  const vorher = statSync(datei).size;
  const neu = datei.replace(/\.(jpe?g|png)$/i, '.webp');
  const puffer = await alsWebp(datei);
  writeFileSync(neu, puffer);
  const treffer = verweiseErsetzen(oeffentlich(datei), oeffentlich(neu));
  unlinkSync(datei);
  umgewandelt++;
  gespart += vorher - puffer.length;
  console.log(`  WebP     ${path.relative(wurzel, datei)}  ${kb(vorher)} KB auf ${kb(puffer.length)} KB${treffer ? `, ${treffer} Verweis(e) angepasst` : ''}`);
}

// 2. Zu grosse WebP neu komprimieren -----------------------------------------------------------
for (const datei of dateien(BILDER, (d) => /\.webp$/i.test(d) && !ausgenommen(d))) {
  const vorher = statSync(datei).size;
  const { width = 0, height = 0 } = await sharp(readFileSync(datei), { failOn: 'none' }).metadata();
  if (vorher <= NEU_AB_KB * 1024 && Math.max(width, height) <= MAX_PX) continue;
  const puffer = await alsWebp(datei);
  // Nur schreiben, wenn es sich lohnt (mindestens 10 Prozent kleiner), sonst bleibt die Datei wie sie ist
  if (puffer.length > vorher * 0.9) continue;
  writeFileSync(datei, puffer);
  verkleinert++;
  gespart += vorher - puffer.length;
  console.log(`  kleiner  ${path.relative(wurzel, datei)}  ${kb(vorher)} KB auf ${kb(puffer.length)} KB`);
}

// 3. Standardnamen durch sprechende Namen aus dem Alt-Text ersetzen --------------------------------
const inhaltsdateien = dateien(INHALTE, (d) => /\.(json|mdoc)$/i.test(d));
for (const datei of dateien(BILDER, (d) => /\.webp$/i.test(d) && !ausgenommen(d))) {
  const pfad = oeffentlich(datei);
  let alt = '';
  for (const inhalt of inhaltsdateien) {
    const text = readFileSync(inhalt, 'utf8');
    if (!text.includes(pfad)) continue;
    alt = inhalt.endsWith('.json') ? altTextAusJson(JSON.parse(text), pfad) : altTextAusMdoc(text, pfad);
    if (alt) break;
  }
  // Ersatz, falls kein Alt-Text vorhanden ist: Projektordner und Feldname (z. B. winterthur-titelbild)
  const teile = path.relative(BILDER, datei).split(path.sep);
  const ersatz = teile[0] === 'referenzen' && teile.length > 2 ? `${teile[1]} ${path.basename(datei, '.webp')}` : '';
  const neuerName = neuerBildname(path.basename(datei), alt, ersatz);
  if (!neuerName) continue;
  let neu = path.join(path.dirname(datei), neuerName);
  for (let n = 2; existsSync(neu); n++) neu = path.join(path.dirname(datei), neuerName.replace(/\.webp$/, `-${n}.webp`));
  renameSync(datei, neu);
  verweiseErsetzen(pfad, oeffentlich(neu));
  umbenannt++;
  console.log(`  Name     ${path.relative(wurzel, datei)}  zu  ${path.basename(neu)}`);
}

// 4. Vorschaubild je Projekt aus dem Titelbild ---------------------------------------------------
const referenzen = path.join(INHALTE, 'referenzen');
for (const eintrag of dateien(referenzen, (d) => /\.mdoc$/i.test(d))) {
  const slug = path.basename(eintrag, '.mdoc');
  const titelbild = /^titelbild:\s*(\S+)/m.exec(readFileSync(eintrag, 'utf8'))?.[1];
  if (!titelbild) continue;
  const quelle = path.join(wurzel, 'public', titelbild);
  const ziel = path.join(BILDER, 'referenzen', slug, 'vorschau.jpg');
  if (!existsSync(quelle)) continue;
  if (existsSync(ziel) && statSync(ziel).mtimeMs >= statSync(quelle).mtimeMs) continue;
  const puffer = await sharp(readFileSync(quelle), { failOn: 'none' }).rotate().resize(1200, 630, { fit: 'cover', position: 'attention' }).flatten({ background: '#ffffff' }).jpeg({ quality: 80, mozjpeg: true }).toBuffer();
  writeFileSync(ziel, puffer);
  vorschauen++;
  console.log(`  Vorschau ${path.relative(wurzel, ziel)}  ${kb(puffer.length)} KB`);
}

const nichts = umgewandelt + verkleinert + umbenannt + vorschauen === 0;
console.log(nichts ? 'Bilder: alles in Ordnung, nichts zu tun.' : `\n${umgewandelt} Bilder zu WebP umgewandelt, ${verkleinert} verkleinert, ${umbenannt} umbenannt, ${vorschauen} Vorschaubilder erzeugt, ${(gespart / 1024 / 1024).toFixed(1)} MB gespart.\n`);
