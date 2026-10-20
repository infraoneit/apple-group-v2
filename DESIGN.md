---
name: Apple Property Group AG
description: Die Vitrine, ein dunkler Ausstellungsraum, in dem jedes Projekt gerahmt und beleuchtet wie ein einzelnes Stück liegt. Dunkel ist der Standardmodus der ganzen Website, ein Umschalter in der Kopfzeile führt zu einem hellen Modus.
colors:
  marke: "#9a5c4a"
  marke-dunkel: "#7a4839"
  marke-hell: "#f3e5de"
  gold: "#cda27a"
  gold-dunkel: "#a97f56"
  akzent: "#cda27a"
  akzent-dunkel: "#a97f56"
  akzent-hell-modus: "#9a5c4a"
  akzent-dunkel-hell-modus: "#7a4839"
  grund: "#2c2319"
  flaeche: "#352a20"
  text: "#f3ece3"
  text-leise: "#a8927c"
  linie: "#4c3b2c"
  grund-hell-modus: "#ffffff"
  flaeche-hell-modus: "#faf6f0"
  text-hell-modus: "#1c1714"
  text-leise-hell-modus: "#5b524c"
  linie-hell-modus: "#e6ded8"
  flaeche-dunkel: "#100b08"
  flaeche-dunkel-2: "#15100d"
  text-hell: "#f3ece3"
  text-hell-leise: "#a8927c"
  linie-dunkel: "#2c2119"
typography:
  display:
    fontFamily: "Cormorant, ui-serif, Georgia, serif"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontWeight: 400
    lineHeight: 1.7
rounded:
  button: "3px"
  card: "4px"
spacing:
  section-sm: "3rem"
  section-md: "4rem"
  section-lg: "5rem"
components:
  button-primary:
    backgroundColor: "{colors.marke}"
    textColor: "{colors.grund}"
    rounded: "{rounded.button}"
    padding: "14px 28px"
  button-primary-hover:
    backgroundColor: "{colors.marke-dunkel}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    rounded: "{rounded.button}"
    padding: "14px 28px"
  button-on-dark:
    backgroundColor: "transparent"
    textColor: "{colors.text-hell}"
    rounded: "{rounded.button}"
    padding: "14px 28px"
---

# Design System: Apple Property Group AG

## Overview

**Creative North Star: "Die Vitrine"**

Jedes Projekt liegt wie ein einzelnes Schmuckstück in einer eigenen Vitrine: gerahmt von einer dünnen Blattgoldlinie, unter einem weichen Lichtkreis, auf tiefem, samtigem Schwarzbraun. Das System übersetzt die Sprache von Cartier, Tiffany und Rolex, nicht als Farbwechsel, sondern als Materialwechsel: Wo die Vorlage bisher flache Kacheln auf hellem Grund zeigte, hängt jetzt jedes Bild in einem eigenen, beleuchteten Rahmen.

Seit dem 23. September 2026 ist Dunkel der Standardmodus der ganzen Website, nicht nur einzelner Abschnitte. Ein nicht aufdringlicher Umschalter in der Kopfzeile (`ThemeUmschalter.tsx`, Mond- und Sonnensymbol) führt zu einem hellen Modus, die Wahl bleibt in `localStorage` gemerkt. Technisch trägt jede Farbe, die sich mit dem Modus ändert, den Namen `--color-akzent` und ihre Neutraltöne (`grund`, `flaeche`, `text`, `text-leise`, `linie`): im dunklen Standardmodus ist Akzent das Blattgold, im hellen Modus die reale Signetfarbe. Das reale Firmensignet hat einen echten transparenten Hintergrund (kein weisser Kasten) und funktioniert deshalb unverändert auf beiden Flächen, `logo` und `logohell` in Keystatic zeigen bewusst auf dieselbe Datei. Die "Vitrine" selbst, also Hero, Projektkarten, Team und Fusszeile, bleibt unabhängig vom Umschalter immer dunkel (`--color-flaeche-dunkel`), das ist die eine Konstante, um die sich der Rest des Systems dreht. Überschriften sind durchgängig in Cormorant, einer feinen, gravierten Serife, wie eine Gravur auf einer Plakette.

Bestätigte Abgrenzung: keine vollflächigen Farbbänder, kein Baukasten-Rahmen um Karten, keine Stockfotografie, keine erfundenen Kennzahlen oder Kundenstimmen. Was hier steht, ist immer echt: echte Projekte, echtes Team, echte Adresse.

