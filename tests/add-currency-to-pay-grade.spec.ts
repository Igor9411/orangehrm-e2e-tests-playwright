import { test, expect } from '../utils/webApp.fixture.ts'
import { payGrade, employee } from '../testData/testsData.ts'

test('Add Currency for Pay Grade', async ({ uiHelpers, page, jobAPI,}) => {

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
