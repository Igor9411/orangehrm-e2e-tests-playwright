import { APIRequestContext } from '@playwright/test'
import { expect } from '../../../tests/fixtures/webApp.fixture'
import { defaultConfig } from '../../../api-test.config'

export class EmployeeApi {

    url: string = ''
    path: string = ''
    putPath: string = ''
    headers: Record<string, string> = {}
    body: object = {}
    deleteBody: object = {}
    putBody: object = {}
    request: APIRequestContext
    fullUrl: string
    putUrl: string = ''
    empNumber: number

    constructor ( request: APIRequestContext){

        this.url = defaultConfig.orangeUrl
        this.path = defaultConfig.orangePath
        this.putPath = defaultConfig.orangePutPath
        this.headers = defaultConfig.orangeHeders
        this.body = defaultConfig.postBody
        this.putBody = defaultConfig.putBody
        this.request = request
        this.fullUrl = new URL(`${this.url}${this.path}`).toString()
        this.putUrl = new URL(`${this.url}${this.putPath}`).toString()
        this.empNumber = defaultConfig.empNumber
        
    }

    async getEmployees(){

        const response = await this.request.get(this.fullUrl)

        const responseJson = await response.json()

        console.log(responseJson)

        return responseJson

    }

    postEmployee = async(status:number) => {

        const response = await this.request.post(this.fullUrl,{
            headers: this.headers,
            data: this.body
        })

        const responseJson = await response.json()

        console.log(responseJson)

        this.empNumber = await responseJson.data?.empNumber

        console.log(`This is y: ${this.empNumber}`)

        expect(status).toEqual(200)

        return [responseJson, this.empNumber] 

    }

    async deleteEmployee(status: number, empNumber: number){

        const response = await this.request.delete(this.fullUrl,{
            headers: this.headers,
            data: {"ids": [this.empNumber]}
        })

        const responseJson = await response.json()

        expect(status).toEqual(200)

        return responseJson 

    }

    async putEmployee(status: number){

        const response = await this.request.put(this.putUrl,{
            headers: this.headers,
            data: this.putBody
        })

        const responseJson = await response.json()

        expect(status).toEqual(200)

        return responseJson

    }

}