# solar-calculations Specification

## Purpose
Local solar times, annual data and daylight comparison for Erftstadt.

## Requirements

### Requirement: Offline solar calculation
For a valid UTC date, the calculation SHALL return sunrise time, sunset time,
and daylight duration for Erftstadt (50.81 N, 6.77 E).

#### Scenario: Summer in Erftstadt
- WHEN June 21, 2026 is calculated for Erftstadt
- THEN daylight is between 970 and 1000 minutes and sunrise precedes sunset

#### Scenario: Input time independence
- WHEN different times on the same UTC date are calculated
- THEN solar times and duration match and the result date is UTC midnight

### Requirement: Solar calculation without network access
The calculation SHALL produce the solar results without network access or API keys.

#### Scenario: Offline calculation
- WHEN June 21, 2026 is calculated for Erftstadt without network access
- THEN sunrise, sunset, and daylight duration are returned without an API key

### Requirement: Complete annual data
The annual result SHALL contain each UTC date of the selected year exactly once,
in chronological order.

#### Scenario: Ordinary year
- WHEN 2026 is calculated for Erftstadt
- THEN it contains 365 dates from January 1 through December 31

#### Scenario: Leap year
- WHEN 2028 is calculated for Erftstadt
- THEN it contains 366 dates including February 29

### Requirement: Closest daylight to twelve hours
The comparison SHALL return the first day with the smallest absolute difference
from 720 daylight minutes.

#### Scenario: Annual comparison
- WHEN Erftstadt's 2028 dates are compared
- THEN the closest day differs from 720 minutes by less than two minutes

#### Scenario: Tie
- WHEN two days share the minimum difference
- THEN the first is returned

### Requirement: Empty daylight comparison input
The comparison SHALL reject an empty input list.

#### Scenario: Empty input
- WHEN an empty list is compared
- THEN it throws "Mindestens ein Tag wird benötigt."

### Requirement: Daylight duration formatting
Formatting SHALL round nonnegative finite minutes to the nearest minute and
display hours with a two-digit minute component.

#### Scenario: Duration
- WHEN 736 minutes are formatted
- THEN the result is `12:16`

#### Scenario: Hour rollover
- WHEN 59.6 minutes are formatted
- THEN the result is `1:00`
