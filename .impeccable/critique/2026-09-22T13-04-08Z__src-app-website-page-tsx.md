---
target: Homepage (src/app/(website)/page.tsx)
total_score: 21
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 1
target_identity: "file:C:\\code\\apple-property\\src\\app\\(website)\\page.tsx"
target_fingerprint: "sha256:4b56134460c1b32fb44824fbe7a7fcc50e0fc5f5f285afea34a3246330eb82e2"
target_path: "C:\\code\\apple-property\\src\\app\\(website)\\page.tsx"
timestamp: 2026-09-22T13-04-08Z
slug: src-app-website-page-tsx
closed: true
---
Method: dual-agent (A: abcffcb3213079e2a · B: a19dc0a7f6c3f3fda)

## Design Health Score

| # | Heuristik | Score | Wichtigster Befund |
|---|-----------|-------|---------------------|
| 1 | Sichtbarkeit des Systemstatus | 3 | Aktiver Nav-Status, Scroll-Schatten, Fokusring funktionieren; kein sichtbarer Ladezustand beim Formularversand |
| 2 | Übereinstimmung mit der realen Welt | 3 | Durchgehend sachliches Schweizer Deutsch, ausser im Kontaktaufruf-Band |
| 3 | Nutzerkontrolle und Freiheit | 3 | Mobilmenü schliesst mit Escape korrekt, kein Sackgassen-Verhalten gefunden |
| 4 | Konsistenz und Standards | 2 | Der Kontaktaufruf-Band bricht die im System selbst dokumentierte "One Accent Rule" |
| 5 | Fehlervermeidung | 3 | Pflichtfeld-Markierung, begrenzte Auswahl, Einwilligungs-Checkbox im Formular |
| 6 | Wiedererkennung statt Erinnern | 3 | Brotkrumen, beschriftete Icons, Telefonnummer im Desktop-Header sichtbar |
| 7 | Flexibilität und Effizienz | n/a | Persuade-Modus, kein wiederkehrender Workflow zu beschleunigen |
| 8 | Ästhetisches, minimalistisches Design | 2 | Überall ruhig, ausser im Kontaktaufruf-Band, wo Farbe und Sprache genau am Konversionspunkt eskalieren |
| 9 | Fehlerbehebung | 2 | Nicht mit ungültigen Eingaben stresstestet, keine eigene Inline-Validierung über Browser-Standard hinaus beobachtet |
| 10 | Hilfe und Dokumentation | n/a | Für eine Landingpage nicht anwendbar, Telefon/E-Mail dienen als Hilfekanal |
| **Total** | | **21/32** | **Acceptable (66 %)** |

## Design-Spezifitäts-Urteil

**LLM-Einschätzung:** Grösstenteils erkennbar für dieses Unternehmen authoriert: echte Renderings im Hero, die ruhige "Ganzheitliche Immobilienkompetenz"-Sektion, die präzise Kartenraster-Logik. Bricht aber genau an der wichtigsten Stelle: Der Kontaktaufruf "Sichern Sie sich noch heute Ihr Traumhaus" auf vollflächigem Rose-Gold ist exakt die Anti-Referenz, die DESIGN.md namentlich ausschliesst. Ein generischer Makler könnte diesen Abschnitt unverändert übernehmen.

**Deterministischer Scan:** `impeccable detect` fand über 11 Quelldateien keine Treffer (Exit-Code 0). Der Browser-Detektor (injiziert auf 3 echten Seiten) meldete: `overused-font` (Inter dominiert 81 bis 88 % des Texts), `kicker-above-heading` und `hero-eyebrow-chip` (Überzeile über Titel), `image-hover-transform` (Karten-Hover-Zoom), sowie eine konkrete Zeilenlängen-Abweichung: rund 85 Zeichen pro Zeile auf /referenzen/kreuzlingen statt der im System dokumentierten 72-Zeichen-Grenze.

Am Code geprüft: `kicker-above-heading`, `hero-eyebrow-chip` und `image-hover-transform` sind keine echten Probleme, sondern die in DESIGN.md dokumentierten, bewusst konsistent eingesetzten Muster (Überzeile-Komponente, Kategorie-Tag, 4-%-Hover-Zoom auf Karten). Die Zeilenlängen-Abweichung ist real: Seitenkopf.tsx Zeile 48 begrenzt die Einleitung nur mit max-w-3xl, nicht mit der im Rest des Systems verwendeten .lesebreite-Klasse (72ch).

## Gesamteindruck

