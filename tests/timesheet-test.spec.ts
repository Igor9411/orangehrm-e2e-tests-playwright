import { test, expect } from '../utils/webApp.fixture.ts'
import { employee, customerName, projectName, activity} from '../testData/testsData.ts'

const timesheetDays = 7

const firstTwoPageElements = 2

test('Timesheet and project workflow', async ({ workflow, startPage, navigationPanel, uiHelpers, employeeApi}) =>{

    await employeeApi.postEmployee(200)

    await navigationPanel.getAnyNavPanelItem('Time').click()

    await uiHelpers.gettingTopBarMenuItem('Project Info', 'Projects')

    await uiHelpers.addButton.click()

    await workflow.createProject()

    await expect(uiHelpers.successfullySavedToastMessage).toBeVisible()

    await startPage.getByText('Edit ProjectNameCustomer Name').waitFor({state: 'visible'})

    await workflow.createActivity()

    await uiHelpers.gettingTopBarMenuItem('Timesheets', 'Employee Timesheets')

    await uiHelpers.gettingInputByIndex(1).fill(`${employee.firstName} ${employee.lastName}`)

    await uiHelpers.gettingAnyDropdownItem(`${employee.firstName} ${employee.middleName} ${employee.lastName}`).click()

    await startPage.getByRole('button', { name: 'View' }).first().click()

    await startPage.getByRole('button', { name: 'Create Timesheet' }).click()

    await startPage.getByRole('button', { name: 'Edit' }).click()

    await uiHelpers.gettingInputByIndex(1).fill(`${customerName}`)

    await uiHelpers.gettingAnyDropdownItem(`${customerName} - ${projectName} PROJECT`).click()

    await uiHelpers.selectInput.click()

    await uiHelpers.gettingAnyDropdownItem(activity).click()

    for (let i = firstTwoPageElements; i < timesheetDays; i++){

        await uiHelpers.gettingInputByIndex(i).fill('08:00')

    }

    await uiHelpers.saveButton.click()

    await expect(uiHelpers.successfullySavedToastMessage).toBeVisible()

    await employeeApi.deleteEmployee(200)

    await navigationPanel.getAnyNavPanelItem('Time').click()

    await uiHelpers.gettingTopBarMenuItem('Project Info', 'Projects')

    await uiHelpers.row.filter({hasText: customerName}).getByRole('button').first().click()

    await expect(uiHelpers.notAllowToDeleteToastMessage).toBeVisible()

})





