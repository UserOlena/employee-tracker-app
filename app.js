const inquirer = require('inquirer');


inquirer.prompt([
    {
        name: 'question',
        message: 'Which action are you interested in pursuing?',
        type: 'list',
        choices: [
            {
                name: 'View all departments.',
                value: viewAllDepartments,
            },
            // {
            //     name: 'View all roles.',
            //     value: ,
            // },
            // {
            //     name: 'View all employees.',
            //     value: ,
            // },
            // {
            //     name: 'Add a department.',
            //     value: ,
            // },
            // {
            //     name: 'Add a role.',
            //     value: ,               
            // },
            // {
            //     name: 'Add an employee.',
            //     value: ,
            // },
            // {
            //     name: 'Update an employee role.',
            //     value: ,
            // },

    ]

    }
]).then((response) => {
    console.log(response);
    const choice = response.question;
    choice();
})


function viewAllDepartments() {
    console.log('view departm function');
}