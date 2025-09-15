import { Page, expect } from '@playwright/test' 
import { UiHelpers } from './uiHelpers'
import { NavigationPanel } from '../naviPanel'
import { employee, leaveName } from '../../../tests/testsData'

export class Workflow {

    readonly page: Page

    readonly uiHelpers: UiHelpers

    readonly navigationPanel: NavigationPanel

    constructor(page: Page){

        this.page = page

        this.uiHelpers = new UiHelpers(page)

        this.navigationPanel = new NavigationPanel(page)

    }

    // Employee methods

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

        await this.uiHelpers.row.filter({hasText: name}).getByRole('button', { name: '' }).first().click()

        await this.uiHelpers.deleteButton.click()

    }

    // Leave Methods

    async createLeave (text:string){

        await this.navigationPanel.getAnyNavPanelItem('Leave').click()

        await this.uiHelpers.gettingTopBarMenuItem('Configure', 'Leave Types')

        await this.uiHelpers.addButton.click()

        await this.uiHelpers.gettingInputByIndex(1).fill(text)

        await this.page.getByText('No').click()

        await this.uiHelpers.saveButton.click()

    }

    async deleteLeave (text:string){

        await this.page.goto('http://localhost:8080/web/index.php/leave/leaveTypeList')

        await this.uiHelpers.row.filter({hasText: text}).getByRole('button').first().click()

        await this.uiHelpers.deleteButton.click()

    }

    async addEntitlement (days: string){

        await this.navigationPanel.getAnyNavPanelItem('Leave').click()
        
        await this.uiHelpers.gettingTopBarMenuItem('Entitlements', 'Add Entitlements')
        
        await this.page.getByText('Individual Employee').click()
        
        await this.uiHelpers.gettingInputByIndex(1).fill(`${employee.firstName} ${employee.lastName}`)
        
        await this.uiHelpers.dropdownOptionItem.filter({hasText: `${employee.firstName} ${employee.lastName}`}).click()

        await this.uiHelpers.selectInput.click()

        await this.uiHelpers.dropdownOptionItem.filter({hasText: leaveName }).click()

        await this.uiHelpers.gettingInputByIndex(2).fill(days)

        await this.uiHelpers.saveButton.click()

        await this.uiHelpers.confimButton.click()
    }

}