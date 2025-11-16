import { employee, leaveName } from "./tests/testsData"

export const defaultConfig = {

    orangeUrl: 'http://localhost:8080/web/index.php/api/v2',
    employeePath: '/pim/employees',
    leavePath: '/leave/leave-types',
    orangeHeders: { 'Content-Type': 'application/json' },
    postEmployeeBody: {
        "firstName": employee.firstName,
        "middleName": employee.middleName, 
        "lastName": employee.lastName, 
        "empPicture": null, 
        "employeeId": String(employee.Id)
    },
    putEmplyeeBody: {
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
    },
    leaveBody: {
        "name":leaveName,
        "situational":false
    },
    
    
}
