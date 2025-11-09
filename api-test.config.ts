import { employee } from "./tests/testsData"

const putIdPath = ''
export const defaultConfig = {

    orangeUrl: 'http://localhost:8080/web/index.php',
    orangePath: '/api/v2/pim/employees',
    orangePutPath: `/api/v2/pim/employees/${putIdPath}/personal-details`,
    orangeHeders: { 'Content-Type': 'application/json' },
    empNumber: 0,
    postBody: {
        "firstName": employee.firstName,
        "middleName": employee.middleName, 
        "lastName": employee.lastName, 
        "empPicture": null, 
        "employeeId": String(employee.Id)
    },
    putBody: {
        "lastName":employee.newLastName,
        "firstName":employee.newFirstName,
        "middleName":"",
        "employeeId":String(employee.newId),
        "otherId":String(employee.otherId),
        "drivingLicenseNo":employee.driverLicense,
        "drivingLicenseExpiredDate":null,
        "gender":null,
        "birthday":null,
        "nickname":employee.nickname,
        "smoker":false,
        "militaryService":employee.military
    }
    

}
