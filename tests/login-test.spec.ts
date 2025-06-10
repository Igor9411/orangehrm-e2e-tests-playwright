import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/orangeHRM/general.ts'

test("Login2", async ({ page }) => {

    const loginn = new LoginPage(page)
    
    await loginn.goto()

    await loginn.login("Admin", "admin123")

    await loginn.dashboardVisibility()

})