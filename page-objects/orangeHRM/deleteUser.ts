import { expect, Page, Locator } from '@playwright/test'

export class UserDeletion{

    readonly page:Page
    userRow: Locator
    confirmationDialog: Locator
    confirmationDeleteButton: Locator
    successDeletedToast: Locator

    constructor(page:Page){

        this.page = page

        this.userRow = page.getByRole('row')

        this.confirmationDialog = page.getByText('×Are you Sure?The selected')

        this.confirmationDeleteButton = page.getByRole('button', { name: ' Yes, Delete' })

        this.successDeletedToast = page.getByText('SuccessSuccessfully Deleted×')
    }

    async DeleteAnyUserById(name:string){

        await this.userRow.filter({hasText: name}).getByRole('button', { name: '' }).first().click()

        await expect(this.confirmationDialog).toBeVisible()

        await this.confirmationDeleteButton.click()

        await expect(this.successDeletedToast).toBeVisible()

    }

}