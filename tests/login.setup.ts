import { test as setup } from '@playwright/test'
import { LoginPage } from '../page-objects/orangeHRM/login.ts'
import { USERNAME, PASSWORD } from '../env.ts'

setup('Write login session data', async({ page }) => {

    const loginPage = new LoginPage (page)

    await page.goto('')
        
    await loginPage.login(USERNAME, PASSWORD)

    await page.context().storageState({ path: '.auth/login.json'})
        
})