import { test, expect } from '../utils/webApp.fixture.ts'
import {  payGrade } from '../testData/testsData.ts'

test('Create Pay Grade', async ({ startPage, uiHelpers, workflow, navigationPanel }) => {

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