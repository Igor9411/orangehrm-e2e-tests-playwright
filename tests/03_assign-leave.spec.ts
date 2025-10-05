import { test, expect } from '../tests/fixtures/webApp.fixture.ts'
import { employee, leaveName} from '../tests/testsData.ts'

test('New type of leave can be created', async ({ startPage, uiHelpers, workflow}) => {

    await workflow.createLeave(leaveName)

    await expect(uiHelpers.successfullySavedToastMessage).toBeVisible()

    await expect(startPage.getByRole('row').filter({hasText: leaveName})).toBeVisible()

    await workflow.deleteLeave(leaveName)

})

test('Delete leave', async ({ startPage, uiHelpers, workflow}) => {

    await workflow.createLeave(leaveName)

    await workflow.deleteLeave(leaveName)

    await expect(uiHelpers.deleteConfirmationToastMessage).toBeVisible()

    await startPage.getByRole('row', { name: ' Name Actions' }).waitFor({state: 'visible' })

    await expect(uiHelpers.row.filter({hasText: leaveName})).not.toBeVisible()

})

test('Add entitlement to employee', async ({ leavePage, uiHelpers, navigationPanel}) => {

    await navigationPanel.getAnyNavPanelItem('Leave').click()

    await uiHelpers.gettingTopBarMenuItem('Entitlements', 'Add Entitlements')

    await leavePage.getByText('Individual Employee').click()

    await uiHelpers.gettingInputByIndex(1).fill(`${employee.firstName} ${employee.lastName}`)

    await expect(uiHelpers.dropdownOptionItem.filter({hasText: `${employee.firstName} ${employee.lastName}`})).toBeVisible()

    await uiHelpers.dropdownOptionItem.filter({hasText: `${employee.firstName} ${employee.lastName}`}).click()

    await uiHelpers.selectInput.click()

    await expect(uiHelpers.dropdownOptionItem.filter({hasText: leaveName})).toBeVisible()

    await uiHelpers.dropdownOptionItem.filter({hasText: leaveName }).click()

    await expect(leavePage.getByText('-01-01 - 2025-12-31')).toHaveText('2025-01-01 - 2025-12-31')

    await uiHelpers.gettingInputByIndex(2).fill('10')

    await uiHelpers.saveButton.click()

    await uiHelpers.confimButton.click()

    await expect(uiHelpers.successfullySavedToastMessage).toBeVisible()

})

test('Add days of leave to employee', async ({ uiHelpers, workflow, leavePage }) => {

    await workflow.addEntitlement(employee.entitlementDays)

    await uiHelpers.gettingAnyTopBarItem('Assign Leave').click()

    await expect(leavePage.getByText('Day(s)')).toHaveText('0.00 Day(s)')

    await uiHelpers.gettingInputByIndex(1).fill(`${employee.firstName} ${employee.lastName}`)

    await uiHelpers.dropdownOptionItem.filter({hasText: `${employee.firstName} ${employee.lastName}`}).click()

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
