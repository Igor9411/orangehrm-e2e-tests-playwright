import { test as base, Page } from '@playwright/test'
import { UiHelpers } from '../../page-objects/orangeHRM/helpers/uiHelpers'
import { NavigationPanel } from '../../page-objects/orangeHRM/naviPanel'
import { Workflow } from '../../page-objects/orangeHRM/helpers/workflows'
export { expect } from '@playwright/test'
import { EmployeeApi } from '../../page-objects/orangeHRM/api/employeeAPI'
import { LeaveApi } from '../../page-objects/orangeHRM/api/leaveAPI'
import { APILogger } from '../../utils/logger'
import { JobApi } from '../../page-objects/orangeHRM/api/jobAPI'

const USERNAME = process.env.ORANGE_USERNAME ?? ''
const PASSWORD = process.env.ORANGE_PASSWORD ?? ''

type myFixtures = {

    webApp: Page
    startPage: Page
    leavePage: Page
    uiHelpers: UiHelpers
    navigationPanel: NavigationPanel
    workflow: Workflow
    employeeApi: EmployeeApi
    employeeApiTest: EmployeeApi
    leaveAPI: LeaveApi
    jobAPI: JobApi
}


export const test = base.extend<myFixtures>({
    
    uiHelpers: async ({page}, use: (fixture: UiHelpers) => Promise<void>) => {

        await use(new UiHelpers(page))

    },

    navigationPanel: async ({page}, use: (fixture: NavigationPanel) => Promise<void>) => {

        await use(new NavigationPanel(page))

    }, 

    workflow: async ({page}, use: (fixture: Workflow) => Promise<void>) => {

        await use(new Workflow(page))
        
    },

    webApp: async ({ page, uiHelpers }, use:(fixture: any) => Promise<void>) => {

        await page.goto('')
    
        await uiHelpers.gettingInputByIndex(0).fill(USERNAME)
    
        await uiHelpers.gettingInputByIndex(1).fill(PASSWORD)
    
        await page.getByRole('button', { name: 'Login' }).click()
    
        await use(page)

    },
    
    startPage: async ({page}, use: (fixture: Page) => Promise<void>) => { // This can probably be deleted, se uihelpers fixture.

        await page.goto('')
    
        await use(page)

    },

    leavePage: async ({page, leaveAPI, employeeApi}, use: (fixture: Page) => Promise<void>) => {

        await leaveAPI.postLeave(200)

        await employeeApi.postEmployee(200)

        await page.goto('')
    
        await use(page)

        await leaveAPI.deleteLeave(200)

        await employeeApi.deleteEmployee(200)
        
    },
    
    employeeApi: async ({request}, use) => {

        const logger = new APILogger()

        await use(new EmployeeApi(request, logger))

    },

    employeeApiTest: async ({employeeApi}, use) => {

        await employeeApi.postEmployee(200)

        await employeeApi.putEmployee(200)

        await employeeApi.getEmployees(200)

        await use(employeeApi)

        await employeeApi.deleteEmployee(200)

        await employeeApi.getEmployees(200)

    },

    leaveAPI: async ({request}, use) => {

        const logger = new APILogger()

        const leave = new LeaveApi(request, logger)

        await use (leave)

    },

    jobAPI: async ({request}, use) => {

        const logger = new APILogger()

        const job = new JobApi(request, logger)

        await use (job)

    }
})