import { Page, expect } from '@playwright/test' 
import { UiHelpers } from './uiHelpers'
import { NavigationPanel } from '../naviPanel'

export class Workflow {

    readonly page: Page

    readonly uiHelpers: UiHelpers

    readonly navigationPanel: NavigationPanel

    constructor(page: Page){

        this.page = page

        this.uiHelpers = new UiHelpers(page)

        this.navigationPanel = new NavigationPanel(page)

    }

    async createEmployee (name: string, lastName: string, id:number){

        await this.navigationPanel.getAnyNavPanelItem('PIM').click()

        await this.uiHelpers.addButton.click()

        await this.uiHelpers.gettingInputByIndex(1).fill(name)

        await this.uiHelpers.gettingInputByIndex(3).fill(lastName)

        await this.uiHelpers.gettingInputByIndex(4).fill(String(id))

        await this.uiHelpers.saveButton.click()

        await expect(this.uiHelpers.successfullySavedToastMessage).toBeVisible()

    }

}