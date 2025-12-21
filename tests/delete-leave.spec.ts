import { test, expect } from '../utils/webApp.fixture'
import { leaveName} from '../testData/testsData.ts'

test('Delete leave', async ({ startPage, uiHelpers, workflow}) => {

    await workflow.createLeave(leaveName)

    await workflow.deleteLeave(leaveName)

    await expect(uiHelpers.deleteConfirmationToastMessage).toBeVisible()

    await startPage.getByRole('row', { name: ' Name Actions' }).waitFor({state: 'visible'})

    await expect(uiHelpers.row.filter({hasText: leaveName})).not.toBeVisible()

})