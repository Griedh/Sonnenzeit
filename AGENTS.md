# Repository instructions

Maintain documentation, specs and code comments in English. Keep the app UI German.

Read `openspec/config.yaml`, relevant `openspec/specs/` and active changes first.
Follow [CONTRIBUTING.md](CONTRIBUTING.md) for skill selection and commit structure.
Keep commits focused, include matching specs/tests/docs, and stage only relevant files.
Commit or push only when requested; an apply request authorizes implementation and verification.

- Start behavioral changes with `npm run spec:new -- <name>`.
- Write proposal, delta specs, tasks and design where needed before implementation.
- Keep capability names and all retained scenarios in MODIFIED requirements.
- Update artifacts as you learn; check off only completed tasks.
- Run `npm run check`; verify affected UI scenarios and record results.
- Archive completed changes with `npm run spec:archive -- <name>`, then check again.
- Planning-only requests stop at artifacts. Implement only within authorized scope.
- Typo/formatting edits need no change. Tooling may use justified `skip_specs: true`.

Keep calculations offline. Distinguish UTC calendar dates from Berlin display times.
Do not claim unsupported features or accuracy. See [limits](openspec/README.md).
Refresh generated skills with `npm run spec:update`; keep project rules here and in config.
