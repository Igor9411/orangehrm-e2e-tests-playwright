import { test, expect } from '@playwright/test';
import { NewEmployee, PersonalDetails, EditingPersonalDetails } from '../page-objects/orangeHRM/actions.ts'
import { LoginPage } from '../page-objects/orangeHRM/login.ts'
import { faker } from '@faker-js/faker'

test.beforeEach('Log in to Orange', async ({ page }) => {

    await page.goto('')

    const loggingIn = new LoginPage(page)

    await loggingIn.login('Admin', 'admin123')

    await page.getByRole('link', { name: 'PIM' }).click() // this is only for the employ creation, cannot be used for test covering different sites/topics

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

test('Adding user personal data', async ({ page }) =>{

    const user0 = page.locator('div.oxd-table-body>div>>nth=0')

    await user0.click()

    console.log("User 0 has been clicked.")

    const personalDetails = new PersonalDetails(page)

    const middleName = faker.person.firstName()

    const otherId = faker.number.int({min: 1000, max: 9999 })

    const driverL = faker.string.alphanumeric({length: {min: 8, max: 11}})

    await personalDetails.addingPersonalData(middleName, otherId, driverL)

    await page.getByText('September').click();


})

test('Editing user personal dat', async ({ page }) =>{

    const employeeCreation = new NewEmployee(page)

    const personalDetails = new EditingPersonalDetails(page)

    // await page.

    // await personalDetails.testFunction()

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

test.only('looking for correct locator', async ({ page }) =>{
    
    const user0 = page.locator('div.oxd-table-body>div>>nth=0')

    await user0.click()
    
    await page.getByText('10').click();


    
    await page.locator('oxd-calendar-selector-month-selected').click()


    await page.locator('div').filter({ hasText: /^Driver's License NumberLicense Expiry Date$/ }).getByPlaceholder('yyyy-dd-mm').click();
    await page.getByRole('listitem').filter({ hasText: 'June' }).locator('i').click();
    await page.getByText('September').click();
})

