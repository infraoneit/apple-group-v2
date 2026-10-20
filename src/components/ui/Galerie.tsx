'use client';

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/cn';

type Bild = { bild: string; alt: string };

/**
 * Karussell-Galerie: ein Bild nach dem anderen, wie ein Stück nach dem nächsten in der
 * Vitrine. Scrollt nativ per Scroll-Snap (Touch, Trackpad), Pfeile, Punkte und
 * Pfeiltasten sind zusätzliche, gleichwertige Kontrollen. Bei einem Bild ohne Kontrollen,
 * bleibt dann ein einzelnes gerahmtes Bild wie ein klassischer Seiten-Hero.
 */
type Props = {
  bilder: readonly Bild[];
  sizes?: string;
  /** Seitenverhältnis der Bildfläche, z. B. für den Einsatz als Seiten-Hero breiter als der Vorgabewert. */
  seitenverhaeltnis?: string;
};

export function Galerie({ bilder, sizes = '100vw', seitenverhaeltnis = 'aspect-[16/10] lg:aspect-[16/9]' }: Props) {
  const scroller = useRef<HTMLDivElement>(null);
  const [aktiv, setAktiv] = useState(0);
  const mehrereBilder = bilder.length > 1;

  useEffect(() => {
    const el = scroller.current;
    if (!el || !mehrereBilder) return;
    const beiScroll = () => {
      const index = Math.round(el.scrollLeft / el.clientWidth);
      setAktiv((vorher) => (vorher === index ? vorher : index));
    };
    el.addEventListener('scroll', beiScroll, { passive: true });
    return () => el.removeEventListener('scroll', beiScroll);
  }, [mehrereBilder]);

  const zu = useCallback((index: number) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollTo({ left: index * el.clientWidth, behavior: 'smooth' });
  }, []);

  const beiTaste = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      zu(Math.max(0, aktiv - 1));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      zu(Math.min(bilder.length - 1, aktiv + 1));
    }
  };

  if (bilder.length === 0) return null;

  return (
    <div className="relative">
      <div
        ref={scroller}
        onKeyDown={mehrereBilder ? beiTaste : undefined}
        tabIndex={mehrereBilder ? 0 : undefined}
        role={mehrereBilder ? 'group' : undefined}
        aria-roledescription={mehrereBilder ? 'Karussell' : undefined}
        aria-label={mehrereBilder ? 'Projektbilder, mit den Pfeiltasten durchblättern' : undefined}
        className="galerie-scroller flex snap-x snap-mandatory overflow-x-auto"
      >
        {bilder.map((b, i) => (
          <div key={i} className={cn('relative w-full shrink-0 snap-center px-1 first:pl-0 last:pr-0 sm:px-2', seitenverhaeltnis)}>
            <div className="vitrine-licht" />
            <div className="vitrine-rahmen h-full">
              <Image
                src={b.bild}
                alt={b.alt}
                fill
                sizes={sizes}
                className="object-cover"
                loading={i === 0 ? 'eager' : 'lazy'}
                fetchPriority={i === 0 ? 'high' : undefined}
              />
            </div>
          </div>
        ))}
      </div>

      {mehrereBilder ? (
        <>
          <button
            type="button"
            onClick={() => zu(Math.max(0, aktiv - 1))}
            disabled={aktiv === 0}
            aria-label="Vorheriges Bild"
            className="absolute top-1/2 left-3 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold/50 bg-flaeche-dunkel/80 text-text-hell backdrop-blur-sm transition-colors hover:border-gold hover:bg-gold hover:text-flaeche-dunkel disabled:pointer-events-none disabled:opacity-30 sm:left-5"
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => zu(Math.min(bilder.length - 1, aktiv + 1))}
            disabled={aktiv === bilder.length - 1}
            aria-label="Nächstes Bild"
            className="absolute top-1/2 right-3 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold/50 bg-flaeche-dunkel/80 text-text-hell backdrop-blur-sm transition-colors hover:border-gold hover:bg-gold hover:text-flaeche-dunkel disabled:pointer-events-none disabled:opacity-30 sm:right-5"
          >
            <ChevronRight className="size-5" aria-hidden />
          </button>

          <div className="mt-5 flex items-center justify-center gap-4">
            <p className="text-sm text-text-hell-leise tabular-nums" aria-live="polite">
              {aktiv + 1} / {bilder.length}
            </p>
            <div className="flex gap-2">
              {bilder.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => zu(i)}
                  aria-label={`Bild ${i + 1} von ${bilder.length} zeigen`}
                  aria-current={i === aktiv}
                  className={cn('size-2 rounded-full transition-colors', i === aktiv ? 'bg-gold' : 'bg-linie-dunkel hover:bg-gold/50')}
                />
              ))}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
