import { test as base, Page } from '@playwright/test'
import { USERNAME, PASSWORD } from '/Users/igorl/Documents/GitHub/orangehrm-e2e-tests-playwright/env'
import { UiHelpers } from '../../page-objects/orangeHRM/helpers/uiHelpers'
import { NavigationPanel } from '../../page-objects/orangeHRM/naviPanel'

export { expect } from '@playwright/test'

type myFixtures = {

    webApp: Page
    uiHelpers: UiHelpers
    navigationPanel: NavigationPanel
    startPage: Page

}


export const test = base.extend<myFixtures>({
    uiHelpers: async ({ page }, use: (fixture: UiHelpers) => Promise<void>) =>{

            await use( new UiHelpers ( page ) )

        },

    navigationPanel: async ({ page }, use: (fixture: NavigationPanel) => Promise<void>) =>{

            await use( new NavigationPanel ( page ) )

        }, 
    webApp: async ({ page, uiHelpers }, use:(fixture: any) => Promise<void>) => {

            await page.goto('')
    
            await uiHelpers.gettingInputByIndex(0).fill(USERNAME)
    
            await uiHelpers.gettingInputByIndex(1).fill(PASSWORD)
    
            await page.getByRole('button', { name: 'Login' }).click()
    
            await use(page)

        },
    
    startPage: async ({ page }, use: (fixture: Page) => Promise<void>) => {

            await page.goto('')
    
            await use(page)

        }
})