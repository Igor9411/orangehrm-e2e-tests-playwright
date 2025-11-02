import { APIRequestContext, expect } from "@playwright/test"


export class RequestHandler {

    private baseUrl!: string
    private apiPath: string = ''
    private apiHeaders: Record<string, string> = {}
    private apiBody: object = {}
    private request: APIRequestContext
    private orangeHrmURL: string

    constructor(request: APIRequestContext, apiBaseUrl: string){

        this.request = request
        this.orangeHrmURL = apiBaseUrl

    }
    

    url (url: string){

        this.baseUrl = url
   
        return this
    }

    path(path: string){

        this.apiPath = path

        return this
    }

    headers(headers:Record<string, string>){

        this.apiHeaders = headers
       
        return this
    }

    body(body: object){

        this.apiBody = body

        return this
    }

    private getUrl (){

        const url = new URL(`${this.baseUrl ?? this.orangeHrmURL}${this.apiPath}`)
  
        return url.toString()

    }

    async getRequest(statusCode: number){

        const url = this.getUrl()

        const response = await this.request.get(url, {
            headers: this.apiHeaders
        })

        const responseJSON = await response.json()

        expect(response.status()).toEqual(statusCode)

        return responseJSON

    }

    async postRequest(statusCode: number){

        const url = this.getUrl()

        const response = await this.request.post(url, {
            headers: this.apiHeaders,
            data:this.apiBody
        })

        const responseJSON = await response.json()

        expect(response.status()).toEqual(statusCode)

        return responseJSON

    }

    async putRequest(statusCode: number){

        const url = this.getUrl()

        const response = await this.request.put(url, {
            headers: this.apiHeaders,
            data: this.apiBody
        })
        console.log(response + "PUT")
        const responseJSON = await response.json()
        console.log(responseJSON + "PUTJSON")
        expect(response.status()).toEqual(statusCode)

        return responseJSON

    }

    async deleteRequest(statusCode: number){

        const url = this.getUrl()

        const response = await this.request.delete(url,{
            headers: this.apiHeaders,
            data: this.apiBody
        } )

        const responseJSON = await response.json()

        expect(response.status()).toEqual(statusCode)

        return responseJSON

    }

    

}