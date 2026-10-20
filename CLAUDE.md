@AGENTS.md

# Regeln für dieses Projekt (verbindlich für KI-Assistenten)

Diese Website basiert auf der InfraOne-Vorlage `C:\Webprojekte\_vorlage-website`. Vor Änderungen die passende Datei in `docs/` lesen. Die Dokumentation hat Vorrang vor eigenem Vorwissen.

## Vor jeder Übergabe

- Vor lokaler Arbeit `git pull` (die Kundschaft committet über Keystatic auf `main`)
- `npm run pruefen` muss ohne Fehler laufen (Konfiguration, Texte, Bilder, TypeScript, ESLint, Tests)
- `npm run build` muss durchlaufen
- Sichtprüfung im Browser bei 375 px und 1920 px, keine Konsolenfehler

## Keystatic (docs/02-keystatic.md)

- Speichermodus nur über `KEYSTATIC_MODUS` in `src/site.config.ts`. Standard `automatisch`, nie `lokal` committen.
- Textfelder nur über `text()` und `langtext()` aus `src/keystatic/felder.ts`, nie `fields.text` direkt.
- Bildfelder über `bild()`, Feldnamen klein und ohne Bindestrich (werden zum Dateinamen).
- Titel von Sammlungen über `titelMitAdresse()` (saubere Adressen, gesperrte Adressen bei Seiten).
- Jede Seite rendert über `BlockRenderer` mit `seitentitel`, damit genau ein H1 entsteht.
- Inhalte nur über Funktionen in `src/lib/cms.ts` lesen.
- Neuer Block: Schema in `src/keystatic/bloecke.ts`, Komponente in `src/components/bloecke/`, Eintrag in `BlockRenderer.tsx`.
- Automatische Auswahl auf der Startseite nur über `src/lib/startseite-auswahl.ts` (markierte zuerst, Rest mit den neusten auffüllen).
- Detailseiten: `params` ist ein Promise (`await params`), `generateStaticParams` und `dynamicParams = false`.
- Inhaltsdateien im Keystatic-Format schreiben (leere Felder weglassen, `seo: {}`, LF, Zeilenumbruch am Ende).

## Netlify und Formulare (docs/04-netlify.md, docs/05-formulare.md)

- Formulare nur in `src/formulare/formulare.json` definieren, Komponente `NetlifyFormular` verwenden.
- Senden an `/__forms.html`, nie an `/` oder `/.netlify/forms`.
- Nie `netlify`, `data-netlify` oder `netlify-honeypot` in React-Code.
- `netlify.toml` nicht um das Next.js-Plugin ergänzen.

## Design (docs/08-design-und-qualitaet.md)

- Jeder Abschnitt nutzt `container-seite` (max 2400 px wie schaltkraft.ch). Kein `max-w-7xl`, kein `container`.
- Vertikale Abstände nur `abschnitt`, `abschnitt-kompakt`, `abschnitt-gross`.
- Farben nur als Tokens aus `@theme` in `globals.css`.
- Bilder nur mit `next/image` und passendem `sizes`. Kein `priority` (veraltet), stattdessen `loading="eager"` und `fetchPriority="high"` für das Hauptbild.
- Einblenden über `data-einblenden`, keine Animationsbibliothek.
- Tastaturbedienung, sichtbarer Fokus und Überschriften ohne Sprünge sind Pflicht.
- Qualität mindestens auf dem Niveau von schaltkraft.ch.

## Texte (docs/07-texte.md)

- Kein scharfes S, immer `ss` (Schweizer Schreibweise).
- Keine Gedankenstriche (Halbgeviert, Geviert, Bindestrich mit Leerzeichen als Einschub). Zeiträume mit "bis".
- Zusammengesetzte Wörter mit Bindestrich koppeln: E-Mail-Adresse, SEO-Titel, Alt-Text.
- Keine Satzfragmente und keine Slogan-Paare. Knöpfe beschreiben die Handlung, nie "Mehr erfahren".
- Keine Werbefloskeln, keine Superlative, keine Ausrufezeichen. Konkret, sachlich, belegbar.
- Nichts erfinden: keine Kennzahlen, Kundenstimmen oder Auszeichnungen ohne Bestätigung der Kundschaft.
- Diese Regeln gelten auch für Code-Kommentare, Commit-Nachrichten und Dokumentation.

## Bilder (docs/06-bilder.md)

- Von Hand abgelegte Dateien: Kleinbuchstaben, Bindestriche, keine Umlaute, beschreibend.
- Unter 500 KB, höchstens 2560 px. Sonst `npm run bilder:optimieren`.
- Gross- und Kleinschreibung in Pfaden exakt (Netlify unterscheidet sie).

## Geheimnisse

- `.env` nie committen, nie ausgeben, nie in Dateien kopieren.
- Build-Hook-URLs und Zugangsdaten nur in Netlify, GitHub-Secrets oder dem Passwortmanager.
