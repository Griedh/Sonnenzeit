# Tasks

## 1. Build and preview

- [ ] 1.1 Add checked build and production preview scripts; set Expo web output to single and verify npm run build produces dist/index.html, JavaScript and fonts.
- [ ] 1.2 Verify a failed check blocks export using an isolated fixture or temporary invalid spec, restoring it afterward; record the nonzero exit and unchanged output.
- [ ] 1.3 Document build/preview commands in README.md and update OpenSpec context; verify the documented commands work locally.

## 2. Vercel configuration

- [ ] 2.1 Add vercel.json with locked install, checked build and dist output; validate its JSON and confirm commands match package.json.
- [ ] 2.2 Ignore .vercel/ and document Vercel import settings and a supported Node major; verify dist/ and .vercel/ are ignored with git check-ignore.
- [ ] 2.3 Serve the export with npm run preview; verify root HTML and emitted JavaScript/font URLs return the correct content and record results.

## 3. Integration verification

- [ ] 3.1 Run npm ci and npm run build from a clean working installation; record successful specs, archived tasks, tests, types and web export.
- [ ] 3.2 Verify the production bundle at 390px and 1280px: readable German calendar, working icons, year navigation and seasonal markers without runtime errors; record browser results.
- [ ] 3.3 Disable network after initial load and verify year navigation still works; document that offline reloads are outside scope.
- [ ] 3.4 Confirm Android entry point, dependencies and APK configuration remain intact; review the diff and record any validation limits.

## Workflow follow-up

- Archive after implementation and local verification, then run npm run check.
- When deployment is requested, link the Vercel project, deploy and smoke-test the hosted root and assets.
