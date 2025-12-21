import { test, expect } from '../utils/webApp.fixture.ts'
import { employee } from '../testData/testsData.ts'

test('Duplicate employee cannot be created', async ({ startPage, workflow, uiHelpers, employeeApi }) => {

    await employeeApi.postEmployee(200)
    
    await workflow.createEmployee(employee.firstName, employee.lastName, employee.Id)

    await expect(startPage.getByText('Employee Id already exists')).toBeVisible()

    await expect(uiHelpers.succesfullyUpdatedToastMessage).not.toBeVisible()

    await expect(startPage).toHaveURL(/addEmployee/)

    await employeeApi.deleteEmployee(200)

})