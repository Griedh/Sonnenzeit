# android-delivery Specification

## Purpose
Verified Android test APK delivery through GitLab.

## Requirements

### Requirement: Verification before APK build
GitLab SHALL install dependencies from the npm lockfile and verify specs,
archived tasks, tests and TypeScript before building. Failed checks MUST block the APK job.

#### Scenario: Failed verification
- WHEN any verification check fails
- THEN verify fails and build-apk does not run

### Requirement: Installable Android test artifact
After verification, the pipeline SHALL generate Android from Expo and provide
a release APK for de.sonnenzeit.app as Sonnenzeit APK, retained for 30 days.
The test APK SHALL use the generated debug signing key.

#### Scenario: Successful build
- WHEN verification and the Android build succeed
- THEN android/app/build/outputs/apk/release/app-release.apk is available as a job artifact
- AND it is debug-signed for test installation
