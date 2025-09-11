
import { test, expect } from '../tests/fixtures/webApp.fixture.ts'
import { EmployeeDetails } from '../page-objects/orangeHRM/actions.ts'
import { faker } from '@faker-js/faker'
import { NavigationPanel } from '../page-objects/orangeHRM/naviPanel.ts';
import fs from 'fs'

const user = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        middleName: faker.person.middleName(),
        Id: faker.number.int( {max: 10000} ),
        otherId: faker.number.int( {min: 1000, max: 2000} ),
        nickname: faker.internet.username(),
        driverLicense: faker.string.alphanumeric({length: {min: 8, max: 11}}),
        birthDate: faker.date.between({ from: '1955-01-01', to: '2001-12-31' }),
        military: faker.string.alpha()
    }

const formattedDate = user.birthDate.toISOString().slice(0,10)

let employeeCreation: EmployeeDetails

let pimRedirection: NavigationPanel


test.beforeEach('Log in to Orange', async ({ page }) => {

    employeeCreation = new EmployeeDetails(page)

    pimRedirection = new NavigationPanel(page)
    
    await page.goto('')

})

test.skip('New employee creation', async ({ page }) => {

    await pimRedirection.getAnyNavPanelItem('PIM').click()

    await employeeCreation.creatingNewEmployee(user.firstName, user.lastName, user.Id)

    await employeeCreation.employeeVerification(user.firstName, user.lastName, user.Id)

    await expect(page.getByRole('heading').filter({ hasText: `${user.firstName} ${user.lastName}`})).toBeVisible()

    fs.mkdirSync('tmp', {recursive: true}) // fs.mkdirSync (synchronus mkdir) creates folder of name 'tmp', recursive: true checkes if folder exists and addes all other nessesities
    fs.writeFileSync('tmp/user.json', JSON.stringify(user, null, 2)) // fs.wrifeFileSync (synchronus write) saves data in the file, user changes JSON into readable text, null means no replacer so nothing is ommitted, 2 means format of the file
    
})



test('Create new employee', async ({ startPage, workflow }) => {

    await workflow.createEmployee(user.firstName, user.lastName, user.Id)

    await expect(startPage.getByRole('heading').filter({ hasText: `${user.firstName} ${user.lastName}`})).toBeVisible()
 

})

test('Adding user personal data', async ({ workflow, uiHelpers, startPage }) => {

    

    await workflow.createEmployee(user.firstName, user.lastName, user.Id)

    await uiHelpers.gettingInputByIndex(2).fill(user.middleName)

    await uiHelpers.gettingInputByIndex(4).fill(user.nickname)

    await uiHelpers.gettingInputByIndex(6).fill(String(user.otherId))

    await uiHelpers.gettingInputByIndex(7).fill(user.driverLicense)

    await uiHelpers.gettingInputByIndex(8).fill('2027-12-24')

    await uiHelpers.selectInput.first().click()

    await uiHelpers.gettingAnyDropdownItem('Polish').click()

    await uiHelpers.selectInput.last().click()

    await uiHelpers.gettingAnyDropdownItem('Single').click()

    await uiHelpers.gettingInputByIndex(9).fill(formattedDate)

    await startPage.getByText('Male', { exact: true }).click()

    await uiHelpers.gettingInputByIndex(10).fill(user.military)

    await startPage.getByText('Yes').click()

})

test('Adding user personassl data', async ({ page }) =>{



    await employeeCreation.gettingFirstUser()

    const middleName = faker.person.firstName()

    const otherId = faker.number.int({min: 1000, max: 9999 })

    const driverL = faker.string.alphanumeric({length: {min: 8, max: 11}})

    await employeeCreation.gettingInputByIndex(2).fill(middleName)

    console.log(middleName)

    await employeeCreation.gettingInputByIndex(5).fill(String(otherId))

    console.log(otherId)

    await employeeCreation.gettingInputByIndex(6).fill(driverL)

    console.log(driverL)

    await employeeCreation.calendarAddingDate()

    await employeeCreation.addingAndorranNationality()
    
    await employeeCreation.settingOtherMatrialStatus()

    await employeeCreation.gettingInputByIndex(8).fill('1987-12-12')

    await employeeCreation.settingMaleGender()
    
    await employeeCreation.settingBloodType()

    await employeeCreation.gettingInputByIndex(9).fill('This is just a test.')

    await employeeCreation.addButton.click()

    await page.locator('input[type=file]').setInputFiles('pictures/my_pic.jpg')

    await page.getByRole('button', { name: 'Save' }).nth(2).click() // This has to has a selector in class
    
    await expect(employeeCreation.successToastMessage).toBeVisible()

    console.log('Adding user personal data test has passed :)')
    
})


test.skip('Successfull edit of the user data', async({page}) =>{

    await employeeCreation.gettingFirstUser()

    await employeeCreation.gettingInputByIndex(1).fill('')

    await employeeCreation.gettingInputByIndex(1).fill('Teddy')

    await employeeCreation.gettingInputByIndex(3).fill('Junior')

    await expect(employeeCreation.gettingInputByIndex(1)).toHaveValue('Teddy')

    await expect(employeeCreation.gettingInputByIndex(3)).toHaveValue('Junior')

    await employeeCreation.noValidMessage()

    await employeeCreation.saveAdditionalButton.click()

    await expect(employeeCreation.successUpdatedToast).toBeVisible()

    await page.reload()

    await expect(page.getByRole('heading').nth(1)).toHaveText('Teddy Junior')

})


test.skip('Unsuccessfull edit of the user data', async({page}) =>{

    const employeeCreation = new EmployeeDetails(page)

    await employeeCreation.gettingFirstUser()

    await employeeCreation.noValidMessage()

    await employeeCreation.gettingInputByIndex(1).fill('')

    await employeeCreation.gettingInputByIndex(3).fill('')

    await employeeCreation.saveAdditionalButton.click()
    
    await employeeCreation.validMessage()

    await expect(employeeCreation.successToastMessage).not.toBeVisible()

})

test.skip('Deleting a user', async ({ page }) =>{

    const user = JSON.parse(fs.readFileSync('tmp/user.json', 'utf-8')); // This 'takes' user data from the tmp file and allows to use that data later in the test (line 155)

    const employeeCreation = new EmployeeDetails(page)

    await employeeCreation.gettingInputByIndex(2).fill(String(user.Id))

    await page.getByRole('button', { name: 'Search' }).click()

    await page.getByRole('button', { name: '' }).last().click()

    await expect(page.getByText('×Are you Sure?The selected')).toBeVisible()

    await page.getByRole('button', { name: ' Yes, Delete' }).click()

    await expect(page.getByText('SuccessSuccessfully Deleted×')).toBeVisible()

    console.log("Last user has been clicked.")
})

