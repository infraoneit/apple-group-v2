import Image from 'next/image';
import { sauberText } from '@/lib/text';
import type { BlockDaten } from './BlockRenderer';

/** Ruhige Logoleiste ohne Laufband: Logos in Graustufen, farbig beim Überfahren. */
export function Logos({ daten: d }: { daten: BlockDaten<'logos'> }) {
  return (
    <section className="abschnitt-kompakt border-y border-linie">
      <div className="container-seite">
        {d.titel ? <h2 className="mb-10 text-center text-sm font-semibold tracking-[0.14em] text-text-leise uppercase">{sauberText(d.titel)}</h2> : null}
        <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 lg:gap-x-20">
          {d.logos.map((l, i) => {
            const bild = (
              <Image
                src={l.logo}
                alt={l.name}
                width={180}
                height={72}
                unoptimized={l.logo.endsWith('.svg')}
                className="h-10 w-auto max-w-[160px] object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 lg:h-12"
              />
            );
            return (
              <li key={`${l.name}-${i}`}>
                {l.link ? (
                  <a href={l.link} target={l.link.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                    {bild}
                  </a>
                ) : (
                  bild
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
