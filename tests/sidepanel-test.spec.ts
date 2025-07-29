import { test } from '@playwright/test';
import { NavigationPanel } from '../page-objects/orangeHRM/naviPanel.ts'
import { LoginPage } from '../page-objects/orangeHRM/login.ts'
import { USERNAME, PASSWORD } from '../env.ts'
import { TopBarPanel } from '../page-objects/orangeHRM/helpers/topbar.ts'

test.beforeEach('Log in to Orange', async ({ page }) => {

    await page.goto('')

    const loggingIn = new LoginPage(page)

    await loggingIn.login(USERNAME, PASSWORD)

})

test('Just checking', async ({ page }) => {

    const sidePanel = new NavigationPanel(page)

    const topBar = new TopBarPanel(page)

    await sidePanel.checkAllINavItems()

    await sidePanel.getAnyNavPanelItem('PIM').click()

    await topBar.gettingAnyTopBarItem('Add Employee').click()

})