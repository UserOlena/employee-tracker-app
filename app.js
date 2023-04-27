const inquirer = require('inquirer');
const { selectAll } = require('./queries');


inquirer.prompt([
    {
        name: 'action',
        message: 'Which action are you interested in pursuing?',
        type: 'list',
        choices: [
            {
                name: 'View all departments.',
                value: 'department',
            },
            {
                name: 'View all roles.',
                value: 'role',
            },
            {
                name: 'View all employees.',
                value: 'employee',
            },
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
    // const choice = response.question;
    // choice();
    switch (response.action) {
        case 'department':
            selectAll(response.action);
            break;
        case 'role':
            selectAll(response.action);
            break;
        case 'employee':
            selectAll(response.action);
            break;
        default:
            console.log('No action found');
    }
})