import { APIRequestContext } from '@playwright/test'
import { defaultConfig } from '../../../api-test.config'
import { APILogger } from '../../../utils/logger'

export class LeaveApi {

    url: string = ''
    path: string = ''
    headers: Record<string, string> = {}
    body: object = {}
    request: APIRequestContext
    logger: APILogger
    fullUrl: string
    leaveId: number

    constructor ( request: APIRequestContext, logger: APILogger ){

        this.url = defaultConfig.orangeUrl
        this.path = defaultConfig.leavePath
        this.headers = defaultConfig.orangeHeders
        this.body = defaultConfig.leaveBody 
        this.request = request
        this.fullUrl = new URL(`${this.url}${this.path}`).toString()
        this.leaveId = 0
        this.logger = logger
    }

    async getLeaves(statusCode: number){        

        this.logger.logRequest('GET', this.fullUrl, this.headers)
        const response = await this.request.get(this.fullUrl)

        const actualStatus = response.status()
        const responseJson = await response.json()

        this.logger.logResponse(actualStatus, responseJson)
        this.statusCodeValidator(actualStatus, statusCode, this.getLeaves)
        
        console.log(responseJson)
        return responseJson

    }

    async postLeave(statusCode: number){

        this.logger.logRequest('POST', this.fullUrl, this.headers, this.body)
        const response = await this.request.post(this.fullUrl,{
            headers: this.headers,
            data: this.body
        })

        const actualStatus = response.status()
        const responseJson = await response.json()

        this.logger.logResponse(actualStatus, responseJson)
        this.statusCodeValidator(actualStatus, statusCode, this.postLeave)

        console.log(responseJson)
        this.leaveId = await responseJson.data?.id

        return [responseJson, this.leaveId] 

    }

    async deleteLeave(statusCode: number){
    
            const deleteBody = {"ids": [this.leaveId]}
    
            this.logger.logRequest('DELETE', this.fullUrl, this.headers, deleteBody)
            const response = await this.request.delete(this.fullUrl,{
                headers: this.headers,
                data: deleteBody
            })
    
            const actualStatus = response.status()
            const responseJson = await response.json()
    
            this.logger.logResponse(actualStatus, responseJson)
            this.statusCodeValidator(actualStatus, statusCode, this.deleteLeave)
    
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