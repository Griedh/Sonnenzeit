# Design

## Context

The Expo 54 app uses App.tsx, React Native Web and local astronomy calculations.
The previous local export produced dist/index.html, JavaScript and bundled fonts.
There is no router, server, vercel.json or production build/preview npm script.
See proposal.md for scope and specs/web-delivery/spec.md for acceptance criteria.

## Goals / Non-Goals

**Goals:** Use the working shared app as a client-rendered Vercel deployment.
**Non-Goals:** A separate web application or server-rendered calendar.

## Decisions

- **Keep Expo.** Vercel can host its static bundle. Next.js would introduce a new
  runtime and integration work without a current SSR, SEO or backend requirement.
- **Make output explicit.** Keep Metro and set expo.web.output to single. This is
  a static SPA bundle, not Expo Router's static HTML rendering mode. Dates remain
  evaluated in the browser; no build-time year or hydration mismatch is introduced.
- **Build and preview.** Add `build` as `npm run check && expo export --platform web`
  and `preview` as `expo serve`. Preview serves dist rather than rebuilding it.
- **Vercel configuration.** Add vercel.json with framework null, installCommand
  `npm ci --include=dev`, buildCommand `npm run build` and outputDirectory `dist`.
  The root index is the only page, so no catch-all rewrite is needed. Preserve
  direct asset serving; add routing only alongside future route requirements.
  Use a supported Vercel Node major satisfying the dependency engines, documented
  in the README. Ignore .vercel/; dist/ is already ignored.
- **Preserve mobile delivery.** Do not change the Expo entry point, dependencies,
  Android configuration or GitLab APK job. Vercel performs its own checked web build.

## Risks / Trade-offs

- Client-rendered content is not pre-rendered for SEO → acceptable for the current
  interactive calendar; reconsider the architecture if that becomes a requirement.
- Incorrect asset configuration can produce a blank page or missing icons → inspect
  the exported app, request its script/font URLs and check browser runtime errors.
- Static hosting does not guarantee offline reloads → only verify in-memory year
  navigation after the initial load, without introducing service-worker caching.
- A local preview does not validate Vercel itself → distinguish local results from
  an actual hosted smoke test; do not claim a deployed URL before deployment.

## Migration Plan

Add scripts/configuration and concise instructions; build from npm ci; preview and
verify the spec scenarios. Record results in this change. Archive once implemented
and locally verified. Link a Vercel project and deploy only in a separate deployment
step; validate root and assets there before claiming hosted success.
Rollback removes hosting configuration/scripts; the shared runtime stays intact.

## References

- [Expo web publishing and Vercel configuration](https://docs.expo.dev/guides/publishing-websites/)
