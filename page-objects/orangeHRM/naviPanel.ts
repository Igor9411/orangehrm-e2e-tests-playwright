import { Page, Locator, expect } from '@playwright/test'


export class NavigationPanel{

    readonly page:Page
    readonly navigationPanelItems: string[] = [
        'Admin',
        'PIM',
        'Leave',
        'Time',
        'Recruitment',
        'My Info',
        'Performance',
        'Dashboard',
        'Directory',
        'Maintenance',
        'Claim',
        'Buzz'
    ]

    navigationItem: Locator
    

    constructor(page:Page){

        this.page = page

        this.navigationItem = page.locator('.oxd-main-menu-item-wrapper')
    
    }

    getAnyNavPanelItem(name: string): Locator{

        return this.navigationItem.filter({hasText: name})
        
    }

    async checkAllINavItems(){

        await expect(this.navigationItem).toHaveCount(this.navigationPanelItems.length)

        for (let i = 0; i < this.navigationPanelItems.length; i++){

            const testy1 = this.navigationItem.nth(i)

            await expect(testy1).toBeVisible()

            console.log(testy1)

            await expect(testy1).toHaveText(this.navigationPanelItems[i])

            console.log(this.navigationPanelItems[i])

        }
    }

}