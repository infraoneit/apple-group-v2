import { NetlifyFormular } from '@/components/formulare/NetlifyFormular';
import type { Einstellungen } from '@/lib/cms';
import { absaetze, sauberText } from '@/lib/text';
import type { BlockDaten } from './BlockRenderer';
import { Kontaktdaten } from './Kontaktdaten';

export function Kontaktformular({ daten: d, einstellungen: e }: { daten: BlockDaten<'kontaktformular'>; einstellungen: Einstellungen }) {
  return (
    <section id="formular" className="abschnitt scroll-mt-28">
      <div className="container-seite grid gap-12 lg:grid-cols-[2fr_1fr] lg:gap-20 2xl:gap-28">
        <div>
          <h2 className="titel-2">{sauberText(d.titel)}</h2>
          {absaetze(d.text).map((a, i) => (
            <p key={i} className="einleitung mt-5 max-w-3xl">
              {a}
            </p>
          ))}
          <NetlifyFormular
            name="kontakt"
            className="mt-10"
            betreffOptionen={d.betreffOptionen}
            bestaetigung={sauberText(d.bestaetigung)}
            kontaktEmail={e.email}
            kontaktTelefon={e.telefon}
          />
        </div>

        {d.kontaktdatenZeigen ? <Kontaktdaten einstellungen={e} /> : null}
      </div>
    </section>
  );
}
