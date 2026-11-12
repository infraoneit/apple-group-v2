import { Brotkrumen, type Pfadpunkt } from '@/components/ui/Brotkrumen';
import { JsonLd } from '@/components/seo/JsonLd';
import { DOMAIN } from '@/site.config';
import { absaetze, sauberText } from '@/lib/text';
import { mitVerweisen } from '@/lib/verweise';

/** Kopfbereich für Übersichts- und Detailseiten mit Brotkrumen (inkl. BreadcrumbList für Google). */
export function Seitenkopf({
  ueberzeile,
  titel,
  einleitung,
  pfad,
  children,
}: {
  ueberzeile?: string;
  titel: string;
  einleitung?: string;
  pfad: Pfadpunkt[];
  children?: React.ReactNode;
}) {
  const alle = [{ text: 'Startseite', href: '/' }, ...pfad];

  return (
    <header className="border-b border-linie bg-flaeche">
      <div className="container-seite pt-10 pb-14 lg:pt-14 lg:pb-20">
        <Brotkrumen pfad={pfad} />
        <div className="mt-10 max-w-5xl lg:mt-14">
          {ueberzeile ? <p className="ueberzeile">{sauberText(ueberzeile)}</p> : null}
          <h1 className="titel-1">{sauberText(titel)}</h1>
          {absaetze(einleitung).map((a, i) => (
            <p key={i} className="einleitung lesebreite mt-6">
              {mitVerweisen(a)}
            </p>
          ))}
          {children}
        </div>
      </div>
      <JsonLd
        daten={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: alle.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: sauberText(p.text),
            item: new URL(p.href, DOMAIN).toString(),
          })),
        }}
      />
    </header>
  );
}