**Key Characteristics:**
- Jedes Bild liegt in einem eigenen goldgerahmten Fenster mit weichem Lichtkreis dahinter, nie als flächiges Hintergrundbild
- Dunkel ist der Standardmodus der ganzen Website, ein nicht aufdringlicher Umschalter in der Kopfzeile führt zu Hell
- Die Vitrine selbst (Hero, Projekte, Team, Fusszeile) bleibt in beiden Modi immer dunkel, das ist die feste Bühne
- Cormorant für Überschriften (eine gravierte Serife), Inter für Fliesstext und Bedienelemente
- Rose Gold (helle Signetfarbe) und Blattgold (dunkler Modus) sind dieselbe Familie, gesteuert über einen einzigen Akzent-Token
- Präzise, knappe Kanten (3 bis 4 px), keine weichen Baukasten-Rundungen

## Colors

Ein Akzent-Token, zwei Stimmungen: Blattgold im dunklen Standardmodus, Signet-Braun im hellen Modus, dieselbe Rose-Gold-Herkunft. Dazu eine feste, immer dunkle Bühne für die Vitrine selbst.

### Primary
- **Akzent** (dunkler Modus `#cda27a` Blattgold, heller Modus `#9a5c4a` Signet-Braun): Primärlinks, Fokusringe, Labels, Hover-Akzente auf Flächen, die mit dem Umschalter wechseln.
- **Akzent Dunkel** (dunkler Modus `#a97f56`, heller Modus `#7a4839`): Hover-Zustand von Akzent-Elementen.
- **Signet-Braun** (`#9a5c4a`, fest): die reale Farbe des Firmenzeichens, unabhängig vom Modus. Trägt den gefüllten Primärknopf (`knopf-primaer`), damit die Handlungsaufforderung immer dieselbe, wiedererkennbare Markenfarbe zeigt.
- **Blattgold** (`#cda27a`, fest): dieselbe Farbfamilie, für Stellen, die unabhängig vom Umschalter immer dunkel sind (Vitrinen-Rahmenlinien, `vitrine-plakette`, Fokusringe innerhalb dunkler Abschnitte).

### Neutral
- **Grund** (dunkler Modus `#2c2319`, heller Modus `#ffffff`): Seitenhintergrund, wechselt mit dem Umschalter.
- **Fläche** (dunkler Modus `#352a20`, heller Modus `#faf6f0`): leicht abgesetzte Abschnittsfläche.
- **Text** (dunkler Modus `#f3ece3`, heller Modus `#1c1714`) / **Text Leise** (dunkler Modus `#a8927c`, heller Modus `#5b524c`): Fliesstext, wechselt mit dem Umschalter.
- **Linie** (dunkler Modus `#4c3b2c`, heller Modus `#e6ded8`): Trennlinien und Feldrahmen, wechselt mit dem Umschalter.
- **Vitrinen-Samt** (`#100b08`) / **Vitrinen-Samt Erhöht** (dunkler Modus `#15100d`, heller Modus `#1d1712`): die feste, immer dunkle Bühne für Hero, Projekte, Team und Fusszeile, unabhängig vom Umschalter. Bewusst deutlich dunkler als Grund/Fläche im Dunkelmodus (seit dem Polish-Durchgang vom 23. September 2026), damit Foyer und Vitrine auch im Dunkelmodus als zwei unterscheidbare Räume wirken, nicht nur im hellen Modus.
- **Text Creme** (`#f3ece3`) / **Text Creme Leise** (`#a8927c`): Text auf der Vitrinen-Bühne, fest in beiden Modi.

### Named Rules
**Die Rahmen-Regel.** Ein Projektbild bekommt nie ein volles Hintergrundbild mit Text darüber. Es liegt immer gerahmt (`.vitrine-rahmen`) mit Lichtkreis (`.vitrine-licht`) auf dunklem Samt, so wie ein Stück in einer Vitrine liegt, nie wie eine Tapete.

**Die Bühnen-Regel.** Hero, Projektkarten, Team und Fusszeile bleiben in beiden Modi immer dunkel (`.bg-flaeche-dunkel`). Nur die Flächen dazwischen (Kopfzeile, Lesetexte, Formulare, rechtliche Seiten) folgen dem Umschalter, mit einem spürbar helleren Wert als die Vitrinen-Bühne. So bleibt die Vitrine selbst immer die Bühne, in beiden Modi als eigener, dunklerer Raum erkennbar.

## Typography

**Display Font:** Cormorant (mit serifenloser Ersatzschrift Georgia)
**Body Font:** Inter (mit ui-sans-serif, system-ui)

**Character:** Cormorant ist eine feine, hochkontrastreiche Serife mit gravierter, klassischer Anmutung, wie eine Beschriftung auf einer Metallplakette. Inter bleibt vollkommen neutral für Fliesstext, Formulare und Navigation, damit lange Schweizerdeutsche Sätze lesbar bleiben.

