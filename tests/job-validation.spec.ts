import { test, expect } from '../utils/webApp.fixture.ts'

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