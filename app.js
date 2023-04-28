const inquirer = require('inquirer');
const { selectAll, addNewDepartment, addRole } = require('./queries');


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
        name: 'departmentName',
        message: 'Kindly type the new department name in order to add it to the Department database table.',
        type: 'input',
        when: (response) => response.action === 'addDepartment',
    },
    {
        name: 'roleTitle',
        message: 'Kindly type the new role title in order to add it to the Role database table.',
        type: 'input',
        when: (response) => response.action === 'addRole',
    },
    {
        name: 'roleSalary',
        message: `Kindly type the salary for a newly added title in order to add it to the Role database table.`,
        type: 'input',
        when: (response) => response.action === 'addRole',
    },
    {
        name: 'roleDepartmentId',
        message: `Kindly choose the department associated with the newly added title.`,
        type: 'list',
        when: (response) => response.action === 'addRole',
        choices: [
            {
                name: 'director',
                value: 1,
            },
            {
               name: 'success manager',
               value: 2, 
            },
            {
                name: 'instructor',
                value: 3,
            },
            {
                name: 'teacher assistant',
                value: 4,
            },
            {
                name: 'tutor',
                value: 5,
            },
            {
                name: 'admission',
                value: 6,
            }
        ]
    },
]).then((response) => {
    console.log(response);

    if (response.action === 'department') {
        selectAll(response.action);
    } else if (response.action === 'role') {
        selectAll(response.action);
    } else if(response.action === 'employee') {
        selectAll(response.action);
    } else if (response.action === 'addDepartment') {
        addNewDepartment(response.departmentName);
    } else if (response.action === 'addRole') {
        addRole(response.roleTitle, response.roleSalary, response.roleDepartmentId);
    } else {
        console.log('No action found.');
    }
})