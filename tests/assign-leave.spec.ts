import { test, expect } from '@playwright/test'
import { NavigationPanel } from '../page-objects/orangeHRM/naviPanel.ts';
import { Leave } from '../page-objects/orangeHRM/leave.ts';
import { EmployeeDetails } from '../page-objects/orangeHRM/actions.ts'
import { UiHelpers } from '../page-objects/orangeHRM/helpers/uiHelpers.ts'
import { faker } from '@faker-js/faker'
import fs from 'fs'

const user = JSON.parse(fs.readFileSync('tmp/user.json', 'utf-8'))
const leaveName = `${faker.word.adjective().toUpperCase()} LEAVE`


test.describe('Adding Individual Employee Leave', () => {

    let navRedirection: NavigationPanel

    let assignLeave: Leave 

    let gettingUiElements: UiHelpers

    let datePicker: EmployeeDetails

test.beforeEach(async ({ page }) => {

    navRedirection = new NavigationPanel (page)

    assignLeave = new Leave (page)

    gettingUiElements = new UiHelpers (page)

    datePicker = new EmployeeDetails (page)

    await page.goto('')

    await navRedirection.getAnyNavPanelItem('Leave').click()

})

test.skip('Add new type of leave', async ({}) => {

    await gettingUiElements.gettingTopBarMenuItem('Configure', 'Leave Types')

    await assignLeave.leaveTypeAddButton.click()

    await assignLeave.creatingLeaveType(leaveName)

    await expect(datePicker.successToastMessage).toBeVisible()

})

test('Adding entitlements to employee', async ({ page }) => {

    await expect(page.getByRole('heading', { name: 'Leave', exact: true })).toBeVisible()

    await gettingUiElements.gettingAnyTopBarItem('Entitlements').click() 

    await gettingUiElements.gettingAnyTopBarMenuItem('Add Entitlements').click()

    await assignLeave.individualEmployeeRadioButton.click()

    await assignLeave.gettingSpecificUser(1,`${user.firstName} ${user.lastName}`)

    await assignLeave.monthPicker.first().click()

    await page.getByRole('option', { name: 'Personal' }).scrollIntoViewIfNeeded()

    await gettingUiElements.gettingAnyDropdownItem('Personal').click()

    await gettingUiElements.gettingInputByIndex(2).fill('26')

    await assignLeave.saveButton.click()

    await expect(page.getByText('×Updating EntitlementExisting')).toBeVisible()

    await page.getByRole('button', { name: 'Confirm' }).click()

    await expect(page.getByText('SuccessSuccessfully Saved×')).toBeVisible()

    console.log('User has now 26 days of personal leave to use.')

})

test('Adding 6 days of vacation to the employee', async ({ page }) => {

    await gettingUiElements.gettingAnyTopBarItem('Assign Leave').click()

    await assignLeave.gettingSpecificUser(1, `${user.firstName} ${user.lastName}`)

    await assignLeave.monthPicker.click()

    await gettingUiElements.gettingAnyDropdownItem('Personal').click()

    await gettingUiElements.gettingInputByIndex(2).fill('2025-09-10')

    await gettingUiElements.gettingInputByIndex(4).fill(`Have fun on your vacation ${user.firstName} ${user.lastName}!`)
    // There is an validation error (the date is copied from 'From Date' input) when filling 'To Date" input just after or before the 'From Date' input so this is done after adding the comment.
    await gettingUiElements.gettingInputByIndex(3).fill('2025-09-17') 
    
    await page.getByRole('button', { name: 'Assign' }).click()

    await expect(page.getByText('SuccessSuccessfully Saved×')).toBeVisible()

    console.log('Users has scheduled 6 days of vacation in September.')

})

test('Confirming that employee has scheduled 6 vacation days', async ({ page }) => {

    const scheduledUserRow = page.getByRole('row').filter({hasText: `${user.firstName} ${user.lastName}`})

    await gettingUiElements.gettingAnyTopBarItem('Leave List').click()

    await assignLeave.gettingSpecificUser(3, `${user.firstName} ${user.lastName}`)

    await assignLeave.monthPicker.first().click()

    await gettingUiElements.gettingAnyDropdownItem('Scheduled').click()

    await page.getByRole('button', { name: 'Search' }).click()

    await expect(scheduledUserRow.getByRole('cell', {name: 'Scheduled (6.00)'})).toBeVisible()

})


})