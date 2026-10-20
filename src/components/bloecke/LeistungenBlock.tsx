import { AbschnittKopf } from '@/components/ui/AbschnittKopf';
import { LeistungKarte, rasterFuerKacheln } from '@/components/karten/Karten';
import { holeLeistungen } from '@/lib/cms';
import type { BlockDaten } from './BlockRenderer';

/** Zeigt automatisch alle Leistungen in der Reihenfolge aus dem CMS. */
export async function LeistungenBlock({ daten: d }: { daten: BlockDaten<'leistungen'> }) {
  const leistungen = await holeLeistungen();
  if (leistungen.length === 0) return null;

  return (
    <section className="abschnitt">
      <div className="container-seite">
        <AbschnittKopf ueberzeile={d.ueberzeile} titel={d.titel} text={d.text} />
        <div className={rasterFuerKacheln(leistungen.length)}>
          {leistungen.map((l) => (
            <LeistungKarte key={l.slug} leistung={l} />
          ))}
        </div>
      </div>
    </section>
  );
}
