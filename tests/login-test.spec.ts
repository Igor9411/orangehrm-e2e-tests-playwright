import { test, expect } from '@playwright/test';
import { LoginPage, NewEmployee } from '../page-objects/orangeHRM/general.ts'
import { faker } from '@faker-js/faker'

test('Successfull login to orangeHRM and dashboard visibility check', async ({ page }) => {

    const loginAndDashboard = new LoginPage(page)
    
    await loginAndDashboard.goto()

    await loginAndDashboard.login('Admin', 'admin123')

    await loginAndDashboard.dashboardVisibility()

})

test('Successfull logout from orangeHRM', async ({ page }) => {

    const loginAndDashboard = new LoginPage(page)
    
    await loginAndDashboard.goto()

    await loginAndDashboard.login('Admin', 'admin123')

    await page.getByRole('banner').getByRole('img', { name: 'profile picture' }).click()

    await page.getByRole('menuitem', { name: 'Logout' }).click()

    await page.getByRole('textbox', { name: 'Username' }).isVisible()
    
    await page.getByRole('textbox', { name: 'Password' }).isVisible()

    await expect(page.getByText('Username : AdminPassword :')).toBeVisible()

})

test('New employee creation', async ({ page }) => {

    test.setTimeout(90000)

    const employeeCreation = new NewEmployee(page)

    const loginAndDashboard = new LoginPage(page)

    const fakedName = faker.person.firstName()
    const fakedLastName = faker.person.lastName()
    const fakedId = faker.number.int( {max: 1000} )

    await loginAndDashboard.goto()

    await loginAndDashboard.login('Admin', 'admin123')

    await employeeCreation.newEmployee(fakedName, fakedLastName, fakedId)

})