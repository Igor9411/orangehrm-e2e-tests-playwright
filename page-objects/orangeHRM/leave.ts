import { Page, Locator, expect } from '@playwright/test'
import { EmployeeDetails } from '../orangeHRM/actions'

export class Leave {

    readonly page:Page

    dropdownItem: Locator

    constructor(page: Page){

        this.page = page

        this.dropdownItem = page.getByRole('option')
    }


    async gettingSpecificUser ( index:number, name:string ): Promise<void>{

        const employeeDetails = new EmployeeDetails(this.page)

        const gettingInput = employeeDetails.gettingInputByIndex(index)

        await gettingInput.fill(name)

        await expect(this.dropdownItem.filter({ hasText: name })).toBeVisible()

        await this.dropdownItem.filter({ hasText: name }).click()

    }

}