import { faker } from'@faker-js/faker'

export const leaveName = `${faker.word.adjective().toUpperCase()} LEAVE`
export const jobTitle = faker.person.jobTitle()
export const payGrade = `${faker.person.jobType()} ${faker.number.int( {max: 1000} )}`
export const latin = faker.lorem.sentence()

export const employee = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        middleName: faker.person.middleName(),
        Id: faker.number.int( {max: 10000} ),
        otherId: faker.number.int( {min: 1000, max: 2000} ),
        nickname: faker.internet.username(),
        driverLicense: faker.string.alphanumeric({length: {min: 8, max: 11}}),
        birthDate: faker.date.between({ from: '1955-01-01', to: '2001-12-31' }),
        military: faker.string.alpha(),
        newFirstName: faker.person.firstName(),
        newLastName: faker.person.lastName(),
        newId: faker.number.int( {max: 10000} ),
        entitlementDays: '10',
        minSalary: faker.number.int( {min: 1000, max: 3000}),
        maxSalary: faker.number.int( {min:3000, max: 5500})
    }