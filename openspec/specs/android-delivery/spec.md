# android-delivery Specification

## Purpose
Die geprüfte Bereitstellung einer installierbaren Android-Test-APK durch
die GitLab-Pipeline beschreiben.

## Requirements

### Requirement: Verification before APK build
Die GitLab-Pipeline SHALL vor dem APK-Build die OpenSpec-Struktur, abgeschlossene
Archiv-Tasks, automatisierten Tests und TypeScript-Typen prüfen.
Ein fehlgeschlagener Prüfschritt MUST den nachgelagerten APK-Build verhindern.
Abhängigkeiten SHALL aus dem versionierten npm-Lockfile installiert werden.

#### Scenario: Fehlgeschlagene Prüfung
- WHEN Spec-Validierung, Archiv-Prüfung, Test oder Typprüfung fehlschlägt
- THEN schlägt der verify-Job fehl und build-apk läuft nicht

### Requirement: Installable Android test artifact
Nach erfolgreicher Prüfung SHALL die Pipeline aus der Expo-Konfiguration ein
Android-Projekt erzeugen und eine installierbare Release-APK für `de.sonnenzeit.app`
bereitstellen. Die APK SHALL als Sonnenzeit APK mit 30 Tagen Aufbewahrung erscheinen.
Die derzeitige APK SHALL den generierten Debug-Schlüssel für Testinstallationen verwenden.

#### Scenario: Erfolgreicher Build
- WHEN verify erfolgreich ist und der Android-Build gelingt
- THEN ist android/app/build/outputs/apk/release/app-release.apk als Job-Artefakt verfügbar
- AND ist das Artefakt für Testinstallationen mit dem Debug-Schlüssel signiert
