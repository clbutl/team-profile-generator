const inquirer = require('inquirer');
const fs = require('fs');
const writeJs = require('./write');
const { create } = require('domain');

const writeCss = () => 
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
  }`

const writeToFile = ({ name, id, email, phone }, roleEdit) =>
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
          <h3 class="p-1">Email: <span class="font-weight-normal">${email}</span></h3>
        </div>
        <div class="card mt-1">
          <h3 class="p-1">Phone: <span class="font-weight-normal">${phone}</span></h3>
        </div>
      </div>
    </div>
    `
    + roleEdit +
    `
  </container>

  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>
  </html>` 
  ;
  

const managerQuestions = [
  {
    type: 'input',
    name: 'name',
    message: 'What is your name?',
  },
  {
    type: 'input',
    name: 'id',
    message: 'What is your id?',
  },
  {
    type: 'input',
    name: 'email',
    message: 'What is your email?',
  },
  {
    type: 'input',
    name: 'phone',
    message: 'What is your phone number?',
  },
];


const newRoleQuestion = [
  {
    type: 'list',
    name: 'roleName',
    message: 'What role would you like to add?',
    choices: [
      'Engineer',
      'Intern',
      'Finish Adding New Roles'
    ]
  },
];


const teamEngineerQuestions = [
  {
    type: 'input',
    name: 'teamName',
    message: "What is the team member's name?",
  },
  {
    type: 'input',
    name: 'roleId',
    message: "What is the team member's id?",
  },
  {
    type: 'input',
    name: 'roleEmail',
    message: 'What is thier email?',
  },
  {
    type: 'input',
    name: 'gituser',
    message: 'What is their GitHub Username?',
  },
];

const teamInternQuestions = [
  {
    type: 'input',
    name: 'teamName',
    message: "What is the team member's name?",
  },
  {
    type: 'input',
    name: 'roleId',
    message: "What is the team member's id?",
  },
  {
    type: 'input',
    name: 'roleEmail',
    message: 'What is thier email?',
  },
  {
    type: 'input',
    name: 'school',
    message: 'What is their school?',
  },
];

// Array of pushed role info, NOT including manager info as of now
let roleInfo = []
let roleEdit = []

// Initial Function, decides manager outcomes
function init() {
  inquirer
  .prompt(managerQuestions)
  .then((answers) => {
    console.log(answers)
    console.log(roleInfo)

    // const readmePageContent = writeToFile(answers, licenseInfo);

    // console.log(answers)
    // fs.writeFile('readme.md', readmePageContent, (err) =>
    //   err ? console.log(err) : console.log('Successfully created readme.md!')
    // );

    newRolesIdentify(answers)
  })
  
};

// Checks to see what new role the user wants to create, if any new role
function newRolesIdentify(answersManger) {
  inquirer
  .prompt(newRoleQuestion)
  .then((answers) => {
    if (answers.roleName === 'Engineer') {
      newRolesEngineer(answersManger, answers)
    } else if (answers.roleName === 'Intern') {
      newRolesIntern(answersManger, answers)
    } else {
      createPublic(answersManger, roleInfo)
    } 
  })
}

// Questions about new role - Engineer
function newRolesEngineer(answersManger, answersRole) {
  inquirer
  .prompt(teamEngineerQuestions)
  .then((answers) => {
    const answersRoleInfo = Object.assign(answersRole, answers)
    roleInfo.push(answersRoleInfo)
    console.log(roleInfo)

    newRolesIdentify(answersManger)
  })
}
// Questions about new role - Intern
function newRolesIntern(answersManger, answersRole) {
  inquirer
  .prompt(teamInternQuestions)
  .then((answers) => {
    const answersRoleInfo = Object.assign(answersRole, answers)
    roleInfo.push(answersRoleInfo)
    console.log(roleInfo)

    newRolesIdentify(answersManger)
  })
}

// Run when user decides to not create any new roles
function createPublic(answersManger, roleInfo) {
  let newEdit = ''

  console.log(roleInfo)
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
          <h3 class="p-1">Email: <span class="font-weight-normal">${roleInfo[i].roleEmail}</span></h3>
        </div>
        <div class="card mt-1">
          <h3 class="p-1">Github: <span class="font-weight-normal">${roleInfo[i].gituser}</span></h3>
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
          <h3 class="p-1">Email: <span class="font-weight-normal">${roleInfo[i].roleEmail}</span></h3>
        </div>
        <div class="card mt-1">
          <h3 class="p-1">Github: <span class="font-weight-normal">${roleInfo[i].school}</span></h3>
        </div>
      </div>
    </div>
    `
      roleEdit.push(newEdit)
    } else {
      console.log('ERROR GRRRR :(')
    } 
  }
  
  const completeRoles = roleEdit.join(" ")

  const mainHtml = writeToFile(answersManger, completeRoles);

  fs.writeFile('style.css', writeCss(), (err) => 
    err ? console.log(err) : console.log('CSS!')
    );

  fs.writeFile('index.html', mainHtml, (err) =>
      err ? console.log(err) : console.log('Successfully created index.html!')
    );


  // const test1 = writeJs(answersManger, roleInfo)
  // fs.appendFile('index.html', test1, (err) => 
  //     err ? console.log(err) : console.log('APPENDED!')
  //   );
}




init();