import { test, expect } from '@playwright/test'
import { USERNAME, PASSWORD } from '../env.ts'
import { LoginPage } from '../page-objects/orangeHRM/login.ts'
import { NavigationPanel } from '../page-objects/orangeHRM/naviPanel.ts';
import { Leave } from '../page-objects/orangeHRM/leave.ts';
import { EmployeeDetails } from '../page-objects/orangeHRM/actions.ts'
import { UiHelpers } from '../page-objects/orangeHRM/helpers/uiHelpers.ts'
import fs from 'fs'

const user = JSON.parse(fs.readFileSync('tmp/user.json', 'utf-8'))

test.describe('Adding Employee Leave', () =>{

    let loginPage: LoginPage

    let navRedirection: NavigationPanel

    let assignLeave: Leave 

    let gettingUiElements: UiHelpers

    let datePicker: EmployeeDetails

test.beforeEach(async ({ page })=>{

    loginPage = new LoginPage (page)

    navRedirection = new NavigationPanel (page)

    assignLeave = new Leave (page)

    gettingUiElements = new UiHelpers (page)

    datePicker = new EmployeeDetails (page)

    await page.goto('')
    
    await loginPage.login(USERNAME, PASSWORD)

    await navRedirection.getAnyNavPanelItem('Leave').click()

})

test('Adding entitlements to employee', async ({ page }) => {

    await expect(page.getByRole('heading', { name: 'Leave', exact: true })).toBeVisible()

    await gettingUiElements.gettingAnyTopBarItem('Entitlements').click()

    await gettingUiElements.gettingAnyTopBarMenuItem('Add Entitlements').click()

    await gettingUiElements.gettingInputByIndex(1).fill(`${user.firstName} ${user.lastName}`)

    await expect(page.getByRole('option', { name: `${user.firstName} ${user.lastName}`})).toBeVisible()

    await page.getByRole('option', { name: `${user.firstName} ${user.lastName}`}).click()

    await page.getByText('-- Select --').click()

    await page.getByRole('option', { name: 'US - Personal' }).scrollIntoViewIfNeeded()

    await gettingUiElements.gettingAnyDropdownItem('US - Personal').click()

    await gettingUiElements.gettingInputByIndex(2).fill('26')

    await page.getByRole('button', { name: 'Save' }).click()

    await expect(page.getByText('×Updating EntitlementExisting')).toBeVisible()

    await page.getByRole('button', { name: 'Confirm' }).click()

    await expect(page.getByText('SuccessSuccessfully Saved×')).toBeVisible()

    console.log('User has now 26 days of personal leave.')

})

test('Adding 6 days of vacation to the employee', async ({ page }) => {

    await gettingUiElements.gettingAnyTopBarItem('Assign Leave').click()

    await assignLeave.gettingSpecificUser(1, `${user.firstName} ${user.lastName}`)

    await page.getByText('-- Select --').click()

    await gettingUiElements.gettingAnyDropdownItem('US - Personal').click()

    await datePicker.calendarAddingDate()

    await gettingUiElements.gettingInputByIndex(3).fill('2025-17-09')

    await gettingUiElements.gettingInputByIndex(4).fill(`Have fun on your vacation ${user.firstName} ${user.lastName}!`)

    await page.getByRole('button', { name: 'Assign' }).click()

    await expect(page.getByText('SuccessSuccessfully Saved×')).toBeVisible()

    console.log('Users has scheduled 6 days of vacation in September.')

})

test('Confirming that employee has scheduled 6 vacation days', async ({ page }) => {

    await gettingUiElements.gettingAnyTopBarItem('Leave List').click()

    await assignLeave.gettingSpecificUser(3, `${user.firstName} ${user.lastName}`)

    await page.getByText('-- Select --').first().click()

    await gettingUiElements.gettingAnyDropdownItem('Scheduled').click()

    await page.getByRole('button', { name: 'Search' }).click()

    await expect(page.getByRole('row', { name: ' 2025-10-09 to 2025-17-09' })).toBeVisible()

})
})