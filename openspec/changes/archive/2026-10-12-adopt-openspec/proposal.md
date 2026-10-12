## Why

Sonnenzeit hat ausführbaren Code und wenige Tests, aber keinen gemeinsamen
Verhaltensvertrag. Änderungen sollen künftig von nachvollziehbaren Anforderungen
und Szenarien ausgehen und mit Code und Prüfung zusammen versioniert werden.

## What Changes

- OpenSpec als gepinnte Entwicklungsabhängigkeit und Codex-Skills einführen.
- Den bestehenden Funktionsumfang in vier Produkt-/Delivery-Capabilities erfassen.
- Den Spec-Workflow als weitere Capability, Agent-Vorgabe und Anleitung festhalten.
- Lokale Prüfkommandos, Lockfile und GitLab-Spec-Validierung ergänzen.
- Diese Migration nach erfolgreicher Prüfung archivieren und die Basis-Specs erzeugen.

Ausgeschlossen sind Änderungen an App-Verhalten, Layout, Astronomie-Algorithmen,
Standortwahl, Zeitzonenlogik und Release-Signierung.

## Capabilities

### New Capabilities
- `solar-calculations`: Lokale Sonnenberechnung, Jahresdaten, Dauer und Tagesvergleich.
- `season-events`: Vier lokale astronomische Jahreszeitenmarker.
- `annual-calendar`: Deutsche Jahresübersicht, Navigation, Heute-Markierung und Standortanzeige.
- `android-delivery`: Prüfungen und installierbare Test-APK aus GitLab.
- `spec-driven-development`: Versionierter OpenSpec-Workflow und Prüfkommandos.

### Modified Capabilities

Keine vorhandenen Specs; Produkt-Capabilities dokumentieren den gelesenen Bestand.

## Impact

Betroffen sind package.json, das neue package-lock.json, .gitlab-ci.yml,
README.md, AGENTS.md, .agents/skills/ und openspec/.
Die Runtime-Quellen App.tsx und src/ bleiben unverändert.
