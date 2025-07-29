import { test, expect } from '@playwright/test'
import { USERNAME, PASSWORD } from '../env.ts'
import { LoginPage } from '../page-objects/orangeHRM/login.ts'
import { NavigationPanel } from '../page-objects/orangeHRM/naviPanel.ts';
import { TopBarPanel } from '../page-objects/orangeHRM/helpers/topbar.ts';
import { Leave } from '../page-objects/orangeHRM/leave.ts';
import { EmployeeDetails } from '../page-objects/orangeHRM/actions.ts'
import fs from 'fs'

const user = JSON.parse(fs.readFileSync('tmp/user.json', 'utf-8'))

test('Adding leave to employee', async ({ page }) => {
    
    const loggingIn = new LoginPage (page)

    const navRedirection = new NavigationPanel (page)

    const navTopBar = new TopBarPanel (page)

    const assignLeave = new Leave (page)

    const gettingInput = new EmployeeDetails (page)

    await page.goto('')
    
    await loggingIn.login(USERNAME, PASSWORD)

    await navRedirection.getAnyNavPanelItem('Leave').click()

    await expect(page.getByRole('heading', { name: 'Leave', exact: true })).toBeVisible()

    await navTopBar.gettingAnyTopBarItem('Entitlements').click()

    await assignLeave.gettingAnyMenuItem('Add Entitlements').click()

    await gettingInput.gettingInputByIndex(1).fill(`${user.firstName} ${user.lastName}`)

    await expect(page.getByRole('option', { name: `${user.firstName} ${user.lastName}`})).toBeVisible()

    await page.getByRole('option', { name: `${user.firstName} ${user.lastName}`}).click()

    await page.getByText('-- Select --').click()

    await page.getByRole('option', { name: 'US - Personal' }).scrollIntoViewIfNeeded()

    await page.getByRole('option', { name: 'US - Personal' }).click()

    await gettingInput.gettingInputByIndex(2).fill('26')

    await page.getByRole('button', { name: 'Save' }).click()

    await expect(page.getByText('×Updating EntitlementExisting')).toBeVisible()

    await page.getByRole('button', { name: 'Confirm' }).click()

    await expect(page.getByText('SuccessSuccessfully Saved×')).toBeVisible()
})