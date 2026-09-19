# Sonnenzeit

Eine ruhige, offline-fähige Übersicht über Sonnenaufgang, Sonnenuntergang,
Tageslänge und astronomische Jahreszeiten. Die App ist mit Expo und React Native
gebaut und berechnet alle Werte lokal – ohne Wetterdienst oder API-Schlüssel.

## Entwicklung

```bash
npm install
npm start
```

Mit `w` öffnet Expo die Web-Version, mit `a` eine angeschlossene
Android-Umgebung.

## Tests

```bash
npm test
npm run typecheck
```

## APK über GitLab bauen

Die Pipeline in `.gitlab-ci.yml` prüft den TypeScript-Code und die Tests,
erzeugt anschließend das native Android-Projekt und baut eine installierbare
Release-APK. Nach einem erfolgreichen Push findest du sie in GitLab beim
entsprechenden Job **build-apk** unter **Job artifacts → Sonnenzeit APK**.

Die APK wird mit dem von Expo standardmäßig erzeugten Debug-Schlüssel signiert.
Das ist für Testinstallationen geeignet. Für eine Veröffentlichung im Play Store
sollte stattdessen ein geschützter eigener Release-Schlüssel verwendet und ein
Android App Bundle (`.aab`) gebaut werden.
