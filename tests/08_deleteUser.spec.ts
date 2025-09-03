import { test, expect } from '@playwright/test'
import { NavigationPanel } from '../page-objects/orangeHRM/naviPanel'
import { UserDeletion } from '../page-objects/orangeHRM/deleteUser'

let navigation: NavigationPanel

let deleteUser: UserDeletion

test('Deletion of a user', async ({ page }) => {

    navigation = new NavigationPanel (page)

    deleteUser = new UserDeletion (page)

    const userId = '105' // The ID of a user that will be deleted.

    await page.goto('')

    await navigation.getAnyNavPanelItem('PIM').click()

    await deleteUser.DeleteAnyUserById(userId)

    await expect(deleteUser.userRow.filter({hasText: userId})).not.toBeVisible()

    await expect(page).toHaveURL(/\pim\/viewEmployeeList$/)

})