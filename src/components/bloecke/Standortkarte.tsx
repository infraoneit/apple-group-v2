import type { Einstellungen } from '@/lib/cms';
import { absaetze, sauberText } from '@/lib/text';
import type { BlockDaten } from './BlockRenderer';
import { KartenEinbettung } from './KartenEinbettung';
import { Kontaktdaten } from './Kontaktdaten';

export function Standortkarte({ daten: d, einstellungen: e }: { daten: BlockDaten<'standortkarte'>; einstellungen: Einstellungen }) {
  const adresse = `${e.strasse}, ${e.plz} ${e.ort}`;

  return (
    <section id="standort" className="abschnitt scroll-mt-28">
      <div className="container-seite grid gap-12 lg:grid-cols-[2fr_1fr] lg:gap-20 2xl:gap-28">
        <div>
          <h2 className="titel-2">{sauberText(d.titel)}</h2>
          {absaetze(d.text).map((a, i) => (
            <p key={i} className="einleitung lesebreite mt-5">
              {a}
            </p>
          ))}
          <div className="mt-10">
            <KartenEinbettung adresse={adresse} titel={`Karte: ${e.firmenname}, ${adresse}`} />
          </div>
        </div>
        {d.kontaktdatenZeigen ? <Kontaktdaten einstellungen={e} /> : null}
      </div>
    </section>
  );
}
