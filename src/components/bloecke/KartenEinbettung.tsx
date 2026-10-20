'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, MapPin } from 'lucide-react';

type Props = { adresse: string; titel: string };

/**
 * Google Maps lädt erst nach Klick: Vorher wird keine Verbindung zu Google aufgebaut
 * (Datenschutz, siehe Datenschutzerklärung). Danach ist die Karte voll bedienbar.
 */
export function KartenEinbettung({ adresse, titel }: Props) {
  const [geladen, setGeladen] = useState(false);
  const anfrage = encodeURIComponent(adresse);

  return (
    <div className="relative aspect-square sm:aspect-[16/10] lg:aspect-[4/3] xl:aspect-[16/10]">
      <div className="vitrine-licht" />
      <div className="vitrine-rahmen h-full bg-flaeche-dunkel">
        {geladen ? (
          <iframe
            title={titel}
            src={`https://www.google.com/maps?q=${anfrage}&z=16&hl=de&output=embed`}
            className="absolute inset-0 size-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-6 text-center text-text-hell">
            <MapPin className="size-10 text-gold" strokeWidth={1.25} aria-hidden />
            <p className="titel-3">{adresse}</p>
            <button type="button" onClick={() => setGeladen(true)} className="knopf-hell">
              Karte laden
            </button>
            <p className="max-w-md text-sm text-text-hell-leise">
              Beim Laden der Karte werden Daten an Google übertragen, mehr dazu in der{' '}
              <Link href="/datenschutz" className="underline underline-offset-4 hover:text-gold">
                Datenschutzerklärung
              </Link>
              .
            </p>
          </div>
        )}
      </div>
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${anfrage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold hover:text-akzent"
      >
        In Google Maps öffnen
        <ExternalLink className="size-4" aria-hidden />
        <span className="sr-only">(öffnet in neuem Tab)</span>
      </a>
    </div>
  );
}
