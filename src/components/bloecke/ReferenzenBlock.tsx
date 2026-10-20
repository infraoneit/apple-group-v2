import { AbschnittKopf } from '@/components/ui/AbschnittKopf';
import { ReferenzKarte } from '@/components/karten/Karten';
import { holeReferenzenFuerStartseite } from '@/lib/cms';
import { cn } from '@/lib/cn';
import type { BlockDaten } from './BlockRenderer';

/**
 * Neuste Referenzen, automatisch.
 * Auswahlregel: src/lib/startseite-auswahl.ts (markierte zuerst, Rest mit den neusten auffüllen).
 */
export async function ReferenzenBlock({ daten: d }: { daten: BlockDaten<'referenzen'> }) {
  const anzahl = Number(d.anzahl);
  const referenzen = await holeReferenzenFuerStartseite(anzahl);
  if (referenzen.length === 0) return null;

  return (
    <section className="abschnitt bg-flaeche-dunkel text-text-hell">
      <div className="container-seite">
        <AbschnittKopf
          ueberzeile={d.ueberzeile}
          titel={d.titel}
          text={d.text}
          link={d.linkText ? { text: d.linkText, href: '/referenzen' } : undefined}
          hell
        />
        <div className={cn('grid gap-x-8 gap-y-12 sm:grid-cols-2', referenzen.length === 4 ? 'lg:grid-cols-2 xl:grid-cols-4' : 'lg:grid-cols-3')}>
          {referenzen.map((r) => (
            <ReferenzKarte key={r.slug} referenz={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
