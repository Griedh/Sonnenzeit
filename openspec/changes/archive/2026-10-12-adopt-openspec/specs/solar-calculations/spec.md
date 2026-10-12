## ADDED Requirements

### Requirement: Offline solar calculation
The calculation SHALL return sunrise, sunset and daylight minutes locally for a
valid UTC date at Erftstadt (50.81 N, 6.77 E), without network access or API keys.

#### Scenario: Summer in Erftstadt
- WHEN June 21, 2026 is calculated for Erftstadt
- THEN daylight is between 970 and 1000 minutes and sunrise precedes sunset

#### Scenario: Input time independence
- WHEN different times on the same UTC date are calculated
- THEN solar times and duration match and the result date is UTC midnight

### Requirement: Complete annual data
Annual data SHALL contain every UTC date once, in order, including leap days.

#### Scenario: Ordinary year
- WHEN 2026 is calculated for Erftstadt
- THEN it contains 365 dates from January 1 through December 31

#### Scenario: Leap year
- WHEN 2028 is calculated for Erftstadt
- THEN it contains 366 dates including February 29

### Requirement: Closest daylight to twelve hours
The comparison SHALL return the day nearest to 720 daylight minutes, keeping the
first on ties. It MUST reject an empty list.

#### Scenario: Annual comparison
- WHEN Erftstadt's 2028 dates are compared
- THEN the closest day differs from 720 minutes by less than two minutes

#### Scenario: Tie
- WHEN two days share the minimum difference
- THEN the first is returned

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
