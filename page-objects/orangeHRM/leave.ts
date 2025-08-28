import { Page, Locator, expect } from '@playwright/test'
import { EmployeeDetails } from '../orangeHRM/actions'
import { UiHelpers } from '../orangeHRM/helpers/uiHelpers'

export class Leave {

    readonly page:Page

    readonly gettingUiElements: UiHelpers

    dropdownItem: Locator

    monthPicker: Locator

    individualEmployeeRadioButton: Locator

    noRadioButton: Locator

    constructor(page: Page){

        this.gettingUiElements = new UiHelpers (page)

        this.page = page

        this.dropdownItem = page.getByRole('option')

        this.monthPicker = page.locator('.oxd-select-text-input') // This one also applies to leave type input selector 

        this.individualEmployeeRadioButton = page.getByText('Individual Employee')
        
        this.noRadioButton = page.getByText('No')
    }


    async gettingSpecificUser ( index:number, name:string ): Promise<void>{

        const employeeDetails = new EmployeeDetails(this.page)

        const gettingInput = employeeDetails.gettingInputByIndex(index)

        await gettingInput.fill(name)

        await expect(this.dropdownItem.filter({ hasText: name })).toBeVisible()

        await this.dropdownItem.filter({ hasText: name }).click()

    }

    async leaveConfiguration (){

        const uiHelper = new UiHelpers(this.page)

        await this.monthPicker.first().click()

        await uiHelper.gettingAnyDropdownItem('January').click()

        await this.monthPicker.last().click()

        await uiHelper.gettingAnyDropdownItem('01').click()

        await this.gettingUiElements.saveButton.click()

    }

    async creatingLeaveType ( text:string){

        const employeeDetails = new EmployeeDetails(this.page)

        await employeeDetails.gettingInputByIndex(1).fill(text)

        await this.noRadioButton.click()

        await this.gettingUiElements.saveButton.click()

    }

}
