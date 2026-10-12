## ADDED Requirements

### Requirement: Versioned spec-first changes
The repository SHALL version specs, context and changes with code. Behavioral
changes SHALL have a proposal, delta specs and verifiable tasks before implementation;
technical decisions SHALL have a design where needed.

#### Scenario: New feature
- WHEN a feature is implemented
- THEN a change describes requirements and scenarios before code edits
- AND artifacts and tasks stay current during implementation

#### Scenario: Typo fix
- WHEN only a typo is corrected without changing behavior
- THEN no change is required

### Requirement: Local reproducible tooling
OpenSpec SHALL be an exactly pinned development dependency accessible through
npm scripts. Official Codex skills SHALL be versioned. A global CLI MUST be unnecessary.

#### Scenario: Fresh checkout
- WHEN npm ci runs with Node >=20.19
- THEN npm run spec -- --version reports the pinned version
- AND .agents/skills/ contains the workflows

### Requirement: Combined verification
npm run check SHALL run strict spec validation, archived-task validation, tests
and type checking, failing on any error. Documentation SHALL distinguish structural
validation from behavioral verification.

#### Scenario: Local checks
- WHEN npm run check runs
- THEN all four checks execute and success requires every check to pass

### Requirement: Completed change archival
Completed, verified changes SHALL sync into baseline specs and be archived with
their proposal, design, deltas and completed tasks.

#### Scenario: Archive change
- WHEN a completed change is archived
- THEN baseline specs contain its requirements
- AND its artifacts remain in the dated openspec/changes/archive/ directory
