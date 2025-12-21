import { test, expect } from '../utils/webApp.fixture'

test('Landing page verification', async ({ startPage, navigationPanel }) => {

    await navigationPanel.checkAllINavItems()

    await startPage.getByText('OrangeHRM OS').scrollIntoViewIfNeeded()

    await startPage.getByText('Time at Work').scrollIntoViewIfNeeded()

    await expect(startPage).toHaveScreenshot('dashboard-page-expected.png', {fullPage: true})

})