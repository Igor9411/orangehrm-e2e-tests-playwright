import { test, expect } from '../tests/fixtures/webApp.fixture.ts'
import { employee } from '../utils/testsData.ts'

test('Check get', async ({ request, employeeApiTest}) => {

console.log('dupa')

})

test('Fixture post and put', async ({ employeeApiTest, page, navigationPanel }) =>{

    await page.goto('')

    await navigationPanel.getAnyNavPanelItem('PIM').click()

})

test('A proper test using api', async ({employeeApiTest, startPage, navigationPanel}) => {

    await expect(startPage.getByRole('heading', { name: 'Dashboard' })).toBeVisible()

    await navigationPanel.getAnyNavPanelItem('PIM').click()

    await startPage.getByText(`${employee.Id}`).click()

    await expect(startPage.getByRole('heading').filter({ hasText: `${employee.firstName} ${employee.lastName}`})).toBeVisible() 

})

test('Leave api', async ({ jobAPI }) => {

    await jobAPI.getPayGrades(200)

    await jobAPI.postPayGrade(200)

    await jobAPI.deletePayGrade(200)

    await jobAPI.getPayGrades(200)

})