import { employee, leaveName, jobTitle, payGrade, candidate } from "./testsData"

export const defaultConfig = {

    orangeUrl: 'http://localhost:8080/web/index.php/api/v2',
    employeePath: '/pim/employees',
    leavePath: '/leave/leave-types',
    jobPath: '/admin/job-titles',
    payGradePath: '/admin/pay-grades',
    candidatePath: '/recruitment/candidates',
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
    jobBody: {
        "title": jobTitle,
        "description":`This is a description of a ${jobTitle} job.`,
        "specification":null,
        "note":`This is a note of a ${jobTitle} job and it is a little bit longer than a description and much longer then the title.`
    },
    payGradeBody: {
        "name":payGrade
    },
    candidateBody: {
        "firstName": candidate.firstName,
        "middleName": candidate.middleName,
        "lastName": candidate.lastName,
        "email": candidate.email,
        "contactNumber": candidate.contactNumber,
        "keywords": candidate.keywords,
        "comment": candidate.comment,
        "dateOfApplication": candidate.dateOfApplication,
        "consentToKeepData": candidate.consentToKeepData
    }
    
}
