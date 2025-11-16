import { test, expect } from '../tests/fixtures/webApp.fixture.ts'
import { employee } from './testsData.ts'

test('Check get', async ({ request, employeeApi}) => {

console.log('dupa')

})

test('Fixture post and put', async ({ employeeApi, page, navigationPanel }) =>{

    await page.goto('')

    await navigationPanel.getAnyNavPanelItem('PIM').click()

})

test('A proper test using api', async ({employeeApi, startPage, navigationPanel}) => {

    await expect(startPage.getByRole('heading', { name: 'Dashboard' })).toBeVisible()

    await navigationPanel.getAnyNavPanelItem('PIM').click()

    await startPage.getByText(`${employee.Id}`).click()

    await expect(startPage.getByRole('heading').filter({ hasText: `${employee.firstName} ${employee.lastName}`})).toBeVisible() 

})

test('Leave api', async ({ leaveAPI }) => {

    

    await leaveAPI.postLeave(200)

    await leaveAPI.deleteLeave(200)

    await leaveAPI.getLeaves(200)

})