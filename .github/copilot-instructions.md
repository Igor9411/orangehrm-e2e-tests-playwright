# OrangeHRM E2E Tests with Playwright

## Description

This project, named **OrangeHRM E2E Tests with Playwright**, is a comprehensive suite of end-to-end (E2E) tests for the open-source Human Resource Management (HRM) application, OrangeHRM. The primary goal is to demonstrate and facilitate learning of E2E testing practices using modern tools and frameworks. It covers various HRM functionalities such as employee management, leave requests, job titles, pay grades, and more. The project is built with Playwright and TypeScript, emphasizing maintainable, scalable test automation. It includes both UI-based tests and API tests, and utilizes Docker for easy setup of the OrangeHRM application locally.

The project is not yet complete and serves as an educational resource for developers interested in test automation, Playwright, and TypeScript. It includes CI/CD pipeline setup via GitHub Actions for automated test execution.

## Project Structure

The project follows a modular structure to promote reusability and maintainability. Below is an overview of the key directories and files:

```
orangehrm-e2e-tests-playwright/

├── page-objects/          # Page Object Model classes for UI interactions

├── testData/              # Test data management

├── tests/                 # Test specification files

├── utils/                 # Core utilities

├── .github/               # GitHub configurations

├── orangehrm-docker/      # Docker setup for OrangeHRM

└── playwright.config.ts   # Playwright configuration

```

The project is based on the Playwright framework for browser automation, TypeScript for type safety, and Docker for containerized application setup. It follows best practices for E2E testing, including separation of concerns, reusable components, and data-driven testing.

## Core Patterns

The project employs several core patterns to ensure clean, maintainable, and efficient test code:

### 1. Page Object Model (POM)
POM abstracts UI interactions into classes, making tests more readable and reducing duplication. Each page or component has a corresponding class with methods for actions and locators for elements.

**Example**: The [`NavigationPanel`](page-objects/orangeHRM/helpers/naviPanel.ts ) class in [`page-objects/orangeHRM/helpers/naviPanel.ts`](page-objects/orangeHRM/helpers/naviPanel.ts ):

```typescript
import { Page, Locator, expect } from '@playwright/test'

export class NavigationPanel {
    readonly page: Page
    readonly navigationPanelItems: string[] = [
        'Admin', 'PIM', 'Leave', 'Time', 'Recruitment', 'My Info',
        'Performance', 'Dashboard', 'Directory', 'Maintenance', 'Claim', 'Buzz'
    ]

    navigationItem: Locator

    constructor(page: Page) {
        this.page = page
        this.navigationItem = page.locator('.oxd-main-menu-item-wrapper')
    }

    getAnyNavPanelItem(name: string): Locator {
        return this.navigationItem.filter({ hasText: name })
    }

    async checkAllINavItems() {
        await expect(this.navigationItem).toHaveCount(this.navigationPanelItems.length)
        for (let i = 0; i < this.navigationPanelItems.length; i++) {
            const everyNavigationItem = this.navigationItem.nth(i)
            await expect(everyNavigationItem).toBeVisible()
        }
    }
}
```

### 2. Test Fixtures
Custom fixtures extend Playwright's base test to provide shared setup, such as page objects and authenticated sessions.

**Example**: From [`utils/webApp.fixture.ts`](utils/webApp.fixture.ts ), defining fixtures like [`uiHelpers`](tests/create-new-employee.spec.ts ), [`navigationPanel`](utils/webApp.fixture.ts ), and [`workflow`](tests/create-new-employee.spec.ts ):

```typescript
import { test as base, Page } from '@playwright/test'
import { UiHelpers } from '../page-objects/orangeHRM/helpers/uiHelpers'
import { NavigationPanel } from '../page-objects/orangeHRM/helpers/naviPanel'
import { Workflow } from '../page-objects/orangeHRM/helpers/workflows'

type myFixtures = {
    uiHelpers: UiHelpers
    navigationPanel: NavigationPanel
    workflow: Workflow
    // ... other fixtures
}

export const test = base.extend<myFixtures>({
    uiHelpers: async ({ page }, use) => {
        await use(new UiHelpers(page))
    },
    navigationPanel: async ({ page }, use) => {
        await use(new NavigationPanel(page))
    },
    workflow: async ({ page }, use) => {
        await use(new Workflow(page))
    },
    // ... more extensions
})
```

### 3. Workflow Abstraction
Complex sequences of actions are encapsulated in workflow classes to simplify test logic.

**Example**: A test using the [`workflow`](tests/create-new-employee.spec.ts ) fixture in [`tests/create-new-employee.spec.ts`](tests/create-new-employee.spec.ts ):

```typescript
import { test, expect } from '../utils/webApp.fixture.ts'
import { employee } from '../testData/testsData.ts'

test('Create new employee', async ({ startPage, workflow, uiHelpers }) => {
    await workflow.createEmployee(employee.firstName, employee.lastName, employee.Id)
    await expect(uiHelpers.successfullySavedToastMessage).toBeVisible()
    await expect(startPage.getByRole('heading').filter({ hasText: `${employee.firstName} ${employee.lastName}` })).toBeVisible()
    await workflow.deleteEmployee(employee.firstName)
})
```

### 4. Data-Driven Testing
Test data is externalized into files like [`testData/testsData.ts`](testData/testsData.ts ) for reusability and easy maintenance.

### 5. Setup and Teardown
Uses Playwright's project dependencies for authentication setup (e.g., `login.setup.ts`) and logout tests.

## Key Technologies & Dependencies

- **Playwright**: Core framework for E2E testing, supporting multiple browsers and providing robust APIs for UI automation.
- **TypeScript**: Provides type safety and enhances code maintainability.
- **Node.js**: Runtime environment for running tests and managing dependencies.
- **Docker**: Used to containerize and run the OrangeHRM application locally via Docker Compose.
- **@faker-js/faker**: Library for generating fake test data (e.g., names, IDs).
- **dotenv**: Loads environment variables from a [`.env`](.env ) file for secure configuration (e.g., login credentials).
- **@playwright/test**: Official Playwright test runner and utilities.
- **@types/node**: TypeScript definitions for Node.js.

### Dependencies from [`package.json`](package.json ):
- **devDependencies**:
  - `@playwright/test: ^1.52.0`
  - `@types/node: ^22.15.30`
- **dependencies**:
  - `@faker-js/faker: ^9.8.0`
  - `dotenv: ^17.0.1`

## Additional Notes

- **Running Tests**: Use [`npx playwright test`](utils/webApp.fixture.ts ) to run all tests. Ensure Docker is running for the OrangeHRM instance.
- **Setup**: Follow the [`README.md`](README.md ) for installation. Run `npm run login-project-setup` for initial authentication.
- **CI/CD**: GitHub Actions workflow in [`.github/workflows/playwright.yml`](.github/workflows/playwright.yml ) automates test execution on pushes/PRs.
- **Best Practices**: Tests are parallelized, use retries on CI, and generate HTML reports. Visual snapshots aid in regression testing.
- **Contributing**: When adding new tests, follow POM, use fixtures, and update test data accordingly.

This project is ideal for learning E2E testing with Playwright and can be extended for more HRM features or adapted to other applications.