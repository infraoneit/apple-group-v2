/**
 * SPRECHENDE BILDNAMEN
 *
 * Keystatic speichert hochgeladene Bilder unter Standardnamen (bild.webp, titelbild.webp,
 * foto.webp). Für Google ist ein beschreibender Dateiname besser. Diese Hilfsfunktionen
 * leiten ihn aus dem Alt-Text ab, der zum Bild gehört, zum Beispiel
 *   "Garten mit Feuerstelle am Abend, Einfamilienhaus Winterthur"
 *   -> garten-mit-feuerstelle-am-abend-einfamilienhaus-winterthur.webp
 *
 * Reine Funktionen ohne Dateizugriff, damit sie mit `npm test` geprüft werden können.
 */

/** Dateinamen, die Keystatic selbst vergibt (ohne Endung). Nur diese werden umbenannt. */
export const STANDARDNAMEN = new Set(['bild', 'titelbild', 'foto', 'gruppenbild', 'ogbild', 'logo', 'logohell']);
const MAX_LAENGE = 80;

/** Macht aus einem deutschen Text einen Dateinamen: klein, ohne Umlaute, nur a-z, 0-9 und Bindestrich. */
export function dateinameAusText(text) {
  const umlaute = { ä: 'ae', ö: 'oe', ü: 'ue', ß: 'ss', é: 'e', è: 'e', ê: 'e', à: 'a', â: 'a', ç: 'c' };
  let s = String(text ?? '')
    .toLowerCase()
    .replace(/[äöüßéèêàâç]/g, (z) => umlaute[z])
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  if (s.length > MAX_LAENGE) s = s.slice(0, MAX_LAENGE).replace(/-[^-]*$/, '').replace(/-+$/, '');
  return s;
}

/** Liest einen YAML-Wert, auch gefaltet (`>-` mit eingerückten Folgezeilen), ab der Zeile `index`. */
function yamlWert(zeilen, index) {
  const m = /^\s*[\w-]+:\s*(.*)$/.exec(zeilen[index]);
  if (!m) return '';
  let wert = m[1].trim();
  if (wert === '>-' || wert === '>' || wert === '|' || wert === '|-') {
    const teile = [];
    for (let i = index + 1; i < zeilen.length && /^\s+\S/.test(zeilen[i]) && !/^\s*[\w-]+:\s/.test(zeilen[i]); i++) teile.push(zeilen[i].trim());
    wert = teile.join(' ');
  }
  return wert.replace(/^(['"])(.*)\1$/, '$2');
}

/**
 * Sucht in einem Markdoc-Frontmatter den Alt-Text zu einem Bildpfad:
 * `titelbild: X` mit `titelbildAlt: Y` daneben, oder `- bild: X` mit folgendem `alt: Y`.
 */
export function altTextAusMdoc(text, bildpfad) {
  const zeilen = text.split(/\r?\n/);
  for (let i = 0; i < zeilen.length; i++) {
    if (!zeilen[i].includes(bildpfad)) continue;
    const feld = /^\s*-?\s*([\w-]+):/.exec(zeilen[i])?.[1];
    for (let j = i + 1; j < Math.min(zeilen.length, i + 6); j++) {
      const name = /^\s*([\w-]+):/.exec(zeilen[j])?.[1];
      if (!name) continue;
      if (name === `${feld}Alt` || name === 'alt') return yamlWert(zeilen, j);
      if (/^(bild|titelbild|foto)$/.test(name) || zeilen[j].trim().startsWith('- ')) break;
    }
  }
  return '';
}

/**
 * Sucht in JSON-Inhalten (Startseite, Seiten, Einstellungen) den Alt-Text zu einem Bildpfad:
 * das Geschwisterfeld `<feld>Alt`, sonst `bildAlt`, bei Personen der `name`.
 */
export function altTextAusJson(daten, bildpfad) {
  let treffer = '';
  const suche = (knoten) => {
    if (treffer || !knoten || typeof knoten !== 'object') return;
    if (Array.isArray(knoten)) return knoten.forEach(suche);
    for (const [feld, wert] of Object.entries(knoten)) {
      if (wert === bildpfad) {
        treffer = knoten[`${feld}Alt`] || knoten.bildAlt || knoten.name || knoten.titel || '';
        return;
      }
    }
    Object.values(knoten).forEach(suche);
  };
  suche(daten);
  return typeof treffer === 'string' ? treffer : '';
}

/** Neuer Dateiname für ein Bild, oder null, wenn es keinen Standardnamen trägt oder kein Text bekannt ist. */
export function neuerBildname(dateiname, altText, ersatz = '') {
  const m = /^(.+)\.([a-z0-9]+)$/i.exec(dateiname);
  if (!m || !STANDARDNAMEN.has(m[1].toLowerCase())) return null;
  const basis = dateinameAusText(altText) || dateinameAusText(ersatz);
  if (!basis || basis === m[1].toLowerCase()) return null;
  return `${basis}.${m[2].toLowerCase()}`;
}
