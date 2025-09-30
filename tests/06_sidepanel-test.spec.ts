import { test, expect } from './fixtures/webApp.fixture.ts'

test('Landing page verification', async ({ startPage, navigationPanel }) => {

    await navigationPanel.checkAllINavItems()

    await navigationPanel.getAnyNavPanelItem('PIM').click()

    await expect(startPage).toHaveScreenshot('navigation-panel-page-expected.png', {fullPage: true})

})