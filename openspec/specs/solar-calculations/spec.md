# solar-calculations Specification

## Purpose
Lokale Sonnenzeiten und Tageslängen für Erftstadt sowie vollständige Jahresdaten,
Dauerformatierung und Vergleich mit zwölf Stunden Tageslicht beschreiben.

## Requirements

### Requirement: Offline solar calculation
Die Sonnenberechnung SHALL für einen gültigen UTC-Kalendertag und die Koordinaten
Erftstadts (50.81 N, 6.77 O) lokal Sonnenaufgang, Sonnenuntergang und Tageslänge
in Minuten liefern, ohne Netzwerkzugriff oder API-Schlüssel.

#### Scenario: Sommer in Erftstadt
- WHEN der 21. Juni 2026 für Erftstadt berechnet wird
- THEN liegt die Tageslänge zwischen 970 und 1000 Minuten
- AND liegt der Sonnenaufgang zeitlich vor dem Sonnenuntergang

#### Scenario: Uhrzeitunabhängiger Kalendertag
- WHEN derselbe UTC-Kalendertag mit unterschiedlichen Eingabeuhrzeiten berechnet wird
- THEN sind Sonnenzeiten und Tageslänge identisch
- AND ist das Datum des Ergebnisses auf UTC-Mitternacht normalisiert

### Requirement: Complete annual data
Die Jahresberechnung SHALL jeden UTC-Kalendertag des gewählten Jahres genau
einmal in aufsteigender Reihenfolge enthalten und Schaltjahre berücksichtigen.

#### Scenario: Normales Jahr
- WHEN das Jahr 2026 für Erftstadt berechnet wird
- THEN umfasst das Ergebnis 365 Tage vom 1. Januar bis zum 31. Dezember

#### Scenario: Schaltjahr
- WHEN das Jahr 2028 für Erftstadt berechnet wird
- THEN umfasst das Ergebnis 366 Tage einschließlich des 29. Februar

### Requirement: Closest daylight to twelve hours
Der Tagesvergleich SHALL aus einer nichtleeren Tagesliste den Tag mit der
kleinsten absoluten Abweichung von 720 Minuten Tageslänge liefern.
Bei gleicher Abweichung SHALL der zuerst enthaltene Tag erhalten bleiben.
Eine leere Liste MUST mit einer Fehlermeldung zurückgewiesen werden.

#### Scenario: Tagesvergleich im Schaltjahr
- WHEN die Tage des Jahres 2028 für Erftstadt verglichen werden
- THEN weicht der gefundene Tag um weniger als zwei Minuten von 720 Minuten ab

#### Scenario: Gleichstand
- WHEN zwei Tage die gleiche minimale Abweichung haben
- THEN wird der zuerst enthaltene Tag zurückgegeben

#### Scenario: Leere Liste
- WHEN eine leere Tagesliste verglichen wird
- THEN entsteht der Fehler „Mindestens ein Tag wird benötigt.“

### Requirement: Daylight duration formatting
Die Dauerformatierung SHALL nichtnegative endliche Minuten auf die nächste
ganze Minute runden und als Stunden mit zweistelliger Minutenkomponente ausgeben.

#### Scenario: Stunden und Minuten
- WHEN 736 Minuten formatiert werden
- THEN lautet die Anzeige `12:16`

#### Scenario: Übertrag zur nächsten Stunde
- WHEN 59.6 Minuten formatiert werden
- THEN lautet die Anzeige `1:00`
