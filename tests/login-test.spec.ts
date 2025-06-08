import { test, expect } from '@playwright/test';

test("Logging page", async ({page}) => {

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    
    await expect(page).toHaveTitle('OrangeHRM')

    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()

    await page.getByRole('textbox', { name: 'Username' }).fill('Admin')

    await page.getByRole('textbox', { name: 'Password' }).fill('admin123')

    await page.getByRole('button', { name: 'Login' }).click()

    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
});