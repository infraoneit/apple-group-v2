import { notFound } from 'next/navigation';
import { Seitenkopf } from '@/components/ui/Seitenkopf';
import { Galerie } from '@/components/ui/Galerie';
import { ReferenzKarte } from '@/components/karten/Karten';
import { holeReferenz, holeReferenzen, holeUebersichten } from '@/lib/cms';
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
  return metadaten({ pfad: `/referenzen/${slug}`, seitentitel: r.titel, seo: r.seo, beschreibungFallback: r.kurzbeschreibung, bild: r.titelbild });
}

export default async function ReferenzSeite({ params }: Props) {
  const { slug } = await params;
  const [r, alle, { referenzen: u }] = await Promise.all([holeReferenz(slug), holeReferenzen(), holeUebersichten()]);
  if (!r) notFound();
  const inhalt = await renderMarkdoc(r.inhalt);
  const weitere = alle.filter((x) => x.slug !== slug).slice(0, 3);

  const bilder = [{ bild: r.titelbild, alt: r.titelbildAlt }, ...r.galerie];

  return (
    <>
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
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.5] [background-image:linear-gradient(var(--color-linie-dunkel)_1px,transparent_1px),linear-gradient(90deg,var(--color-linie-dunkel)_1px,transparent_1px)] [background-size:80px_80px] [mask-image:radial-gradient(70%_70%_at_50%_50%,black,transparent)]"
          aria-hidden
        />
        <div className="container-seite relative">
          <Galerie bilder={bilder} sizes="(min-width: 2400px) 2304px, 100vw" seitenverhaeltnis="aspect-[16/9] lg:aspect-[21/9]" />
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
    </>
  );
}
