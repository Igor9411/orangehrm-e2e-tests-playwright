import { test, expect,} from '@playwright/test';
import { UiHelpers } from '../page-objects/orangeHRM/helpers/uiHelpers.ts'
import { faker } from '@faker-js/faker'
import { NavigationPanel } from '../page-objects/orangeHRM/naviPanel.ts';

let gettingUiElements: UiHelpers 

let navRedirection: NavigationPanel

let payGrade = faker.person.jobType()

let minSalary = faker.number.int( {min: 1000, max: 3000})

let maxSalary = faker.number.int( {min:3000, max: 5500})


test('Add new pay grade', async ({ page }) => {

    gettingUiElements = new UiHelpers (page)
        
    navRedirection = new NavigationPanel (page)

    await page.goto('')

    await navRedirection.getAnyNavPanelItem('Admin').click()

    await gettingUiElements.gettingAnyTopBarItem('Job').click()

    await gettingUiElements.gettingAnyTopBarMenuItem('Pay Grades').click()

    await gettingUiElements.addButton.click()

    await gettingUiElements.gettingInputByIndex(1).fill(payGrade)

    await gettingUiElements.saveButton.click()

    await expect(gettingUiElements.noRecordsToastMessage).toBeVisible()

    await gettingUiElements.addButton.click()

    await page.getByText('-- Select --').click()

    await expect(page.getByText('Add CurrencyCurrency-- Select')).toBeVisible()

    await page.getByRole('option', { name: 'PLN - Polish Zloty' }).click()

    await gettingUiElements.gettingInputByIndex(2).fill(String(minSalary))

    await gettingUiElements.gettingInputByIndex(3).fill(String(maxSalary))

    await gettingUiElements.saveButton.last().click()

    await expect(gettingUiElements.successfullySavedToastMessage).toBeVisible()

})