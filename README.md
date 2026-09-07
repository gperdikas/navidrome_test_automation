# NAVIDROME test automation

## Live test report 
Latest run an `main` generates automatically an Allure test report, on every push. Anyone can see the suite pass on a clean machine.
https://gperdikas.github.io/navidrome_test_automation/

## About Navidrome
Navidrome is a standalone server that streams your music collection, allowing you to browse it using a web browser. I can run it on Docker, so have a clean instance on every run. There is the opportunity to test UI and API without any layers stopping me. Multiple users and roles make real authorization tests possible. For example whether a user is able to see other users' private playlists. Finally, it is an open source app related to music, two reasons to keep me interested in a project.

## Status
This project is actively developed. As of 7 Sept 2026 it contains 50 cases, all passing. The suite runs three profiles: a logged-in admin, a logged-in user, and logged-out. A setup project runs first and creates the sessions, so tests reuse a login instead of repeating it. Each profile folder contains several spec files, one per testing part (e.g. admin edits playlist, user player usability, page header). 

## What is inside
- **Playwright** with **TypeScript** — the test runner and the language
- **Page Object Model** — locators and page actions kept out of the test files
- **Docker** — Navidrome 0.63.2, pinned, so every run tests the same version
- **GitHub Actions** — the full suite runs on every push
- **Allure** — the test report, published automatically (see the link above)

## How it works
- **Page Object Model** — Each part of the app has a page file that holds its locators and methods. A spec file imports the page it needs. That means a locator lives in one spot, so a change is made once instead of in every test that uses it.
- **Sessions** — Global setup logs each user in once and saves the browser session state to a file. Every test starts from there, already logged in. This disconnects a test from the login process, so a login problem doesn't fail a test that was never about login. It also avoids hitting the server with back-to-back login requests.
- **Tags** — Each test is tagged (@smoke, @regression, @api, @ui), so anyone can run a slice of the suite instead of all of it.
- **Data cleanup** — Tests remove the data they create through the API, so a run leaves the database as it found it. Without it, data piles up and later runs fail.
- **CI** — Every push runs the full suite against a fresh Navidrome container. Pinned version, same data every time and publishes the Allure report.

## Notable fixes
**A test that passed while testing nothing**
A delete test was green, but the delete was never reaching the server. Navidrome's UI removes the row immediately and holds the request behind an undo window, so the assertion passed against a screen that was lying. I fixed it by waiting for the actual response, then broke the fix on purpose to confirm the test could still go red.

**The suite dirtied the database it depended on**
Tests passed on a near-empty database and started failing after a few runs. The failing tests almost all had the same failure screenshot, which pointed at a certain cause. I deleted manually every playlist, ran the full suite from that clean start, and counted what was left: three playlists per run. The tests that created playlists never removed them, and the tests that read playlists assumed a short list — a lack of test isolation. Fixed with a shared helper that finds a test's own playlist by its unique name and deletes it through the API.

**Nineteen failures, one space**
Nineteen tests failed in a single run. I opened the failure screenshot on one of them and saw that it was the login page, so nothing had got past authentication. The cause was a space before the `=` in `.env`, which made dotenv load no variables at all and fail silently. One character, nineteen red tests, one failure screenshot was enough to find out the reason.

## Limitations
- **API coverage is thin.** Currently login only. Expanding it is the current priority.
- **Cleanup runs after tests, not before.** If a test crashes or the suite is stopped mid-run, the hook may not fire and the data survives. Moving cleanup to the start of a run would make it a guarantee rather than a promise.
- **Chromium only.** Firefox, WebKit and mobile viewports are not covered.
- **Some locators are fragile.** A few still rely on Material UI generated class names and SVG paths, which will break when the app's markup changes.
- **Functional testing only.** Accessibility, security and performance testing are out of scope for now.

## Getting started
### Prerequisites
1. Node.js v22.18.0 or higher
2. Docekr and Docker compose
3. Java 25.0.2 or higher (required by Allure)

### Installation
1. Clone the repository and enter the folder: `git clone https://github.com/gperdikas/navidrome_test_automation.git`
`cd navidrome_test_automation`
2. Install depedencies: `npm ci`
3. Install playwright browsers: `npx playwright install`
4. Copy `.env.example` to `.env`. The credentials are already filled in — they are throwaway accounts for a local-only Navidrome whose database ships with this repo, so there is nothing to protect.
5. Start navidrome: `docker compose -f docker-compose.ci.yml up -d`

### Usage
Run the whole suite: `npx playwright test`
Run the logged-in UI tests: `npm run test:ui-logged-in`
Run the logged-out UI tests: `npm run test:ui-logged-out`
Run with a visible browser: `npm run test:headed`
Open Playwright's interactive UI mode: `npm run test:ui`
Open the last Playwright HTML report: `npm run report`
Run the suite and open the Allure report: `npm run test:run-allure`

## Roadmap
- Expand API test coverage beyond login
- Move data cleanup to the start of a run instead of the end
- Add k6 for baseline and load testing
- Add a Postman collection for API exploration and documentation
- Replace the remaining fragile Material UI locators

## License 
MIT license