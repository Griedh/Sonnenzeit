## Context

An Expo app, astronomy module, four tests and GitLab APK pipeline lacked specs,
agent guidance and a lockfile.

## Goals / Non-Goals

Introduce reproducible spec tooling and traceable requirements without changing the app.

## Decisions

- Pin local OpenSpec 1.14.1; use the official spec-driven schema and Codex skills.
- Keep project rules in AGENTS.md and config.yaml.
- Organize specs by observable capability and archive the initial ADDED deltas.
- Use npm ci in GitLab; npm run check combines specs, archived tasks, tests and types.
- Record coverage and product limits in openspec/README.md.

## Risks / Trade-offs

Structural validation does not prove behavior. UI coverage remains manual.
Device/UTC timezone differences, inactive location selection and unsupported polar
conditions remain documented limits. Dependency vulnerabilities require separate review.

## Migration Plan

Initialize, document, integrate checks, verify, then archive and validate baselines.
Revert the migration files to undo; runtime sources are unchanged.

## Validation

npm ci, npm run check, spec lists, change status and git diff --check.
No UI or APK execution: runtime and Expo configuration are unchanged.
GitLab configuration was reviewed locally; actual execution requires a push.
