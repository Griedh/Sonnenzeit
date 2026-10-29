# CleverFactory Spec Language – Sonnenzeit pilot

**Status:** Trial v0.1 (2026-10-29). This is a project-specific controlled language
inspired by ASD-STE100 principles; it is **not** a claim of ASD-STE100 conformity.
EARS is used for test scenarios. OpenSpec remains the authoritative format.

This draft PR now contains an editorial rewrite of four existing requirements.
It retains all pre-existing scenarios, adds scenarios for split requirements and
does not change runtime code. The examples below compare `main` with this PR.
All rewrites remain subject to human semantic review before merging.

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

## Before and after: four requirements rewritten on this branch

### 1. Offline solar calculation

Current: "The calculation SHALL return sunrise, sunset and daylight minutes
locally for a valid UTC date at Erftstadt ..., without network access or API
keys."

Rewritten as two requirements:
- "For a valid UTC date, the calculation SHALL return sunrise time, sunset
  time, and daylight duration for Erftstadt (50.81 N, 6.77 E)."
- "The calculation SHALL produce the solar results without network access or
  API keys."

The existing summer and UTC-time-independence scenarios are retained. A new
offline scenario makes the existing no-network/no-API-key expectation visible.

Review: Define "valid UTC date" and the supported date range. The API-key
constraint is preserved intentionally; confirm whether this belongs in the
domain contract or a system-level security/operational requirement.

### 2. Complete annual data

Current: "Annual data SHALL contain every UTC date once, in order, including
leap days."

Rewritten: "The annual result SHALL contain each UTC date of the selected
year exactly once, in chronological order."

Scenarios to retain:
- 2026 has 365 entries, from January 1 through December 31.
- 2028 has 366 entries, including February 29.

Review: Confirm whether an invalid year needs a specified error response.

### 3. Closest daylight to twelve hours

Current: "The comparison SHALL return the day nearest to 720 daylight minutes,
keeping the first on ties. It MUST reject an empty list."

Rewritten as two requirements:
- "The comparison SHALL return the first day with the smallest absolute
  difference from 720 daylight minutes."
- "The comparison SHALL reject an empty input list."

The annual-comparison and tie scenarios stay under the original requirement.
The empty-input scenario moves to the new requirement, preserving the original
German error text. This is an editorial split, **not** an error-handling change.

Review: Confirm whether the error message is a supported external contract,
or simply documents the current implementation.

### 4. Berlin solar time display

Current: "Solar times SHALL use German hour/minute formatting in
Europe/Berlin, including DST."

Rewritten as two requirements:
- "The calendar SHALL display solar times in the Europe/Berlin time zone,
  including daylight saving time."
- "The calendar SHALL show solar times using the German 24-hour clock with
  two-digit hours and minutes."

The summer/winter scenarios are retained; the new time-format scenario
expresses `HH:mm`. `App.tsx` currently uses `Intl.DateTimeFormat("de-DE",
{ timeZone: "Europe/Berlin", hour: "2-digit", minute: "2-digit" })`.

Review: Confirm the `HH:mm` presentation on all supported runtimes, especially
around midnight and daylight-saving transitions. No application change is
included to enforce any additional guarantee.

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
The existing scenario texts are preserved when requirements are split.

Run locally after installing [Vale](https://vale.sh/):

```sh
vale --config=.vale.ini openspec/specs/solar-calculations/spec.md \
  openspec/specs/season-events/spec.md \
  openspec/specs/annual-calendar/spec.md
```

The workflow also runs `npm run check` (OpenSpec, archived tasks, Vitest
and TypeScript) in a separate job to verify that the editorial rewrites
do not break the existing project checks.

## Next phase

1. Review the four rewritten requirements and their split-out subrequirements
   for semantic equivalence, including the added offline and format scenarios.
2. Record false positives and undefined vocabulary in the Vale check.
3. Keep the PR as a draft until reviewers confirm that no implementation
   guarantees or business behavior were added unintentionally.
4. Only then consider enforcing deterministic rules; leave semantic review
   to humans. No claim of official ASD-STE100 or PCI-DSS compliance.

References: [ASD-STE100](https://www.asd-ste100.org/),
[Vale](https://vale.sh/), [OpenSpec](https://openspec.dev/).
