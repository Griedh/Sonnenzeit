# Contributing

Write repository docs, specs, comments and commit messages in English. Keep the app UI German.
OpenSpec describes requirements; developers or agents implement them. Skills do not build,
commit, push or deploy automatically.

## Start a change

```sh
npm ci
git status --short
git switch -c codex/<change-name>
npm run spec:list
npm run spec:changes
```

Use a short kebab-case name, such as `add-location-selection`. Read [AGENTS.md](AGENTS.md),
[project context](openspec/config.yaml) and relevant specs before editing.
Check existing work before creating another change or staging files.

## Choose a skill

In Codex, select a skill or invoke it with `$<skill-name>` in chat. These are agent
instructions, not shell commands. Include the change name when one already exists.

| Skill | Use | Example prompt |
| --- | --- | --- |
| `openspec-explore` | Investigate an idea before committing to a plan | `$openspec-explore How should location selection work offline?` |
| `openspec-propose` | Create proposal, delta specs, design where needed and tasks | `$openspec-propose Plan offline location selection as add-location-selection.` |
| `openspec-update-change` | Revise an existing plan without editing code | `$openspec-update-change add-location-selection: use saved coordinates instead of GPS.` |
| `openspec-apply-change` | Implement or resume the named change's tasks | `$openspec-apply-change add-location-selection` |
| `openspec-sync-specs` | Merge implemented deltas into baseline specs while keeping the change active | `$openspec-sync-specs add-location-selection` |
| `openspec-archive-change` | Sync and archive a completed, verified change | `$openspec-archive-change add-location-selection` |

After a proposal, review the artifacts and explicitly request implementation, for
example: `Apply add-location-selection`. Propose and update are planning workflows.
To resume interrupted implementation, invoke apply with the same name; do not create
a replacement change. Sync is optional because normal archival also synchronizes specs.

Skills are versioned in [.agents/skills](.agents/skills). Reload Codex after setup.
`npm run spec:update` refreshes generated skills; it does not revise a change's plan.
Keep repository-specific instructions in AGENTS.md and openspec/config.yaml.

## Apply and verify

1. Review scope, requirements/scenarios, design decisions and tasks before code edits.
2. Validate planning artifacts with `npm run spec:validate`.
3. Implement the tasks with relevant tests and docs. Check off only completed work.
4. If scope changes, update the plan first and keep all artifacts consistent.
   Describe blockers and leave unfinished tasks open.
5. Run `npm run check`. For web changes, run `npm run build` and `npm run preview`,
   then verify affected scenarios against the production bundle.
6. Record actual results and limitations in the change, e.g. `verification.md`.
   Structural spec validation alone does not prove behavior.
7. Archive only completed, verified work. Check that deltas reached the baseline
   specs, then run `npm run check` again.

Manual CLI alternative:

```sh
npm run spec:new -- <name>
npm run spec -- instructions proposal --change <name>
# Repeat instructions for specs, design and tasks; write artifacts before code.
npm run spec -- status --change <name>
npm run spec:validate
# Implement and verify the tasks.
npm run spec:archive -- <name>
npm run check
```

Completed planning status means artifacts exist, not that implementation is finished.
Check task progress with `npm run spec:changes`.
Pure typo/formatting fixes need no change; tooling-only changes may use justified
`skip_specs: true`. Never skip specs for a behavioral change.

## Commit changes

Use focused English commit messages that describe the result. Recommended format:
`<type>(<change-name>): <summary>`, using `spec`, `feat`, `fix`, `refactor`, `docs` or `chore`.
Commit conventions are guidance, not currently enforced by hooks or CI.

For substantial work, keep three reviewable steps on the same branch:

1. **Plan:** `spec(add-location-selection): define offline location selection`
   — proposal, delta specs, design and unchecked tasks.
2. **Implement:** `feat(add-location-selection): select a saved location`
   — code, tests, docs, updated artifacts/tasks and verification evidence together.
3. **Close:** `chore(add-location-selection): archive verified change`
   — archive move and synchronized baseline specs together.

Small changes may use one complete commit containing the verified implementation,
specs and archive. Intermediate work may leave tasks open; do not present it as complete.

Before committing:

```sh
git status --short
git diff
# Stage only files belonging to this change, including archive moves.
git add <specific-paths>
git diff --cached
git diff --cached --check
git commit -m "feat(<change-name>): <summary>"
```

Include package-lock.json when dependencies change. Never commit dist/, node_modules/,
.expo/, .vercel/, secrets or unrelated work. Keep archive deletions and additions
together so Git can recognize the move.

Before merge, ensure checks pass, tasks are complete and baseline specs match the code.
The review description should name the change and summarize behavior and validation.
Push and deployment are separate actions: a linked Vercel project may deploy on push,
and GitLab runs its APK pipeline. Check the destination and branch before publishing.
