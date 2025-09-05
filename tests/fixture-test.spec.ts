import { test, expect } from '../tests/fixtures/webApp.fixture.ts'

test('fixture creation', async ({ webApp }) => {

    await expect(webApp).toHaveURL('http://localhost:8080/web/index.php/dashboard/index')

    await expect(webApp.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
})
