import { APIRequestContext } from '@playwright/test'
import { defaultConfig } from '../../../testData/api-test.config'
import { APILogger } from '../../../utils/logger'

export class JobApi {

    url: string = ''
    entitlementUrl: string = ''
    path: string = ''
    payGradesPath: string = ''
    headers: Record<string, string> = {}
    body: object = {}
    payGradesBody: object = {}
    request: APIRequestContext
    logger: APILogger
    jobId: number
    payGradeId: number
    fullUrl: string
    payGradesUrl: string

    constructor ( request: APIRequestContext, logger: APILogger ){

        this.url = defaultConfig.orangeUrl
        this.path = defaultConfig.jobPath
        this.payGradesPath = defaultConfig.payGradePath
        this.headers = defaultConfig.orangeHeders
        this.body = defaultConfig.jobBody 
        this.payGradesBody = defaultConfig.payGradeBody
        this.request = request
        this.fullUrl = new URL(`${this.url}${this.path}`).toString()
        this.payGradesUrl = new URL(`${this.url}${this.payGradesPath}`).toString()
        this.jobId = 0
        this.payGradeId = 0
        this.logger = logger
    }

    async getJobs(statusCode: number){        

        this.logger.logRequest('GET', this.fullUrl, this.headers)
        const response = await this.request.get(this.fullUrl)

        const actualStatus = response.status()
        const responseJson = await response.json()

        this.logger.logResponse(actualStatus, responseJson)
        this.statusCodeValidator(actualStatus, statusCode, this.getJobs)
        
        console.log(responseJson)
        return responseJson

    }

    async postJob(statusCode: number){

        this.logger.logRequest('POST', this.fullUrl, this.headers, this.body)
        const response = await this.request.post(this.fullUrl,{
            headers: this.headers,
            data: this.body
        })

        const actualStatus = response.status()
        const responseJson = await response.json()

        this.logger.logResponse(actualStatus, responseJson)
        this.statusCodeValidator(actualStatus, statusCode, this.postJob)

        console.log(responseJson)
        this.jobId = await responseJson.data?.id

        return [responseJson, this.jobId] 

    }

    async deleteJob(statusCode: number){
    
            const deleteBody = {"ids": [this.jobId]}
    
            this.logger.logRequest('DELETE', this.fullUrl, this.headers, deleteBody)
            const response = await this.request.delete(this.fullUrl,{
                headers: this.headers,
                data: deleteBody
            })
    
            const actualStatus = response.status()
            const responseJson = await response.json()
    
            this.logger.logResponse(actualStatus, responseJson)
            this.statusCodeValidator(actualStatus, statusCode, this.deleteJob)
    
            return responseJson 
    
        }

    async getPayGrades(statusCode: number){        

        this.logger.logRequest('GET', this.fullUrl, this.headers)
        const response = await this.request.get(this.payGradesUrl)

        const actualStatus = response.status()
        const responseJson = await response.json()

        this.logger.logResponse(actualStatus, responseJson)
        this.statusCodeValidator(actualStatus, statusCode, this.getPayGrades)
        
        console.log(responseJson)
        return responseJson

    }

    async postPayGrade(statusCode: number){

        this.logger.logRequest('POST', this.payGradesUrl, this.headers, this.payGradesBody)
        const response = await this.request.post(this.payGradesUrl,{
            headers: this.headers,
            data: this.payGradesBody
        })

        const actualStatus = response.status()
        const responseJson = await response.json()

        this.logger.logResponse(actualStatus, responseJson)
        this.statusCodeValidator(actualStatus, statusCode, this.postPayGrade)

        console.log(responseJson)
        this.payGradeId = await responseJson.data?.id

        return [responseJson, this.payGradeId] 

    }

    async deletePayGrade(statusCode: number){
    
            const deleteBody = {"ids": [this.payGradeId]}
    
            this.logger.logRequest('DELETE', this.fullUrl, this.headers, deleteBody)
            const response = await this.request.delete(this.payGradesUrl,{
                headers: this.headers,
                data: deleteBody
            })
    
            const actualStatus = response.status()
            const responseJson = await response.json()
    
            this.logger.logResponse(actualStatus, responseJson)
            this.statusCodeValidator(actualStatus, statusCode, this.deletePayGrade)
    
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