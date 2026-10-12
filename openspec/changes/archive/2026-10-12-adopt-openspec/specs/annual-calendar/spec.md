## ADDED Requirements

### Requirement: German annual overview
Die App SHALL eine deutschsprachige, scrollbar angeordnete Jahresübersicht mit
zwölf Monatsabschnitten von JAN bis DEZ anzeigen. Jeder Tag SHALL Tagesnummer,
deutschen Wochentagskurznamen, Sonnenaufgang, Sonnenuntergang und Tageslänge zeigen.
Die Spalten SHALL DATUM, AUFGANG, UNTERGANG und DAUER heißen.

#### Scenario: Jahresansicht
- WHEN die App geöffnet wird
- THEN erscheint Licht im Jahreslauf mit allen Tagen des ausgewählten Jahres
- AND sind die Tage chronologisch nach Monaten gruppiert

### Requirement: Year navigation
Die App SHALL beim Start das aktuelle Jahr der Gerätezeitzone auswählen.
Die Bedienelemente Vorheriges Jahr und Nächstes Jahr SHALL das Jahr um genau
eins vermindern beziehungsweise erhöhen und Kalender und Jahreszeiten neu berechnen.

#### Scenario: Vorwärts und zurück
- WHEN im Jahr 2026 Nächstes Jahr betätigt wird
- THEN erscheint das Jahr 2027
- WHEN danach Vorheriges Jahr betätigt wird
- THEN erscheint erneut das Jahr 2026

### Requirement: Berlin solar time display
Sonnenaufgang und Sonnenuntergang SHALL im deutschen Stunden-/Minutenformat
der Zeitzone Europe/Berlin einschließlich ihrer Sommerzeit angezeigt werden.

#### Scenario: Berliner Sommerzeit
- WHEN eine Sonnenzeit am 21. Juni 2026 um 04:00 UTC angezeigt wird
- THEN lautet die Anzeige `06:00`

#### Scenario: Berliner Winterzeit
- WHEN eine Sonnenzeit am 21. Dezember 2026 um 07:00 UTC angezeigt wird
- THEN lautet die Anzeige `08:00`

### Requirement: Current day highlight
Die App SHALL bei einem Rendern den Tag hervorheben, dessen Jahres-, Monats-
und Tagesnummer dem aktuellen Datum der Gerätezeitzone entspricht.

#### Scenario: Aktuelles Jahr
- WHEN das Jahr des aktuellen Gerätedatums angezeigt wird
- THEN ist dessen Tageszeile dunkelgrün mit heller Schrift hervorgehoben

#### Scenario: Anderes Jahr
- WHEN ein anderes Jahr als das aktuelle Gerätejahr angezeigt wird
- THEN ist keine Tageszeile als heute hervorgehoben

### Requirement: Fixed location and presentation
Die App SHALL Erftstadt als Standort und die Berechnungskoordinaten
50.81° N und 6.77° O anzeigen. Die Ansicht SHALL ein helles Farbschema und
eine zentrierte Inhaltsbreite von höchstens 560 Layout-Einheiten verwenden.
Die Standortanzeige SHALL im aktuellen Funktionsumfang keine Standortänderung auslösen.

#### Scenario: Standortanzeige
- WHEN der Standort-Button betätigt wird
- THEN bleibt der Berechnungsstandort Erftstadt
- AND zeigt der Fußbereich weiterhin die Erftstädter Koordinaten