### Hierarchy
- **Display / titel-1** (600, 2.25rem bis 6rem, wächst weiter ab 2200 px, Zeilenhöhe 1.08): H1, einmal pro Seite.
- **Headline / titel-2** (600, 1.875rem bis 3.75rem): Abschnittstitel.
- **Title / titel-3** (600, 1.25rem bis 1.875rem): Karten- und Unterabschnittstitel.
- **Label / vitrine-plakette** (600, sehr klein, `0.2em` Tracking, Blattgold, Grossbuchstaben): Beschriftung wie auf einer Vitrinenplakette, ersetzt die Überzeile in dunklen Abschnitten.
- **Label / ueberzeile** (600, klein, `0.24em` Tracking, Signet-Braun, mit horizontaler Linie davor): dieselbe Rolle auf hellen Flächen.

### Named Rules
**Die Trennungs-Regel.** Silbentrennung bleibt für lange deutsche Wörter aktiv (`hyphens: auto`, `hyphenate-limit-chars: 9 4 4`), tragend für deutschsprachige Überschriften, darf nicht abgeschaltet werden. Bewusst kein `overflow-wrap: break-word` auf Überschriften: dieser Notfall-Umbruch ignoriert `hyphenate-limit-chars` und kann zusammen mit `text-balance` ein einzelnes Zeichen auf der letzten Zeile abspalten (seit dem Polish-Durchgang vom 23. September 2026 entfernt).

## Layout

Unverändert von der InfraOne-Vorlage: `container-seite` bis 2400 px Breite, `abschnitt` (64 bis 96 px), `abschnitt-kompakt` und `abschnitt-gross` als einzige vertikale Abstände. Lesetexte bleiben mit `.lesebreite` (72 Zeichen) begrenzt. Neu ist die Raumfolge: jeder Abschnitt entscheidet sich bewusst für Foyer (hell) oder Vitrine (dunkel), im Wechsel, nie zwei dunkle Abschnitte ohne einen hellen dazwischen, ausser wenn eine Vitrine direkt in die nächste übergeht (z. B. Bildergalerie in "Weitere Referenzen").

## Elevation & Depth

Kein Schatten als Dekoration. Die einzige Tiefe ist das Licht der Vitrine selbst: ein weicher, radialer Goldschimmer hinter jedem gerahmten Bild (`.vitrine-licht`), dazu ein tiefer, weicher Schatten unter dem Rahmen selbst, der das Bild vom Samt abhebt. Der Kopfzeilen-Schatten erscheint nur beim Scrollen, wie zuvor.

### Named Rules
**Die Ein-Licht-Regel.** Jede Vitrine hat genau einen Lichtkreis hinter dem gerahmten Objekt. Kein zweites Leuchten, kein Glühen an Kanten, die kein Rahmen sind.

## Shapes

Knapp und graviert statt weich gerundet: 3 px Knöpfe, 4 px Karten und Rahmen, näher an einer Vitrinenkante als an einer App-Kachel. Der Goldrahmen selbst ist eine 1-px-Linie (`border-gold/55`, seit dem Polish-Durchgang vom 23. September 2026 kräftiger als zuvor, damit er auch im Ruhezustand sichtbar ist), nie eine breite Umrandung.

## Components

### Buttons
- **Primär:** Signet-Braun gefüllt, weisser Text. Innerhalb der festen Vitrinen-Bühne (`.bg-flaeche-dunkel`, z. B. Hero) zusätzlich mit einem dünnen Goldrand (`border-gold/60`), damit die wichtigste Handlung an die Vitrinen-Sprache anknüpft statt als reines Nutzbraun neben dem Goldrahmen der Bilder zu stehen (seit dem Polish-Durchgang vom 23. September 2026). Auf Foyer-Flächen (z. B. Kontaktaufruf) bleibt er ohne Goldrand.
- **Sekundär:** transparent, Rahmen in der aktuellen Textfarbe, Hover füllt dunkel.
- **Auf dunklem Samt (`knopf-hell`):** transparent mit halbtransparentem Goldrahmen, Hover füllt volles Gold mit dunklem Text. Ersetzt die frühere weisse Fotorahmen-Variante.

### Vitrinen-Karten (Projekte, Team)
- **Titel:** `.titel-3`, auch für Team-Namen (seit dem Typografie-Durchgang vom 24. September 2026 vereinheitlicht, vorher ein undokumentierter Einzelwert kleiner als jede Titel-Rolle).
- **Rahmen:** `.vitrine-rahmen`, eine 1-px-Goldlinie mit tiefem Schatten nach aussen.
- **Licht:** `.vitrine-licht`, ein radialer Goldschimmer hinter dem Rahmen (32 % Deckkraft, seit dem Polish-Durchgang vom 23. September 2026 kräftiger). Bei Hero- und Team-Bildern dauerhaft sichtbar. Bei Projektkarten seit demselben Durchgang ebenfalls bereits im Ruhezustand sichtbar (70 % Deckkraft) und beim Hover auf volle Stärke verstärkt, statt vorher rein Hover-only, damit das Vitrinen-Konzept ohne Interaktion lesbar ist.
- **Bild:** 4:3 (Projekte, Team im Hochformat 4:5), sanfter 4-%-Zoom beim Hover.
- **Meta-Zeile:** Kategorie in Blattgold, Ort, Datum in gedämpftem Creme, mit fester Mindesthöhe, damit lange Ortsnamen (z. B. Kradolf-Schönenberg) die Titelzeile nicht verschieben.

