import { APIRequestContext } from '@playwright/test'
import { defaultConfig } from '../../../testData/api-test.config'
import { APILogger } from '../../../utils/logger'

export class EmployeeApi {

    url: string = ''
    path: string = ''
    headers: Record<string, string> = {}
    body: object = {}
    putBody: object = {}
    request: APIRequestContext
    logger: APILogger
    fullUrl: string
    empNumber: number

    constructor ( request: APIRequestContext, logger: APILogger ){

        this.url = defaultConfig.orangeUrl
        this.path = defaultConfig.employeePath
        this.headers = defaultConfig.orangeHeders
        this.body = defaultConfig.postEmployeeBody
        this.putBody = defaultConfig.putEmplyeeBody 
        this.request = request
        this.fullUrl = new URL(`${this.url}${this.path}`).toString()
        this.empNumber = 0
        this.logger = logger
    }

    async getEmployees(statusCode: number){

        this.logger.logRequest('GET', this.fullUrl, this.headers)
        const response = await this.request.get(this.fullUrl)

        const actualStatus = response.status()
        const responseJson = await response.json()

        this.logger.logResponse(actualStatus, responseJson)
        this.statusCodeValidator(actualStatus, statusCode, this.getEmployees)
        
        console.log(responseJson)
        return responseJson

    }

    async postEmployee(statusCode:number){

        this.logger.logRequest('POST', this.fullUrl, this.headers, this.body)
        const response = await this.request.post(this.fullUrl,{
            headers: this.headers,
            data: this.body
        })

        const actualStatus = response.status()
        const responseJson = await response.json()

        this.logger.logResponse(actualStatus, responseJson)
        this.statusCodeValidator(actualStatus, statusCode, this.postEmployee)

        console.log(responseJson)
        this.empNumber = await responseJson.data?.empNumber

        return [responseJson, this.empNumber] 

    }

    async deleteEmployee(statusCode: number){

        const deleteBody = {"ids": [this.empNumber]}

        this.logger.logRequest('DELETE', this.fullUrl, this.headers, deleteBody)
        const response = await this.request.delete(this.fullUrl,{
            headers: this.headers,
            data: deleteBody
        })

        const actualStatus = response.status()
        const responseJson = await response.json()

        this.logger.logResponse(actualStatus, responseJson)
        this.statusCodeValidator(actualStatus, statusCode, this.deleteEmployee)

        return responseJson 

    }

    async putEmployee(statusCode: number){

        const putUrl = `${this.fullUrl}/${this.empNumber}/personal-details`

        this.logger.logRequest('PUT', putUrl, this.headers, this.putBody)
        const response = await this.request.put(putUrl,{
            headers: this.headers,
            data: this.putBody
        })

        const actualStatus = response.status()
        const responseJson = await response.json()

        this.logger.logResponse(actualStatus, response)
        this.statusCodeValidator(actualStatus, statusCode, this.putEmployee)

        return responseJson

    }

    private statusCodeValidator(actualStatus: number, expectedStatus: number, callingMethod: Function){

        if(actualStatus !== expectedStatus){
            const logs = this.logger.getRecentLogs()
            const error = new Error(`Expected status ${expectedStatus} but got ${actualStatus}\n\nRecent API Activity: \n${logs}`)
            Error.captureStackTrace(error, callingMethod)
            throw error
        }

    }

}