## ADDED Requirements

### Requirement: Versioned spec-first changes
Das Repository SHALL Basis-Specs, Projektkontext und Changes zusammen mit dem
Code versionieren. Verhaltensänderungen SHALL vor ihrer Implementierung als
Proposal, Delta-Specs und überprüfbare Tasks beschrieben werden; technische
Entscheidungen SHALL bei Bedarf im Design festgehalten werden.

#### Scenario: Neue Funktion
- WHEN eine neue Funktion umgesetzt wird
- THEN beschreibt ein Change vor den Codeänderungen ihre Anforderungen und Szenarien
- AND werden Tasks und Artefakte während der Umsetzung gepflegt

#### Scenario: Reine Textkorrektur
- WHEN ausschließlich ein Tippfehler ohne Verhaltensänderung korrigiert wird
- THEN ist kein eigener Change erforderlich

### Requirement: Local reproducible tooling
OpenSpec SHALL als exakt versionierte Entwicklungsabhängigkeit über npm-Scripts
verfügbar sein. Das Repository SHALL die offiziellen Codex-Skills bereitstellen.
Eine globale CLI-Installation MUST für den dokumentierten Workflow entbehrlich sein.

#### Scenario: Neue Arbeitskopie
- WHEN mit Node >=20.19 die Abhängigkeiten per npm ci installiert werden
- THEN kann npm run spec -- --version die gepinnte CLI-Version ausgeben
- AND stehen die versionierten Skills unter .agents/skills/ zur Verfügung

### Requirement: Combined verification
`npm run check` SHALL strikte OpenSpec-Validierung, Archiv-Task-Prüfung,
automatisierte Tests und Typprüfung ausführen und bei einem Fehler fehlschlagen.
Die Dokumentation SHALL strukturelle Prüfung von tatsächlicher Verhaltensprüfung unterscheiden.

#### Scenario: Lokale Abschlussprüfung
- WHEN npm run check ausgeführt wird
- THEN werden Specs und Changes, archivierte Tasks, Tests und Typen geprüft
- AND ist der Exit-Code nur bei erfolgreicher Gesamtprüfung null

### Requirement: Completed change archival
Fertig umgesetzte und geprüfte Changes SHALL mit synchronisierten Basis-Specs
archiviert werden. Die Archivierung SHALL Proposal, Design, Delta-Specs und
abgeschlossene Tasks als nachvollziehbare Historie erhalten.

#### Scenario: Change abschließen
- WHEN ein vollständig umgesetzter Change archiviert wird
- THEN enthalten die Basis-Specs seine neuen Anforderungen
- AND liegt der Change im datierten Archiv unter openspec/changes/archive/
