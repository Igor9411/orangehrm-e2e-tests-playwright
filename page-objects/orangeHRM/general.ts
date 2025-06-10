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

