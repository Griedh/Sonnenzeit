# Sonnenzeit

Eine ruhige, offline-fähige Übersicht über Sonnenaufgang, Sonnenuntergang,
Tageslänge und astronomische Jahreszeiten. Die App ist mit Expo und React Native
gebaut und berechnet alle Werte lokal – ohne Wetterdienst oder API-Schlüssel.

## Entwicklung

```bash
npm ci
npm start
```

Mit `w` öffnet Expo die Web-Version, mit `a` eine angeschlossene
Android-Umgebung.

Voraussetzung: Node.js >=20.19.0. Die Entwicklungswerkzeuge einschließlich
OpenSpec werden lokal über das Lockfile installiert.

## Spec-driven Entwicklung mit OpenSpec

Das Repository verwendet OpenSpec. Die [Workflow-Anleitung](openspec/README.md)
beschreibt den Ablauf von Anforderungen über Implementierung bis Archivierung,
die vorhandenen Specs und deren Prüfabdeckung. Agent-Vorgaben stehen in
[AGENTS.md](AGENTS.md), der Projektkontext in [openspec/config.yaml](openspec/config.yaml).

```bash
npm run spec:list
npm run spec:new -- meine-aenderung
# Proposal, Delta-Specs, Design und Tasks erstellen, dann implementieren.
npm run check
npm run spec:archive -- meine-aenderung
```

In Codex stehen die versionierten Skills `openspec-propose`,
`openspec-apply-change` und `openspec-archive-change` bereit.
Nach der erstmaligen Einrichtung Codex neu laden, damit es die Skills erkennt.

## Prüfungen

```bash
npm run check
```

## APK über GitLab bauen

Die Pipeline in `.gitlab-ci.yml` prüft Specs, Archiv-Tasks, TypeScript-Code und Tests,
erzeugt anschließend das native Android-Projekt und baut eine installierbare
Release-APK. Nach einem erfolgreichen Push findest du sie in GitLab beim
entsprechenden Job **build-apk** unter **Job artifacts → Sonnenzeit APK**.

Die APK wird mit dem von Expo standardmäßig erzeugten Debug-Schlüssel signiert.
Das ist für Testinstallationen geeignet. Für eine Veröffentlichung im Play Store
sollte stattdessen ein geschützter eigener Release-Schlüssel verwendet und ein
Android App Bundle (`.aab`) gebaut werden.
