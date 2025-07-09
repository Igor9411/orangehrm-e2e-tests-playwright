import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/orangeHRM/login.ts'
import { LogOutPage } from '../page-objects/orangeHRM/logout.ts'
import { USERNAME, PASSWORD } from '../env.ts'


test.beforeEach('Log in to Orange', async ({ page }) => {

    await page.goto('')

    const loggingIn = new LoginPage(page)

    await loggingIn.login(USERNAME, PASSWORD)

})

test('Successfull logout from orangeHRM', async ({ page }) => {

    const loggingOut = new LogOutPage(page)

    await loggingOut.logout()

    // These 3 below are not needed, can be deleted, but I leave them for now.

    await page.getByRole('textbox', { name: 'Username' }).isVisible()
    
    await page.getByRole('textbox', { name: 'Password' }).isVisible()

    await expect(page.getByText('Username : AdminPassword :')).toBeVisible()

})



