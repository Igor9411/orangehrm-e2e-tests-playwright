import { test, expect } from '../tests/fixtures/webApp.fixture.ts'
import { jobTitle, payGrade, employee } from '../utils/testsData.ts'

test('Job Workflow UI', async ({ startPage, workflow, uiHelpers, navigationPanel }) => { 

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

test('Job Workflow API', async ({ startPage, uiHelpers, jobAPI }) => { 

    await jobAPI.postJob(200)

    await startPage.goto('http://localhost:8080/web/index.php/admin/viewJobTitleList')

    await expect(uiHelpers.row.filter({hasText: jobTitle})).toBeVisible()

    await jobAPI.deleteJob(200)

    await startPage.reload()

    await expect(uiHelpers.row.filter({hasText: jobTitle})).not.toBeVisible()

})

test('Job Validation', async ({ startPage, workflow, uiHelpers, navigationPanel, jobAPI }) => { 

    await jobAPI.postJob(200)

    await navigationPanel.getAnyNavPanelItem('Admin').click()

    await uiHelpers.gettingTopBarMenuItem('Job', 'Job Titles')

    await workflow.createJob()

    await expect(startPage.getByText('Already exists')).toBeVisible()

    await expect(startPage).toHaveURL(/saveJobTitle/)

    await uiHelpers.cancelButton.click()

    await jobAPI.deleteJob(200)

})

test('Pay Grade Workflow', async ({ startPage, uiHelpers, workflow, navigationPanel }) => {

    await navigationPanel.getAnyNavPanelItem('Admin').click()

    await uiHelpers.gettingTopBarMenuItem('Job', 'Pay Grades')

    await workflow.createPayGrade()

    await startPage.goto('http://localhost:8080/web/index.php/admin/viewPayGrades')

    await expect(uiHelpers.row.filter({hasText: payGrade})).toBeVisible()

    await workflow.deleteRow(payGrade)

    await expect(uiHelpers.deleteConfirmationToastMessage).toBeVisible()

    await startPage.getByRole('row', { name: ' Name Currency Actions' }).waitFor({ state: 'visible' })

    await expect(uiHelpers.row.filter({hasText: payGrade})).not.toBeVisible()

})

test('Add Currency for Pay Grade', async ({ uiHelpers, page, jobAPI}) => {

    await jobAPI.postPayGrade(200)

    await page.goto(`http://localhost:8080/web/index.php/admin/payGrade/${jobAPI.payGradeId}`)

    await uiHelpers.addButton.click()

    await expect(page.getByText('Add CurrencyCurrency-- Select')).toBeVisible()

    await uiHelpers.selectInput.click()

    await page.getByRole('option', { name: 'PLN - Polish Zloty' }).click()

    await uiHelpers.gettingInputByIndex(2).fill(String(employee.minSalary))

    await uiHelpers.gettingInputByIndex(3).fill(String(employee.maxSalary))

    await uiHelpers.saveButton.last().click()

    await expect(uiHelpers.successfullySavedToastMessage).toBeVisible()

    await expect(page.getByRole('cell', { name: 'Polish Zloty' })).toBeVisible()
    
    await uiHelpers.cancelButton.click()

    await jobAPI.deletePayGrade(200)

    await page.reload()

    await expect(uiHelpers.row.filter({hasText: payGrade})).not.toBeVisible()

})



