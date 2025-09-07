import { test as base, expect } from '@playwright/test'
import { USERNAME, PASSWORD } from '/Users/igorl/Documents/GitHub/orangehrm-e2e-tests-playwright/env'
import { UiHelpers } from '../../page-objects/orangeHRM/helpers/uiHelpers'

export { expect } from '@playwright/test'

type myFixtures = {

    webApp: any
    uiHelpers: UiHelpers

}


export const test = base.extend<myFixtures>({
    uiHelpers: async ({ page }, use) =>{

            await use(new UiHelpers(page))

        },
    webApp: async ({ page, uiHelpers }, use) => {

            await page.goto('')
    
            await uiHelpers.gettingInputByIndex(0).fill(USERNAME)
    
            await uiHelpers.gettingInputByIndex(1).fill(PASSWORD)
    
            await page.getByRole('button', { name: 'Login' }).click()
    
            await use(uiHelpers)

        }
})