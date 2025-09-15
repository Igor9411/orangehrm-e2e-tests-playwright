
import { test, expect } from '../tests/fixtures/webApp.fixture.ts'
import { faker } from '@faker-js/faker'

export const user = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        middleName: faker.person.middleName(),
        Id: faker.number.int( {max: 10000} ),
        otherId: faker.number.int( {min: 1000, max: 2000} ),
        nickname: faker.internet.username(),
        driverLicense: faker.string.alphanumeric({length: {min: 8, max: 11}}),
        birthDate: faker.date.between({ from: '1955-01-01', to: '2001-12-31' }),
        military: faker.string.alpha(),
        newFirstName: faker.person.firstName(),
        newLastName: faker.person.lastName(),
        newId: faker.number.int( {max: 10000} )
    }

const formattedDate = user.birthDate.toISOString().slice(0,10)
const latin = faker.lorem.sentence()


test('Create new employee', async ({ startPage, workflow, uiHelpers }) => {

    await workflow.createEmployee(user.firstName, user.lastName, user.Id)

    await expect(uiHelpers.successfullySavedToastMessage).toBeVisible()

    await expect(startPage.getByRole('heading').filter({ hasText: `${user.firstName} ${user.lastName}`})).toBeVisible() 

    await workflow.deleteEmployee(user.firstName)
})

test('Adding employee personal data', async ({ workflow, uiHelpers, startPage }) => {

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

    await uiHelpers.addButton.click()

    await startPage.locator('input[type=file]').setInputFiles('pictures/my_pic.jpg')

    await uiHelpers.gettingInputByIndex(11).fill(latin)

    await uiHelpers.saveButton.last().click()

    await expect(uiHelpers.successfullySavedToastMessage).toBeVisible()

    await workflow.deleteEmployee(user.firstName)

})


test('Edit employee data', async({ workflow, navigationPanel, uiHelpers, startPage}) =>{

    await workflow.createEmployee(user.firstName, user.lastName, user.Id)

    await navigationPanel.getAnyNavPanelItem('PIM').click()

    await expect(uiHelpers.row.filter({hasText: user.firstName})).toBeVisible()

    await uiHelpers.row.filter({hasText: user.firstName}).click()

    await workflow.editEmployee(user.newFirstName, user.newLastName, user.newId)

    await expect(uiHelpers.succesfullyUpdatedToastMessage).toBeVisible()

    await startPage.getByRole('link', { name: 'Employee List' }).click()

    await expect(uiHelpers.row.filter({hasText: user.firstName})).not.toBeVisible()

    await workflow.deleteEmployee(user.newFirstName)
})

test('Duplicate employee cannot be created', async ({ startPage, workflow, uiHelpers }) => {

    await workflow.createEmployee(user.firstName, user.lastName, user.Id)

    await workflow.createEmployee(user.firstName, user.lastName, user.Id)

    await expect(startPage.getByText('Employee Id already exists')).toBeVisible()

    await expect(uiHelpers.succesfullyUpdatedToastMessage).not.toBeVisible()

    await expect(startPage).toHaveURL(/addEmployee/)

    await workflow.deleteEmployee(user.firstName)

})

test('Delete employee', async ({ startPage, workflow, uiHelpers }) =>{

    await workflow.createEmployee(user.firstName, user.lastName, user.Id)

    await workflow.deleteEmployee(user.firstName)

    await expect(uiHelpers.deleteConfirmationToastMessage).toBeVisible()

    await startPage.getByRole('row', { name: ' Id  First (& Middle) Name' }).waitFor({ state: 'visible' });

    await expect(uiHelpers.row.filter({hasText: user.firstName})).not.toBeVisible()

})

