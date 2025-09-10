import { Page, Locator } from '@playwright/test'

export class UiHelpers {

    readonly page: Page

    topBarItem: Locator 

    topBarMenuItem: Locator

    dropdownOptionItem: Locator

    inputSelector: Locator // This has to be taken from gettinganyinputbyindex 

    confirmationDialog: Locator // This has to be found in other classes and deleted (this is the only place for it)

    dialogDeleteButton: Locator // This has to be found in other classes and deleted (this is the only place for it)

    deleteConfirmationToastMessage: Locator // This has to be found in other classes and deleted (this is the only place for it)

    successfullySavedToastMessage: Locator // This has to be found in other classes and deleted (this is the only place for it)

    noRecordsToastMessage: Locator
    
    addButton: Locator

    saveButton: Locator

    constructor(page: Page){

        this.page = page

        this.topBarItem = page.getByRole('listitem')

        this.topBarMenuItem = page.getByRole('menuitem')

        this.dropdownOptionItem = page.getByRole('option')

        this.inputSelector = page.getByRole('textbox')

        // Dialogs

        this.confirmationDialog = page.getByText('×Are you Sure?The selected')

        this.dialogDeleteButton = page.getByRole('button', { name: ' Yes, Delete' })

        // Toast Messages

        this.deleteConfirmationToastMessage = page.getByText('SuccessSuccessfully Deleted×')

        this.successfullySavedToastMessage = page.getByText('SuccessSuccessfully Saved×')

        this.noRecordsToastMessage = page.getByText('InfoNo Records Found')

        // Buttons

        this.addButton = page.getByRole('button', { name: ' Add' })

        this.saveButton = page.getByRole('button', { name: 'Save' })

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