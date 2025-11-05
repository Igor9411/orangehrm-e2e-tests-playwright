import { test, expect } from '../tests/fixtures/webApp.fixture.ts'
import { employee } from './testsData.ts'
import { EmployeeApi } from '../page-objects/orangeHRM/helpers/employeeAPI.ts'
import { Page, request} from '@playwright/test'
import { APIConfig } from '../page-objects/orangeHRM/helpers/employeeAPI.ts'
import { defaultConfig } from '../page-objects/orangeHRM/helpers/employeeAPI.ts'



test('Check API with UI', async ({api, uiHelpers}) =>{

    const response = await api
        .path('/api/v2/pim/employees')
        .headers({'Content-Type': 'application/json'})
        .getRequest(200)
        
    console.log(response)

    expect(response.data.length).toBeLessThanOrEqual(25)

    console.log('GET REQUEST IS DONE, NO IS TIME FOR TEST1')
  
})

test('Create, update and Delete Employee', async ({ api }) =>{

    const postReqeust = await api
        .path('/api/v2/pim/employees')
        .headers({'Content-Type': 'application/json'})
        .body({"firstName":employee.firstName,"middleName":employee.middleName,"lastName":employee.lastName,"empPicture":null,"employeeId":String(employee.Id)})
        .postRequest(200)

    expect(postReqeust.data.firstName).toEqual(employee.firstName)
     
    console.log(postReqeust)
    
    const empNum = await postReqeust.data.empNumber

    console.log(`The identification number of a new user is ${empNum}.`)

    console.log(`Employe new name is ${employee.newFirstName}, and new last name is ${employee.newLastName}.`)

    const putRequest = await api
        .path(`/api/v2/pim/employees/${empNum}/personal-details`)
        .headers({'Content-Type': 'application/json'})
        .body({"lastName":employee.newLastName,"firstName":employee.newFirstName,"middleName":"","employeeId":String(employee.newId),"otherId":String(employee.otherId),"drivingLicenseNo":employee.driverLicense,"drivingLicenseExpiredDate":null,"gender":null,"birthday":null,"nickname":employee.nickname,"smoker":false,"militaryService":employee.military})
        .putRequest(200)

    expect(putRequest.data.lastName).toEqual(employee.newLastName)
   
    
    const deleteResponse = await api
        .path('/api/v2/pim/employees')
        .headers({'Content-Type': 'application/json'})
        .body({"ids":[empNum]})
        .deleteRequest(200)
    
    console.log(deleteResponse)

     const getResponse = await api
        .path('/api/v2/pim/employees')
        .headers({'Content-Type': 'application/json'})
        .getRequest(200)
        

    expect(getResponse.data.empNumber).not.toEqual(empNum)
    console.log(getResponse)
        
})

////////////////////////////////////////////////////////////////


test('Check get', async ({ request}) =>{

    const quickConfig: APIConfig = {
        apiUrl: defaultConfig.orangeUrl,
        apiPath: defaultConfig.orangePath,
        apiHeders: defaultConfig.orangeHeders,
        request
    }

    const api = new EmployeeApi(quickConfig)

    const getRequest = await api.getEmployees()

    console.log(getRequest)

})

test('Check post', async ({ request }) =>{

    const quickConfig: APIConfig = {
        apiUrl: defaultConfig.orangeUrl,
        apiPath: defaultConfig.orangePath,
        apiHeders: defaultConfig.orangeHeders,
        apiBody: defaultConfig.postBody,
        request
    }

    const api = new EmployeeApi(quickConfig)

    const postRequest = await api.postEmployee(200)

    console.log(postRequest)

})



