# Verification

Local checks on October 12, 2026 (Node 24.14.0):

- `npm run build` passed specs, archive tasks, four tests and types, then exported
  index.html, JavaScript and 19 font assets to dist.
- Failure gate: a temporary invalid requirement caused exit 1 before export;
  all output hashes and timestamps were unchanged. The original spec was restored.
- Vercel configuration parses and matches the documented npm scripts.
- `git check-ignore` confirms dist/ and .vercel/ are ignored.
- `npm run preview -- --port 8081` serves the export without rebuilding.
- Chromium at 390px and 1280px loaded the German calendar and four seasonal markers.
  Next/previous year navigation passed online and with the browser network disabled.
  No page errors, failed requests or horizontal page overflow were observed.
- JavaScript returned HTTP 200 with application/javascript; the icon font returned
  HTTP 200 with font/ttf and loaded successfully.
- Screenshots at both widths were inspected; title, controls and table columns
  remain readable without overlap.
- A fresh `npm ci --include=dev --prefer-offline --no-audit` and subsequent
  `npm run build` both passed with the committed lockfile and final configuration.
- Diff review confirms the runtime sources, dependency versions, Android entry
  point/configuration and GitLab APK pipeline are unchanged. No APK was built locally.

Offline reloads and actual Vercel hosting have not been tested or implemented.

Archived with all 10 tasks complete; five web-delivery requirements synchronized.
Post-archive npm run check passed all six specs, both archives, four tests and types.
