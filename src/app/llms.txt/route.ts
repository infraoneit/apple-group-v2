import { holeAlleSeiten, holeEinstellungen, holeReferenzen } from '@/lib/cms';
import { sauberText } from '@/lib/text';
import { DOMAIN } from '@/site.config';

export const dynamic = 'force-static';

/**
 * llms.txt: knappe, maschinenlesbare Zusammenfassung der Website für KI-Suchsysteme
 * (Answer Engines). Enthält nur, was auch auf der Website steht.
 */
export async function GET() {
  const [e, referenzen, seiten] = await Promise.all([holeEinstellungen(), holeReferenzen(), holeAlleSeiten()]);
  const zeilen = [
    `# ${e.firmenname}`,
    '',
    `> ${sauberText(e.kurzbeschreibung)}`,
    '',
    `Sitz: ${e.strasse}, ${e.plz} ${e.ort}, Schweiz. Telefon ${e.telefon}, E-Mail ${e.email}. ${e.terminhinweis ? e.terminhinweis + '.' : ''}`,
    '',
    'Leistungen: Immobilienentwicklung, Realisierung, Vermarktung und Bewirtschaftung von Immobilienprojekten, inhabergeführt, mit Immobilien-, Finanz- und Rechtsexpertise im eigenen Haus. Die Firma sucht Bauland für neue Immobilienprojekte.',
    '',
    '## Seiten',
    `- [Startseite](${DOMAIN}/)`,
    `- [Projekte](${DOMAIN}/referenzen): Übersicht der Referenzprojekte`,
    ...seiten.filter((s) => s.inSitemap).map((s) => `- [${sauberText(s.titel)}](${DOMAIN}/${s.slug})`),
    '',
    '## Projekte',
    ...referenzen.map((r) => `- [${sauberText(r.titel)}](${DOMAIN}/referenzen/${r.slug}): ${r.kategorie ? r.kategorie + ', ' : ''}${r.ort}. ${sauberText(r.kurzbeschreibung)}`),
    '',
    `Aktuelle Immobilienangebote: auf ImmoScout24.ch und Homegate.ch.`,
    '',
  ];
  return new Response(zeilen.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
