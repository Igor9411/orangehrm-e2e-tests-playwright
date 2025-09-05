import { test, expect } from '@playwright/test'
import { USERNAME, PASSWORD } from '/Users/igorl/Documents/GitHub/orangehrm-e2e-tests-playwright/env'

exports.expect = expect
exports.test = test.extend({
    webApp: async ({ page }, use) => {
            await page.goto('')
    
            await page.getByRole('textbox', { name: 'Username' }).fill(USERNAME)
    
            await page.getByRole('textbox', { name: 'Password' }).fill(PASSWORD)
    
            await page.getByRole('button', { name: 'Login' }).click()
    
            await use(page)
        }
})