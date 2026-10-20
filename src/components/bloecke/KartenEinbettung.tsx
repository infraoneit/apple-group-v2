import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

type Props = { adresse: string; titel: string };

/**
 * Standort als festes Kartenbild, das die Website selbst ausliefert (Kartendaten von
 * OpenStreetMap, einmalig erzeugt, Datei in public/bilder/seiten/kontakt). Beim Besuch
 * wird keine Verbindung zu Google oder OpenStreetMap aufgebaut. Der Link darunter öffnet
 * den Standort in Google Maps, erst dann verlässt der Besuch die Website.
 */
const KARTE = '/bilder/seiten/kontakt/karte-taegerwilen.jpg';

export function KartenEinbettung({ adresse, titel }: Props) {
  const anfrage = encodeURIComponent(adresse);

  return (
    <div>
      <div className="relative aspect-square sm:aspect-[16/10]">
        <div className="vitrine-licht" />
        <div className="vitrine-rahmen h-full">
          <Image src={KARTE} alt={titel} fill sizes="(min-width: 1024px) 66vw, 100vw" className="karte-bild object-cover" />
        </div>
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${anfrage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold hover:text-akzent"
        >
          In Google Maps öffnen
          <ExternalLink className="size-4" aria-hidden />
          <span className="sr-only">(öffnet in neuem Tab)</span>
        </a>
        <p className="text-xs text-text-leise">
          Kartendaten ©{' '}
          <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-akzent">
            OpenStreetMap-Mitwirkende
          </a>
        </p>
      </div>
    </div>
  );
}
