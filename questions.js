const questions = [
  managerQuestions = [
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
      name: 'office',
      message: 'What is your office number?',
    },
  ],
  
  
  newRoleQuestion = [
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
  ],
  
  
  teamEngineerQuestions = [
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
  ],
  
  teamInternQuestions = [
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
  ]
];

module.export = questions