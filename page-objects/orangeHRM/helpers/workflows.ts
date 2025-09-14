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

    }

    async editEmployee(name: string, lastName: string, id:number){

        await this.uiHelpers.gettingInputByIndex(1).fill(name)

        await this.uiHelpers.gettingInputByIndex(3).fill(lastName)

        await this.uiHelpers.gettingInputByIndex(5).fill(String(id))

        await this.uiHelpers.saveButton.first().click()

    }

    async deleteEmployee (name:string){

        await this.navigationPanel.getAnyNavPanelItem('PIM').click()

        await this.uiHelpers.employeeRow.filter({hasText: name}).getByRole('button', { name: '' }).first().click()

        await this.uiHelpers.deleteButton.click()

    }

}