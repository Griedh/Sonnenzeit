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

Use [OpenSpec](openspec/README.md) before changing behavior.
Agent instructions: [AGENTS.md](AGENTS.md).

## Android APK

GitLab runs checks, generates the native project and builds a release APK.
Download **Sonnenzeit APK** from the **build-apk** job artifacts (retained 30 days).
It uses a debug signing key for testing; store releases need a private key and AAB.
