# season-events Specification

## Purpose
Die geschätzten astronomischen Jahreszeitenereignisse und ihre Einordnung
als deutschsprachige Marker im Jahreskalender beschreiben.

## Requirements

### Requirement: Local astronomical season estimates
Die Jahreszeitenberechnung SHALL für das gewählte Jahr lokal vier geschätzte
Ereigniszeitpunkte in der Reihenfolge Frühling, Sommer, Herbst und Winter liefern.
Frühling und Herbst SHALL als `equinox`, Sommer und Winter als `solstice`
klassifiziert werden. Die Ergebnisse dienen als Kalendermarker.

#### Scenario: Ereignisse 2026
- WHEN die Jahreszeiten für 2026 berechnet werden
- THEN liegen ihre UTC-Monate in März, Juni, September und Dezember
- AND sind die Bezeichnungen Frühling, Sommer, Herbst und Winter
- AND ist die Klassifikation equinox, solstice, equinox und solstice

### Requirement: Season markers in calendar
Der Kalender SHALL Jahreszeitenereignisse unmittelbar vor dem Tages-Eintrag
anzeigen, dessen UTC-Monat und UTC-Tag dem berechneten Ereignis entsprechen.
Die Beschriftungen SHALL Frühling-Tagundnachtgleiche, Sommersonnenwende,
Herbst-Tagundnachtgleiche und Wintersonnenwende lauten.

#### Scenario: Frühjahrseintrag
- WHEN das gewählte Jahr angezeigt wird
- THEN steht Frühling-Tagundnachtgleiche vor dem Eintrag des UTC-Ereignistages im März

#### Scenario: Sonnenwenden
- WHEN die Monate Juni und Dezember angezeigt werden
- THEN stehen Sommersonnenwende und Wintersonnenwende jeweils vor ihrem UTC-Ereignistag
