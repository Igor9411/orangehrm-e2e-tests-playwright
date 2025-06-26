import { test, expect } from '@playwright/test';
import { EmployeeDetails, EditingPersonalDetails } from '../page-objects/orangeHRM/actions.ts'
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

    const employeeCreation = new EmployeeDetails(page)

    const firstName = faker.person.firstName()

    const lastName = faker.person.lastName()
    
    const userId = faker.number.int( {max: 1000} )

    await employeeCreation.creatingNewEmployee(firstName, lastName, userId)

    await employeeCreation.employeeVerification(firstName, lastName, userId)
    
})

test('Adding user personal data', async ({ page }) =>{

    const user0 = page.locator('div.oxd-table-body>div>>nth=0')

    await user0.click()

    console.log("User 0 has been clicked.")

    const personalDetails = new EmployeeDetails(page)

    const middleName = faker.person.firstName()

    const otherId = faker.number.int({min: 1000, max: 9999 })

    const driverL = faker.string.alphanumeric({length: {min: 8, max: 11}})

    await personalDetails.addingPersonalData(middleName, otherId, driverL)

    // await page.getByText('September').click();

    // await page.getByText('10').click()

   await expect(personalDetails.licenseExpirtDate).toHaveValue('2025-10-09')

})
// For now this is only a test function that checks how to link a method and locator from one class to another
test('Editing user personal dat', async ({ page }) =>{

    const employeeCreation = new EmployeeDetails(page)

    const personalDetails = new EditingPersonalDetails(page)

    // await page.

    // await personalDetails.testFunction()

})
// This is only partly done, has to be finished later
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

    const personalDetails = new EmployeeDetails(page)
    
    const user0 = page.locator('div.oxd-table-body>div>>nth=0')

    await user0.click()
    
    // await page.locator('.oxd-input.oxd-input--active').last().fill('test')

    const file = page.locator('input[type=file]')

    page.getByRole('button', { name: ' Add' }).click()

    await file.setInputFiles('pictures/my_pic.jpg')

    await page.getByRole('textbox', { name: 'Type comment here' }).fill('Its a mee, Mario!')

    await page.getByRole('button', { name: 'Save' }).nth(2).click()

    await expect(page.getByText('SuccessSuccessfully Saved×')).toBeVisible() // There is a locator for this in the EmployeeDetails class

    // await page.getByPlaceholder('yyyy-dd-mm').nth(1).click()
   
})

