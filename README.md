# ServiceNow Test Automation Framework

A Playwright-based end-to-end test automation framework for ServiceNow, built with TypeScript and following the Page Object Model (POM) design pattern.

---

## Framework Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                          Tests Layer                            │
│                      tests/test.spec.ts                         │
│           (Test scenarios: Login, Create, Update,               │
│                     Close, Check Incident)                      │
└──────┬──────────────┬───────────────┬──────────────┬───────────┘
       │ uses         │ uses          │ uses         │ uses
       ▼              ▼               ▼              ▼
┌────────────┐ ┌────────────┐ ┌─────────────────┐ ┌─────────────┐
│ loginPage  │ │  homePage  │ │incidentHomePage │ │incidentPage │
│            │ │            │ │                 │ │             │
└─────┬──────┘ └─────┬──────┘ └────────┬────────┘ └──────┬──────┘
      │ extends      │ extends         │ extends         │ extends
      └──────────────┴─────────────────┴─────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                          Base Layer                             │
│                       utils/basePage.ts                         │
│         (clickOn, fill_details, check_Visibility,               │
│          mouse_Hover, expectPollVisibility,                     │
│          waitForPageLoad, waitForFrameLoad,                     │
│          validateText, waitForElementVisibility,                │
│          dropdownSelection, checkCheckbox)                      │
└──────────────────────────────┬──────────────────────────────────┘
                               │ implements
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Contracts Layer                          │
│                      utils/PageActions.ts                       │
│         (PageAction interface + PageAssertion interface)        │
└─────────────────────────────────────────────────────────────────┘
```

---

## Project Structure Details

```
ServiceNow/
├── tests/
│   ├── auth.setup.ts         # Authentication setup (saves browser state)
│   └── test.spec.ts          # All test scenarios
├── page-objects/
│   ├── loginPage.ts          # Login page interactions
│   ├── homePage.ts           # ServiceNow home page interactions
│   ├── incidentHomePage.ts   # Incident list page interactions
│   └── incidentPage.ts       # Incident detail form interactions
├── utils/
│   ├── basePage.ts           # Abstract base class with reusable actions
│   └── PageActions.ts        # PageAction & PageAssertion interfaces
├── constants/                # Project constants (reserved)
├── test-data/                # Test data files (reserved)
├── playwright.config.ts      # Playwright configuration
├── package.json              # Project dependencies and scripts
└── .env / .env.qa / .env.stage  # Environment variable files
```

---

## Key Design Patterns

### Page Object Model (POM)

Each page of the application is represented as a TypeScript class. Locators and actions are encapsulated inside the class, keeping test logic clean and free of selector details.

### BasePage (Abstract Class)

All page objects extend `BasePage`, which provides a shared library of reusable actions (click, fill, hover, visibility checks, etc.). This eliminates duplication and centralises error handling and test step reporting.

### Interface Contracts (`PageActions.ts`)

`PageAction` and `PageAssertion` interfaces define the contract that `BasePage` must fulfil. This enforces consistency across all interactions and assertions.

### Storage State Authentication

The login test saves the authenticated browser state to `.auth/credential.json`. All other tests load this state, avoiding repeated login steps and speeding up execution.

---

## Test Scenarios

| Test                                     | Description                                                                                                 |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Authenticate - Service Now** _(setup)_ | Navigates to the app, logs in with credentials, and saves the browser auth state to `.auth/credential.json` |
| **Create Incident**                      | Creates a new incident with a short description                                                             |
| **Search and Update Incident**           | Searches for an existing incident by number and updates its details                                         |
| **Close Incident**                       | Searches for an incident and sets a close date                                                              |
| **Check Incident**                       | Searches the incident list and selects a specific incident by checkbox                                      |

---

## Tech Stack

| Technology                            | Version | Purpose                                     |
| ------------------------------------- | ------- | ------------------------------------------- |
| [Playwright](https://playwright.dev/) | ^1.59.1 | Browser automation and test runner          |
| TypeScript                            | —       | Type-safe test authoring                    |
| dotenv                                | ^17.4.2 | Environment variable management             |
| cross-env                             | ^10.1.0 | Cross-platform environment variable setting |
| @types/node                           | ^25.6.0 | TypeScript type definitions for Node.js     |

---

## Prerequisites

- **Node.js** v18 or later
- **npm** v9 or later

---

## Installation

```bash
npm install
npx playwright install
```

---

## Environment Setup

Create a `.env` file (or `.env.qa` / `.env.stage` for environment-specific configs) in the project root:

```env
URL=https://<your-servicenow-instance>.service-now.com
USER_NAME=your_username
PASSWORD=your_password
```

> `.env.*` files contain credentials — **do not commit them to source control**.

---

## Running Tests

```powershell
# Run headless (default)
npm run test:qa
npm run test:stage

# Run in headed mode (visible browser)
npm run test:qa:headed
npm run test:stage:headed

# Run a specific test file
$env:ENV="qa"; npx playwright test tests/test.spec.ts

# Open the HTML report after a run
npx playwright show-report
```

---

## Test Reports

After execution, an HTML report is generated in the `playwright-report/` folder.

```bash
npx playwright show-report
```

Traces are collected for every test run (`trace: 'on'` in config) and can be viewed with:

```bash
npx playwright show-trace playwright-report/trace/<trace-file>.zip
```

---

## Configuration Highlights (`playwright.config.ts`)

| Setting             | Value              | Description                    |
| ------------------- | ------------------ | ------------------------------ |
| `timeout`           | 120,000 ms         | Max duration per test          |
| `actionTimeout`     | 30,000 ms          | Max wait per individual action |
| `navigationTimeout` | 60,000 ms          | Max wait for page navigation   |
| `retries`           | 2 (CI) / 0 (local) | Automatic retry on failure     |
| `fullyParallel`     | true               | Tests run in parallel          |
| `workers`           | 1 (CI) / auto      | Parallel worker count          |
| `trace`             | on                 | Traces captured for all runs   |
| `browser`           | Chromium           | Default browser                |
