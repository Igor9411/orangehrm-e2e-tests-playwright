import {Page, Locator, expect} from '@playwright/test'

export class LoginPage {

    readonly page: Page

    private usernameInput: Locator
    private passwordInput: Locator
    private loginButton: Locator
    private orangeHrmBanner: Locator

    constructor(page:Page){

        this.page = page

        this.usernameInput = page.getByRole('textbox', { name: 'Username' })
        this.passwordInput = page.getByRole('textbox', { name: 'Password' })
        this.loginButton = page.getByRole('button', { name: 'Login' })
        this.orangeHrmBanner = page.getByRole('link', { name: 'client brand banner' })
    }
    

    async login(username: string, password: string){

        await this.usernameInput.fill(username)

        await this.passwordInput.fill(password)

        await this.loginButton.click()

        await expect(this.orangeHrmBanner).toBeVisible()

}

}

