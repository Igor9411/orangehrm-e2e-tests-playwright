import { APIRequestContext } from '@playwright/test'
import { defaultConfig } from '../../../testData/api-test.config'
import { APILogger } from '../../../utils/logger'

export class CandidateApi {

    url: string = ''
    path: string = ''
    headers: Record<string, string> = {}
    body: object = {}
    request: APIRequestContext
    logger: APILogger
    fullUrl: string
    candidateId: number

    constructor ( request: APIRequestContext, logger: APILogger ){

        this.url = defaultConfig.orangeUrl
        this.path = defaultConfig.candidatePath
        this.headers = defaultConfig.orangeHeders
        this.body = defaultConfig.candidateBody
        this.request = request
        this.fullUrl = new URL(`${this.url}${this.path}`).toString()
        this.candidateId = 0
        this.logger = logger
    }

    async getCandidates(statusCode: number){

        this.logger.logRequest('GET', this.fullUrl, this.headers)
        const response = await this.request.get(this.fullUrl)

        const actualStatus = response.status()
        const responseJson = await response.json()

        this.logger.logResponse(actualStatus, responseJson)
        this.statusCodeValidator(actualStatus, statusCode, this.getCandidates)
        
        console.log(responseJson)
        return responseJson

    }

    async postCandidate(statusCode:number){

        this.logger.logRequest('POST', this.fullUrl, this.headers, this.body)
        const response = await this.request.post(this.fullUrl,{
            headers: this.headers,
            data: this.body
        })

        const actualStatus = response.status()
        const responseJson = await response.json()

        this.logger.logResponse(actualStatus, responseJson)
        this.statusCodeValidator(actualStatus, statusCode, this.postCandidate)

        console.log(responseJson)
        this.candidateId = await responseJson.data?.id

        return [responseJson, this.candidateId] 

    }

    async deleteCandidate(statusCode: number){

        const deleteBody = {"ids": [this.candidateId]}

        this.logger.logRequest('DELETE', this.fullUrl, this.headers, deleteBody)
        const response = await this.request.delete(this.fullUrl,{
            headers: this.headers,
            data: deleteBody
        })

        const actualStatus = response.status()
        const responseJson = await response.json()

        this.logger.logResponse(actualStatus, responseJson)
        this.statusCodeValidator(actualStatus, statusCode, this.deleteCandidate)

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