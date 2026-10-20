import { sauberText } from '@/lib/text';
import type { BlockDaten } from './BlockRenderer';

export function Kennzahlen({ daten: d }: { daten: BlockDaten<'kennzahlen'> }) {
  return (
    <section className="border-y border-linie bg-flaeche">
      <div className="container-seite">
        <dl className="grid grid-cols-2 md:grid-cols-4">
          {d.eintraege.map((e, i) => (
            <div key={i} className="flex flex-col-reverse border-linie px-2 py-10 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0 lg:px-10 lg:py-14">
              <dt className="mt-2 text-text-leise hyphens-auto break-words">{sauberText(e.bezeichnung)}</dt>
              <dd className="font-titel text-4xl font-extrabold tracking-tight text-text lg:text-6xl 3xl:text-7xl">{e.wert}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
