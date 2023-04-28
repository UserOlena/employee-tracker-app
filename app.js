const inquirer = require('inquirer');
const { selectAll, addNewDepartment } = require('./queries');


inquirer.prompt([
    {
        name: 'action',
        message: 'Which action are you interested in pursuing?',
        type: 'list',
        choices: [
            {
                name: 'View all departments',
                value: 'department',
            },
            {
                name: 'View all roles',
                value: 'role',
            },
            {
                name: 'View all employees',
                value: 'employee',
            },
            {
                name: 'Add a department',
                value: 'addDepartment',
            
            },
            {
                name: 'Add a role',
                value: 'addRole',               
            },
            // {
            //     name: 'Add an employee',
            //     value: ,
            // },
            // {
            //     name: 'Update an employee role',
            //     value: ,
            // },

    ]
    },
    {
        name: 'addDepartment',
        message: 'Kindly type the new department name in order to add it to the Department table.',
        type: 'input',
        when: (response) => response.action === 'addDepartment',
    }
]).then((response) => {
    console.log(response);

    if (response.action === 'department') {
        selectAll(response.action);
    } else if (response.action === 'role') {
        selectAll(response.action);
    } else if(response.action === 'employee') {
        selectAll(response.action);
    } else if (response.addDepartment) {
        addNewDepartment(response.addDepartment);
    } else {
        console.log('No action found.');
    }
})