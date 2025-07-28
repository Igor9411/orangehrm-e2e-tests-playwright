import { Page, Locator, expect } from '@playwright/test'

export class TopBarPanel{

    readonly page:Page

    topBar: Locator

    constructor (page:Page){
        
        this.page = page

        this.topBar = page.getByRole('listitem')
    }

    gettingAnyTopBarItem(name:string): Locator{

        return this.topBar.filter({hasText: name})

    }
}