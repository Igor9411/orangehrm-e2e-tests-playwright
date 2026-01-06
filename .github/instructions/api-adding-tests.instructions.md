# API Adding Tests Instructions

## Overview

This document outlines the process for integrating new API models into the test suite of the OrangeHRM E2E tests project. Once a new API model has been created in accordance with the guidelines in `api-tests.instructions.md`, you must add a corresponding fixture to `utils/webApp.fixture.ts` and develop a basic test to validate the API's functionality. This process ensures that the API correctly interacts with the UI components of the OrangeHRM application.

The project employs Playwright for end-to-end testing, TypeScript for type safety, and adheres to a modular architecture using Page Object Models (POM) and custom fixtures. These integration steps should only be performed after the API model creation detailed in `api-tests.instructions.md` is complete.

## Steps for Adding API Fixtures and Tests

### 1. Add Fixture to `utils/webApp.fixture.ts`

After creating a new API class in `page-objects/orangeHRM/api`, update `utils/webApp.fixture.ts` to include a new fixture for that API:

1. **Import the API class into the file.**  
   Provide an example of the import statement:  
   ```typescript
   import { VacancyAPI } from '../page-objects/orangeHRM/api/vacanciesAPI'
   ```

2. **Add the API to the `myFixtures` type definition.**  
   Follow the naming convention used for other API fixtures. For instance, if you created `VacancyAPI`, add `vacancyAPI: VacancyAPI` to the `myFixtures` type.

3. **Extend the test object with the new fixture function.**  
   In the `export const test = base.extend<myFixtures>` block, add a new asynchronous function to instantiate and provide the API as a fixture. Example:  
   ```typescript
   vacancyAPI: async ({ request }, use) => {
       const logger = new APILogger()
       const vacancy = new VacancyAPI(request, logger)
       await use(vacancy)
   }
   ```

### 2. Create a Basic Test in the Tests Folder

Develop a concise test in the `tests` folder to demonstrate that the API functions correctly. This test does not need to cover all API methods but should verify basic functionality and confirm the results via the application's UI. Locators for UI elements will be provided as needed.

Example test:

```typescript
test('Create new vacancy', async ({ startPage, uiHelpers, navigationPanel, vacancyAPI }) => { 
    await vacancyAPI.postVacancy(200)
    await navigationPanel.getAnyNavPanelItem('Recruitment').click()
    await uiHelpers.gettingTopBarMenuItem('Vacancies')
    await expect(uiHelpers.row.filter({hasText: vacancy.name})).toBeVisible()
    await vacancyAPI.deleteVacancy(200)
})
```