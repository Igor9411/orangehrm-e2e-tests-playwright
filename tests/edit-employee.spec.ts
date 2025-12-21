import { test, expect } from '../utils/webApp.fixture.ts'
import { employee } from '../testData/testsData.ts'

test('Edit employee data', async({ workflow, navigationPanel, uiHelpers, startPage, employeeApi}) =>{

    await employeeApi.postEmployee(200)

    await navigationPanel.getAnyNavPanelItem('PIM').click()

    await expect(uiHelpers.row.filter({hasText: employee.firstName})).toBeVisible()

    await uiHelpers.row.filter({hasText: employee.firstName}).click()

    await workflow.editEmployee(employee.newFirstName, employee.newLastName, employee.newId)

    await expect(uiHelpers.succesfullyUpdatedToastMessage).toBeVisible()

    await startPage.getByRole('link', { name: 'Employee List' }).click()

    await expect(uiHelpers.row.filter({hasText: employee.firstName})).not.toBeVisible()

    await employeeApi.deleteEmployee(200)
})