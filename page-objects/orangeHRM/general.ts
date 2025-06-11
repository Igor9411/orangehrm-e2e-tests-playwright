import {Page, Locator, expect} from '@playwright/test'

export class LoginPage {

    readonly page: Page

    private usernameInput: Locator
    private passwordInput: Locator
    private loginButton: Locator
    private dashboard: Locator

    constructor(page:Page){

        this.page = page

        this.usernameInput = page.getByRole('textbox', { name: 'Username' })
        this.passwordInput = page.getByRole('textbox', { name: 'Password' })
        this.loginButton = page.getByRole('button', { name: 'Login' })
        this.dashboard = page.getByRole('heading', { name: 'Dashboard' })
    }
    
    async goto(){

        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        
    }

    async login(username: string, password: string){

        await this.usernameInput.fill(username)
        await this.passwordInput.fill(password)
        await this.loginButton.click()

}
    async dashboardVisibility(){
        
        await expect(this.dashboard).toBeVisible()

    }

}

export class NewEmployee {

    readonly page: Page

    private employeeNavigationLink : Locator
    private newEmployeeButton: Locator
    private firstNameInput: Locator
    private lastNameInput: Locator
    private employeeId: Locator
    private detailsSwitch: Locator
    private saveButton: Locator
    private successToastMessage: Locator

    constructor (page:Page){

        this.employeeNavigationLink = page.getByRole('link', { name: 'PIM' })
        this.newEmployeeButton = page.getByRole('link', { name: 'Add Employee' })
        this.firstNameInput = page.getByRole('textbox', { name: 'First Name' })
        this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' })
        this.employeeId = page.getByRole('textbox').nth(4)
        this.saveButton = page.getByRole('button', { name: 'Save' })
        this.successToastMessage = page.getByText('SuccessSuccessfully Saved×')

        
    }

    async goto(){

        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        
    }

    async newEmployee (name: string, lastname: string, id: number){

        await this.employeeNavigationLink.click()
        await this.newEmployeeButton.click()
        await this.firstNameInput.fill(name)
        await this.lastNameInput.fill(lastname)
        await this.employeeId.fill(String(id))
        await this.saveButton.click()
        await expect(this.successToastMessage).toBeVisible()
        await expect(this.firstNameInput).toContainText(name)
        await expect(this.lastNameInput).toContainText(lastname)
        await expect(this.employeeId).toContainText(String(id))

    }

    
}