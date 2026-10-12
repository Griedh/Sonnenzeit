# Spec Delta

## Purpose

Provide a reproducible, verified web bundle that can be previewed locally and hosted on Vercel.

## ADDED Requirements

### Requirement: Checked production build
The repository SHALL provide `npm run build` to verify specs, archived tasks,
tests and types before generating a production web bundle in `dist/`.
The build MUST require neither deployment credentials nor runtime API keys.

#### Scenario: Clean checkout
- WHEN dependencies are installed from the lockfile and npm run build succeeds
- THEN dist contains index.html and the JavaScript and font assets needed to run the calendar

#### Scenario: Verification failure
- WHEN a required check fails
- THEN npm run build exits unsuccessfully before exporting a new bundle

### Requirement: Vercel hosting configuration
The repository SHALL provide Vercel configuration that installs locked dependencies,
runs the checked build and publishes its output. The root URL MUST serve the calendar,
and exported JavaScript and font URLs MUST serve assets rather than the HTML shell.

#### Scenario: Repository import
- WHEN Vercel builds the repository using its committed configuration
- THEN the build uses npm ci and npm run build and publishes dist
- AND no application server or secret environment variable is required

#### Scenario: Root page and assets
- WHEN a visitor opens or reloads the deployment root
- THEN the calendar loads with working icons and no failed JavaScript or font requests

### Requirement: Local production preview
The repository SHALL provide a documented command to serve an existing production
bundle locally without rebuilding it or starting the development bundler.

#### Scenario: Preview exported app
- WHEN npm run preview is run after a successful build
- THEN a localhost HTTP URL serves the exported calendar and assets

### Requirement: Browser calendar parity
The production web app SHALL satisfy the existing annual-calendar and season-events
requirements, with local solar calculations. After assets load, changing years MUST
work without a backend or network connection. This does not promise offline reloads.

#### Scenario: Desktop and mobile browser
- WHEN the production app is opened at 390px and 1280px viewport widths
- THEN the German calendar, location, solar times and season markers are readable
- AND year navigation updates the calendar without page navigation or runtime errors

#### Scenario: Offline interaction
- WHEN the app has loaded and the browser network is disabled
- THEN previous and next year navigation still recalculates and displays the calendar

### Requirement: Deployment instructions
The documentation SHALL state the build, output and installation settings for Vercel,
the local preview workflow and that deployment requires linking a Vercel project.
Generated output and local Vercel account metadata MUST remain unversioned.

#### Scenario: Contributor setup
- WHEN a contributor follows the README from a fresh checkout
- THEN they can build and preview locally and identify the settings needed to deploy
- AND neither dist nor .vercel metadata is included in version control
