# Spec-driven Entwicklung

Die Basis-Specs unter `specs/` beschreiben den bestehenden Verhaltensvertrag.
Neue oder geänderte Anforderungen stehen zunächst als Deltas in `changes/<name>/`.
Nach Implementierung und Prüfung synchronisiert die Archivierung diese Deltas
in die Basis-Specs und erhält die Historie unter `changes/archive/`.

## Einstieg und Ablauf

1. `npm ci` mit Node.js >=20.19.0 ausführen. OpenSpec ist lokal auf 1.14.1 gepinnt.
2. `npm run spec:list` und `npm run spec:changes` ausführen; betroffene Specs lesen.
3. In Codex `openspec-propose` verwenden oder `npm run spec:new -- <name>` ausführen.
   Beim manuellen Weg die Vorlage mit
   `npm run spec -- instructions proposal --change <name>` lesen, anschließend
   entsprechend `specs`, `design` und `tasks` abfragen.
4. Proposal beschreibt Warum und Umfang; Delta-Specs beschreiben Verhalten mit
   SHALL/MUST und WHEN/THEN-Szenarien. Design hält technische Entscheidungen fest;
   Tasks enthalten kleine nummerierte Checkbox-Aufgaben und ihre Prüfungen.
5. `npm run spec:validate` ausführen. Den Plan prüfen und mit
   `openspec-apply-change` beziehungsweise dem autorisierten Umsetzungsauftrag
   implementieren. Artefakte bei Erkenntnissen anpassen, erledigte Tasks abhaken.
6. `npm run check` ausführen. Betroffene UI-Szenarien mit `npm run web` oder
   `npm run android` prüfen; tatsächliche Ergebnisse im Change dokumentieren.
7. `npm run spec:archive -- <name>` ausführen und anschließend `npm run check`.

`openspec-propose` dient der Planung; für einen reinen Planungsauftrag folgt
die Umsetzung erst auf einen Umsetzungsauftrag. Reine Tippfehler/Formatierung
brauchen keinen Change. Tooling ohne neue Anforderungen kann mit begründetem
`skip_specs: true` in `.openspec.yaml` arbeiten.

## Zuordnung und Prüfabdeckung

| Capability | Umsetzung | Vorhandene Prüfung |
| --- | --- | --- |
| solar-calculations | src/astronomy.ts | Vitest: Sommer-Tageslänge, Schaltjahr, Tagesvergleich, Dauerformat |
| season-events | src/astronomy.ts, App.tsx | Vitest: Ereignismonate 2026; Anzeige manuell |
| annual-calendar | App.tsx | Quellcode-Abgleich bei Migration; UI-Szenarien manuell |
| android-delivery | .gitlab-ci.yml, app.json | Pipeline-Ausführung in GitLab; bei Migration nur Quellcode-Abgleich |
| spec-driven-development | package.json, AGENTS.md, config.yaml, .agents/skills/ | CLI-Validierung, npm run check und Archiv-Prüfung |

Die vier bestehenden Tests decken nicht alle Spec-Szenarien ab. Insbesondere
UTC-Normalisierung, Jahrestages-Reihenfolge, Gleichstand, leere Tagesliste,
Minutenübertrag und UI-Verhalten wurden für diese Migration anhand des Codes
beschrieben. Sie wurden hier nicht als neue automatische Tests umgesetzt.
OpenSpec prüft die Struktur der Anforderungen; eine grüne Validierung beweist
weder Produktverhalten noch Testabdeckung. Betroffene Szenarien bei künftigen
Änderungen gezielt automatisieren oder manuell prüfen.

## Grenzen des bestehenden Produkts

- Erftstadt ist fest eingestellt. Der Standort-Button löst keine Aktion aus;
  Standortwahl, Geolokalisierung und Persistenz sind nicht implementiert.
- Sonnenzeiten werden für Europe/Berlin formatiert. Startjahr und Heute verwenden
  die Gerätezeitzone; ein automatischer Datumswechsel ohne Rendern ist nicht vorgesehen.
- Jahreszeitenmarker werden am UTC-Ereignistag eingeordnet. Die Schätzwerte sind
  keine hochpräzisen astronomischen Zeitangaben.
- Die Sonnenberechnung enthält weder Eingabevalidierung noch Polartag/-nacht-
  Behandlung. Die Specs garantieren keine Genauigkeit außerhalb des beschriebenen Bereichs.
- Die APK verwendet einen Debug-Schlüssel; Store-Veröffentlichung ist kein Bestandteil.

Diese Grenzen sind keine bereits autorisierten Feature-Aufträge. Ihre Änderung
beginnt mit einem separaten Change und passenden Akzeptanzszenarien.

## Weitere Kommandos

```bash
npm run spec -- status --change <name>
npm run spec -- show <name>
npm run spec:validate
npm run spec:validate:archive
npm run spec:update
```

`spec:update` aktualisiert die generierten Skills. Für die Neueinrichtung oder
gezielte Wiederherstellung der Codex-Integration steht `npm run spec:init` bereit.
Projektspezifische Regeln gehören in AGENTS.md und config.yaml.

Grundlage ist der [offizielle OpenSpec-Workflow](https://github.com/Fission-AI/OpenSpec).
