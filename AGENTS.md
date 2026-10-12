# Arbeiten an Sonnenzeit

Dieses Repository verwendet OpenSpec mit dem Schema `spec-driven`.
Lies zuerst `openspec/config.yaml`, die betroffenen Basis-Specs unter
`openspec/specs/` und vorhandene Changes unter `openspec/changes/`.

## Workflow

- Feature-, Bugfix- und verhaltensändernde Refactoring-Arbeit beginnt mit einem
  Change: `npm run spec:new -- <kebab-case-name>`.
- Vor der Implementierung stehen `proposal.md`, Delta-Specs,
  `design.md` (bei technischen Entscheidungen) und `tasks.md`.
  Beschreibe die Anforderungen vor den Codeänderungen. Aktualisiere sie,
  wenn sich bei der Implementierung neue Erkenntnisse ergeben.
- Reine Tippfehler und Formatierung ohne Verhaltensänderung brauchen keinen
  Change. Tooling-Changes können Specs über `skip_specs: true` in ihrer
  `.openspec.yaml` ausdrücklich überspringen; begründe das im Proposal.
- Respektiere den vom Nutzer gewählten Umfang: Ein reiner Planungsauftrag endet
  nach den Artefakten; ein ausdrücklich autorisierter Umsetzungsauftrag darf
  innerhalb seines Umfangs bis zur Prüfung und Archivierung abgeschlossen werden.
- Behalte vorhandene Capability-Namen bei. Neue Anforderungen nutzen
  `## ADDED Requirements`, Änderungen `## MODIFIED Requirements`, Entfernungen
  `## REMOVED Requirements`. Jede Anforderung enthält SHALL oder MUST sowie
  mindestens ein `#### Scenario:` mit WHEN/THEN.
- Implementiere die Tasks, ergänze relevante Tests und hake nur erledigte Arbeit ab.
- Führe `npm run check` aus. Prüfe betroffene UI-Szenarien zusätzlich in Expo
  und dokumentiere tatsächliche Ergebnisse sowie verbleibende Einschränkungen.
- Archiviere abgeschlossene Changes mit `npm run spec:archive -- <name>`.
  Das synchronisiert die Delta-Specs. Prüfe anschließend erneut die Specs.

## Projektregeln

Deutschsprachige Oberfläche und Artefakte; OpenSpec-Strukturbegriffe bleiben Englisch.
Berechnungen müssen offline und ohne API-Schlüssel funktionieren.
UTC-Kalendertage und Berliner Anzeigezeiten bewusst unterscheiden.
Keine unimplementierten Funktionen oder unbelegte Genauigkeitsgarantien als
Bestand spezifizieren. Bestehende Grenzen stehen in `openspec/README.md`.
Generierte OpenSpec-Skills unter `.agents/skills/` über `npm run spec:update`
aktualisieren; projektspezifische Regeln gehören hierher und in config.yaml.
