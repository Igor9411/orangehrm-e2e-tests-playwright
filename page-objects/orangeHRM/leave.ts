import { Page, Locator, expect } from '@playwright/test'

export class Leave {

    readonly page:Page

    menuItem: Locator

    constructor(page){

        this.page = page

        this.menuItem = page.getByRole('menuitem')
    }

    gettingAnyMenuItem(name:string): Locator{

        return this.menuItem.filter({ hasText: name })

    }

}