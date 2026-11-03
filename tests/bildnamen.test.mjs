import { test } from 'node:test';
import assert from 'node:assert/strict';
import { altTextAusJson, altTextAusMdoc, dateinameAusText, neuerBildname } from '../scripts/lib/bildnamen.mjs';

test('Dateiname aus deutschem Text', () => {
  assert.equal(dateinameAusText('Garten mit Feuerstelle am Abend, Einfamilienhaus Winterthur'), 'garten-mit-feuerstelle-am-abend-einfamilienhaus-winterthur');
  assert.equal(dateinameAusText('Küche, Stuckdecke & Bad: Jugendstil-Villa Ermatingen'), 'kueche-stuckdecke-bad-jugendstil-villa-ermatingen');
  assert.equal(dateinameAusText('  Strasse 40a  '), 'strasse-40a');
  assert.equal(dateinameAusText(''), '');
});

test('Dateiname wird an einer Wortgrenze gekürzt', () => {
  const lang = dateinameAusText('a'.repeat(30) + ' ' + 'b'.repeat(30) + ' ' + 'c'.repeat(30) + ' d');
  assert.ok(lang.length <= 80);
  assert.ok(!lang.endsWith('-'));
  assert.equal(lang, 'a'.repeat(30) + '-' + 'b'.repeat(30));
});

test('Alt-Text aus Markdoc, Titelbild und Galerie, auch gefaltet', () => {
  const mdoc = `---
titel: Test
titelbild: /bilder/referenzen/test/titelbild.webp
titelbildAlt: Aussenansicht bei Tag
galerie:
  - bild: /bilder/referenzen/test/galerie/0/bild.webp
    alt: Garten am Abend
  - bild: /bilder/referenzen/test/galerie/1/bild.webp
    alt: >-
      Schlafzimmer mit Zweigleuchter und Gartenzugang,
      Einfamilienhaus Winterthur
seo: {}
---
`;
  assert.equal(altTextAusMdoc(mdoc, '/bilder/referenzen/test/titelbild.webp'), 'Aussenansicht bei Tag');
  assert.equal(altTextAusMdoc(mdoc, '/bilder/referenzen/test/galerie/0/bild.webp'), 'Garten am Abend');
  assert.equal(altTextAusMdoc(mdoc, '/bilder/referenzen/test/galerie/1/bild.webp'), 'Schlafzimmer mit Zweigleuchter und Gartenzugang, Einfamilienhaus Winterthur');
  assert.equal(altTextAusMdoc(mdoc, '/bilder/gibt-es-nicht.webp'), '');
});

test('Alt-Text aus JSON, Geschwisterfeld oder Name der Person', () => {
  const daten = {
    bloecke: [
      { discriminant: 'hero', value: { bild: '/bilder/a.webp', bildAlt: 'Hero-Bild' } },
      { discriminant: 'team', value: { gruppenbild: '/bilder/g.webp', gruppenbildAlt: 'Das Team', personen: [{ name: 'Natalie Piller', foto: '/bilder/p.webp' }] } },
    ],
  };
  assert.equal(altTextAusJson(daten, '/bilder/a.webp'), 'Hero-Bild');
  assert.equal(altTextAusJson(daten, '/bilder/g.webp'), 'Das Team');
  assert.equal(altTextAusJson(daten, '/bilder/p.webp'), 'Natalie Piller');
  assert.equal(altTextAusJson(daten, '/bilder/x.webp'), '');
});

test('Nur Standardnamen werden umbenannt', () => {
  assert.equal(neuerBildname('bild.webp', 'Garten am Abend'), 'garten-am-abend.webp');
  assert.equal(neuerBildname('titelbild.WEBP', 'Aussenansicht'), 'aussenansicht.webp');
  assert.equal(neuerBildname('garten-am-abend.webp', 'Garten am Abend'), null);
  assert.equal(neuerBildname('bild.webp', '', 'winterthur titelbild'), 'winterthur-titelbild.webp');
  assert.equal(neuerBildname('bild.webp', '', ''), null);
  assert.equal(neuerBildname('bild.webp', 'bild'), null);
});
