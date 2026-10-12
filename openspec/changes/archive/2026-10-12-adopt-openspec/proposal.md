## Why

Establish a versioned behavior contract and spec-first workflow for Sonnenzeit.

## What Changes

- Pin OpenSpec, generate Codex skills and add a lockfile.
- Document existing behavior in five capabilities.
- Add project guidance, npm checks and GitLab spec validation.
- Archive this migration and generate baseline specs.

No changes to runtime behavior, layout, calculations, location selection or signing.

## Capabilities

### New Capabilities
- `solar-calculations`: Solar times, annual data and daylight comparison.
- `season-events`: Estimated seasons and calendar markers.
- `annual-calendar`: German calendar, navigation, today and fixed location.
- `android-delivery`: Verified GitLab test APK.
- `spec-driven-development`: OpenSpec workflow and checks.

### Modified Capabilities
None; product specs describe the existing source.

## Impact

package.json, package-lock.json, .gitlab-ci.yml, README.md, AGENTS.md,
.agents/skills/ and openspec/. Runtime sources remain unchanged.
