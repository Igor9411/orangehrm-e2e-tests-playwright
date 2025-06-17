import { test } from '@playwright/test';
import { NewEmployee } from '../page-objects/orangeHRM/actions.ts'
import { LoginPage } from '../page-objects/orangeHRM/login.ts'
import { faker } from '@faker-js/faker'

test.beforeEach('Log in to Orange', async ({ page }) => {

    await page.goto('')

    const loggingIn = new LoginPage(page)

    await loggingIn.login('Admin', 'admin123')

})

test('New employee creation', async ({ page }) => {

    test.setTimeout(90000)

    const employeeCreation = new NewEmployee(page)

    const firstName = faker.person.firstName()

    const lastName = faker.person.lastName()
    
    const userId = faker.number.int( {max: 1000} )

    await employeeCreation.newEmployee(firstName, lastName, userId)

    await employeeCreation.employeeVerification(firstName, lastName, userId)
    
})

test('Deleting a user', async ({ page }) =>{

    const user0 = page.locator('div.oxd-table-body>div>>nth=0')
    const userLast = page.locator('div.oxd-table-body>div>>nth=-1')

    await page.getByRole('link', { name: 'PIM' }).click()

    // await user0.click()

    // console.log("User 0 has been clicked.")

    await userLast.click()

    console.log("Last user has been clicked.")
})