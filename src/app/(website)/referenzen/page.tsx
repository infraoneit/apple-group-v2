import { Seitenkopf } from '@/components/ui/Seitenkopf';
import { ReferenzKarte, rasterFuerKacheln } from '@/components/karten/Karten';
import { holeReferenzen, holeUebersichten } from '@/lib/cms';
import { metadaten } from '@/lib/seo';

export async function generateMetadata() {
  const { referenzen: u } = await holeUebersichten();
  return metadaten({ pfad: '/referenzen', seitentitel: u.titel, seo: u.seo, beschreibungFallback: u.einleitung });
}

export default async function ReferenzenSeite() {
  const [{ referenzen: u }, referenzen] = await Promise.all([holeUebersichten(), holeReferenzen()]);

  return (
    <>
      <Seitenkopf ueberzeile={u.ueberzeile} titel={u.titel} einleitung={u.einleitung} pfad={[{ text: u.titel, href: '/referenzen' }]} />
      <section className="abschnitt bg-flaeche-dunkel text-text-hell">
        {referenzen.length === 0 ? (
          <p className="container-seite einleitung text-text-hell-leise">Die Referenzen werden zurzeit zusammengestellt.</p>
        ) : null}
        <div className={`container-seite ${rasterFuerKacheln(referenzen.length)} gap-y-14`}>
          {referenzen.map((r) => (
            <ReferenzKarte key={r.slug} referenz={r} titelEbene="h2" />
          ))}
        </div>
      </section>
    </>
  );
}
