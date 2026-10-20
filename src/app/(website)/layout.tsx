import '../globals.css';
import type { Metadata } from 'next';
import { Kopfzeile } from '@/components/layout/Kopfzeile';
import { Fusszeile } from '@/components/layout/Fusszeile';
import { JsonLd } from '@/components/seo/JsonLd';
import { Einblenden } from '@/components/ui/Einblenden';
import { holeEinstellungen, holeNavigation } from '@/lib/cms';
import { sauberText } from '@/lib/text';
import { DOMAIN } from '@/site.config';

export async function generateMetadata(): Promise<Metadata> {
  const e = await holeEinstellungen();
  return {
    title: { default: sauberText(e.seoTitel), template: `%s | ${e.firmenname}` },
    description: sauberText(e.seoBeschreibung),
  };
}

export default async function WebsiteLayout({ children }: { children: React.ReactNode }) {
  const [e, n] = await Promise.all([holeEinstellungen(), holeNavigation()]);

  const organisation = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${DOMAIN}/#organisation`,
    name: e.firmenname,
    description: sauberText(e.kurzbeschreibung),
    url: DOMAIN,
    telephone: e.telefon,
    email: e.email,
    logo: e.logo ? new URL(e.logo, DOMAIN).toString() : undefined,
    image: e.ogbild ? new URL(e.ogbild, DOMAIN).toString() : undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: e.strasse,
      postalCode: e.plz,
      addressLocality: e.ort,
      addressRegion: e.kanton || undefined,
      addressCountry: e.land,
    },
    sameAs: e.socialMedia.map((s) => s.url),
  };

  return (
    <>
      <Kopfzeile firmenname={e.firmenname} logo={e.logo} telefon={e.telefon} menue={n.hauptmenue} knopf={n.knopf} />
      <main id="inhalt">{children}</main>
      <Fusszeile einstellungen={e} navigation={n} />
      <JsonLd daten={organisation} />
      <Einblenden />
    </>
  );
}
