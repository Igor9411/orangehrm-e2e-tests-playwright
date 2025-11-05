import { APIRequestContext, expect } from '@playwright/test'

// This config and interface are here for better visibility,
// when the projects is bigger then this will be stored elsewhere (for example api-example-test.spec.ts).

export const defaultConfig = {

    orangeUrl: 'http://localhost:8080/web/index.php',
    orangePath: '/api/v2/pim/employees',
    orangeHeders: { 'Content-Type': 'application/json' },
    postBody: {
        "firstName": "AVB",
        "middleName": "", 
        "lastName": "vsa", 
        "empPicture": null, 
        "employeeId": "0267"
    }

}

export interface APIConfig {

    url: string
    apiPath: string
    apiHeders: Record <string, string>
    body?:object
    request: APIRequestContext
    
}

export class EmployeeApi {

    baseUrl: string = ''
    path: string = ''
    headers: Record<string, string> = {}
    apiBody?: object = {}
    apiRequest: APIRequestContext
    

    constructor (config: APIConfig){

        this.baseUrl = 'http://localhost:8080/web/index.php'
        this.path = config.apiPath
        this.headers = config.apiHeders
        this.apiRequest = config.request
        this.apiBody = config.body

    }

    private getURL(){

        const url = new URL(`${this.baseUrl}${this.path}`)

        return url.toString()
    }

    async getEmployees(){

        const fullURL = this.getURL()

        const response = await this.apiRequest.get(fullURL)

        const responseJson = await response.json()

        return responseJson

    }

    async postEmployee(status: number){

        const fullURL = this.getURL()

        const response = await this.apiRequest.post(fullURL,{
            headers: this.headers,
            data: this.apiBody
        })

        const responseJson = await response.json()

        expect(status).toEqual(200)

        return responseJson 

    }

}