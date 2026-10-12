# OpenSpec workflow

`specs/` is the behavior contract; `changes/<name>/` holds proposed deltas.
Archiving syncs deltas into specs and preserves the change under `changes/archive/`.
Write repository artifacts in English; keep product labels in German.
See [CONTRIBUTING.md](../CONTRIBUTING.md) for skill prompts, applying/resuming changes
and commit conventions.

## Workflow

1. Run `npm ci` (Node >=20.19.0).
2. Read relevant specs; list work with `npm run spec:list` and `npm run spec:changes`.
3. Use Codex's `openspec-propose`, or `npm run spec:new -- <name>`.
   Get templates with `npm run spec -- instructions <artifact> --change <name>`.
4. Write proposal, delta specs, tasks and design where needed; run `npm run spec:validate`.
5. Implement authorized work using `openspec-apply-change`; keep artifacts and tasks current.
6. Run `npm run check` and verify affected UI scenarios using `npm run web` or `npm run android`.
7. Run `npm run spec:archive -- <name>`, then `npm run check`.

Planning-only requests stop after artifacts. Typo/formatting edits need no change.
Tooling changes may use justified `skip_specs: true`.
Refresh generated skills with `npm run spec:update`; restore Codex integration with
`npm run spec:init`. Reload Codex after initial setup.

## Coverage

| Capability | Implementation | Existing checks |
| --- | --- | --- |
| solar-calculations | src/astronomy.ts | Summer duration, leap year, closest day, duration format |
| season-events | src/astronomy.ts, App.tsx | 2026 event months; UI requires manual checks |
| annual-calendar | App.tsx | Source review; UI requires manual checks |
| android-delivery | .gitlab-ci.yml, app.json | Source review; actual build runs in GitLab |
| web-delivery | package.json, app.json, vercel.json | Production export, asset requests, mobile/desktop browser and offline navigation |
| spec-driven-development | package.json, AGENTS.md, config.yaml, .agents/skills/ | CLI and npm run check |

The four tests do not cover every scenario. UTC normalization, ordering, ties,
empty input, minute rollover and UI behavior were documented from source.
OpenSpec validates structure, not behavior or test coverage.

## Current limits

- Fixed Erftstadt location; the location button is inactive.
- Initial year/today use device time; no automatic midnight refresh.
- Season markers use UTC dates and approximate event times.
- No input validation or polar-day/night handling; no broader accuracy guarantee.
- APKs use debug signing; store publication is outside the current scope.

Changes to these limits require their own requirements and validation.
