# CleverFactory Spec Language – Sonnenzeit pilot

**Status:** Trial v0.1 (2026-10-29). This is a project-specific controlled language
inspired by ASD-STE100 principles; it is **not** a claim of ASD-STE100 conformity.
EARS is used for test scenarios. OpenSpec remains the authoritative format.

The existing domain specs are intentionally **unchanged** in this first PR. The
examples below demonstrate clearer wording and identify assumptions that need
human review. Do not silently turn these drafts into product requirements.

## Working rules

1. One verifiable outcome per normative requirement. Use **SHALL** rather than
   MUST, SHOULD or ambiguous non-normative verbs.
2. Keep a clear actor and observable result. Describe **what**, not how.
3. Use the same term for the same concept. Define domain terms before use.
4. Prefer short active sentences. A 20-word target is a **pilot heuristic**, not
   a stated ASD-STE100 requirement; never shorten at the cost of precision.
5. Add WHEN/THEN scenarios and check negative, boundary and error cases.
6. Keep all OpenSpec `### Requirement:` and `#### Scenario:` headings.
7. Avoid real personal data or credentials in examples.
8. Human reviewers decide whether the meaning and tests are correct.

## Existing examples and proposed rewrites (not yet adopted)

### 1. Offline solar calculation

Current: "The calculation SHALL return sunrise, sunset and daylight minutes
locally for a valid UTC date at Erftstadt ..., without network access or API
keys."

Proposed separation:
- "The calculation SHALL return sunrise time, sunset time, and daylight
  duration for each valid UTC date at Erftstadt."
- "The calculation SHALL calculate these values without network access."

Review: Define the accepted input format and what "valid UTC date" means.
The fixed coordinates are **50.81 N, 6.77 E**. An API-key constraint is
implementation-related unless users must supply no credentials.

### 2. Complete annual data

Current: "Annual data SHALL contain every UTC date once, in order, including
leap days."

Proposed: "The annual result SHALL contain one entry for each UTC date in the
selected year, in chronological order."

Scenarios to retain:
- 2026 has 365 entries, from January 1 through December 31.
- 2028 has 366 entries, including February 29.

Review: Confirm whether an invalid year needs a specified error response.

### 3. Closest daylight to twelve hours

Current: "The comparison SHALL return the day nearest to 720 daylight minutes,
keeping the first on ties. It MUST reject an empty list."

Proposed separation:
- "The comparison SHALL return the first day with the smallest absolute
  difference from 720 daylight minutes."
- "The comparison SHALL reject an empty input list."

Scenarios to retain: annual comparison, equal differences and empty input.
Review: Preserve the existing German error text as an external contract only
if consumers rely on it. Do not change the runtime behavior as part of this
writing-style pilot.

### 4. Berlin solar time display

Current: "Solar times SHALL use German hour/minute formatting in
Europe/Berlin, including DST."

Proposed separation:
- "The display SHALL convert each solar time to the Europe/Berlin time zone."
- "The display SHALL show each converted solar time using a 24-hour clock."

Scenarios to retain: June 21, 2026 04:00 UTC → 06:00; December 21, 2026
07:00 UTC → 08:00. Review: Specify the desired formatting, including leading
zeroes and invalid inputs, before adopting a revised requirement.

## Controlled vocabulary – initial candidates

| Term | Intended meaning | Not interchangeable with |
|---|---|---|
| UTC date | Calendar date identified in UTC, separate from the time of day | Device-local date |
| solar time | Calculated sunrise or sunset instant | Calendar date |
| daylight duration | Elapsed minutes between sunrise and sunset | Solar time |
| annual result | Sequence of entries for a selected UTC year | UI calendar rows |
| season event | One estimated equinox or solstice | Daylight duration |

These definitions are provisional and must be checked against the existing
implementation and accepted tests.

## Lint and CI

The pilot lints only the active **domain** specs
(`solar-calculations`, `season-events`, `annual-calendar`). The archived
changes and delivery/process capabilities are deliberately excluded to avoid
irrelevant findings. Rules are versioned locally in
`.github/vale/styles/CleverFactory/`:

- **VagueLanguage**: warn on vague qualitative words and phrases.
- **ModalVerbs**: warn on SHOULD, COULD and MUST in normative prose. This
  deliberately finds existing technical debt, e.g. `MUST` in solar-calculations.

`vale-cli/vale-action@v3` runs on pull requests and manually via
GitHub Actions. It reports warnings but **does not fail the build**.
No runtime source code, tests, dependencies or app features are changed.

Run locally after installing [Vale](https://vale.sh/):

```sh
vale --config=.vale.ini openspec/specs/solar-calculations/spec.md \
  openspec/specs/season-events/spec.md \
  openspec/specs/annual-calendar/spec.md
```

The independent project checks stay `npm run check` (OpenSpec,
archived tasks, Vitest and TypeScript).

## Next phase

1. Review these four proposed rewrites for semantic equivalence.
2. Record false positives and undefined vocabulary in the first PR checks.
3. Apply reviewed changes through the normal OpenSpec workflow.
4. Only then consider enforcing deterministic rules; leave semantic review
   to humans. No claim of official ASD-STE100 or PCI-DSS compliance.

References: [ASD-STE100](https://www.asd-ste100.org/),
[Vale](https://vale.sh/), [OpenSpec](https://openspec.dev/).
