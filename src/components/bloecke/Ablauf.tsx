import { AbschnittKopf } from '@/components/ui/AbschnittKopf';
import { sauberText } from '@/lib/text';
import type { BlockDaten } from './BlockRenderer';

/**
 * Nummerierte Schritte. Handy: untereinander mit senkrechter Linie.
 * Tablet: zwei Spalten ohne Linie. Ab 1280 px: nebeneinander mit waagrechter Linie.
 */
export function Ablauf({ daten: d }: { daten: BlockDaten<'ablauf'> }) {
  const spalten = d.schritte.length >= 5 ? 'xl:grid-cols-5' : d.schritte.length === 4 ? 'xl:grid-cols-4' : 'xl:grid-cols-3';

  return (
    <section className="abschnitt">
      <div className="container-seite">
        <AbschnittKopf ueberzeile={d.ueberzeile} titel={d.titel} text={d.text} />
        <ol className={`relative grid gap-10 md:grid-cols-2 md:gap-x-12 xl:gap-8 ${spalten}`}>
          {d.schritte.map((s, i) => (
            <li
              key={i}
              data-einblenden
              style={{ '--einblenden-index': i } as React.CSSProperties}
              className="relative pl-16 xl:pt-16 xl:pl-0"
            >
              {/* Verbindungslinie zum nächsten Schritt */}
              {i < d.schritte.length - 1 ? (
                <span
                  className="absolute top-12 bottom-[-2.5rem] left-[1.4rem] w-px bg-linie md:hidden xl:top-[1.4rem] xl:right-[-2rem] xl:bottom-auto xl:left-12 xl:block xl:h-px xl:w-auto"
                  aria-hidden
                />
              ) : null}
              <span
                className="absolute top-0 left-0 flex size-11 items-center justify-center rounded-full border border-akzent bg-flaeche font-titel text-sm font-bold text-akzent"
                aria-hidden
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="titel-3">{sauberText(s.titel)}</h3>
              <p className="mt-3 max-w-xl text-text-leise">{sauberText(s.text)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
