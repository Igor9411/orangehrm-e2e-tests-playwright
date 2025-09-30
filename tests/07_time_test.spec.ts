import { test, expect } from './fixtures/webApp.fixture.ts'
import { employee, customerName, projectName, activity} from './testsData.ts'

test('Timesheet and project workflow', async ({ workflow, startPage, navigationPanel, uiHelpers}) =>{

    test.setTimeout(40000)

    await workflow.createEmployee(employee.firstName, employee.lastName, employee.Id)

    await navigationPanel.getAnyNavPanelItem('Time').click()

    await uiHelpers.gettingTopBarMenuItem('Project Info', 'Projects')

    await uiHelpers.addButton.click()

    await workflow.createProject()

    await expect(uiHelpers.successfullySavedToastMessage).toBeVisible()

    await startPage.getByText('Edit ProjectNameCustomer Name').waitFor({state: 'visible'})

    await workflow.createActivity()

    await uiHelpers.gettingTopBarMenuItem('Timesheets', 'Employee Timesheets')

    await uiHelpers.gettingInputByIndex(1).fill(`${employee.firstName} ${employee.lastName}`)

    await uiHelpers.gettingAnyDropdownItem(`${employee.firstName} ${employee.lastName}`).click()

    await startPage.getByRole('button', { name: 'View' }).first().click()

    await startPage.getByRole('button', { name: 'Create Timesheet' }).click()

    await startPage.getByRole('button', { name: 'Edit' }).click()

    await uiHelpers.gettingInputByIndex(1).fill(`${customerName}`)

    await uiHelpers.gettingAnyDropdownItem(`${customerName} - ${projectName} PROJECT`).click()

    await uiHelpers.selectInput.click()

    await uiHelpers.gettingAnyDropdownItem(activity).click()

    for (let i = 2; i < 7; i++){

        await uiHelpers.gettingInputByIndex(i).fill('08:00')

    }

    await uiHelpers.saveButton.click()

    await expect(uiHelpers.successfullySavedToastMessage).toBeVisible()

    // await workflow.deleteEmployee(employee.firstName)

    await navigationPanel.getAnyNavPanelItem('Time').click()

    await uiHelpers.gettingTopBarMenuItem('Project Info', 'Projects')

    await uiHelpers.row.filter({hasText: customerName}).getByRole('button').first().click()

    await expect(uiHelpers.notAllowToDeleteToastMessage).toBeVisible()

})



