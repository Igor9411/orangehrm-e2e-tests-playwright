# API Tests Instructions

## Overview

This document outlines the guidelines for creating new API models in the OrangeHRM E2E tests project. API models are TypeScript classes that encapsulate interactions with specific OrangeHRM API endpoints, facilitating automated testing of CRUD operations. These models follow a consistent structure to ensure maintainability, reusability, and proper logging.

**Note**: These rules apply exclusively to API model files located in the `page-objects` folder.

## Rules for Creating New API Models

1. **Base Structure**: To create a new API model, copy the structure from existing files like `employeeAPI.ts` or `candidateAPI.ts` located in the `page-objects/orangeHRM/api` folder. This ensures consistency in class design, constructor setup, and method implementations.

2. **Required Methods**: Every new API model must include GET, POST, and DELETE methods to:
   - Fetch all data (GET)
   - Create new data (POST)
   - Delete existing data (DELETE)

3. **Optional PUT Method**: Some models may include a PUT method for updating data, but only if the API endpoint supports it. This is not mandatory for all models.

4. **Logging and Validation**: Every request must use the `APILogger` from the `logger.ts` file for logging request and response details. Additionally, include a `statusCodeValidator` method at the end of the class to check HTTP status codes and throw errors with detailed logs if expectations are not met.

5. **Naming Convention**: New API model files should be named `specificNameAPI.ts`, e.g., `vacanciesAPI.ts`. This follows the pattern of existing files like `candidateAPI.ts` and `employeeAPI.ts`.

6. **Configuration Sources**: Properties such as `body`, `path`, `headers`, `url`, `fullUrl`, and any required IDs should be sourced from the `api-test.config.ts` file. This centralizes configuration and makes it easy to manage.

7. **Configuration Updates**: In `api-test.config.ts`, add the necessary configurations for new models. For example, if a new `vacancies` body is defined as `'abc'`, it should be stored in `api-test.config.ts` and exported for use in the corresponding API model file.

8. **Test Data Management**: All required test data should be generated using Faker in `testsData.ts` and utilized in API models. For instance, define constants like `candidate` in `testsData.ts` to store generated data, ensuring consistency and randomness in tests.

## Example

Below is a small example of a fake API model for vacancies, named `vacanciesAPI.ts`, demonstrating adherence to all the rules. This is a simplified illustration and not a complete implementation.

```typescript
import { APIRequestContext } from '@playwright/test'
import { defaultConfig } from '../../../testData/api-test.config'
import { APILogger } from '../../../utils/logger'

export class VacanciesApi {

    url: string = ''
    path: string = ''
    headers: Record<string, string> = {}
    body: object = {}
    request: APIRequestContext
    logger: APILogger
    fullUrl: string
    vacancyId: number

    constructor ( request: APIRequestContext, logger: APILogger ){

        this.url = defaultConfig.orangeUrl
        this.path = defaultConfig.vacancyPath  // Assumed added to api-test.config.ts
        this.headers = defaultConfig.orangeHeders
        this.body = defaultConfig.vacancyBody  // Assumed added to api-test.config.ts
        this.request = request
        this.fullUrl = new URL(`${this.url}${this.path}`).toString()
        this.vacancyId = 0
        this.logger = logger
    }

    async getVacancies(statusCode: number){

        this.logger.logRequest('GET', this.fullUrl, this.headers)
        const response = await this.request.get(this.fullUrl)

        const actualStatus = response.status()
        const responseJson = await response.json()

        this.logger.logResponse(actualStatus, responseJson)
        this.statusCodeValidator(actualStatus, statusCode, this.getVacancies)
        
        console.log(responseJson)
        return responseJson

    }

    async postVacancy(statusCode:number){

        this.logger.logRequest('POST', this.fullUrl, this.headers, this.body)
        const response = await this.request.post(this.fullUrl,{
            headers: this.headers,
            data: this.body
        })

        const actualStatus = response.status()
        const responseJson = await response.json()

        this.logger.logResponse(actualStatus, responseJson)
        this.statusCodeValidator(actualStatus, statusCode, this.postVacancy)

        console.log(responseJson)
        this.vacancyId = await responseJson.data?.id

        return [responseJson, this.vacancyId] 

    }

    async deleteVacancy(statusCode: number){

        const deleteBody = {"ids": [this.vacancyId]}

        this.logger.logRequest('DELETE', this.fullUrl, this.headers, deleteBody)
        const response = await this.request.delete(this.fullUrl,{
            headers: this.headers,
            data: deleteBody
        })

        const actualStatus = response.status()
        const responseJson = await response.json()

        this.logger.logResponse(actualStatus, responseJson)
        this.statusCodeValidator(actualStatus, statusCode, this.deleteVacancy)

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
```

This example assumes `vacancyPath` and `vacancyBody` are added to `api-test.config.ts`, and test data is defined in `testsData.ts` (e.g., a `vacancy` constant).