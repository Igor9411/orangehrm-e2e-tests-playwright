import { test, expect } from '../utils/webApp.fixture.ts'
import { employee } from '../testData/testsData.ts'

test('Create new employee', async ({ startPage, workflow, uiHelpers }) => {

    await workflow.createEmployee(employee.firstName, employee.lastName, employee.Id)

    await expect(uiHelpers.successfullySavedToastMessage).toBeVisible()

    await expect(startPage.getByRole('heading').filter({ hasText: `${employee.firstName} ${employee.lastName}`})).toBeVisible() 

    await workflow.deleteEmployee(employee.firstName)
})

