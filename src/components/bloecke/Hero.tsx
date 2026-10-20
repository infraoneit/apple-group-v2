import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import { absaetze, sauberText } from '@/lib/text';
import type { BlockDaten } from './BlockRenderer';

type Props = { daten: BlockDaten<'hero'>; istErster: boolean };

/**
 * Startbereich in zwei Varianten:
 * - vollbild: Bild über die ganze Breite, Text darauf (mit Verlauf für Lesbarkeit)
 * - geteilt:  Text links auf ruhiger Fläche, Bild rechts gerahmt (wie schaltkraft.ch)
 */
export function Hero({ daten: d, istErster }: Props) {
  return d.variante === 'geteilt' ? <HeroGeteilt daten={d} istErster={istErster} /> : <HeroVollbild daten={d} istErster={istErster} />;
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
function HeroVollbild({ daten: d, istErster }: Props) {
  const gross = d.hoehe === 'gross';
  const TitelTag = istErster ? 'h1' : 'h2';

  return (
    <section className="relative overflow-hidden bg-flaeche-dunkel text-text-hell">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5] [background-image:linear-gradient(var(--color-linie-dunkel)_1px,transparent_1px),linear-gradient(90deg,var(--color-linie-dunkel)_1px,transparent_1px)] [background-size:96px_96px] [mask-image:radial-gradient(80%_60%_at_50%_0%,black,transparent)]"
        aria-hidden
      />
      <div className={cn('container-seite relative flex flex-col items-center text-center', gross ? 'pt-20 pb-16 lg:pt-28 lg:pb-24' : 'pt-16 pb-12 lg:pt-20 lg:pb-16')}>
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
          <div className={cn('relative mt-14 w-full max-w-6xl animate-einblenden lg:mt-16', gross ? 'aspect-[16/9] lg:aspect-[21/9]' : 'aspect-[16/9]')}>
            <div className="vitrine-licht" />
            <div className="vitrine-rahmen h-full">
              <Image
                src={d.bild}
                alt={d.bildAlt}
                fill
                loading={istErster ? 'eager' : 'lazy'}
                fetchPriority={istErster ? 'high' : 'auto'}
                sizes="(min-width: 1536px) 1400px, 100vw"
                className="object-cover"
              />
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

function HeroGeteilt({ daten: d, istErster }: Props) {
  const gross = d.hoehe === 'gross';
  const TitelTag = istErster ? 'h1' : 'h2';

  return (
    <section className="relative overflow-hidden bg-flaeche-dunkel text-text-hell">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5] [background-image:linear-gradient(var(--color-linie-dunkel)_1px,transparent_1px),linear-gradient(90deg,var(--color-linie-dunkel)_1px,transparent_1px)] [background-size:80px_80px] [mask-image:linear-gradient(to_bottom,black,transparent)]"
        aria-hidden
      />
      <div className={cn('container-seite relative grid items-center gap-12 lg:grid-cols-2 lg:gap-20 2xl:gap-28', gross ? 'py-16 lg:py-24' : 'py-12 lg:py-16')}>
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
              'relative animate-einblenden',
              gross ? 'aspect-[4/3] lg:aspect-auto lg:h-[min(72svh,760px)]' : 'aspect-[16/10] lg:aspect-auto lg:h-[min(48svh,520px)]'
            )}
          >
            <div className="vitrine-licht" />
            <div className="vitrine-rahmen h-full">
              <Image
                src={d.bild}
                alt={d.bildAlt}
                fill
                loading={istErster ? 'eager' : 'lazy'}
                fetchPriority={istErster ? 'high' : 'auto'}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
