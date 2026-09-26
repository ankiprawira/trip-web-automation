# trip-web-automation

**This repository is primarily a learning project for GitHub Actions and CI workflows.** The Playwright tests against [Trip.com](https://www.trip.com/) provide a realistic pipeline target (install dependencies, run browsers in the cloud, publish artifacts, and gate merges on test results), but the main goal is to experiment with and understand continuous integration patterns, not to maintain production-grade test coverage.

## Why this repo exists

- Practice **GitHub Actions**: triggers, jobs, steps, permissions, and concurrency
- Learn how to run **Playwright on CI** (`npm ci`, browser install, retries, reporters)
- Publish **HTML test reports** via **GitHub Pages** without manual zip downloads
- Explore patterns like **`continue-on-error`** plus a follow-up step so reports still upload when tests fail, while the workflow still fails appropriately

If you are browsing for Trip.com automation examples only, the page objects and specs are still useful; treat CI as the centerpiece of what this project is about.

## CI workflow overview

Workflow file: [`.github/workflows/playwright.yml`](.github/workflows/playwright.yml)

| Trigger | Behavior |
|--------|----------|
| Push to `main` / `master` | Run tests, upload report artifact, deploy to GitHub Pages |
| Pull request to `main` / `master` | Run tests only (no Pages deploy) |

### Jobs

1. **`test`**: Checkout, Node LTS, `npm ci`, install Chrome for Playwright, run `npx playwright test`, upload `playwright-report/` as a Pages artifact on push to the default branch, then fail the job if tests failed.
2. **`deploy`**: After `test` (when not cancelled), deploy the report with `actions/deploy-pages` and add the report URL to the workflow summary.

### Permissions & settings

The workflow uses `pages: write` and `id-token: write` for GitHub Pages deployment. In the repository **Settings → Pages**, choose **GitHub Actions** as the source so the `deploy` job can publish the report.

## Tech stack

- [Playwright Test](https://playwright.dev/) (TypeScript)
- Page Object Model under `pages/` and shared helpers under `shared/`
- Tests in `testsuites/`

## Setup

### Local machine

1. Install [Node.js](https://nodejs.org/) (LTS) and confirm npm is available:

   ```bash
   node -v
   npm -v
   ```

2. Clone this repository and open it:

   ```bash
   git clone https://github.com/ankiprawira/trip-web-automation.git
   cd trip-web-automation
   ```

   Use your fork’s URL if you are not cloning from that remote.

3. Install npm dependencies (uses the lockfile, same as CI):

   ```bash
   npm ci
   ```

4. Install the browser Playwright uses for these tests:

   ```bash
   npx playwright install chrome
   ```

5. Run the suite once to confirm everything works:

   ```bash
   npx playwright test
   ```

6. Optional: open the HTML report after a run:

   ```bash
   npx playwright show-report
   ```

CI-specific behavior is in [`playwright.config.ts`](playwright.config.ts) (for example: `forbidOnly` on CI, retries, single worker, HTML reporter with `open: 'never'`).

### GitHub repository (CI and report hosting)

Use these steps when you push this project to GitHub and want the workflow in [`.github/workflows/playwright.yml`](.github/workflows/playwright.yml) to run.

1. Create an empty repository on GitHub (or fork this one), then push your local copy:

   ```bash
   git remote add origin https://github.com/ankiprawira/trip-web-automation.git
   git push -u origin master
   ```

   Use `main` instead of `master` if that is your default branch; the workflow listens to both `main` and `master`.

2. Confirm **Actions** are allowed: **Settings → Actions → General** (defaults are usually fine for a personal learning repo).

3. Configure **GitHub Pages** so the deploy job can publish the Playwright HTML report:
   - Go to **Settings → Pages**
   - Under **Build and deployment**, set **Source** to **GitHub Actions**

4. Push to `main` or `master` (or merge a PR into that branch). The **test** job runs on every push and pull request; on push to the default branch, the workflow also uploads the report and runs **deploy**.

5. After a successful deploy, open the report URL from the workflow run **Summary** (the deploy job writes it there), or from **Settings → Pages** once the site is live.

No repository secrets are required for the current workflow: tests use the public Trip.com site and standard `GITHUB_TOKEN` permissions for Pages.

If you only want to learn CI without Pages, you can skip step 3; pushes to non-default branches and pull requests still run tests, but the report will not be published to Pages.

## Project layout

```
.github/workflows/playwright.yml   # CI/CD pipeline (main learning focus)
playwright.config.ts
testsuites/                        # Test specs
pages/                             # Page objects
shared/                            # Common page/helpers
```

## Disclaimer

Tests hit the public Trip.com site. They are for learning and demonstration. Site changes, rate limits, or regional differences may cause flaky or failing runs; that is normal when using a live site as a CI exercise.

## License

ISC (see [`package.json`](package.json)).
