# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Käuferschaft und Mieterschaft, die im Bodenseeraum (Kanton Thurgau) eine Immobilie suchen und aktuelle Projekte der Apple Property Group AG ansehen wollen. Zweite Nutzergruppe: die Kundschaft selbst, die Inhalte über Keystatic pflegt (Projekte, Über uns, Kontakt).

## Product Purpose

Die Website zeigt die Immobilienprojekte der Apple Property Group AG (Neubau und Sanierung) mit Bildergalerien, stellt das Unternehmen und das Team vor und ermöglicht Anfragen über ein Kontaktformular. Erfolg heisst: Besucherinnen und Besucher finden ein Projekt, verstehen, wer dahintersteht, und nehmen Kontakt auf.

## Positioning

Inhabergeführtes Immobilienunternehmen, das die gesamte Wertschöpfungskette selbst abdeckt: Entwicklung, Realisierung, Vermarktung und Bewirtschaftung, mit Immobilien-, Finanz- und Rechtsexpertise im eigenen Haus. Das unterscheidet die Apple Property Group AG von reinen Maklerbetrieben, die nur vermarkten.

## Operating Context

Deutschsprachige Schweiz, Region Bodensee (Kreuzlingen, Ermatingen, Kradolf-Schönenberg, Güttingen, Sitz in Tägerwilen). Inhalte werden über Keystatic gepflegt: lokal direkt in Dateien, online über GitHub, mit automatischem Netlify-Build. Die Kontaktseite zeigt ein festes Kartenbild (OpenStreetMap-Daten, selbst ausgeliefert) statt eines Formulars, Anfragen laufen über mailto-Links.

## Capabilities and Constraints

Next.js-Website mit Keystatic-Sammlungen für Projekte (`Referenzen`), freie Seiten, Startseite und Team. Die Sammlungen `Leistungen` und `Stellen` existieren technisch in der Vorlage, sind aber unbenutzt und nicht in der Navigation, da die alte Website diese Bereiche nicht hatte. Schweizer Textregeln sind im CMS technisch erzwungen: kein scharfes S, keine Gedankenstriche. Adressen `/leistungen`, `/referenzen`, `/jobs` sind reserviert und dürfen nicht für andere Seiten verwendet werden.

## Brand Commitments

Name: Apple Property Group AG. Bestehendes Signet (Apfel-Monogramm "APG" in Rose Gold) ist die reale, unveränderliche Grafik der Firma. Seit dem 21. Oktober 2026 wird es auf Wunsch der Kundschaft matt dargestellt (Fläche #CA8F7C, Kontur #B57059, kein Metallic-Verlauf), das Original liegt als logo-metallic-original.png daneben. Die Datei hat tatsächlich einen transparenten Hintergrund (geprüft) und funktioniert deshalb sowohl auf hellem als auch auf dunklem Grund, `logo` und `logohell` in Keystatic zeigen bewusst auf dieselbe Datei.

Seit der Neugestaltung "Die Vitrine" (September 2026, inspiriert von Cartier, Tiffany, Rolex u. a.) gilt: Rose Gold bleibt die reale Signetfarbe (`--color-marke: #9a5c4a`) auf hellen Flächen, ein helleres Blattgold (`--color-gold: #cda27a`) trägt dieselbe Familie auf dunklen "Vitrinen"-Flächen weiter. Überschriften in Cormorant (vorher Titillium Web), Fliesstext weiterhin in Inter.

Seit dem 23. September 2026 ist Dunkel der Standardmodus der ganzen Website, mit einem nicht aufdringlichen Umschalter in der Kopfzeile zu einem durchgehend hellen Modus (seit dem 20. Oktober 2026 auch Hero, Projekte, Team und Fusszeile hell, in drei Helligkeitsstufen) (`ThemeUmschalter.tsx`, Zustand in `localStorage`). Details und Begründung in DESIGN.md.

## Evidence on Hand

Echte Projektfotos und Visualisierungen für 3 Standorte (Kreuzlingen, Kradolf-Schönenberg, Güttingen), das Neubauprojekt Ermatingen ist angelegt, aber bis zum Eintreffen der Bilder nicht veröffentlicht. Alle Bilder, übernommen von der bisherigen Website apple-group.ch. Echtes Team (Natalie Piller, Gianluigi Conoci, Paul Künzig) ohne Fotos. Echte Kontaktdaten (Hauptstrasse 40a, 8274 Tägerwilen, +41 71 688 10 10, info@apple-group.ch). Keine Kundenstimmen, keine belegten Kennzahlen (Gründungsjahr, Mitarbeitendenzahl, Projektanzahl) vorhanden, diese dürfen nicht erfunden werden.

## Product Principles

- Nichts erfinden: nur echte, von der Kundschaft stammende Inhalte und Bilder verwenden.
- Die ganzheitliche Wertschöpfungskette (Entwicklung bis Bewirtschaftung) ist die Kernaussage.
- Käuferschaft und Mieterschaft stehen im Zentrum, Projekte sind der wichtigste Einstiegspunkt.
- Sachliche, vertrauensbildende Kommunikation in Schweizer Hochdeutsch (kein scharfes S, keine Gedankenstriche, keine Werbefloskeln).
- Rose-Gold-Identität und bestehendes Logo bleiben als Marke unverändert.

## Accessibility & Inclusion

Kein zusätzliches projektspezifisches Erfordernis über den WCAG-AA-Standard der InfraOne-Vorlage hinaus (Tastaturbedienung, sichtbarer Fokus, Sprung-zum-Inhalt-Link, Rücksicht auf reduzierte Bewegung).
