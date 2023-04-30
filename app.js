const inquirer = require('inquirer');
const { 
    showDepartments, 
    showRoles, 
    showEmployees, 
    addNewDepartment, 
    addNewRole, 
    addNewEmployee, 
    updateEmployeeRole, 
    renderEmployeesChoicesList, 
    renderRolesList, 
    renderDepartmentList, 
    renderManagerChoicesList 
} = require('./utils/helper');


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
        choices: renderManagerChoicesList,
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
        when: (response) => response.action === 'updateEmployeeRole',
        choices: renderRolesList,
    }
]).then(async (response) => {
    console.log(response);

    switch (response.action) {
        case 'department':
            const currentDepartments = await showDepartments();
            console.table(currentDepartments);
            break;
        case 'role':
            const currentRoles = await showRoles();
            console.table(currentRoles);
            break;
        case 'employee':
            const currentEmployees = await showEmployees();
            console.table(currentEmployees);
            break;
        case 'addDepartment':
            const departArray = [];
            departArray.push(response.departmentName);
            await addNewDepartment(departArray);
            break;
        case 'addRole':
            const roleArray = [];
            roleArray.push(response.roleTitle, parseInt(response.roleSalary), response.roleDepartmentId);
            await addNewRole(roleArray);
            break;
        case 'addEmployee':
            const employeeArray = [];
            employeeArray.push(response.employeeFirstName, response.employeeLastName, response.employeeRoleId, response.employeeManagerId);
            await addNewEmployee(employeeArray);
            break;
        case 'updateEmployeeRole':
            const updateEmployeeArray = [];
            updateEmployeeArray.push(response.newRoleId, response.employeeId);
            await updateEmployeeRole(updateEmployeeArray);
            break;
        default:
            console.log('No action found.');
    }
})
 







  


        



