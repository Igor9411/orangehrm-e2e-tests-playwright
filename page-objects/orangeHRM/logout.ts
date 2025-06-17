import {Page, Locator, expect} from '@playwright/test'

export class LogOutPage {

    readonly page: Page

    private banner: Locator
    private logoutItem : Locator

    constructor (page:Page){

        this.banner = page.getByRole('banner').getByRole('img', { name: 'profile picture' })
        this.logoutItem = page.getByRole('menuitem', { name: 'Logout' })
    }

    async logout (){

        await this.banner.click()
        await this.logoutItem.click()
        console.log('User has successfully logged out of the page.')
    }
    

}