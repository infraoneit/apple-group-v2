import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import { absaetze, sauberText } from '@/lib/text';
import { unscharfeVorschau } from '@/lib/bildvorschau';
import { Brotkrumen, type Pfadpunkt } from '@/components/ui/Brotkrumen';
import type { BlockDaten } from './BlockRenderer';

type Props = {
  daten: BlockDaten<'hero'>;
  istErster: boolean;
  /** Brotkrumen über dem Titel, auf Unterseiten (nicht auf der Startseite) */
  pfad?: Pfadpunkt[];
};
type InnenProps = Props & { vorschau?: string };

/**
 * Startbereich in zwei Varianten:
 * - vollbild: Bild über die ganze Breite, Text darauf (mit Verlauf für Lesbarkeit)
 * - geteilt:  Text links auf ruhiger Fläche, Bild rechts gerahmt (wie schaltkraft.ch)
 *
 * Schnelles erstes Bild: das Bild des ersten Startbereichs wird sofort und mit hoher Priorität
 * geladen, zeigt bis dahin eine unscharfe Vorschau (im HTML enthalten) und wird nicht
 * eingeblendet, damit es ohne Verzögerung erscheint. Nur der Text blendet weich ein.
 */
export async function Hero(props: Props) {
  const vorschau = props.istErster ? await unscharfeVorschau(props.daten.bild) : undefined;
  return props.daten.variante === 'geteilt' ? <HeroGeteilt {...props} vorschau={vorschau} /> : <HeroVollbild {...props} vorschau={vorschau} />;
}

/** Gitterraster im Hintergrund, nur im dunklen Modus sichtbar (siehe .hero-raster in globals.css) */
function Raster({ className }: { className: string }) {
  return (
    <div
      className={cn(
        'hero-raster pointer-events-none absolute inset-0 opacity-[0.5] [background-image:linear-gradient(var(--color-linie-dunkel)_1px,transparent_1px),linear-gradient(90deg,var(--color-linie-dunkel)_1px,transparent_1px)]',
        className
      )}
      aria-hidden
    />
  );
}

function HeroBild({ d, istErster, vorschau, sizes }: { d: BlockDaten<'hero'>; istErster: boolean; vorschau?: string; sizes: string }) {
  if (!d.bild) return null;
  return (
    <Image
      src={d.bild}
      alt={d.bildAlt}
      fill
      loading={istErster ? 'eager' : 'lazy'}
      fetchPriority={istErster ? 'high' : 'auto'}
      placeholder={vorschau ? 'blur' : 'empty'}
      blurDataURL={vorschau}
      sizes={sizes}
      className="object-cover"
    />
  );
}

function Knoepfe({ d, hell }: { d: BlockDaten<'hero'>; hell: boolean }) {
  const primaer = d.knopfPrimaer.text && d.knopfPrimaer.link;
  const sekundaer = d.knopfSekundaer.text && d.knopfSekundaer.link;
  if (!primaer && !sekundaer) return null;
  return (
    <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
      {primaer ? (
        <Link href={d.knopfPrimaer.link} className="knopf-primaer">
          {d.knopfPrimaer.text}
        </Link>
      ) : null}
      {sekundaer ? (
        <Link href={d.knopfSekundaer.link} className={hell ? 'knopf-hell' : 'knopf-sekundaer'}>
          {d.knopfSekundaer.text}
        </Link>
      ) : null}
    </div>
  );
}

/**
 * Vollbild: das Stück liegt gerahmt und beleuchtet in der Mitte des Raums, nicht als
 * Hintergrund mit Text darüber. Titel kündigt an, das Bild in der Vitrine löst ein.
 */
