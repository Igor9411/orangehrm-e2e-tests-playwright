import { test, expect } from '../utils/webApp.fixture.ts'
import { jobTitle } from '../testData/testsData.ts'

test('Create Job via UI', async ({ startPage, workflow, uiHelpers, navigationPanel }) => { 

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










