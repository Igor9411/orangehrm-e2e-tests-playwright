import { Page, Locator, expect, test } from '@playwright/test'
import { UiHelpers } from '../page-objects/orangeHRM/helpers/uiHelpers'
import { NavigationPanel } from '../page-objects/orangeHRM/naviPanel.ts'
import { Leave } from '../page-objects/orangeHRM/leave.ts'
import { faker } from '@faker-js/faker'

let jobTitle = faker.person.jobTitle()

let gettingUiElements: UiHelpers 

let navRedirection: NavigationPanel

let leave: Leave

test('Adding a job', async ({ page })=>{

    gettingUiElements = new UiHelpers (page)
    
    navRedirection = new NavigationPanel (page)

    leave = new Leave (page)

    await page.goto('')

    await navRedirection.getAnyNavPanelItem('Admin').click()

    await gettingUiElements.gettingAnyTopBarItem('Job').click()

    await gettingUiElements.gettingAnyTopBarMenuItem('Job Titles').click()

    await leave.leaveTypeAddButton.click()

    await expect(page.getByRole('heading').last()).toHaveText('Add Job Title')

    await gettingUiElements.gettingInputByIndex(1).fill('a very long name of a title of a job')

    await gettingUiElements.gettingInputByIndex(2).fill(`This is a description of a ${jobTitle}.`)

    await page.locator('input[type=file]').setInputFiles('documents/job-add-example.pdf')

    await gettingUiElements.gettingInputByIndex(3).fill(`This is a note of a ${jobTitle} and it is a little bit longer than a description and much longer then the title.`)

    await leave.saveButton.click()

    await expect(page.getByText('SuccessSuccessfully Saved×')).toBeVisible() // This locator has to be added to uihelerps class.

    await expect(page.getByRole('row', { name: ` ${jobTitle}` })).toBeVisible()

})