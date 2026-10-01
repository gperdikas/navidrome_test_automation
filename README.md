# NAVIDROME test automation

## Live test report 
Every push to GitHub runs the whole suite and generates an Allure test report. This link shows the report from the latest run.
https://gperdikas.github.io/navidrome_test_automation/

## Why Navidrome
Navidrome is a standalone server that streams users' music collection, allowing them to browse it using a web browser. It runs in Docker, so every run starts on a clean instance. It gives the opportunity to test UI and API cases, as well as cases with multiple users and roles (user and admin). That makes real authorization tests possible, for example whether a user is able to see other users' private playlists. Finally, I personally find it interesting to participate in an open source project related to music.

## Status
This project is actively developed and currently contains 53 tests. For the latest results, see the live test report above.

## What is inside
- **Playwright** with **TypeScript** : the test runner and the language
- **Page Object Model** : locators and page actions kept out of the test files
- **API service layer** : API requests live here and are kept out of the test files
- **Docker** : Navidrome 0.64.1, pinned, so every run tests the same version
- **GitHub Actions** : the full suite runs on every push
- **Allure** : the test report, published automatically (see the link above)
- **Postman** : a CRUD collection for the playlist API & 2 authorization-testing collections (used for exploring)

## How it works
- **Page Object Model** : Each part of the app has a page file that holds its locators and methods. A spec file imports the pages it needs. Then call which locator or method needs from each imported page. That means that a locator lives on one spot, no matter on how many spots it being used. If we need to make an edit on a specific locator, then we have to do it on one spot and make it work on every place it is used.

- **Sessions** : Before any test runs, blobal setup logs in each test user once (admin, user1, user2) and saves two files for each user, the browser session, that is used by UI tests and the API token, that is used by the API tests. Instead of each test logs in, they reuse these. This disconnects the tests from the login process, so a login problem will not fail a test, that did not login. It also avoids hitting the server with back-toback login requests.

- **Projects** : Tests are grouped by how they need to start. UI tests need three starting points, so there are the projects, logged in as admin, logged in as user, logged out. Each loads a different session file (the logged out loads none). All API tests start with reading the token that is related to each user. So, all API tests share one project. A new project is added only when tests need a different starting point.
- Adding a UI test : Put in the folder of the starting state it is related to (`tests/ui/admin-logged-in`, `tests/ui/user-logged-in`, `tests/ui/logged-out`)
- Adding an API test : Put it also in the related folder (`tests/api/multiple-users-paths`, `tests/api/login`)

- **Tags** : Each test is tagged (e.g. @smoke, @api), so anyone can run a slice of the suite, instead of only all of it.

- **Date cleanup** : Tests remove the data they create through the API, so a run leaves the database as it found it. Without it, data piles up and later runs fail.

- **CI** : Every push runs the full suite against a fresh Navidrome container. Pinned version, same data every time and publishes the Allure report.

## Notable fixes
**A test that passed while testing nothing**
A delete test was green, but the delete was never reaching the server. Navidrome's UI removes the row immediately and holds the request behind an undo window, so the assertion passed against a screen that was lying. I fixed it by waiting for the actual response, then broke the fix on purpose to confirm the test could still go red.

**The suite dirtied the database it depended on**
Tests passed on a near-empty database and started failing after a few runs. The failing tests almost all had the same failure screenshot, which pointed at a certain cause. I deleted manually every playlist, ran the full suite from that clean start, and counted what was left: three playlists per run. The tests that created playlists never removed them, and the tests that read playlists assumed a short list — a lack of test isolation. Fixed with a shared helper that finds a test's own playlist by its unique name and deletes it through the API.

**Nineteen failures, one space**
Nineteen tests failed in a single run. I opened the failure screenshot on one of them and saw that it was the login page, so nothing had got past authentication. The cause was a space before the `=` in `.env`, which made dotenv load no variables at all and fail silently. One character, nineteen red tests, one failure screenshot was enough to find out the reason.

## Limitations
- **API coverage is not wide.** Currently covers login and playlist authorization. Expanding it is a priority.
- **Cleanup runs after tests, not before.** If a test crashes or the suite is stopped mid-run, the hook may not fire and the data survives. Moving cleanup to the start of a run would make it a guarantee rather than a promise.
- **Chromium only.** Firefox, WebKit and mobile viewports are not covered.
- **Some locators are fragile.** A few still rely on Material UI generated class names and SVG paths, which will break when the app's markup changes.
- **Functional testing only.** Accessibility, security and performance testing are out of scope for now.

## Getting started
### Prerequisites
1. Node.js v22.18.0 or higher
2. Docker and Docker compose
3. Java 21 or higher (required by Allure)

### Installation
1. Clone the repository and enter the folder: `git clone https://github.com/gperdikas/navidrome_test_automation.git`\
`cd navidrome_test_automation`
2. Install dependencies: `npm ci`
3. Install playwright browsers: `npx playwright install`
4. Run:\
   `cp .env.example .env` or\
   `copy .env.example .env` for Windows Command Prompt.\
   The `.env.example` contains credentials (already filled in) for throwaway accounts for the local-only Navidrome whose database ships with this repo. Don't change the existing credentials.
5. Start navidrome: `docker compose -f docker-compose.ci.yml up -d`

### Usage
Run the whole suite: `npm test`
Run the user logged-in UI tests: `npm run test:ui-user-logged-in`
Run the admin logged-in UI tests: `npm run test:ui-admin-logged-in`
Run the logged-out UI tests: `npm run test:ui-logged-out`
Run the API tests: `npm run test:api`
Run with a visible browser: `npm run test:headed`
Open Playwright's interactive UI mode: `npm run test:interactive`
Open the last Playwright HTML report: `npm run report`
Run the suite and open the Allure report: `npm run test:run-allure`

## Roadmap
- Expand API test coverage further
- Move data cleanup to the start of a run instead of the end
- Add k6 for baseline and load testing
- Replace the remaining fragile Material UI locators

## License 
MIT license