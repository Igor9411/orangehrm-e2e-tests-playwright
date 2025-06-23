import {Page, Locator, expect} from '@playwright/test'

export class NewEmployee {

    readonly page: Page

    firstNameInput: Locator
    lastNameInput: Locator
    employeeId: Locator
    saveButton: Locator
    personalDetailsPanel: Locator

    private newEmployeeButton: Locator
    private successToastMessage: Locator
     

    constructor (page:Page){

        this.newEmployeeButton = page.getByRole('link', { name: 'Add Employee' })
        this.firstNameInput = page.getByRole('textbox', { name: 'First Name' })
        this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' })
        this.employeeId = page.getByRole('textbox').nth(4)
        this.saveButton = page.getByRole('button', { name: 'Save' })
        this.successToastMessage = page.getByText('SuccessSuccessfully Saved×')
        this.personalDetailsPanel = page.getByText('Personal DetailsEmployee Full')

        
    }


    async newEmployee (name: string, lastname: string, id: number){

        await this.newEmployeeButton.click()
        await this.firstNameInput.fill(name)
        await this.lastNameInput.fill(lastname)
        await this.employeeId.fill(String(id))
        await this.saveButton.click()
        await expect(this.successToastMessage).toBeVisible()
        

    }

    async employeeVerification (name: string, lastname: string, id: number){

        await this.personalDetailsPanel.waitFor({state :'visible'})
        await expect(this.firstNameInput).toHaveValue(name)
        console.log(await this.firstNameInput.inputValue())
        await expect(this.lastNameInput).toHaveValue(lastname)
        console.log(await this.lastNameInput.inputValue())
        await expect(this.employeeId).toHaveValue(String(id))
        console.log(await this.employeeId.inputValue())

        

    }
    
}

export class PersonalDetails {

    readonly newEmployee: NewEmployee

    middleName: Locator
    otherId: Locator
    driverSLicense: Locator
    licenseExpirtDate: Locator
    calendar: Locator
    monthDropdown: Locator
    calendarRightArrow: Locator

    constructor(page:Page){

        this.middleName = page.getByRole('textbox', { name: 'Middle Name' })
        this.otherId = page.locator('div').filter({ hasText: /^Employee IdOther Id$/ }).getByRole('textbox').nth(1) // This selector is acceptable but could be better (like a label or getbyrole)
        this.driverSLicense = page.locator('div').filter({ hasText: /^Driver's License NumberLicense Expiry Date$/ }).getByRole('textbox').first() // This selector is acceptable but could be better (like a label or getbyrole)
        this.licenseExpirtDate = page.locator('div').filter({ hasText: /^License Expiry Date$/ }).first() // This selector is acceptable but could be better (like a label or getbyrole)
        this.calendar = page.locator('.oxd-date-input-calendar')
        this.monthDropdown = page.locator('.oxd-calendar-selector-month-selected')
        this.calendarRightArrow = page.getByRole('button', { name: '' })


        this.newEmployee = new NewEmployee(page) // this is locator from class NewEmployee

    }

    async addingPersonalData(midName: string, id: number, driver: string ){

        await expect(this.newEmployee.personalDetailsPanel).toBeVisible()

        await this.middleName.fill(midName)
        console.log(midName)

        await this.otherId.fill(String(id))
        console.log(id)

        await this.driverSLicense.fill(driver)
        console.log(driver)

        await this.licenseExpirtDate.click()

        await expect(this.calendar).toBeVisible()

        await this.monthDropdown.click()



    }

}

export class EditingPersonalDetails {

    readonly newEmployee:  NewEmployee // This links to different class

    constructor(page: Page){

        this.newEmployee = new NewEmployee(page) // This links to method from the different class
    }

    async testFunction (){

        await this.newEmployee.firstNameInput.fill("test") // This links to locator from the method from different class
        console.log('The test has passed :)')

        
    }

}