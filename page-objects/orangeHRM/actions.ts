import {Page, Locator, expect} from '@playwright/test'

export class EmployeeDetails {

    readonly page:Page

    // readonly newEmployee: NewEmployee

    // These locators are frome the previous class - NewEmployee
    firstNameInput: Locator
    lastNameInput: Locator
    employeeId: Locator
    saveButton: Locator
    personalDetailsPanel: Locator

    private newEmployeeButton: Locator
    private successToastMessage: Locator
    // These locators are frome the previous class - NewEmployee

    middleName: Locator
    otherId: Locator
    driverSLicense: Locator
    licenseExpirtDate: Locator // this is an input that opens up the license calendar but can be deleted
    calendar: Locator // this is a calendar by itself
    monthSeptember: Locator
    dayTen: Locator
    monthDropdown: Locator
    nationalityDropdown: Locator
    nationalityItem: Locator
    martialStatusDropdown: Locator
    martialStatusItem: Locator
    birthCalendar: Locator // this is input that has to be clicked to open a calendar
    maleGender: Locator
    bloodDropdown: Locator
    bloodItem: Locator
    testField: Locator
    addButton: Locator

    textBoxLocator:Locator
    

    constructor(page:Page){

        this.page = page

        this.newEmployeeButton = page.getByRole('link', { name: 'Add Employee' })
        this.firstNameInput = page.getByRole('textbox', { name: 'First Name' })
        this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' })
        this.employeeId = page.getByRole('textbox').nth(4)
        this.saveButton = page.getByRole('button', { name: 'Save' })
        this.successToastMessage = page.getByText('SuccessSuccessfully Saved×')
        this.personalDetailsPanel = page.getByText('Personal DetailsEmployee Full')
        // Locators above are from previos class - NewEmployee

        this.middleName = page.getByRole('textbox', { name: 'Middle Name' })
        this.otherId = page.locator('div').filter({ hasText: /^Employee IdOther Id$/ }).getByRole('textbox').nth(1) // This selector is acceptable but could be better (like a label or getbyrole)
        this.driverSLicense = page.locator('div').filter({ hasText: /^Driver's License NumberLicense Expiry Date$/ }).getByRole('textbox').first() // This selector is acceptable but could be better (like a label or getbyrole)
        this.licenseExpirtDate = page.getByPlaceholder('yyyy-dd-mm').nth(0) // This locator is found using getByPlaceholder function
        this.calendar = page.locator('.oxd-date-input-calendar')
        this.monthDropdown = page.locator('.oxd-calendar-selector-month-selected')
        this.monthSeptember = page.getByText('September') // This is too specific and do not need to be in the class but for the sake of this test they are added here
        this.dayTen = page.getByText('10') // This is too specific and do not need to be in the class but for the sake of this test they are added here
        this.nationalityDropdown = page.locator('.oxd-select-text').first() // This locator is the first one with the name of.oxd-select-text
        this.nationalityItem = page.locator('.oxd-select-option').nth(5) // This selector picks the 5th item from the dropdown
        this.martialStatusDropdown = page.locator('.oxd-select-text').nth(1) // This locator is the second one with the name of.oxd-select-text
        this.martialStatusItem = page.locator('.oxd-select-option').last() // This selector picks the last item from the dropdown
        this.birthCalendar = page.getByPlaceholder('yyyy-dd-mm').nth(1) // This locator is found using getByPlaceholder function
        this.maleGender = page.getByText('Male', {exact: true})
        this.bloodDropdown = page.locator('.oxd-select-text').last()
        this.bloodItem = page.locator('.oxd-select-text').nth(2)
        this.testField = page.locator('.oxd-input.oxd-input--active').last()
        this.addButton = page.getByRole('button', { name: ' Add' })
        
        // this.newEmployee = new NewEmployee(page) // this is locator from class NewEmployee

    }

    async creatingNewEmployee (name: string, lastname: string, id: number){

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

    // These two methods above are from previos class - NewEmployee

    }

    async addingPersonalData(midName: string, id: number, driver: string ){

        await expect(this.personalDetailsPanel).toBeVisible()

        await this.middleName.fill(midName)
        console.log(midName)

        await this.otherId.fill(String(id))
        console.log(id)

        await this.driverSLicense.fill(driver)
        console.log(driver)

        await this.licenseExpirtDate.click()

        await expect(this.calendar).toBeVisible()

        await this.monthDropdown.click()

        await this.monthSeptember.click()

        await this.dayTen.click()

        await expect(this.licenseExpirtDate).toHaveValue('2025-10-09')

        await this.nationalityDropdown.click()

        await this.nationalityItem.click()

        await this.martialStatusDropdown.click()

        await this.martialStatusItem.click()

        await this.maleGender.click()

        await this.bloodDropdown.click()

        await this.bloodItem.click()

        await expect(this.bloodDropdown).toHaveValue('A-')

        await this.testField.fill('This is not a test.')

        await this.addButton.click()

    }

// This below is an example on how to use one locator for many inputs, it requires:
// 1. Constructor with this.page = page
// 2. Index as a parameter
// 3. No async before method name and Locator at the end of first line (has to be check if it is a must or just a possibility)
// 4. Maybe sth more, add when you know

    gettingInputByIndex(index: number): Locator{

        return this.page.getByRole('textbox').nth(index) 

}

}

export class EditingPersonalDetails {

    readonly newEmployee:  EmployeeDetails // This links to different class

    constructor(page: Page){

        this.newEmployee = new EmployeeDetails(page) // This links to method from the different class
        
    }

    async testFunction (){

        await this.newEmployee.firstNameInput.fill("test") // This links to locator from the method from different class
        console.log('The test has passed :)')

        
    }

}
