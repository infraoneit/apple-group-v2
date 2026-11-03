import Image from 'next/image';
import { Mail, Phone, UserRound } from 'lucide-react';
import { AbschnittKopf } from '@/components/ui/AbschnittKopf';
import { sauberText } from '@/lib/text';
import type { BlockDaten } from './BlockRenderer';

type Person = BlockDaten<'team'>['personen'][number];

function Kontakt({ p }: { p: Person }) {
  if (!p.email && !p.telefon) return null;
  return (
    <p className="mt-2 flex flex-col gap-1 text-sm text-text-hell-leise">
      {p.email ? (
        <a href={`mailto:${p.email}`} className="inline-flex min-h-6 items-center gap-2 break-all hover:text-gold">
          <Mail className="size-4 shrink-0" aria-hidden />
          {p.email}
        </a>
      ) : null}
      {p.telefon ? (
        <a href={`tel:${p.telefon.replaceAll(' ', '')}`} className="inline-flex min-h-6 items-center gap-2 hover:text-gold">
          <Phone className="size-4 shrink-0" aria-hidden />
          {p.telefon}
        </a>
      ) : null}
    </p>
  );
}

function Portrait({ p, sizes, eager = false }: { p: Person; sizes: string; eager?: boolean }) {
  return (
    <div className="relative aspect-[4/5]">
      <div className="vitrine-licht" />
      <div className="vitrine-rahmen h-full">
        {p.foto ? (
          <Image
            src={p.foto}
            alt={`${p.name}, ${p.funktion}`}
            fill
            sizes={sizes}
            loading={eager ? 'eager' : 'lazy'}
            className="object-cover object-top"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-linie-dunkel" aria-hidden>
            <UserRound className="size-1/3" strokeWidth={1} />
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * Team: bei einer Person ein ruhiges Porträt mit Text daneben (wie eine Vitrine mit einem
 * einzelnen Stück), ab zwei Personen ein Raster.
 */
export function Team({ daten: d }: { daten: BlockDaten<'team'> }) {
  if (d.personen.length === 0) return null;

  if (d.personen.length === 1) {
    const p = d.personen[0];
    return (
      <section className="abschnitt bg-flaeche-dunkel text-text-hell">
        <div className="container-seite grid items-center gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20 2xl:gap-28">
          <div className="mx-auto w-full max-w-md md:max-w-none lg:max-w-lg" data-einblenden>
            <Portrait p={p} sizes="(min-width: 1024px) 512px, (min-width: 768px) 40vw, 100vw" />
          </div>
          <div className="max-w-2xl" data-einblenden>
            {d.ueberzeile ? <p className="vitrine-plakette">{sauberText(d.ueberzeile)}</p> : null}
            <h2 className="titel-2 mt-3">{sauberText(d.titel)}</h2>
            {d.text ? <p className="einleitung mt-6 text-text-hell-leise">{sauberText(d.text)}</p> : null}
            <div className="mt-10 border-l border-gold/50 pl-6 lg:mt-12">
              <h3 className="titel-3 text-text-hell">{sauberText(p.name)}</h3>
              <p className="mt-2 text-text-hell-leise">{sauberText(p.funktion)}</p>
              <Kontakt p={p} />
            </div>
          </div>
        </div>
        {d.gruppenbild ? (
          <div className="container-seite">
            <div className="relative mt-16 aspect-[16/9] lg:mt-20 lg:aspect-[21/9]" data-einblenden>
              <div className="vitrine-licht" />
              <div className="vitrine-rahmen h-full">
                <Image src={d.gruppenbild} alt={d.gruppenbildAlt} fill sizes="(min-width: 2400px) 2304px, 100vw" className="object-cover" />
              </div>
            </div>
          </div>
        ) : null}
      </section>
    );
  }

  return (
    <section className="abschnitt bg-flaeche-dunkel text-text-hell">
      <div className="container-seite">
        <AbschnittKopf ueberzeile={d.ueberzeile} titel={d.titel} text={d.text} hell />
        <ul className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:gap-x-8 xl:grid-cols-4 2xl:grid-cols-5">
          {d.personen.map((p, i) => (
            <li key={`${p.name}-${i}`} data-einblenden style={{ '--einblenden-index': i % 5 } as React.CSSProperties}>
              <Portrait p={p} sizes="(min-width: 1536px) 20vw, (min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw" />
              <h3 className="titel-3 mt-4 text-text-hell">{sauberText(p.name)}</h3>
              <p className="text-text-hell-leise">{sauberText(p.funktion)}</p>
              <Kontakt p={p} />
            </li>
          ))}
        </ul>
        {d.gruppenbild ? (
          <div className="relative mt-16 aspect-[16/9] lg:mt-20 lg:aspect-[21/9]" data-einblenden>
            <div className="vitrine-licht" />
            <div className="vitrine-rahmen h-full">
              <Image src={d.gruppenbild} alt={d.gruppenbildAlt} fill sizes="(min-width: 2400px) 2304px, 100vw" className="object-cover" />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
