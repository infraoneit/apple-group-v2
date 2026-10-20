---
target: Homepage (src/app/(website)/page.tsx)
total_score: 26
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 0
target_identity: "file:C:\\code\\apple-property\\src\\app\\(website)\\page.tsx"
target_fingerprint: "sha256:4b56134460c1b32fb44824fbe7a7fcc50e0fc5f5f285afea34a3246330eb82e2"
target_path: "C:\\code\\apple-property\\src\\app\\(website)\\page.tsx"
timestamp: 2026-09-22T13-22-47Z
slug: src-app-website-page-tsx
closed: true
---
Method: dual-agent (A: ad753473a1a8bc103 · B: ab06eda2d5f3c6983)

## Design Health Score

| # | Heuristik | Score | Wichtigster Befund |
|---|-----------|-------|---------------------|
| 1 | Sichtbarkeit des Systemstatus | 3 | Aktiver Nav-Status und Scroll-Schatten funktionieren gut |
| 2 | Übereinstimmung mit der realen Welt | 4 | Durchgehend sachliches Schweizer Deutsch, logische Reihenfolge |
| 3 | Nutzerkontrolle und Freiheit | 4 | Brotkrumen, Escape mit Fokus-Rückgabe, Home-Link immer vorhanden |
| 4 | Konsistenz und Standards | 3 | Knopf-System jetzt konsistent; Kartenraster bricht bei langen Ortsnamen |
| 5 | Fehlervermeidung | 3 | Formular mit Pflichtfeld-Markierung und begrenzter Auswahl |
| 6 | Wiedererkennung statt Erinnern | 3 | Mobiler Anruf-Button ohne sichtbares Text-Label |
| 7 | Flexibilität und Effizienz | n/a | Persuade-Modus, kein Workflow zu beschleunigen |
| 8 | Ästhetisches, minimalistisches Design | 3 | Ruhig und zurückhaltend; Footer-Raster laesst eine Luecke |
| 9 | Fehlerbehebung | 3 | Native Pflichtfeld-Behandlung, nicht tief stresstestet |
| 10 | Hilfe und Dokumentation | n/a | Fuer Landingpage nicht anwendbar |
| Total | | 26/32 | Good (81 %), gegenueber 21/32 (66 %) in der ersten Runde |

## Verifikation der 5 vorherigen Punkte

Alle fuenf sind echt behoben, nicht nur oberflaechlich umbenannt, unabhaengig sowohl im Code als auch live im Browser bestaetigt:

1. P0 Kontaktaufruf-Band: laeuft jetzt auf Warm Linen mit sachlichem Text, Rose-Gold nur noch auf dem Knopf. FIXED
2. P1 Ghost-Knopf: Telefon-Link nutzt jetzt knopf-sekundaer, knopf-hell ist korrekt nur noch fuer Fotohintergruende im Hero reserviert. FIXED
3. P2 Mobile Erreichbarkeit: Tap-to-call-Icon im mobilen Header sichtbar, an 375 px bestaetigt. FIXED
4. P2 Zeilenlaenge: .lesebreite korrekt angewendet, auf /referenzen/kreuzlingen bestaetigt. FIXED
5. P2 Akzentfarb-Verwaesserung: "Mehr ueber uns" ist jetzt die sekundaere Variante, nur noch zwei gefuellte Akzentmomente auf der ganzen Seite. FIXED

## Design-Spezifitaets-Urteil

Die Komposition ist erkennbar fuer dieses Unternehmen authoriert: die 2400-px-Breite statt der ueblichen 1280 px, konsequent flache Eckenradien, echte Projektfotografie, und die Akzentfarbe erscheint jetzt ueber den ganzen Scroll nur noch zweimal als Flaeche. Der Detektor fand ueber 11 Dateien erneut keine Treffer (Exit-Code 0). Der Browser-Detektor meldet weiterhin overused-font, kicker-above-heading, hero-eyebrow-chip und image-hover-transform, dieselben bewusst dokumentierten Systemmuster wie in Runde 1, keine echten Probleme.

## Gesamteindruck

Der Fix-Durchgang hat wirklich etwas bewegt, nicht nur kosmetisch. Die Reise endet jetzt ruhig und sachlich statt mit kuenstlichem Verkaufsdruck. Uebrig geblieben ist ein einziges sichtbares Problem im zweitwichtigsten Bereich der Seite: das Projektraster vertraegt lange Ortsnamen nicht.

## Priorisierte Probleme

[P2] Kartenraster bricht bei langen Ortsnamen. Was: Bei "Kradolf-Schoenenberg" (real und dauerhaft im Portfolio) laeuft die Metazeile "Neubau / Kradolf-Schoenenberg / August 2026" zweizeilig, waehrend die anderen drei Karten einzeilig bleiben, das verschiebt den Titel dieser Karte nach unten aus der gemeinsamen Grundlinie. Selbst bei 1350 px Breite im Browser bestaetigt. Fix: feste Mindesthoehe fuer die Metazeile reservieren, damit alle Karten ausgerichtet bleiben. Empfohlener Befehl: /impeccable polish.

[P3] Footer-Raster laesst eine leere Spalte, wenn Oeffnungszeiten fehlen. Was: Fusszeile.tsx Zeile 19 reserviert fest 4 Spalten (xl:grid-cols-[1.4fr_1fr_1fr_1fr]), auch wenn nur 3 gefuellt sind, das hinterlaesst eine sichtbare Luecke rechts von "Uebersicht". Fix: Spaltenzahl abhaengig von den tatsaechlich gerenderten Bloecken machen. Empfohlener Befehl: /impeccable polish.

[P3] Mobiler Anruf-Button ohne sichtbares Text-Label. Was: Auf Mobile zeigt der Header nur ein Telefon-Icon mit aria-label, ohne sichtbaren Text, anders als auf Desktop. Fix: optionales, dezentes Mikro-Label, falls Platz reicht, niedrige Prioritaet. Empfohlener Befehl: /impeccable clarify.

## Persona-Warnsignale

Riley (Stresstesterin): Findet genau den Kartenraster-Umbruch, einen mit echten Daten reproduzierbaren Randfall, plus die unbehandelte leere Oeffnungszeiten-Spalte im Footer.

Jordan (Erstbesucherin): Keine groesseren Warnsignale mehr. Der Hauptpfad ist innert 5 Sekunden klar, Copy ist jargonfrei.

Casey (mobil): Der vorher fehlende mobile Kontaktweg ist jetzt gut geloest, Tastflaechen erfuellen durchgehend 44x44 px.

## Kleinere Beobachtungen

- "Bauherrschaft" wird bei fehlendem Wert sauber ausgeblendet statt eine leere Zeile zu zeigen, ein gutes Vorbild fuer die Footer-Korrektur.
- Kontakt- und Projekt-Detailseiten halten sich gut an DESIGN.md, keine neuen Probleme dort gefunden.

## Fragen zum Nachdenken

- Sollten Karten-Metazeilen grundsaetzlich fuer zwei Zeilen ausgelegt sein, statt anzunehmen, dass die meisten Ortsnamen kurz sind?
- Jetzt, wo die One-Accent-Regel eingehalten wird: koennte Rose Gold Blush als Waerme-Akzent dienen, ohne die Regel zu brechen?