### Hero (Signaturkomponente)
Zwei Varianten, dieselbe Dramaturgie: Titel kündigt an, das gerahmte Bild löst ein, der Knopf lädt ein. **Vollbild** (Startseite): zentrierter Text über dem Bild, das Bild liegt darunter gerahmt und beleuchtet, nicht als Hintergrund. **Geteilt** (Unterseiten): Text links auf Samt, Bild rechts gerahmt.

### Formulare
Felder folgen dem Umschalter (`bg-grund`, `border-linie`, Fokusrahmen in Akzent), damit sie sich immer von der Seite abheben, egal ob Hell oder Dunkel gewählt ist. Fehler- und Testhinweis-Meldungen sind halbtransparent eingefärbt (`bg-red-500/10`, `bg-amber-500/10`) statt fest pastellfarben hinterlegt, damit sie im dunklen Standardmodus nicht als grelle weisse Fläche wirken.

### Galerie (Karussell)
`Galerie.tsx`: der Bild-Hero der Projekt-Detailseite. Titelbild und alle Galeriebilder aus Keystatic bilden zusammen ein Karussell (kein separates Titelbild mehr über einer eigenen "Bilder"-Sektion, seit dem 24. September 2026 zusammengeführt). Ein Bild pro Ansicht im `.vitrine-rahmen` mit `.vitrine-licht`, scrollt nativ per Scroll-Snap (Touch, Trackpad), dazu Pfeil-Knöpfe, Punkte und ein Zähler ("2 / 8") als gleichwertige, tastaturbedienbare Kontrollen (Pfeiltasten, wenn das Karussell fokussiert ist). Bei genau einem Bild (kein Galeriebild vorhanden) fallen Pfeile, Punkte und Zähler weg, es bleibt beim einzelnen gerahmten Titelbild wie zuvor.

### Umschalter
`ThemeUmschalter.tsx` in der Kopfzeile, Mondsymbol im dunklen, Sonnensymbol im hellen Modus, 44 px Klickfläche, `aria-pressed` und beschreibendes `aria-label`. Setzt `data-theme="light"` auf `<html>` und merkt die Wahl in `localStorage`. Ein kleines Inline-Skript in `layout.tsx` setzt das Attribut bereits vor dem ersten Rendern, damit beim Laden kein Farbwechsel-Blitz sichtbar wird.

## Do's and Don'ts

### Do:
- **Do** jedes Projektbild in einem Goldrahmen mit Lichtkreis zeigen (`.vitrine-rahmen` + `.vitrine-licht`), nie als flächiges Hintergrundbild.
- **Do** neue Textfarben, Ränder und Hintergründe über die Token `akzent`, `grund`, `flaeche`, `text`, `text-leise`, `linie` setzen, nie über feste Tailwind-Farben wie `bg-white` oder `text-marke`, sonst reagieren sie nicht auf den Umschalter.
- **Do** die Vitrinen-Bühne (Hero, Projekte, Team, Fusszeile) immer dunkel halten (`.bg-flaeche-dunkel`), unabhängig vom Umschalter.
- **Do** Cormorant nur für Überschriften verwenden, Inter für alles Bedienbare und Lesbare.
- **Do** Fokusringe: Akzentfarbe als Standard, Gold nur innerhalb von `.bg-flaeche-dunkel`- oder `.text-text-hell`-Abschnitten.

### Don't:
- **Don't** ein Projektbild vollflächig mit Text darüber legen, das ist die Vorlagen-Optik, die dieses System ersetzt.
- **Don't** eine ganze Sektion mit der Akzentfarbe füllen, weder Braun noch Gold, die Vitrine lebt vom Kontrast zwischen Rahmen und Samt.
- **Don't** ein zweites Leuchten oder einen zweiten Schatten neben dem Vitrinenlicht hinzufügen.
- **Don't** Kennzahlen, Kundenstimmen oder Teamfotos erfinden, die nicht bestätigt sind.
- **Don't** annehmen, das Logo brauche einen hellen Hintergrund. Die Datei hat einen echten transparenten Hintergrund und funktioniert auf Hell und Dunkel gleichermassen.
