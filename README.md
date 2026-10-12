# Sonnenzeit

Offline sunrise, sunset, daylight duration and astronomical seasons for Erftstadt.
Built with Expo, React Native and TypeScript. The app UI is German.

## Development

Requires Node.js >=20.19.0.

```sh
npm ci
npm start       # w: web, a: Android
npm run check  # specs, archived tasks, tests, types
```

## Changes

Follow [CONTRIBUTING.md](CONTRIBUTING.md) for skills, implementation, verification
and commits. Use [OpenSpec](openspec/README.md) before changing behavior.
Agent instructions: [AGENTS.md](AGENTS.md).

## Web build and Vercel

```sh
npm run build    # checks, then exports to dist/
npm run preview  # serves the production bundle at http://localhost:8081
```

Import this repository into a Vercel project using the repository root and Node.js
24.x. The committed [vercel.json](vercel.json) selects **Other** (no framework),
installs with `npm ci --include=dev`, builds with `npm run build` and publishes
`dist/`. No secrets or application server are required.

Link the repository in Vercel to deploy; local builds do not publish anything.
The app calculates locally after loading. Offline reloads are not supported.
Generated `dist/` and local `.vercel/` metadata are ignored.

## Android APK

GitLab runs checks, generates the native project and builds a release APK.
Download **Sonnenzeit APK** from the **build-apk** job artifacts (retained 30 days).
It uses a debug signing key for testing; store releases need a private key and AAB.
