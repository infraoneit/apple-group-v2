# Website-Vorlage: Next.js, Keystatic, Netlify

Verbindliche Vorlage von InfraOne für Firmenwebsites mit Inhaltsverwaltung.
Aufgebaut nach dem Vorbild von schaltkraft.ch (Breite, Aufbau, Keystatic) und elektro-tel.ch (automatische Referenzen und Stellen auf der Startseite).

**Wer mit dieser Vorlage arbeitet, liest zuerst die Dokumentation in `docs/`.** Sie ist kurz und beschreibt genau, wie wir vorgehen.

## Was die Vorlage kann

- Inhalte bearbeiten unter `/keystatic`: Startseite und Seiten aus 15 Blöcken (Startbereich in zwei Varianten, Ablauf, Team, Logos, Kontaktformular usw.), Leistungen, Referenzen, Stellen, Firma, Navigation
- Lokal speichert Keystatic direkt in Dateien, online über GitHub. Umschalten in `src/site.config.ts`
- Startseite zeigt automatisch die neusten Referenzen und Stellen. Markierte Einträge haben Vorrang
- Kontaktformular über Netlify Forms, Felder an einer Stelle definiert
- SEO: Metadaten, Sitemap, robots.txt, strukturierte Daten (Firma, Stellen, Brotkrumen)
- Qualitätsprüfungen für Konfiguration, Texte und Bilder (`npm run pruefen`). Konfiguration und Texte werden zusätzlich vor jedem Build geprüft
- Barrierefrei: Tastaturbedienung, Fokusführung im Menü, genau ein H1 pro Seite, Einblenden respektiert "Bewegung reduzieren"

## Schnellstart

```bash
npm install
npm run dev
```

- Website: http://localhost:3000
- Inhalte bearbeiten: http://localhost:3000/keystatic

Vor jedem Commit:

```bash
npm run pruefen
```

## Dokumentation

| Datei | Inhalt |
| --- | --- |
| [docs/01-neues-projekt.md](docs/01-neues-projekt.md) | Neues Projekt aus der Vorlage starten, Schritt für Schritt |
| [docs/02-keystatic.md](docs/02-keystatic.md) | Aufbau des CMS, Speichermodus, neue Blöcke und Sammlungen |
| [docs/03-github-verbinden.md](docs/03-github-verbinden.md) | Repository anlegen und Keystatic-GitHub-App einrichten |
| [docs/04-netlify.md](docs/04-netlify.md) | Netlify verbinden, Umgebungsvariablen, Domain |
| [docs/05-formulare.md](docs/05-formulare.md) | Netlify-Formulare richtig programmieren |
| [docs/06-bilder.md](docs/06-bilder.md) | Bildnamen, Grössen, Formate |
| [docs/07-texte.md](docs/07-texte.md) | Sprache und Tonalität, verbotene Zeichen und Floskeln |
| [docs/08-design-und-qualitaet.md](docs/08-design-und-qualitaet.md) | Breite, Abstände, Typografie, Mindeststandard |
| [docs/09-checkliste-go-live.md](docs/09-checkliste-go-live.md) | Abnahme vor der Veröffentlichung |
| [docs/10-anleitung-kundschaft.md](docs/10-anleitung-kundschaft.md) | Anleitung für die Kundschaft (Inhalte bearbeiten, Bilder) |
| [docs/11-wartung.md](docs/11-wartung.md) | Git-Arbeitsweise, Abhängigkeiten aktualisieren |

## Befehle

| Befehl | Zweck |
| --- | --- |
| `npm run dev` | Entwicklung auf Port 3000 |
| `npm run build` | Produktionsbuild, führt vorher Formularerzeugung, Konfigurations- und Textprüfung aus |
| `npm run pruefen` | Alle Prüfungen: Konfiguration, Texte, Bilder, TypeScript, ESLint, Tests |
| `npm run bilder:optimieren` | Zu grosse Bilder verkleinern |
| `npm run formulare` | `public/__forms.html` neu erzeugen |

## Technik

Next.js 16 (App Router), React 19, Keystatic 0.6, Tailwind CSS 4, TypeScript, Node 22.18 oder neuer, Hosting auf Netlify.
