const inquirer = require('inquirer');
const { selectAll, addNewDepartment, addRole, addEmployee, updateEmployeeRole } = require('./queries');
const { showDepartments, showRoles, showEmployees, renderEmployeesChoicesList, renderDepartmentsList } = require('./utils/helper')


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
                name: 'junior teacher assistant',
                value: 5,
            },
            {
                name: 'tutor',
                value: 6,
            },
            {
                name:'admission manager',
                value: 7,
            },
            {
                name: 'admission',
                value: 8,
            },
        ]
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
        name: 'employeeToUpdate',
        message: 'Kindly choose the existing employee to update their information.',
        type: 'list',
        when: (response) => response.action === 'updateEmployeeRole',
        choices: renderEmployeesChoicesList,
    },
    {
        name: 'updatedRole',
        message: 'Kindly choose the new employee role to update their information.',
        type: 'list',
        when: (response) => response.employeeToUpdate,
        choices: renderDepartmentsList,
    }
]).then(async (response) => {
    console.log(response);

    if (response.action === 'department') {
        await showDepartments();
    } else if (response.action === 'role') {
        await showRoles();
    } else if(response.action === 'employee') {
        await showEmployees();
    } else if (response.action === 'addDepartment') {
        addNewDepartment(response.departmentName);
    } else if (response.action === 'addRole') {
        addRole(response.roleTitle, response.roleSalary, response.roleDepartmentId);
    } else if (response.action === 'addEmployee') {
        addEmployee(response.employeeFirstName, response.employeeLastName, response.employeeRoleId, response.employeeManagerId);
    } else if (response.employeeToUpdate) {
        console.log(`employee id: ${response.employeeToUpdate}, new role: ${response.updatedRole}`);
        updateEmployeeRole(response.employeeToUpdate, response.updatedRole);
    } else {
        console.log('No action found.');
    }
})


