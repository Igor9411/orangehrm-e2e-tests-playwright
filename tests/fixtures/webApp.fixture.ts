import { test as base, Page } from '@playwright/test'
import { UiHelpers } from '../../page-objects/orangeHRM/helpers/uiHelpers'
import { NavigationPanel } from '../../page-objects/orangeHRM/naviPanel'
import { Workflow } from '../../page-objects/orangeHRM/helpers/workflows'
import { employee, leaveName} from '../testsData'
export { expect } from '@playwright/test'
import { EmployeeApi } from '../../page-objects/orangeHRM/api/employeeAPI'
import { LeaveApi } from '../../page-objects/orangeHRM/api/leaveAPI'
import { APILogger } from '../../utils/logger'

const USERNAME = process.env.ORANGE_USERNAME ?? ''
const PASSWORD = process.env.ORANGE_PASSWORD ?? ''

type myFixtures = {

    webApp: Page
    startPage: Page
    leavePage: Page
    uiHelpers: UiHelpers
    navigationPanel: NavigationPanel
    workflow: Workflow
    api: EmployeeApi
    employeeApi: EmployeeApi
    leaveAPI: LeaveApi
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

    leavePage: async ({page, workflow}, use: (fixture: Page) => Promise<void>) => {

        await page.goto('')

        await workflow.createLeave(leaveName)

        await workflow.createEmployee(employee.firstName, employee.lastName, employee.Id)
    
        await use(page)

        await workflow.deleteLeave(leaveName)

        await workflow.deleteEmployee(employee.firstName)
        
    },
    
    api: async ({request}, use) => {

        const logger = new APILogger()

        await use(new EmployeeApi(request, logger))

    },

    employeeApi: async ({api}, use) => {

        await api.postEmployee(200)

        await api.putEmployee(200)

        await api.getEmployees(200)

        await use(api)

        await api.deleteEmployee(200)

        await api.getEmployees(200)

    },

    leaveAPI: async ({request}, use) => {

        const logger = new APILogger()

        const leave = new LeaveApi(request, logger)

        await use (leave)

    }
})