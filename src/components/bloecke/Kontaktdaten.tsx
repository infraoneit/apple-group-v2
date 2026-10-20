import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import type { Einstellungen } from '@/lib/cms';

export function Kontaktdaten({ einstellungen: e }: { einstellungen: Einstellungen }) {
  return (
    <aside className="h-fit rounded-[var(--radius-karte)] bg-flaeche p-8 lg:sticky lg:top-32 lg:p-10">
      <h3 className="titel-3">{e.firmenname}</h3>
      <ul className="mt-6 space-y-5">
        <li className="flex gap-4">
          <MapPin className="mt-1 size-5 shrink-0 text-akzent" aria-hidden />
          <span>
            {e.strasse}
            <br />
            {e.plz} {e.ort}
          </span>
        </li>
        <li className="flex gap-4">
          <Phone className="mt-1 size-5 shrink-0 text-akzent" aria-hidden />
          <a href={`tel:${e.telefon.replaceAll(' ', '')}`} className="inline-block py-1 hover:text-akzent">
            {e.telefon}
          </a>
        </li>
        <li className="flex gap-4">
          <Mail className="mt-1 size-5 shrink-0 text-akzent" aria-hidden />
          <a href={`mailto:${e.email}`} className="inline-block py-1 break-all hover:text-akzent">
            {e.email}
          </a>
        </li>
        {e.oeffnungszeiten.length > 0 ? (
          <li className="flex gap-4">
            <Clock className="mt-1 size-5 shrink-0 text-akzent" aria-hidden />
            <dl className="space-y-2">
              {e.oeffnungszeiten.map((z) => (
                <div key={z.tage}>
                  <dt className="text-text-leise">{z.tage}</dt>
                  <dd>{z.zeiten}</dd>
                </div>
              ))}
            </dl>
          </li>
        ) : null}
      </ul>
    </aside>
  );
}
