import {Page, Locator, expect} from '@playwright/test'

export class NewEmployee {

    readonly page: Page

    private employeeNavigationLink : Locator
    private newEmployeeButton: Locator
    private firstNameInput: Locator
    private lastNameInput: Locator
    private employeeId: Locator
    private saveButton: Locator
    private successToastMessage: Locator
    private personalDetailsPanel: Locator

    constructor (page:Page){

        this.employeeNavigationLink = page.getByRole('link', { name: 'PIM' })
        this.newEmployeeButton = page.getByRole('link', { name: 'Add Employee' })
        this.firstNameInput = page.getByRole('textbox', { name: 'First Name' })
        this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' })
        this.employeeId = page.getByRole('textbox').nth(4)
        this.saveButton = page.getByRole('button', { name: 'Save' })
        this.successToastMessage = page.getByText('SuccessSuccessfully Saved×')
        this.personalDetailsPanel = page.getByText('Personal DetailsEmployee Full')

        
    }

    async newEmployee (name: string, lastname: string, id: number){

        await this.employeeNavigationLink.click()
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