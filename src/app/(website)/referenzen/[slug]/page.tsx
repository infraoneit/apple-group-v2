import { existsSync } from 'node:fs';
import path from 'node:path';
import { notFound } from 'next/navigation';
import { Seitenkopf } from '@/components/ui/Seitenkopf';
import { JsonLd } from '@/components/seo/JsonLd';
import { DOMAIN } from '@/site.config';
import { Galerie } from '@/components/ui/Galerie';
import { unscharfeVorschau } from '@/lib/bildvorschau';
import { ReferenzKarte } from '@/components/karten/Karten';
import { Kontaktaufruf } from '@/components/bloecke/Kontaktaufruf';
import { holeEinstellungen, holeReferenz, holeReferenzen, holeUebersichten } from '@/lib/cms';
import { renderMarkdoc } from '@/lib/markdoc';
import { metadaten } from '@/lib/seo';

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await holeReferenzen()).map((r) => ({ slug: r.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const r = await holeReferenz(slug);
  if (!r) return {};
  // Vorschaubild als JPG (1200 x 630), weil nicht alle sozialen Netzwerke WebP anzeigen.
  // scripts/optimiere-bilder.mjs erzeugt es vor jedem Build, zur Sicherheit sonst das Titelbild.
  const vorschau = `/bilder/referenzen/${slug}/vorschau.jpg`;
  const bild = existsSync(path.join(process.cwd(), 'public', vorschau)) ? vorschau : r.titelbild;
  return metadaten({ pfad: `/referenzen/${slug}`, seitentitel: r.titel, seo: r.seo, beschreibungFallback: r.kurzbeschreibung, bild, bildAlt: r.titelbildAlt });
}

export default async function ReferenzSeite({ params }: Props) {
  const { slug } = await params;
  const [r, alle, { referenzen: u, referenzenKontaktaufruf: aufruf }, e] = await Promise.all([holeReferenz(slug), holeReferenzen(), holeUebersichten(), holeEinstellungen()]);
  if (!r) notFound();
  const inhalt = await renderMarkdoc(r.inhalt);
  const weitere = alle.filter((x) => x.slug !== slug).slice(0, 3);

  // Mit unscharfer Vorschau je Bild (wenige hundert Byte), damit die Galerie sofort ein Bild zeigt
  const bilder = await Promise.all(
    [{ bild: r.titelbild, alt: r.titelbildAlt }, ...r.galerie].map(async (b) => ({ ...b, vorschau: await unscharfeVorschau(b.bild) }))
  );

  // Strukturierte Daten: die Projektseite als Bildergalerie mit Bezug zur Firma
  const galerieDaten = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: r.titel,
    description: r.kurzbeschreibung,
    url: `${DOMAIN}/referenzen/${slug}`,
    inLanguage: 'de-CH',
    about: { '@type': 'Place', name: `${r.titel}`, address: { '@type': 'PostalAddress', addressLocality: r.ort, addressCountry: 'CH' } },
    creator: { '@id': `${DOMAIN}/#organisation` },
    image: bilder.map((b) => ({ '@type': 'ImageObject', contentUrl: new URL(b.bild, DOMAIN).toString(), caption: b.alt })),
  };

  return (
    <>
      <JsonLd daten={galerieDaten} />
      <Seitenkopf
        ueberzeile={r.kategorie || undefined}
        titel={r.titel}
        einleitung={r.kurzbeschreibung}
        pfad={[
          { text: u.titel, href: '/referenzen' },
          { text: r.titel, href: `/referenzen/${slug}` },
        ]}
      />

      <div className="relative bg-flaeche-dunkel pt-12 pb-16 lg:pt-16 lg:pb-20">
        <div className="container-seite relative">
          <Galerie bilder={bilder} sizes="(min-width: 2400px) 2304px, 100vw" />
        </div>
      </div>

      <section className="abschnitt">
        {/* Keine Projektdaten (Bauherrschaft, Datum) auf Wunsch der Kundschaft, nur der Projektbeschrieb. */}
        <div className="container-seite">
          <div className="fliesstext lesebreite">{inhalt}</div>
        </div>
      </section>

      {weitere.length > 0 ? (
        <section className="abschnitt border-t border-linie-dunkel bg-flaeche-dunkel text-text-hell">
          <div className="container-seite">
            <h2 className="titel-2 mb-10">Weitere Projekte</h2>
            <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {weitere.map((w) => (
                <ReferenzKarte key={w.slug} referenz={w} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {aufruf.titel ? (
        <Kontaktaufruf
          daten={{
            titel: aufruf.titel,
            text: aufruf.text,
            knopf: { text: aufruf.knopfText, link: aufruf.knopfLink },
            telefonZeigen: aufruf.telefonZeigen,
            hervorheben: false,
          }}
          einstellungen={e}
        />
      ) : null}
    </>
  );
}
