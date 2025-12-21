import { test, expect } from '../utils/webApp.fixture.ts'
import { employee, leaveName, fullEmployeeName} from '../testData/testsData.ts'


test('Add days of leave to employee', async ({ uiHelpers, workflow, leavePage }) => {

    await workflow.addEntitlement(employee.entitlementDays)

    await uiHelpers.gettingAnyTopBarItem('Assign Leave').click()

    await expect(leavePage.getByText('Day(s)')).toHaveText('0.00 Day(s)')

    await uiHelpers.gettingInputByIndex(1).fill(fullEmployeeName)

    await uiHelpers.dropdownOptionItem.filter({hasText: fullEmployeeName}).click()

    await uiHelpers.selectInput.click()

    await uiHelpers.dropdownOptionItem.filter({hasText: leaveName}).click()

    await expect(leavePage.getByText('Day(s)')).toHaveText('10.00 Day(s)')

    await uiHelpers.gettingInputByIndex(2).fill('2025-10-13')

    await uiHelpers.gettingInputByIndex(4).fill(`${employee.firstName} ${employee.lastName} have fun on your leave!`)

    await uiHelpers.gettingInputByIndex(3).fill('2025-10-17')

    await uiHelpers.assignButton.click()

    await expect(uiHelpers.successfullySavedToastMessage).toBeVisible()

    await expect(leavePage.getByText('Day(s)')).toHaveText('0.00 Day(s)')

})