function HeroVollbild({ daten: d, istErster, pfad, vorschau }: InnenProps) {
  const gross = d.hoehe === 'gross';
  const TitelTag = istErster ? 'h1' : 'h2';

  return (
    <section className="relative overflow-hidden bg-flaeche-dunkel text-text-hell">
      <Raster className="[background-size:96px_96px] [mask-image:radial-gradient(80%_60%_at_50%_0%,black,transparent)]" />
      {pfad ? (
        <div className="container-seite relative pt-8 lg:pt-10">
          <Brotkrumen pfad={pfad} hell />
        </div>
      ) : null}
      <div
        className={cn(
          'container-seite relative flex flex-col items-center text-center',
          gross ? 'pt-20 pb-16 lg:pt-28 lg:pb-24' : 'pt-16 pb-12 lg:pt-20 lg:pb-16',
          pfad && 'pt-10 lg:pt-12'
        )}
      >
        <div className="max-w-3xl animate-einblenden">
          {d.ueberzeile ? <p className="vitrine-plakette justify-center">{sauberText(d.ueberzeile)}</p> : null}
          <TitelTag className={cn(gross ? 'titel-1' : 'titel-2', 'mt-3 whitespace-pre-line')}>{sauberText(d.titel)}</TitelTag>
          {absaetze(d.text).map((a, i) => (
            <p key={i} className="mx-auto mt-6 max-w-2xl text-lg text-text-hell-leise lg:text-xl 3xl:text-2xl">
              {a}
            </p>
          ))}
        </div>

        {d.bild ? (
          <div
            className={cn(
              'relative mt-14 w-full max-w-6xl lg:mt-16',
              !istErster && 'animate-einblenden',
              gross ? 'aspect-[16/9] lg:aspect-[21/9]' : 'aspect-[16/9]'
            )}
          >
            <div className="vitrine-licht" />
            <div className="vitrine-rahmen h-full">
              <HeroBild d={d} istErster={istErster} vorschau={vorschau} sizes="(min-width: 1536px) 1400px, 100vw" />
            </div>
          </div>
        ) : null}

        <div className="animate-einblenden">
          <Knoepfe d={d} hell />
        </div>
      </div>
    </section>
  );
}

function HeroGeteilt({ daten: d, istErster, pfad, vorschau }: InnenProps) {
  const gross = d.hoehe === 'gross';
  const TitelTag = istErster ? 'h1' : 'h2';

  return (
    <section className="relative overflow-hidden bg-flaeche-dunkel text-text-hell">
      <Raster className="[background-size:80px_80px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      {pfad ? (
        <div className="container-seite relative pt-8 lg:pt-10">
          <Brotkrumen pfad={pfad} hell />
        </div>
      ) : null}
      <div
        className={cn(
          'container-seite relative grid items-center gap-12 lg:grid-cols-2 lg:gap-20 2xl:gap-28',
          gross ? 'py-16 lg:py-24' : 'py-12 lg:py-16',
          pfad && 'pt-8 lg:pt-10'
        )}
      >
        <div className="max-w-3xl animate-einblenden">
          {d.ueberzeile ? <p className="vitrine-plakette">{sauberText(d.ueberzeile)}</p> : null}
          <TitelTag className={cn(gross ? 'titel-1' : 'titel-2', 'mt-3 whitespace-pre-line')}>{sauberText(d.titel)}</TitelTag>
          {absaetze(d.text).map((a, i) => (
            <p key={i} className="mt-6 max-w-2xl text-lg text-text-hell-leise lg:text-xl 3xl:text-2xl">
              {a}
            </p>
          ))}
          <Knoepfe d={d} hell />
        </div>
        {d.bild ? (
          <div
            className={cn(
              'relative',
              !istErster && 'animate-einblenden',
              gross ? 'aspect-[4/3] lg:aspect-auto lg:h-[min(72svh,760px)]' : 'aspect-[16/10] lg:aspect-auto lg:h-[min(48svh,520px)]'
            )}
          >
            <div className="vitrine-licht" />
            <div className="vitrine-rahmen h-full">
              <HeroBild d={d} istErster={istErster} vorschau={vorschau} sizes="(min-width: 1024px) 50vw, 100vw" />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