Die ersten drei Viertel der Seite setzen das Rose-Gold-System diszipliniert um. Der Bruch passiert exakt am Ende, dem Moment, der laut Peak-End-Regel am längsten in Erinnerung bleibt: Ein vollflächig rose-goldenes Band mit Werbefloskel-Sprache untergräbt in einem Abschnitt das Vertrauen, das die Seite davor sorgfältig aufgebaut hat.

## Was gut funktioniert

1. Hero (Hero.tsx): echtes Rendering, exakt auf Lesbarkeit abgestimmter Verlauf, ein einziger klarer Knopf.
2. Projektkarten (Karten.tsx): präzise 4:3-Zuschnitt, korrekte Rastermathematik (4 Projekte -> 4 Spalten ohne Lücke), zurückhaltender 4-%-Hover.
3. Barrierefreiheit im Header: Sprung-Link, sichtbarer Fokusring, Escape schliesst das Mobilmenü mit korrekter Fokus-Rückgabe.

## Priorisierte Probleme

[P0] Kontaktaufruf-Band bricht Markensprache und Farbsystem. Was: Kontaktaufruf.tsx Zeile 9 füllt die ganze Sektion mit bg-marke, Titel ist "Sichern Sie sich noch heute Ihr Traumhaus". Warum wichtig: verstösst gegen PRODUCT.md ("keine Werbefloskeln") und DESIGN.md's benanntes Don't ("liest sich wie ein Gutschein-Banner"), genau am Konversionspunkt. Fix: Text sachlich umformulieren, Sektion auf Warm Linen/Espresso Charcoal umstellen, Rose-Gold nur auf dem Knopf. Empfohlener Befehl: /impeccable clarify.

[P1] Ghost-Knopf ausserhalb seines definierten Einsatzbereichs. Was: Kontaktaufruf.tsx Zeile 22 verwendet knopf-hell, laut DESIGN.md ausdrücklich reserviert für Einsatz über einem Foto, hier aber auf einer flächigen Farbe. Fix: eigene "Auf-Akzentfarbe"-Variante definieren statt der Foto-Ghost-Variante. Empfohlener Befehl: /impeccable harden.

[P2] Telefon und Kontakt-Knopf im Header auf Mobile/Tablet verborgen. Was: In Kopfzeile.tsx braucht die Telefonnummer xl: (1280 px), der Kontakt-Knopf lg: (1024 px). Fix: mindestens ein Tap-to-call-Icon im mobilen Header sichtbar machen. Empfohlener Befehl: /impeccable layout.

[P2] Zeilenlänge auf Projekt-Detailseiten überschreitet die eigene Lesbarkeits-Grenze. Was: Seitenkopf.tsx Zeile 48 begrenzt die Einleitung mit max-w-3xl statt .lesebreite (72ch). Fix: .lesebreite auf den Einleitungstext anwenden. Empfohlener Befehl: /impeccable typeset.

[P2] Drei volle Akzentfarb-Flächen kurz hintereinander verwässern die One-Accent-Regel. Was: "Immobilien erkunden" (Hero), "Mehr über uns" (Über-uns-Teaser) und der Kontaktaufruf-Knopf sind alle vollflächig rose-gold. Fix: "Mehr über uns" auf die sekundäre/umrandete Variante zurückstufen. Empfohlener Befehl: /impeccable quieter.

## Persona-Warnsignale

Jordan (Erstbesucherin): Vertraut der Seite über drei sachliche Abschnitte hinweg, trifft dann auf "Sichern Sie sich noch heute Ihr Traumhaus", genau die Makler-Sprache, vor der diese Zielgruppe laut PRODUCT.md geschützt werden soll.

Riley (Stresstesterin): Zählt beim Durchscrollen drei vollflächige Rose-Gold-Momente, obwohl das System "ein Akzent pro Ansicht" verspricht. Bemerkt zusätzlich die falsch eingesetzte knopf-hell-Variante.

Casey (mobil): Auf 375 px zeigt der Header nur Logo und Hamburger, keine sichtbare Telefonnummer oder Kontakt-Knopf.

## Kleinere Beobachtungen

- Footer hat keine helle Logovariante (bekannte, in PRODUCT.md dokumentierte Einschränkung), fällt auf reinen Fettschrift-Text zurück.
- Überzeilen laufen komplett in Inter statt in Titillium Web, das erklärt den overused-font-Hinweis des Detektors.
- Alt-Texte bei Hero- und Projektbildern sind spezifisch und sachlich.

## Fragen zum Nachdenken

- Würde "Sichern Sie sich noch heute Ihr Traumhaus" auf der Website eines Mitbewerbers genauso aussehen?
- Ist der eine vollflächige Farbmoment der ganzen Seite das Vertrauen wert, das er kostet?
- Soll die Telefonnummer auf jedem Gerät mit einem Tap erreichbar sein?
