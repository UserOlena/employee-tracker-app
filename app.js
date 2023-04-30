const inquirer = require('inquirer');
const { showDepartments, showRoles, showEmployees, addNewDepartment, addNewRole, addNewEmployee, updateEmployeeRole, renderEmployeesChoicesList, renderRolesList, renderDepartmentList } = require('./utils/helper')


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
            {
                name: 'Add an employee',
                value: 'addEmployee',
            },
            {
                name: 'Update an employee role',
                value: 'updateEmployeeRole',
            },
        ],
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
        choices: renderDepartmentList,
    },
    {
        name: 'employeeFirstName',
        message: 'Kindly type the new employee first name in order to add them to the Employee database table.',
        type: 'input',
        when: (response) => response.action === 'addEmployee',
    },
    {
        name: 'employeeLastName',
        message: 'Kindly type the new employee last name in order to add them to the Employee database table.',
        type: 'input',
        when: (response) => response.action === 'addEmployee',
    },
    {
        name: 'employeeRoleId',
        message: `Kindly choose the role associated with the newly added employee.`,
        type: 'list',
        when: (response) => response.action === 'addEmployee',
        choices: renderRolesList,
    },
    {
        name: 'employeeManagerId',
        message: `Assign a manager to the newly added employee or choose "Manager doesn\'t apply to this employee".`,
        type: 'list',
        when: (response) => response.action === 'addEmployee',
        choices: [
            {
                name: 'Bossy Man - director',
                value: 1,
            },
            {
               name: 'Krishana Anderson - success manager',
               value: 2, 
            },
            {
               name: 'Rapunzel Casing - admission manager',
               value: 6, 
            },
            {
               name: 'Manager doesn\'t apply to this employee',
               value: null, 
            },
        ]
    },
    {
        name: 'employeeId',
        message: 'Kindly choose the existing employee to update their information.',
        type: 'list',
        when: (response) => response.action === 'updateEmployeeRole',
        choices: renderEmployeesChoicesList,
    },
    {
        name: 'newRoleId',
        message: 'Kindly choose the new employee role to update their information.',
        type: 'list',
        when: (response) => response.employeeId,
        choices: renderRolesList,
    }
]).then(async (response) => {
    console.log(response);

    if (response.action === 'department') {
        const currentDepartments = await showDepartments();
        console.table(currentDepartments);
    } else if (response.action === 'role') {
        const currentRoles = await showRoles();
        console.table(currentRoles);
    } else if(response.action === 'employee') {
        const currentEmployees = await showEmployees();
        console.table(currentEmployees);
    } else if (response.action === 'addDepartment') {
        const array = [];
        array.push(response.departmentName);
        await addNewDepartment(array);
    } else if (response.action === 'addRole') {
        const array = [];
        array.push(response.roleTitle, parseInt(response.roleSalary), response.roleDepartmentId);
        await addNewRole(array);
    } else if (response.action === 'addEmployee') {
        const array = [];
        array.push(response.employeeFirstName, response.employeeLastName, response.employeeRoleId, response.employeeManagerId);
        await addNewEmployee(array);
    } else if (response.employeeId) {
        const array = [];
        array.push(response.newRoleId, response.employeeId);
        await updateEmployeeRole(array);
    } else {
        console.log('No action found.');
    }
})


