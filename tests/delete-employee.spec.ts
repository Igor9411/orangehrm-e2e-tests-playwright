import { test, expect } from '../utils/webApp.fixture.ts'
import { employee } from '../testData/testsData.ts'


test('Delete employee', async ({ startPage, workflow, uiHelpers, employeeApi }) =>{

    await employeeApi.postEmployee(200)

    await workflow.deleteEmployee(employee.firstName)

    await expect(uiHelpers.deleteConfirmationToastMessage).toBeVisible()

    await startPage.getByRole('row', { name: ' Id  First (& Middle) Name' }).waitFor({ state: 'visible' })

    await expect(uiHelpers.row.filter({hasText: employee.firstName})).not.toBeVisible()

})