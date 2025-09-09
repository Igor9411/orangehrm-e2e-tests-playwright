import { test as setup, expect } from '../tests/fixtures/webApp.fixture.ts'

setup('Write login session data', async({ webApp }) => {
        
    await expect(webApp).toHaveURL(/dashboard\/index/) // This instead of the full link - http://localhost:8080/web/index.php/dashboard/index'
    
    await expect(webApp.getByRole('heading', { name: 'Dashboard' })).toBeVisible()

    await webApp.context().storageState({ path: '.auth/login.json'})
        
})