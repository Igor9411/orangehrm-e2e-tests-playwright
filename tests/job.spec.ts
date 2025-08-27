import { Page, Locator, expect, test } from '@playwright/test'
import { UiHelpers } from '../page-objects/orangeHRM/helpers/uiHelpers'
import { NavigationPanel } from '../page-objects/orangeHRM/naviPanel.ts'
import { Leave } from '../page-objects/orangeHRM/leave.ts'
import { faker } from '@faker-js/faker'

let gettingUiElements: UiHelpers 

let navRedirection: NavigationPanel

let leave: Leave

test.describe('Job creation/deletion and validation', () => {

    const jobTitle = faker.person.jobTitle()

test.beforeEach(async ({ page }) => {

    gettingUiElements = new UiHelpers (page)
    
    navRedirection = new NavigationPanel (page)

    leave = new Leave (page)

    await page.goto('')

    await navRedirection.getAnyNavPanelItem('Admin').click()

    await gettingUiElements.gettingAnyTopBarItem('Job').click()

    await gettingUiElements.gettingAnyTopBarMenuItem('Job Titles').click()

    await leave.leaveTypeAddButton.click()

})

test('Adding a job', async ({ page })=>{

    await expect(page.getByRole('heading').last()).toHaveText('Add Job Title')

    await gettingUiElements.gettingInputByIndex(1).fill(jobTitle)

    await gettingUiElements.gettingInputByIndex(2).fill(`This is a description of a ${jobTitle}.`)

    await page.locator('input[type=file]').setInputFiles('documents/job-add-example.pdf')

    await gettingUiElements.gettingInputByIndex(3).fill(`This is a note of a ${jobTitle} and it is a little bit longer than a description and much longer then the title.`)

    await leave.saveButton.click()

    await expect(page.getByText('SuccessSuccessfully Saved×')).toBeVisible() // This locator has to be added to uihelerps class.

    await expect(page.getByRole('row', { name: ` ${jobTitle}` })).toBeVisible()

    console.log(jobTitle)

})

test('Validation for duplicate job title', async ({ page }) => {

    await gettingUiElements.gettingInputByIndex(1).fill(jobTitle)

    await leave.saveButton.click()

    await expect(page.getByText('SuccessSuccessfully Saved×')).not.toBeVisible()

    await expect(page.getByText('Already exists')).toBeVisible()

    await expect(page).toHaveURL('http://localhost:8080/web/index.php/admin/saveJobTitle')

    console.log(jobTitle)

})

test('Deletion of a job', async ({ page }) => {

    const jobTitleRow = page.getByRole('row', { name: ` ${jobTitle}` })

    await page.goBack()

    await expect(page).toHaveURL('http://localhost:8080/web/index.php/admin/viewJobTitleList')

    await jobTitleRow.getByRole('button').first().click()

    await expect(gettingUiElements.confirmationDialog).toBeVisible()

    await gettingUiElements.dialogDeleteButton.click()

    await expect(gettingUiElements.deleteConfirmationToastMessage).toBeVisible()

    await expect(jobTitleRow).not.toBeVisible()

})



})