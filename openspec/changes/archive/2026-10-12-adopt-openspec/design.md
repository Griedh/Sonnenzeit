## Context

Das Repository enthält eine Expo-App, ein reines Astronomie-Modul, vier Vitest-Tests
und eine GitLab-Pipeline. Es existieren weder Specs noch Agent-Vorgaben oder ein
Lockfile. Die Migration dokumentiert den Bestand und ändert den Entwicklungsprozess.

## Goals / Non-Goals

Ziel: lokale und in CI prüfbare Specs, reproduzierbare CLI-Installation und ein
vollständig nachvollziehbarer erster Change. Keine neuen Produktfunktionen.

## Decisions

- OpenSpec 1.14.1 lokal und exakt pinnen. npm-Scripts verwenden die lokale CLI;
  eine globale Installation ist nicht nötig. Node >=20.19 ist Voraussetzung.
- Offizielles `spec-driven`-Schema und mit init erzeugte Codex-Skills verwenden.
  Projektregeln separat in config.yaml und AGENTS.md pflegen.
- Produkt-Specs nach beobachtbarem Verhalten gliedern; technische Zuordnung,
  Prüfabdeckung und Grenzen in openspec/README.md dokumentieren.
- Die Migration als ADDED-Delta erfassen und mit dem offiziellen Archive-Kommando
  synchronisieren. Keine erfundenen offenen Feature-Changes anlegen.
- npm run check bündelt strukturelle Spec-Validierung, Archiv-Task-Prüfung,
  vorhandene Tests und Typprüfung. GitLab verwendet npm ci und das Lockfile.

## Risks / Trade-offs

Strukturvalidierung beweist keine Übereinstimmung zwischen Specs und Code.
UI-Szenarien sind derzeit manuell prüfbar; diese Migration ergänzt keine UI-Tests.
Gerätezeitzone für Heute, UTC-Datum für Jahreszeitenmarker, inaktive Standortwahl
und fehlende Polartag-Behandlung werden als Grenzen dokumentiert.
Der Dependency-Audit meldet transitive Risiken; Updates mit Verhaltensänderungen
brauchen einen separaten Change.

## Migration Plan

CLI installieren und Codex initialisieren; Artefakte und Basis-Deltas erstellen;
Scripts, CI und Anleitung ergänzen; prüfen; Tasks abschließen; archivieren;
Basis-Specs und Archiv erneut prüfen. Rücknahme erfolgt über einen Git-Revert
dieser zusammengehörenden Dateien; die App-Quellen bleiben unverändert.

## Validation

`npm run check`, `npm run spec:list`, `npm run spec:changes` und
`npm run spec -- status --change adopt-openspec` vor der Archivierung.
Kein Android-Build und keine UI-Prüfung nötig, da Runtime und Expo-Konfiguration
unverändert bleiben. Die GitLab-Pipeline wird lokal nur inhaltlich geprüft.
