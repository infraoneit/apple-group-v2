import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, Clock } from 'lucide-react';
import type { Job, Leistung, Referenz } from '@/lib/cms';
import { cn } from '@/lib/cn';
import { sauberText } from '@/lib/text';

/** Grössenangaben für next/image, passend zu rasterFuerKacheln (1, 2, 3 oder 4 Spalten). */
const KARTEN_SIZES = '(min-width: 1536px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw';

type Ebene = 'h2' | 'h3';

/**
 * Kachelraster ohne leere Spalten: 4 Spalten auf grossen Bildschirmen nur,
 * wenn die Anzahl dazu passt (4, 8, 12 ...). Sonst bleibt es bei 3.
 */
export function rasterFuerKacheln(anzahl: number) {
  const vier = anzahl >= 4 && anzahl % 4 === 0;
  return cn('grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8', vier && '2xl:grid-cols-4');
}

/** Jedes Projekt liegt wie ein einzelnes Stück in seiner eigenen Vitrine: gerahmt, mit einem Lichtkreis dahinter. */
export function ReferenzKarte({
  referenz: r,
  titelEbene = 'h3',
  sizes = KARTEN_SIZES,
  ortZeigen = true,
}: {
  referenz: Referenz;
  titelEbene?: Ebene;
  sizes?: string;
  /** Ort neben der Kategorie zeigen. Projektdaten wie das Datum werden auf Wunsch der Kundschaft nirgends gezeigt. */
  ortZeigen?: boolean;
}) {
  const Titel = titelEbene;
  return (
    <article data-einblenden className="group relative flex flex-col">
      <div className="relative aspect-[4/3]">
        <div className="vitrine-licht opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="vitrine-rahmen h-full">
          <Image src={r.titelbild} alt={r.titelbildAlt} fill sizes={sizes} className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
        </div>
      </div>
      <div className="mt-5 flex min-h-6 flex-wrap items-center gap-x-3 gap-y-1 text-sm text-text-hell-leise">
        {r.kategorie ? <span className="font-semibold text-gold">{r.kategorie}</span> : null}
        {ortZeigen && r.ort ? <span>{r.ort}</span> : null}
      </div>
      <Titel className="titel-3 mt-2 text-text-hell">
        <Link href={`/referenzen/${r.slug}`} className="after:absolute after:inset-0">
          {sauberText(r.titel)}
        </Link>
      </Titel>
      <p className="mt-2 line-clamp-3 text-text-hell-leise">{sauberText(r.kurzbeschreibung)}</p>
    </article>
  );
}

export function LeistungKarte({ leistung: l, titelEbene = 'h3', sizes = KARTEN_SIZES }: { leistung: Leistung; titelEbene?: Ebene; sizes?: string }) {
  const Titel = titelEbene;
  return (
    <article
      data-einblenden
      className="group relative flex flex-col overflow-hidden rounded-[var(--radius-karte)] border border-linie bg-grund transition-shadow duration-300 hover:shadow-xl"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-flaeche">
        <Image src={l.bild} alt={l.bildAlt} fill sizes={sizes} className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
      </div>
      <div className="flex flex-1 flex-col p-6 lg:p-8">
        <Titel className="titel-3">
          <Link href={`/leistungen/${l.slug}`} className="after:absolute after:inset-0">
            {sauberText(l.titel)}
          </Link>
        </Titel>
        <p className="mt-3 flex-1 text-text-leise">{sauberText(l.kurzbeschreibung)}</p>
        <span className="mt-6 inline-flex items-center gap-2 font-semibold text-akzent" aria-hidden>
          Zur Leistung
          <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}

export function JobZeile({ job: j, titelEbene = 'h3' }: { job: Job; titelEbene?: Ebene }) {
  const Titel = titelEbene;
  return (
    <article data-einblenden className="group relative grid gap-4 border-b border-linie py-7 transition-colors md:grid-cols-[1fr_auto] md:items-center md:gap-10 lg:py-8">
      <div>
        <Titel className="titel-3">
          <Link href={`/jobs/${j.slug}`} className="after:absolute after:inset-0 group-hover:text-akzent">
            {sauberText(j.titel)}
          </Link>
        </Titel>
        <p className="mt-2 max-w-3xl text-text-leise">{sauberText(j.kurzbeschreibung)}</p>
      </div>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.95rem] text-text-leise md:justify-end">
        <span className="inline-flex items-center gap-2">
          <Clock className="size-4" aria-hidden />
          {j.pensum}
        </span>
        <span className="inline-flex items-center gap-2">
          <MapPin className="size-4" aria-hidden />
          {j.arbeitsort}
        </span>
        <ArrowRight className="hidden size-6 text-akzent transition-transform group-hover:translate-x-1 md:block" aria-hidden />
      </div>
    </article>
  );
}
