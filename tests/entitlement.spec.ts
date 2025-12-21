import { test, expect } from '../utils/webApp.fixture.ts'
import { leaveName, fullEmployeeName} from '../testData/testsData.ts'

test('Add entitlement to employee', async ({ leavePage, uiHelpers, navigationPanel}) => {

    await navigationPanel.getAnyNavPanelItem('Leave').click()

    await uiHelpers.gettingTopBarMenuItem('Entitlements', 'Add Entitlements')

    await leavePage.getByText('Individual Employee').click()

    await uiHelpers.gettingInputByIndex(1).fill(fullEmployeeName)

    await expect(uiHelpers.dropdownOptionItem.filter({hasText: fullEmployeeName})).toBeVisible()

    await uiHelpers.dropdownOptionItem.filter({hasText: fullEmployeeName}).click()

    await uiHelpers.selectInput.click()

    await expect(uiHelpers.dropdownOptionItem.filter({hasText: leaveName})).toBeVisible()

    await uiHelpers.dropdownOptionItem.filter({hasText: leaveName }).click()

    await expect(leavePage.getByText('-01-01 - 2025-12-31')).toHaveText('2025-01-01 - 2025-12-31')

    await uiHelpers.gettingInputByIndex(2).fill('10')

    await uiHelpers.saveButton.click()

    await uiHelpers.confimButton.click()

    await expect(uiHelpers.successfullySavedToastMessage).toBeVisible()

})