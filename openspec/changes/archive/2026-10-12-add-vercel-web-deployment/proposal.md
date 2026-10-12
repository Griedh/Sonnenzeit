# Proposal

## Why

The web export builds locally but has no versioned Vercel configuration or documented
production workflow. Make the existing calendar reproducibly deployable on Vercel.

## What Changes

- Add a checked production web build and a local production preview command.
- Configure Vercel to publish the exported app and serve its assets correctly.
- Verify calendar behavior in the production bundle and document deployment settings.
- Keep the German UI, local calculations and Android build intact.

Non-goals: Next.js migration, SSR, new routes, service workers, offline reloads,
new product features and publishing a live deployment during implementation.

## Capabilities

### New Capabilities
- `web-delivery`: Checked web builds, local previews and Vercel hosting compatibility.

### Modified Capabilities
None. Existing calendar, astronomy and Android requirements remain applicable.

## Impact

package.json, app.json, new vercel.json, .gitignore, README.md and OpenSpec context.
No new runtime dependencies or backend. The existing App.tsx and astronomy module
remain shared by web and Android.
