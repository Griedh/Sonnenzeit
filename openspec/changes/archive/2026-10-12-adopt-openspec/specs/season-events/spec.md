## ADDED Requirements

### Requirement: Local astronomical season estimates
The calculation SHALL locally return four estimated events in spring, summer,
autumn and winter order, classified as equinox, solstice, equinox and solstice.

#### Scenario: 2026 events
- WHEN 2026 seasons are calculated
- THEN UTC months are March, June, September and December
- AND names are Frühling, Sommer, Herbst and Winter with the specified classifications

### Requirement: Season markers in calendar
The calendar SHALL place each marker immediately before its UTC event date,
using Frühling-Tagundnachtgleiche, Sommersonnenwende, Herbst-Tagundnachtgleiche
and Wintersonnenwende.

#### Scenario: Spring marker
- WHEN the selected year's March dates are displayed
- THEN Frühling-Tagundnachtgleiche precedes the UTC event date

#### Scenario: Solstice markers
- WHEN June and December are displayed
- THEN Sommersonnenwende and Wintersonnenwende precede their UTC event dates
