'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, Phone, X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { ThemeUmschalter } from './ThemeUmschalter';

type Unterpunkt = { text: string; link: string; beschreibung?: string };
type Punkt = { text: string; link: string; unterpunkte: readonly Unterpunkt[] };

type Props = {
  firmenname: string;
  logo: string | null;
  telefon: string;
  menue: readonly Punkt[];
  knopf: { text?: string; link?: string };
};

/**
 * Kopfzeile mit Hauptmenü, Mega-Menü (ab 3 Unterpunkten mit Beschreibung) und mobilem Menü.
 * Das mobile Menü liegt bewusst ausserhalb von <header>: backdrop-filter am Header würde
 * sonst die Position des fixierten Menüs verfälschen.
 */
export function Kopfzeile({ firmenname, logo, telefon, menue, knopf }: Props) {
  const pfad = usePathname();
  const [offen, setOffen] = useState(false);
  const [gescrollt, setGescrollt] = useState(false);
  const umschalter = useRef<HTMLButtonElement>(null);
  const mobilesMenue = useRef<HTMLDivElement>(null);
  const hauptnavigation = useRef<HTMLElement>(null);
  /** Per Knopf oder Tastatur geöffnetes Untermenü (Touch-Geräte, Tastatur) */
  const [untermenue, setUntermenue] = useState<number | null>(null);
  /** Mit Escape geschlossenes Untermenü, bleibt verborgen bis die Maus den Menüpunkt verlässt */
  const [verborgen, setVerborgen] = useState<number | null>(null);

  useEffect(() => {
    const pruefen = () => setGescrollt(window.scrollY > 24);
    pruefen();
    window.addEventListener('scroll', pruefen, { passive: true });
    return () => window.removeEventListener('scroll', pruefen);
  }, []);

  const schliessen = useCallback(() => {
    setOffen(false);
    umschalter.current?.focus();
  }, []);

  // Menüs bei Seitenwechsel schliessen
  const [letzterPfad, setLetzterPfad] = useState(pfad);
  if (pfad !== letzterPfad) {
    setLetzterPfad(pfad);
    setOffen(false);
    setUntermenue(null);
  }

  // Untermenü am Desktop: Escape und Klick ausserhalb schliessen
  useEffect(() => {
    const taste = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      const offenerPunkt = hauptnavigation.current?.querySelector<HTMLElement>('li:hover, li:focus-within');
      const index = offenerPunkt ? [...(offenerPunkt.parentElement?.children ?? [])].indexOf(offenerPunkt) : -1;
      setUntermenue(null);
      if (index >= 0) {
        setVerborgen(index);
        // Fokus nur zurückholen, wenn er schon im Menüpunkt lag (nicht aus einem Formularfeld wegnehmen)
        if (offenerPunkt?.matches(':focus-within')) offenerPunkt.querySelector<HTMLElement>('a')?.focus();
      }
    };
    const klick = (e: MouseEvent) => {
      if (!hauptnavigation.current?.contains(e.target as Node)) setUntermenue(null);
    };
    window.addEventListener('keydown', taste);
    document.addEventListener('click', klick);
    return () => {
      window.removeEventListener('keydown', taste);
      document.removeEventListener('click', klick);
    };
  }, []);

  // Mobiles Menü schliessen, wenn das Fenster breiter wird (z. B. Tablet drehen)
  useEffect(() => {
    const breit = window.matchMedia('(min-width: 1024px)');
    const pruefen = () => {
      if (breit.matches) setOffen(false);
    };
    breit.addEventListener('change', pruefen);
    return () => breit.removeEventListener('change', pruefen);
  }, []);

  // Offenes Menü: Scrollen sperren, Inhalt dahinter unerreichbar machen, Escape schliesst, Fokus ins Menü
  useEffect(() => {
    if (!offen) return;
    const hintergrund = [document.getElementById('inhalt'), document.querySelector('footer')].filter(Boolean) as HTMLElement[];
    document.body.style.overflow = 'hidden';
    hintergrund.forEach((el) => el.setAttribute('inert', ''));
    // Kurz warten, bis das Menü nicht mehr inert und unsichtbar ist, dann fokussieren
    const fokusZeit = window.setTimeout(() => mobilesMenue.current?.querySelector<HTMLElement>('a, button')?.focus(), 60);

    const taste = (e: KeyboardEvent) => {
      if (e.key === 'Escape') schliessen();
    };
    window.addEventListener('keydown', taste);
    return () => {
      window.clearTimeout(fokusZeit);
      document.body.style.overflow = '';
      hintergrund.forEach((el) => el.removeAttribute('inert'));
      window.removeEventListener('keydown', taste);
    };
  }, [offen, schliessen]);

  const istAktiv = (link: string) => (link === '/' ? pfad === '/' : pfad === link || pfad.startsWith(`${link}/`));
  const telefonLink = `tel:${telefon.replaceAll(' ', '')}`;
  const hatKnopf = Boolean(knopf.text && knopf.link);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300',
          gescrollt || offen ? 'border-akzent/25 bg-grund/95 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)] backdrop-blur-md' : 'border-akzent/10 bg-grund'
        )}
      >
        <a
          href="#inhalt"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:rounded focus:bg-marke focus:px-4 focus:py-2 focus:text-white"
        >
          Zum Inhalt springen
        </a>
        <div className="container-seite flex h-20 items-center justify-between gap-4 lg:grid lg:h-24 lg:grid-cols-[1fr_auto_1fr] 3xl:h-28">
          <Link
            href="/"
            className="flex shrink-0 items-center lg:justify-self-start"
            aria-label={`${firmenname}, zur Startseite`}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: pfad === '/' ? 'smooth' : 'instant' });
            }}
          >
            {logo ? (
              <Image
                src={logo}
                alt={firmenname}
                width={240}
                height={160}
                loading="eager"
                unoptimized={logo.endsWith('.svg')}
                className="h-[4.32rem] w-auto lg:h-[5.76rem] 3xl:h-[6.75rem]"
              />
            ) : (
              <span className="font-titel text-xl font-extrabold tracking-tight lg:text-2xl">{firmenname}</span>
            )}
          </Link>

          <nav aria-label="Hauptnavigation" className="hidden lg:block" ref={hauptnavigation}>
            <ul className="flex items-center gap-1 xl:gap-4 2xl:gap-8">
              {menue.map((punkt, index) => {
                const mega = punkt.unterpunkte.length > 2;
                const hatUntermenue = punkt.unterpunkte.length > 0;
                const aufgeklappt = untermenue === index;
                const unterdrueckt = verborgen === index;
                return (
                  <li
                    key={punkt.link}
                    className="group relative flex items-center"
                    onMouseLeave={() => setVerborgen(null)}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node)) setVerborgen(null);
                    }}
                  >
                    <Link
                      href={punkt.link}
                      className={cn(
                        'inline-flex items-center rounded-md py-2 pl-3 text-[0.95rem] font-medium transition-colors hover:text-akzent 2xl:text-base 3xl:text-lg',
                        hatUntermenue ? 'pr-1' : 'pr-3',
                        istAktiv(punkt.link) && 'text-akzent'
                      )}
                      aria-current={istAktiv(punkt.link) ? 'page' : undefined}
                    >
                      {punkt.text}
                    </Link>
                    {hatUntermenue ? (
                      <button
                        type="button"
                        className="inline-flex size-8 items-center justify-center rounded-md hover:text-akzent"
                        aria-expanded={aufgeklappt}
                        aria-controls={`untermenue-${index}`}
                        aria-label={`Untermenü ${punkt.text} ${aufgeklappt ? 'schliessen' : 'öffnen'}`}
                        onClick={() => {
                          setVerborgen(null);
                          setUntermenue(aufgeklappt ? null : index);
                        }}
                      >
                        <ChevronDown className={cn('size-4 transition-transform group-hover:rotate-180', aufgeklappt && 'rotate-180')} aria-hidden />
                      </button>
                    ) : null}
                    {hatUntermenue ? (
                      <div
                        id={`untermenue-${index}`}
                        className={cn(
                          'absolute top-full pt-3 transition-all duration-200',
                          mega ? 'left-1/2 -translate-x-1/2' : 'left-0',
                          aufgeklappt
                            ? 'visible opacity-100'
                            : 'invisible opacity-0 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100',
                          unterdrueckt && '!invisible !opacity-0'
                        )}
                      >
                        <ul
                          className={cn(
                            'rounded-[var(--radius-karte)] border border-linie bg-grund p-2 shadow-xl',
                            mega ? 'grid w-[40rem] grid-cols-2 gap-1 border-t-2 border-t-akzent p-3' : 'min-w-64'
                          )}
                        >
                          {punkt.unterpunkte.map((u) => (
                            <li key={u.link}>
                              <Link
                                href={u.link}
                                onClick={() => setUntermenue(null)}
                                className="block rounded-md px-4 py-3 transition-colors hover:bg-flaeche focus-visible:bg-flaeche"
                                aria-current={pfad === u.link ? 'page' : undefined}
                              >
                                <span className="block text-[0.95rem] font-semibold">{u.text}</span>
                                {mega && u.beschreibung ? <span className="mt-1 block text-sm leading-snug text-text-leise">{u.beschreibung}</span> : null}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="flex items-center justify-end">
            <div className="hidden items-center gap-2 lg:flex">
              <ThemeUmschalter />
              <a
                href={telefonLink}
                className="hidden items-center gap-2 px-3 text-[0.95rem] font-medium whitespace-nowrap hover:text-akzent xl:inline-flex 2xl:text-base"
              >
                <Phone className="size-4" aria-hidden />
                {telefon}
              </a>
              {hatKnopf ? (
                <Link href={knopf.link!} className="knopf-primaer !min-h-11 !px-6 !text-[0.95rem] 2xl:!text-base">
                  {knopf.text}
                </Link>
              ) : null}
            </div>

            <div className="flex items-center lg:hidden">
              <ThemeUmschalter />
              <a href={telefonLink} aria-label={`Anrufen: ${telefon}`} className="inline-flex h-11 items-center gap-1.5 rounded-md px-2 hover:text-akzent">
                <Phone className="size-5 shrink-0" aria-hidden />
                <span className="hidden text-sm font-medium sm:inline">Anrufen</span>
              </a>
              <button
                ref={umschalter}
                type="button"
                className="inline-flex size-11 items-center justify-center rounded-md"
                onClick={() => (offen ? schliessen() : setOffen(true))}
                aria-expanded={offen}
                aria-controls="mobiles-menue"
                aria-label={offen ? 'Menü schliessen' : 'Menü öffnen'}
              >
                {offen ? <X className="size-7" aria-hidden /> : <Menu className="size-7" aria-hidden />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        id="mobiles-menue"
        ref={mobilesMenue}
        inert={!offen}
        aria-hidden={!offen}
        className={cn(
          'fixed inset-x-0 top-20 bottom-0 z-40 overflow-y-auto bg-grund transition-[opacity,transform,visibility] duration-300 ease-out lg:hidden',
          offen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
        )}
      >
        <nav aria-label="Mobile Navigation" className="container-seite py-8">
          <ul className="divide-y divide-linie border-y border-linie">
            {menue.map((punkt) => (
              <li key={punkt.link} className="py-2">
                <Link href={punkt.link} onClick={() => setOffen(false)} className={cn('block py-3 text-2xl font-semibold', istAktiv(punkt.link) && 'text-akzent')}>
                  {punkt.text}
                </Link>
                {punkt.unterpunkte.length > 0 ? (
                  <ul className="mb-3 space-y-1 pl-4">
                    {punkt.unterpunkte.map((u) => (
                      <li key={u.link}>
                        <Link href={u.link} onClick={() => setOffen(false)} className="block py-2 text-lg text-text-leise">
                          {u.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-4">
            {hatKnopf ? (
              <Link href={knopf.link!} onClick={() => setOffen(false)} className="knopf-primaer">
                {knopf.text}
              </Link>
            ) : null}
            <a href={telefonLink} className="knopf-sekundaer">
              <Phone className="size-5" aria-hidden />
              {telefon}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
