import { test, expect } from '../utils/webApp.fixture.ts'
import { jobTitle } from '../testData/testsData.ts'

test('Create job via API', async ({ startPage, uiHelpers, jobAPI }) => { 

    await jobAPI.postJob(200)

    await startPage.goto('http://localhost:8080/web/index.php/admin/viewJobTitleList')

    await expect(uiHelpers.row.filter({hasText: jobTitle})).toBeVisible()

    await jobAPI.deleteJob(200)

    await startPage.reload()

    await expect(uiHelpers.row.filter({hasText: jobTitle})).not.toBeVisible()

})