import { de } from '@faker-js/faker'
import { test, expect } from '../tests/fixtures/webApp.fixture.ts'
import { employee } from './testsData.ts'

test('Check API with UI', async ({api, uiHelpers}) =>{

    const response = await api
        .path('/api/v2/pim/employees')
        .headers({'Content-Type': 'application/json'})
        .getRequest(200)
        
    console.log(response)

    expect(response.data.length).toBeLessThanOrEqual(25)
  
})

test('Create and Delete Employee', async ({ api }) =>{

    const postReqeust = await api
        .path('/api/v2/pim/employees')
        .headers({'Content-Type': 'application/json'})
        .body({"firstName":employee.firstName,"middleName":employee.middleName,"lastName":employee.lastName,"empPicture":null,"employeeId":String(employee.Id)})
        .postRequest(200)

    expect(postReqeust.data.firstName).toEqual(employee.firstName)
     
    console.log(postReqeust)
    
    const empNum = await postReqeust.data.empNumber

    console.log(`The identification number of a new user is ${empNum}.`)

    const putRequest = await api
        .path(`/api/v2/pim/employees/${empNum}/personal-details`)
        .headers({'Content-Type': 'application/json'})
        .body({"lastName":"AdamSZ","firstName":"Sraczenss","middleName":"","employeeId":"4889","otherId":"","drivingLicenseNo":"","drivingLicenseExpiredDate":null,"gender":null,"birthday":null,"nickname":"","smoker":false,"militaryService":null})
        .putRequest(200)
        console.log(putRequest.path)
        
    console.log(`This is the putRequest outcome = ${putRequest}`)
    
    const deleteResponse = await api
        .path('/api/v2/pim/employees')
        .headers({'Content-Type': 'application/json'})
        .body({"ids":[empNum]})
        .deleteRequest(200)
    
    console.log(`This data = ${deleteResponse} is from the delete response`)

     const getResponse = await api
        .path('/api/v2/pim/employees')
        .headers({'Content-Type': 'application/json'})
        .getRequest(200)
        

    expect(getResponse.data[0].empNumber).not.toEqual(empNum)
    console.log(getResponse)

    
    
        

})

test('api check', async ({request}) =>{

    const getUrl = await request.get('http://localhost:8080/web/index.php/api/v2/pim/employees')
    const getResponse = await getUrl.json()

    console.log(getResponse)
    expect(getUrl.status()).toEqual(200)

    const postUrl = await request.post('http://localhost:8080/web/index.php/api/v2/pim/employees', {
        data: { "firstName":"Albert","middleName":"Jimmy","lastName":"Coacha","empPicture":null,"employeeId":"0199"}
    })
    const postResponse = await postUrl.json()

    console.log(postResponse)
    expect(postResponse.data.firstName).toEqual('Albert')
   


})

test('put requests', async ({ request }) => {

    const numm = 88

    const putUrl = await request.put(`http://localhost:8080/web/index.php/api/v2/pim/employees/${numm}/personal-details`, {
        data:{"lastName":"Adam","firstName":"Sraczenz","middleName":"","employeeId":"4889","otherId":"","drivingLicenseNo":"","drivingLicenseExpiredDate":null,"gender":null,"birthday":null,"nickname":"","smoker":false,"militaryService":null}
    })

    const putRequest = await putUrl.json()
    console.log(putRequest)
    expect(putUrl.status()).toEqual(200)


})