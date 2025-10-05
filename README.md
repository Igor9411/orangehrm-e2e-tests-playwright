# orangehrm-e2e-tests-playwright
This is a project of e2e tests of the open source app OrangeHrm (https://github.com/orangehrm/orangehrm). The purpose of it is to show how the e2e tests work using Playwright + Typescript and for learning purpose. The project is not yet finished.

Installation guide:
1. Download and install Vs Code > https://code.visualstudio.com/docs/setup/windows
2. Download and install Git > https://git-scm.com/downloads
3. Download and install Node.js > https://nodejs.org/en
4. Copy repo https://github.com/Igor9411/orangehrm-e2e-tests-playwright > Code > copy link > vs code terminal > git clone <copied link>
5. Install playwright:
    - terminal > npm init playwright@latest
    - create playwright - y
    - where to put your e2e tests - tests
    - add github actionse - false
    - override playwright confige - false
In vs code extension panel install *playwright test for vs code*     
*Now you should run tests by pressing green play button in any test file. If it is blocked then go to Testing (vs code navigation panel, flask icon) > click on play button for tests file > in the right corner of the screen click enable*
**If you have restricted execution policy (playwright command can't be executed) then in powershell with admin rights run _ _Set-ExecutionPolicy Unrestricted_ _ . When you finish working the you can set back the restructions by runnig _ _Set-ExecutionPolicy Restricted_ _**
6. Install faker and npm
    - terminal > npm install @faker-js/faker --save-dev
    - npm install -g npm@xx.x.x (latest version has to be checked) npm --version 

8. Install Docker Desktop (https://www.docker.com/products/docker-desktop/) + download OrangeHrm.zip file (https://github.com/orangehrm/orangehrm > Getting started section >  latest version link)
    - In the project go to orangehrm-docker and create there file 'html' and paste the OrangeHrm.zip file inside (note: pass there not the folder *orangehrm-x.x* but what it consists)
    - Open docker desktop (don't have to make an account)
    - In vs terminal go to orangehrm-docker folder and run docker-compose up -d
    - In your browser set the URL localhost:8080 and hit enter
    - The installation of OrangeHrm should now start:
        - chose fresh installation
        - accept terms
        - pick existing empty database
        - set database host name:  orangehrm_db
        - set database name: orangehrm
        - set OrangeHRM Database Username/password: orange
        - set nable data encryption
        - step 4 click next
        - step 5 set up your own data
        - step 6 create your own admin (**this data will be used to login so copy it in case you forgot!**) and don't check the register checkbox
        - finish installation steps
9. Create .env file in the project folder and add there:
ORANGE_USERNAME=your admin username
ORANGE_PASSWORD=your admin password (if you have spacial sign at the end then you can put entire password in '')

for example 
*ORANGE_USERNAME=IgorLit*
*ORANGE_PASSWORD=Lit!vin22*

If this does not work install dotenv > terminal > *npm install dotenv*

Aaaand done, should be working by now!

Before running every test you have to login to orangehrm(only once, then the session is saved for at least 30mins and you don't have to use it), use this command in terminal:
npm run login-project-setup

To run all tests type in terminal:
npx playwright test

*Remember that Docker Desktop and containers has to be up all time in order to run this (when you completed all steps sucessfully only turning docker desktop is now needed, you don't have to use and commands in the terminal)*
