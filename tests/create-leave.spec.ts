import { test, expect } from '../utils/webApp.fixture.ts'
import { leaveName} from '../testData/testsData.ts'


test('Create leave', async ({ startPage, uiHelpers, workflow}) => {

    await workflow.createLeave(leaveName)

    await expect(uiHelpers.successfullySavedToastMessage).toBeVisible()

    await expect(startPage.getByRole('row').filter({hasText: leaveName})).toBeVisible()

    await workflow.deleteLeave(leaveName)

})

