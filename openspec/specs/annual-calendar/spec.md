# annual-calendar Specification

## Purpose
German annual calendar, navigation and solar time display for Erftstadt.

## Requirements

### Requirement: German annual overview
The app SHALL show a scrollable chronological calendar with twelve sections JAN
through DEZ. Rows SHALL show day number, German weekday abbreviation, sunrise,
sunset and duration under DATUM, AUFGANG, UNTERGANG and DAUER.

#### Scenario: Annual view
- WHEN the app opens
- THEN Licht im Jahreslauf shows every selected-year date grouped by month

### Requirement: Year navigation
The app SHALL initially select the device's current year. Vorheriges Jahr and
Nächstes Jahr SHALL change it by one and recalculate dates and seasons.

#### Scenario: Forward and back
- WHEN Nächstes Jahr is pressed in 2026
- THEN 2027 is displayed
- WHEN Vorheriges Jahr is then pressed
- THEN 2026 is displayed again

### Requirement: Berlin solar time display
The calendar SHALL display solar times in the Europe/Berlin time zone,
including daylight saving time.

#### Scenario: Summer time
- WHEN 04:00 UTC on June 21, 2026 is displayed
- THEN the result is `06:00`

#### Scenario: Winter time
- WHEN 07:00 UTC on December 21, 2026 is displayed
- THEN the result is `08:00`

### Requirement: German solar time format
The calendar SHALL show solar times using the German 24-hour clock with two-digit
hours and minutes.

#### Scenario: Hour-and-minute format
- WHEN a solar time is shown in the calendar
- THEN its displayed format is `HH:mm`

### Requirement: Current day highlight
On render, the app SHALL highlight the date matching the device's current date.

#### Scenario: Current year
- WHEN the device's current year is displayed
- THEN today's row is dark green with light text

#### Scenario: Other year
- WHEN another year is displayed
- THEN no row is highlighted as today

### Requirement: Fixed location and presentation
The app SHALL show Erftstadt and coordinates labeled 50.81° N, 6.77° O, use a light theme
and centered content at most 560 layout units wide. The location control SHALL
leave the location unchanged.

#### Scenario: Location control
- WHEN the location button is pressed
- THEN Erftstadt and its footer coordinates remain unchanged
