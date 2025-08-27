import { Page, Locator } from '@playwright/test'

export class UiHelpers {

    readonly page:Page

    topBarItem: Locator 

    topBarMenuItem: Locator

    dropdownOptionItem: Locator

    inputSelector: Locator // This has to be taken from gettinganyinputbyindex 

    confirmationDialog: Locator // This has to be found in other classes and deleted (this is the only place for it)

    dialogDeleteButton: Locator // This has to be found in other classes and deleted (this is the only place for it)

    deleteConfirmationToastMessage: Locator // This has to be found in other classes and deleted (this is the only place for it)

    constructor(page: Page){

        this.page = page

        this.topBarItem = page.getByRole('listitem')

        this.topBarMenuItem = page.getByRole('menuitem')

        this.dropdownOptionItem = page.getByRole('option')

        this.inputSelector = page.getByRole('textbox')

        this.confirmationDialog = page.getByText('×Are you Sure?The selected')

        this.dialogDeleteButton = page.getByRole('button', { name: ' Yes, Delete' })

        this.deleteConfirmationToastMessage = page.getByText('SuccessSuccessfully Deleted×')

    }

    gettingInputByIndex(index: number): Locator{

        return this.inputSelector.nth(index) 

    }

    gettingAnyTopBarItem(name:string): Locator{

        return this.topBarItem.filter({hasText: name})

    }

    gettingAnyTopBarMenuItem( name:string ): Locator{ 

        return this.topBarMenuItem.filter({ hasText: name })

    }

    gettingAnyDropdownItem( name:string ): Locator{ 

        return this.dropdownOptionItem.filter({ hasText: name })

    }

    // This is a combination of gettingAnyTopBarItem + gettingAnyTopBarMenuItem
    async gettingTopBarMenuItem (topBar: string, menuItem:string){

        await this.topBarItem.filter({hasText: topBar}).click()
        await this.topBarMenuItem.filter({ hasText: menuItem }).click()

    }
}