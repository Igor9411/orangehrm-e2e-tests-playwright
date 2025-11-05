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

    apiUrl: string
    apiPath: string
    apiHeders: Record <string, string>
    apiBody?:object
    request: APIRequestContext
    
}

export class EmployeeApi {

    url: string = ''
    path: string = ''
    headers: Record<string, string> = {}
    body?: object = {}
    request: APIRequestContext
    

    constructor (Apiconfig: APIConfig){

        this.url = Apiconfig.apiUrl
        this.path = Apiconfig.apiPath
        this.headers = Apiconfig.apiHeders
        this.body = Apiconfig.apiBody
        this.request = Apiconfig.request
        
    }

    private getURL(){

        const url = new URL(`${this.url}${this.path}`)

        return url.toString()
    }

    async getEmployees(){

        const fullURL = this.getURL()

        const response = await this.request.get(fullURL)

        const responseJson = await response.json()

        return responseJson

    }

    async postEmployee(status: number){

        const fullURL = this.getURL()

        const response = await this.request.post(fullURL,{
            headers: this.headers,
            data: this.body
        })

        const responseJson = await response.json()

        expect(status).toEqual(200)

        return responseJson 

    }

}