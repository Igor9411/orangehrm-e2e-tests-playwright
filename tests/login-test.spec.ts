import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/orangeHRM/general.ts'

test("Logging page", async ({page}) => {

    await page.goto('')
    
    await expect(page).toHaveTitle('OrangeHRM')

    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()

    await page.getByRole('textbox', { name: 'Username' }).fill('Admin')

    await page.getByRole('textbox', { name: 'Password' }).fill('admin123')

    await page.getByRole('button', { name: 'Login' }).click()

    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
});

test("Login2", async ({ page }) => {

    const loginn = new LoginPage(page)
    const dash = new LoginPage(page)
    
    await loginn.goto()
    await loginn.login("Admin", "admin123")
    await loginn.dashboardVisibility()

})