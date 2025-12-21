import { test, expect } from '../utils/webApp.fixture.ts'
import { employee, latin } from '../testData/testsData.ts'

const formattedDate = employee.birthDate.toISOString().slice(0,10)

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