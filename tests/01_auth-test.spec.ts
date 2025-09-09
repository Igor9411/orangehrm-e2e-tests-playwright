import { test, expect } from '../tests/fixtures/webApp.fixture.ts';

test('Successfull logout from orangeHRM', async ({ webApp, uiHelpers }) => { 

    await webApp.getByRole('banner').getByRole('img', { name: 'profile picture' }).click()

    await webApp.getByRole('menuitem', { name: 'Logout' }).click()

    await uiHelpers.gettingInputByIndex(0).isVisible()
    
    await uiHelpers.gettingInputByIndex(1).isVisible()

    await expect(webApp).toHaveURL(/login/)

})



