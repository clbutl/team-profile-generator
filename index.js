const inquirer = require('inquirer');
const fs = require('fs')
const questions = require('./questions');
const Employee = require('./lib/employee');
const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');

let roleInfo = []
let roleEdit = []

writeCss = () => 
  `.text-medium {
    font-size: 30px;
  } .text-large {
    font-size: 40px;
  } .text-larger {
    font-size: 45px;
  } .text-small {
    font-size: 25px;
  } .text-smaller {
    font-size: 20px;
  } #cards {
    box-shadow: 5px 5px 5px black;
  } .card-body {
    padding: 50px 20px;
  }
  
  .links{
    color: black;
    text-decoration: none;
  } .links:hover {
    cursor: pointer;
    color: gray;
    text-decoration: none;
  }`;

writeToFile = ({ name, id, email, office }, roleEdit) =>
  `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Team</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
    <link rel="stylesheet" href="./style.css">
  </head>

  <header class="jumbotron text-center">
    <h1 class="font-weight-bold">My Team</h1>
  </header>
  
  <container id="main-container" class="container d-flex col-12 flex-wrap justify-content-center">
    <div id="cards" class="card ml-3 mr-3 mb-3" style="width: 18rem;">
      <div class="card-header bg-dark">
        <h5 class="text-medium card-title text-white">${name}</h5>
        <h6 class="text-medium mb-2 text-white">Manager</h6>
      </div>
      <div class="card-body">
        <div class="card">
          <h3 class="p-1">ID: <span class="font-weight-normal">${id}</span></h3>
        </div>
        <div class="card mt-1">
          <h3 class="p-1">Email: <a class="links font-weight-normal" href="mailto:${email}">${email}</a></h3>
        </div>
        <div class="card mt-1">
          <h3 class="p-1">Office #: <span class="font-weight-normal">${office}</span></h3>
        </div>
      </div>
    </div>
    `
    + roleEdit +
    `
  </container>

  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>
  </html>`;



function managerAsk() {
  inquirer
  .prompt(managerQuestions)
  .then((answers) => {
    const manager = new Manager(answers.name, answers.id, answers.email, answers.office)
    roleInfo.push(manager)
    newRoles(answers)
  })
}

function newRoles(managerAnswers) {
  inquirer
  .prompt(newRoleQuestion)
  .then((answers) => {
    if (answers.roleName === 'Engineer') {
      newRolesEngineer(managerAnswers, answers)
    } else if (answers.roleName === 'Intern') {
      newRolesIntern(managerAnswers, answers)
    } else {
      createPublic(managerAnswers, roleInfo)
    } 
  })
}

function newRolesEngineer(managerAnswers, answersRole) {
  inquirer
  .prompt(teamEngineerQuestions)
  .then((answers) => {
    const engineer = new Engineer(answers.teamName, answers.roleId, answers.roleEmail, answers.gituser)
    console.log(engineer)
    const answersRoleInfo = Object.assign(answersRole, answers)
    roleInfo.push(answersRoleInfo)
    newRoles(managerAnswers)
  })
}

function newRolesIntern(managerAnswers, answersRole) {
  inquirer
  .prompt(teamInternQuestions)
  .then((answers) => {
    const intern = new Intern(answers.teamName, answers.roleId, answers.roleEmail, answers.school)
    console.log(intern)
    const answersRoleInfo = Object.assign(answersRole, answers)
    roleInfo.push(answersRoleInfo)

    newRoles(managerAnswers)
  })
}

function createPublic(managerAnswers, roleInfo) {
  let newEdit;

  for (let i = 0; i < roleInfo.length; i++) {
    if (roleInfo[i].roleName === 'Engineer') {
      newEdit = 
    `
    <div id="cards" class="card ml-3 mr-3 mb-3" style="width: 18rem;">
      <div class="card-header bg-dark">
        <h5 class="text-medium card-title text-white">${roleInfo[i].teamName}</h5>
        <h6 class="text-medium mb-2 text-white">${roleInfo[i].roleName}</h6>
      </div>
      <div class="card-body">
        <div class="card">
          <h3 class="p-1">ID: <span class="font-weight-normal">${roleInfo[i].roleId}</span></h3>
        </div>
        <div class="card mt-1">
          <h3 class="p-1">Email: <a class="links font-weight-normal" href="mailto:${roleInfo[i].roleEmail}">${roleInfo[i].roleEmail}</a></h3>
        </div>
        <div class="card mt-1">
          <h3 class="p-1">Github: <a class="links font-weight-normal" target="_blank" href="https://github.com/${roleInfo[i].gituser}">${roleInfo[i].gituser}</a></h3>
        </div>
      </div>
    </div>
    `
      roleEdit.push(newEdit)
    } else if (roleInfo[i].roleName === 'Intern') {
      newEdit = 
    `
    <div id="cards" class="card ml-3 mr-3 mb-3" style="width: 18rem;">
      <div class="card-header bg-dark">
        <h5 class="text-medium card-title text-white">${roleInfo[i].teamName}</h5>
        <h6 class="text-medium mb-2 text-white">${roleInfo[i].roleName}</h6>
      </div>
      <div class="card-body">
        <div class="card">
          <h3 class="p-1">ID: <span class="font-weight-normal">${roleInfo[i].roleId}</span></h3>
        </div>
        <div class="card mt-1">
          <h3 class="p-1">Email: <a class="links font-weight-normal" href="mailto:${roleInfo[i].roleEmail}">${roleInfo[i].roleEmail}</a></h3>
        </div>
        <div class="card mt-1">
          <h3 class="p-1">School: <span class="font-weight-normal">${roleInfo[i].school}</span></h3>
        </div>
      </div>
    </div>
    `
      roleEdit.push(newEdit)
    } }
  
  const completeRoles = roleEdit.join(" ")

  const mainHtml = writeToFile(managerAnswers, completeRoles);

  fs.writeFile('./dist/style.css', writeCss(), (err) => 
  err ? console.log(err) : console.log('CSS!')
  );

  fs.writeFile('./dist/index.html', mainHtml, (err) =>
  err ? console.log(err) : console.log('Successfully created index.html!')
  );
  }

managerAsk()