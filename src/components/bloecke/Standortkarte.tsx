import Image from 'next/image';
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
          <div className={d.bild ? 'mt-10 grid gap-8 sm:grid-cols-2' : 'mt-10'}>
            <KartenEinbettung adresse={adresse} titel={`Karte: ${e.firmenname}, ${adresse}`} />
            {d.bild ? (
              <div className="relative aspect-square sm:aspect-[16/10]">
                <div className="vitrine-licht" />
                <div className="vitrine-rahmen h-full">
                  <Image src={d.bild} alt={d.bildAlt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                </div>
              </div>
            ) : null}
          </div>
          {d.hinweis ? <p className="mt-6 text-sm text-text-leise">{sauberText(d.hinweis)}</p> : null}
        </div>
        {d.kontaktdatenZeigen ? <Kontaktdaten einstellungen={e} /> : null}
      </div>
    </section>
  );
}
