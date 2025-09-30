import { test, expect } from '../tests/fixtures/webApp.fixture.ts'
import { jobTitle, payGrade, employee } from './testsData.ts'

test('Job Workflow', async ({ startPage, workflow, uiHelpers, navigationPanel }) => { 

    await navigationPanel.getAnyNavPanelItem('Admin').click()

    await uiHelpers.gettingTopBarMenuItem('Job', 'Job Titles')

    await workflow.createJob()

    await expect(uiHelpers.successfullySavedToastMessage).toBeVisible()

    await expect(uiHelpers.row.filter({hasText: jobTitle})).toBeVisible()

    await workflow.deleteRow(jobTitle)

    await expect(uiHelpers.deleteConfirmationToastMessage).toBeVisible()

    await startPage.getByRole('row', { name: ' Job Titles  Job' }).waitFor({ state: 'visible' })

    await expect(uiHelpers.row.filter({hasText: jobTitle})).not.toBeVisible()

})

test('Job Validation', async ({ startPage, workflow, uiHelpers, navigationPanel }) => { 

    await navigationPanel.getAnyNavPanelItem('Admin').click()

    await uiHelpers.gettingTopBarMenuItem('Job', 'Job Titles')

    await workflow.createJob()

    await workflow.createJob()

    await expect(startPage.getByText('Already exists')).toBeVisible()

    await expect(startPage).toHaveURL(/saveJobTitle/)

    await uiHelpers.cancelButton.click()

    await workflow.deleteRow(jobTitle)

})

test('Add new pay grade', async ({ startPage, uiHelpers, workflow, navigationPanel }) => {

    await navigationPanel.getAnyNavPanelItem('Admin').click()

    await uiHelpers.gettingTopBarMenuItem('Job', 'Pay Grades')

    await workflow.createPayGrade()

    await uiHelpers.addButton.click()

    await expect(startPage.getByText('Add CurrencyCurrency-- Select')).toBeVisible()

    await uiHelpers.selectInput.click()

    await startPage.getByRole('option', { name: 'PLN - Polish Zloty' }).click()

    await uiHelpers.gettingInputByIndex(2).fill(String(employee.minSalary))

    await uiHelpers.gettingInputByIndex(3).fill(String(employee.maxSalary))

    await uiHelpers.saveButton.last().click()

    await expect(uiHelpers.successfullySavedToastMessage).toBeVisible()

    await expect(startPage.getByRole('cell', { name: 'Polish Zloty' })).toBeVisible()
    
    await uiHelpers.cancelButton.click()

    await workflow.deleteRow(payGrade)

    await expect(uiHelpers.deleteConfirmationToastMessage).toBeVisible()

    await startPage.getByRole('row', { name: ' Name Currency Actions' }).waitFor({ state: 'visible' })

    await expect(uiHelpers.row.filter({hasText: payGrade})).not.toBeVisible()

})



