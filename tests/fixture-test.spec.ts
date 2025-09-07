import { test, expect } from '../tests/fixtures/webApp.fixture.ts'

test('fixture creation', async ({ webApp, page }) => {

    await expect(page).toHaveURL('http://localhost:8080/web/index.php/dashboard/index')

    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
})
