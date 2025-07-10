import { test, expect, } from '@playwright/test';
import { EmployeeDetails, EditingPersonalDetails } from '../page-objects/orangeHRM/actions.ts'
import { LoginPage } from '../page-objects/orangeHRM/login.ts'
import { faker } from '@faker-js/faker'
import { USERNAME, PASSWORD } from '../env.ts'
import { NavigationPanel } from '../page-objects/orangeHRM/naviPanel.ts';

const firstName = faker.person.firstName()

const lastName = faker.person.lastName()
    
const userId = faker.number.int( {max: 1000} )

test.beforeEach('Log in to Orange', async ({ page }) => {

    await page.goto('')

    const loggingIn = new LoginPage(page)

    await loggingIn.login(USERNAME, PASSWORD)

    const pimRedirection = new NavigationPanel(page)

    await pimRedirection.getAnyNavPanelItem('PIM').click()

})

test('New employee creation', async ({ page }) => {

    test.setTimeout(90000)

    const employeeCreation = new EmployeeDetails(page)

    await employeeCreation.creatingNewEmployee(firstName, lastName, userId)

    await employeeCreation.employeeVerification(firstName, lastName, userId)
    
})

test.skip('Adding user personal data', async ({ page }) =>{

    const personalDetails = new EmployeeDetails(page)

    await personalDetails.gettingFirstUser()

    const middleName = faker.person.firstName()

    const otherId = faker.number.int({min: 1000, max: 9999 })

    const driverL = faker.string.alphanumeric({length: {min: 8, max: 11}})

    await personalDetails.gettingInputByIndex(2).fill(middleName)

    console.log(middleName)

    await personalDetails.gettingInputByIndex(5).fill(String(otherId))

    console.log(otherId)

    await personalDetails.gettingInputByIndex(6).fill(driverL)

    console.log(driverL)

    await personalDetails.calendarAddingDate()

    await personalDetails.addingAndorranNationality()
    
    await personalDetails.settingOtherMatrialStatus()

    await personalDetails.gettingInputByIndex(8).fill('1987-12-12')

    await personalDetails.settingMaleGender()
    
    await personalDetails.settingBloodType()

    await personalDetails.gettingInputByIndex(9).fill('This is just a test.')

    await personalDetails.addButton.click()

    await page.locator('input[type=file]').setInputFiles('pictures/my_pic.jpg')

    await page.getByRole('button', { name: 'Save' }).nth(2).click() // This has to has a selector in class
    
    await expect(personalDetails.successToastMessage).toBeVisible()

    console.log('Adding user personal data test has passed :)')
    
})

test.skip('Successfull edit of the user data', async({page}) =>{

    const personalDetails = new EmployeeDetails(page)

    await personalDetails.gettingFirstUser()

    await personalDetails.gettingInputByIndex(1).fill('')

    await personalDetails.gettingInputByIndex(1).fill('Teddy')

    await personalDetails.gettingInputByIndex(3).fill('Junior')

    await expect(personalDetails.gettingInputByIndex(1)).toHaveValue('Teddy')

    await expect(personalDetails.gettingInputByIndex(3)).toHaveValue('Junior')

    await personalDetails.noValidMessage()

    await personalDetails.saveAdditionalButton.click()

    await expect(personalDetails.successUpdatedToast).toBeVisible()

    await page.reload()

    await expect(page.getByRole('heading').nth(1)).toHaveText('Teddy Junior')

})


test.skip('Unsuccessfull edit of the user data', async({page}) =>{

    const personalDetails = new EmployeeDetails(page)

    await personalDetails.gettingFirstUser()

    await personalDetails.noValidMessage()

    await personalDetails.gettingInputByIndex(1).fill('')

    await personalDetails.gettingInputByIndex(3).fill('')

    await personalDetails.saveAdditionalButton.click()
    
    await personalDetails.validMessage()

    await expect(personalDetails.successToastMessage).not.toBeVisible()

})

test('Deleting a user', async ({ page }) =>{

    const personalDetails = new EmployeeDetails(page)

    await personalDetails.gettingInputByIndex(2).fill(String(userId))

    await page.getByRole('button', { name: 'Search' }).click()

    await page.getByRole('button', { name: '' }).last().click()

    await expect(page.getByText('×Are you Sure?The selected')).toBeVisible()

    await page.getByRole('button', { name: ' Yes, Delete' }).click()

    await expect(page.getByText('SuccessSuccessfully Deleted×')).toBeVisible()

    console.log("Last user has been clicked.")
})

test.skip('Linking methods, classes and locators', async ({ page }) =>{

    // For now this is only a test function that checks how to link a method 
    // and locator from one class to another

    const employeeCreation = new EmployeeDetails(page)

    const personalDetails = new EditingPersonalDetails(page)

})

test.skip('looking for correct locator', async ({ page }) =>{

    const personalDetails = new EmployeeDetails(page)
    
    const user0 = page.locator('div.oxd-table-body>div>>nth=0')
    await user0.click()
})

