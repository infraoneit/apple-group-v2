import Link from 'next/link';
import Image from 'next/image';
import type { Einstellungen, Navigation } from '@/lib/cms';
import { cn } from '@/lib/cn';
import { sauberText } from '@/lib/text';

const SOCIAL_NAMEN: Record<string, string> = {
  linkedin: 'LinkedIn',
  instagram: 'Instagram',
  facebook: 'Facebook',
  youtube: 'YouTube',
};

export function Fusszeile({ einstellungen: e, navigation: n }: { einstellungen: Einstellungen; navigation: Navigation }) {
  // Auf Wunsch der Kundschaft mindestens 2027, danach das laufende Jahr
  const jahr = Math.max(2027, new Date().getFullYear());

  return (
    <footer className="border-t border-gold/20 bg-flaeche-dunkel text-text-hell">
      <div className="container-seite abschnitt">
        <div
          className={cn(
            'grid gap-12 md:grid-cols-2 xl:gap-16',
            e.oeffnungszeiten.length > 0 ? 'xl:grid-cols-[1.4fr_1fr_1fr_1fr]' : 'xl:grid-cols-[1.4fr_1fr_1fr]'
          )}
        >
          <div className="max-w-md">
            {e.logohell ? (
              <div className="flex items-center">
                <Image src={e.logohell} alt={e.firmenname} width={220} height={147} unoptimized={e.logohell.endsWith('.svg')} className="h-[5.76rem] w-auto shrink-0" />
              </div>
            ) : (
              <p className="font-titel text-2xl font-semibold text-text-hell">{e.firmenname}</p>
            )}
            <p className="mt-6 text-text-hell-leise">{sauberText(e.kurzbeschreibung)}</p>
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-[0.14em] text-text-hell-leise uppercase">Kontakt</h2>
            <address className="mt-5 space-y-1 not-italic">
              <p className="font-semibold text-rosegold">{e.firmenname}</p>
              <p>{e.strasse}</p>
              <p>
                {e.plz} {e.ort}
              </p>
              <p className="pt-2">
                <a href={`tel:${e.telefon.replaceAll(' ', '')}`} className="inline-block py-1 hover:text-gold">
                  {e.telefon}
                </a>
              </p>
              <p>
                <a href={`mailto:${e.email}`} className="inline-block py-1 hover:text-gold">
                  {e.email}
                </a>
              </p>
            </address>
          </div>

          {e.oeffnungszeiten.length > 0 ? (
            <div>
              <h2 className="text-sm font-semibold tracking-[0.14em] text-text-hell-leise uppercase">Öffnungszeiten</h2>
              <dl className="mt-5 space-y-3">
                {e.oeffnungszeiten.map((z) => (
                  <div key={z.tage}>
                    <dt className="text-text-hell-leise">{z.tage}</dt>
                    <dd>{z.zeiten}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}

          {n.fusszeile.length > 0 ? (
            <nav aria-label="Fusszeile">
              <h2 className="text-sm font-semibold tracking-[0.14em] text-text-hell-leise uppercase">Übersicht</h2>
              <ul className="mt-4 space-y-1">
                {n.fusszeile.map((l) => (
                  <li key={l.link}>
                    <Link href={l.link} className="inline-block py-1 hover:text-gold">
                      {l.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-linie-dunkel pt-8 text-sm text-text-hell-leise md:flex-row md:items-center md:justify-between">
          <p>
            © {jahr} {e.firmenname}. Alle Rechte vorbehalten.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {n.rechtliches.map((l) => (
              <li key={l.link}>
                <Link href={l.link} className="inline-block py-1 hover:text-text-hell">
                  {l.text}
                </Link>
              </li>
            ))}
            {e.socialMedia.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-block py-1 hover:text-text-hell">
                  {SOCIAL_NAMEN[s.plattform] ?? s.plattform}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
