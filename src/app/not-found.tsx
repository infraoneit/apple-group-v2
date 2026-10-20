import './globals.css';
import Link from 'next/link';
import { Kopfzeile } from '@/components/layout/Kopfzeile';
import { Fusszeile } from '@/components/layout/Fusszeile';
import { holeEinstellungen, holeNavigation } from '@/lib/cms';

export const metadata = { title: 'Seite nicht gefunden' };

export default async function NichtGefunden() {
  const [e, n] = await Promise.all([holeEinstellungen(), holeNavigation()]);

  return (
    <>
      <Kopfzeile firmenname={e.firmenname} logo={e.logo} telefon={e.telefon} menue={n.hauptmenue} knopf={n.knopf} />
      <main id="inhalt" className="abschnitt-gross bg-flaeche-dunkel text-text-hell">
        <div className="container-seite">
          <p className="vitrine-plakette">Fehler 404</p>
          <h1 className="titel-1 mt-3 max-w-4xl">Diese Seite gibt es nicht mehr oder die Adresse ist falsch.</h1>
          <p className="mt-6 max-w-2xl text-lg text-text-hell-leise lg:text-xl">Über die Startseite finden Sie alle Inhalte. Bei Fragen erreichen Sie uns unter {e.telefon}.</p>
          <Link href="/" className="knopf-primaer mt-10">
            Zur Startseite
          </Link>
        </div>
      </main>
      <Fusszeile einstellungen={e} navigation={n} />
    </>
  );
}
