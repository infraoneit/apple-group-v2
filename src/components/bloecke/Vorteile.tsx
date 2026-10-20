import { AbschnittKopf } from '@/components/ui/AbschnittKopf';
import { sauberText } from '@/lib/text';
import type { BlockDaten } from './BlockRenderer';

export function Vorteile({ daten: d }: { daten: BlockDaten<'vorteile'> }) {
  return (
    <section className="abschnitt bg-flaeche-dunkel text-text-hell">
      <div className="container-seite">
        <AbschnittKopf ueberzeile={d.ueberzeile} titel={d.titel} hell />
        <ol className="grid gap-px overflow-hidden rounded-[var(--radius-karte)] bg-linie-dunkel sm:grid-cols-2 xl:grid-cols-3">
          {d.eintraege.map((e, i) => (
            <li key={i} className="bg-flaeche-dunkel-2 p-8 lg:p-10">
              <span className="font-sans text-sm font-bold tracking-[0.1em] text-gold">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="titel-3 mt-4">{sauberText(e.titel)}</h3>
              <p className="mt-3 text-text-hell-leise">{sauberText(e.text)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
