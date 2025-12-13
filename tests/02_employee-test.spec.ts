import { test, expect } from '../tests/fixtures/webApp.fixture.ts'
import { employee, latin } from '../utils/testsData.ts'

const formattedDate = employee.birthDate.toISOString().slice(0,10)

test('Create new employee', async ({ startPage, workflow, uiHelpers }) => {

    await workflow.createEmployee(employee.firstName, employee.lastName, employee.Id)

    await expect(uiHelpers.successfullySavedToastMessage).toBeVisible()

    await expect(startPage.getByRole('heading').filter({ hasText: `${employee.firstName} ${employee.lastName}`})).toBeVisible() 

    await workflow.deleteEmployee(employee.firstName)
})

test('Adding employee personal data', async ({ navigationPanel, uiHelpers, startPage, employeeApi }) => {

    await employeeApi.postEmployee(200)

    await navigationPanel.getAnyNavPanelItem('PIM').click()

    await uiHelpers.row.filter({hasText: employee.firstName}).click()

    await uiHelpers.gettingInputByIndex(2).fill(employee.middleName)

    await uiHelpers.gettingInputByIndex(4).fill(employee.nickname)

    await uiHelpers.gettingInputByIndex(6).fill(String(employee.otherId))

    await uiHelpers.gettingInputByIndex(7).fill(employee.driverLicense)

    await uiHelpers.gettingInputByIndex(8).fill('2027-12-24')

    await uiHelpers.selectInput.first().click()

    await uiHelpers.gettingAnyDropdownItem('Polish').click()

    await uiHelpers.selectInput.last().click()

    await uiHelpers.gettingAnyDropdownItem('Single').click()

    await uiHelpers.gettingInputByIndex(9).fill(formattedDate)

    await startPage.getByText('Male', { exact: true }).click()

    await uiHelpers.gettingInputByIndex(10).fill(employee.military)

    await startPage.getByText('Yes').click()

    await uiHelpers.addButton.click()

    await startPage.locator('input[type=file]').setInputFiles('pictures/my_pic.jpg')

    await uiHelpers.gettingInputByIndex(11).fill(latin)

    await uiHelpers.saveButton.last().click()

    await expect(uiHelpers.successfullySavedToastMessage).toBeVisible()

    await employeeApi.deleteEmployee(200)

})


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

test('Duplicate employee cannot be created', async ({ startPage, workflow, uiHelpers, employeeApi }) => {

    await employeeApi.postEmployee(200)
    
    await workflow.createEmployee(employee.firstName, employee.lastName, employee.Id)

    await expect(startPage.getByText('Employee Id already exists')).toBeVisible()

    await expect(uiHelpers.succesfullyUpdatedToastMessage).not.toBeVisible()

    await expect(startPage).toHaveURL(/addEmployee/)

    await employeeApi.deleteEmployee(200)

})

test('Delete employee', async ({ startPage, workflow, uiHelpers, employeeApi }) =>{

    await employeeApi.postEmployee(200)

    await workflow.deleteEmployee(employee.firstName)

    await expect(uiHelpers.deleteConfirmationToastMessage).toBeVisible()

    await startPage.getByRole('row', { name: ' Id  First (& Middle) Name' }).waitFor({ state: 'visible' })

    await expect(uiHelpers.row.filter({hasText: employee.firstName})).not.toBeVisible()

})

