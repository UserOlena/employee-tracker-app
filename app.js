const inquirer = require('inquirer');
const cTable = require('console.table');
const { isDecimal, isVarChar30 } = require('./utils/validation')
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
    renderManagerList,
    departmTotalBudget,
    deleteInfo,
    updateEmployeeManager,
    viewEmployeesByDepartment,
    viewEmployeesByManager,
    renderManagerListForNewEmployee
} = require('./utils/helper');


function init() {
    inquirer.prompt([
        {
            name: 'action',
            message: 'Which action are you interested in pursuing?',
            type: 'list',
            choices: [
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
                    name: 'Delete information',
                    value: 'deleteInformation',
                },
                {
                    name: 'Update an employee role',
                    value: 'updateEmployeeRole',
                },
                {
                    name: 'Update employee\'s manager',
                    value: 'updateEmployeeManager',
                },
                {
                    name: 'View all roles',
                    value: 'role',
                },
                {
                    name: 'View all departments',
                    value: 'department',
                },
                {
                    name: 'View all employees',
                    value: 'employee',
                },
                {
                    name: 'View employees by department',
                    value: 'employeesByDepartment',
                },
                {
                    name: 'View employees by manager',
                    value: 'employeesByManager',
                },
                {
                    name: 'View the total utilized budget of a department',
                    value: 'departmBudget',
                },
            ],
        },
        {
            name: 'departmentName',
            message: 'Kindly type the new department name in order to add it to the Department database table.',
            type: 'input',
            validate: isVarChar30,
            when: (response) => response.action === 'addDepartment',
        },
        {
            name: 'roleTitle',
            message: 'Kindly type the new role title in order to add it to the Role database table.',
            type: 'input',
            validate: isVarChar30,
            when: (response) => response.action === 'addRole',
        },
        {
            name: 'roleSalary',
            message: `Kindly type the salary for a newly added title in order to add it to the Role database table.`,
            type: 'input',
            validate: isDecimal,
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
            message: 'Kindly type the new employee first name in order to add them to the Employee database table',
            type: 'input',
            validate: isVarChar30,
            when: (response) => response.action === 'addEmployee',
        },
        {
            name: 'employeeLastName',
            message: 'Kindly type the new employee last name in order to add them to the Employee database table',
            type: 'input',
            validate: isVarChar30,
            when: (response) => response.action === 'addEmployee',
        },
        {
            name: 'employeeRoleId',
            message: `Kindly choose the role associated with the newly added employee`,
            type: 'list',
            when: (response) => response.action === 'addEmployee',
            choices: renderRolesList,
        },
        {
            name: 'employeeManagerId',
            message: `Assign a manager to the newly added employee or choose "Manager doesn\'t apply to this employee"`,
            type: 'list',
            when: (response) => response.action === 'addEmployee',
            choices: renderManagerListForNewEmployee,
        },
        {
            name: 'employeeId',
            message: 'Kindly choose the existing employee to update their information',
            type: 'list',
            when: (response) => response.action === 'updateEmployeeRole',
            choices: renderEmployeesChoicesList,
        },
        {
            name: 'newRoleId',
            message: 'Kindly choose the new employee role to update their information',
            type: 'list',
            when: (response) => response.action === 'updateEmployeeRole',
            choices: renderRolesList,
        },
        {
            name: 'departmentId',
            message: 'Kindly choose the department you would like to view the total utilized budget of',
            type: 'list',
            when: (response) => response.action === 'departmBudget',
            choices: renderDepartmentList,
        },
        {
            name: 'whatToDelete',
            message: 'Please select the option you want to delete',
            type: 'list',
            when: (response) => response.action === 'deleteInformation',
            choices: [
                {
                    name: 'Department',
                    value: 'department',
                },
                {
                    name: 'Role',
                    value: 'role',
                },
                {
                    name: 'Employee',
                    value: 'employee',
                },
            ],
        },
        {
            name: 'deleteDepartmentId',
            message: 'Kindly choose the department you would like to delete',
            type: 'list',
            when: (response) => response.whatToDelete === 'department',
            choices: renderDepartmentList,
        },
        {
            name: 'deleteRoleId',
            message: 'Kindly choose the role you would like to delete',
            type: 'list',
            when: (response) => response.whatToDelete === 'role',
            choices: renderRolesList,
        },
        {
            name: 'deleteEmployeeId',
            message: 'Kindly choose the employee you would like to delete',
            type: 'list',
            when: (response) => response.whatToDelete === 'employee',
            choices: renderEmployeesChoicesList,
        },
        {
            name: 'updateEmployeeId',
            message: 'To update employee\'s manager kindly choose the employee from the provided list',
            type: 'list',
            when: (response) => response.action === 'updateEmployeeManager',
            choices: renderEmployeesChoicesList,
        },
        {
            name: 'updateEmployeeManagerId',
            message: 'Kindly choose the manager you would like to apply for chosen employee',
            type: 'list',
            when: (response) => response.action === 'updateEmployeeManager',
            choices: renderManagerList,
        },
        {
            name: 'departmentIdToViewEmployees',
            message: 'Kindly choose the department in order to view its employees',
            type: 'list',
            when: (response) => response.action === 'employeesByDepartment',
            choices: renderDepartmentList,
        },
        {
            name: 'managerIdToViewEmployees',
            message: 'Kindly choose the manager from the provided list in order to view all the employees assigned to that manager',
            type: 'list',
            when: (response) => response.action === 'employeesByManager',
            choices: renderManagerList,
        },
    ]).then(async (response) => {
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
                await addNewDepartment([response.departmentName]);
                break;
            case 'addRole':
                await addNewRole([response.roleTitle, parseInt(response.roleSalary), response.roleDepartmentId]);
                break;
            case 'addEmployee':
                await addNewEmployee([response.employeeFirstName, response.employeeLastName, response.employeeRoleId, response.employeeManagerId]);
                break;
            case 'updateEmployeeRole':
                await updateEmployeeRole([response.newRoleId, response.employeeId]);
                break;
            case 'departmBudget':
                await departmTotalBudget([response.departmentId]);
                break;
            case 'updateEmployeeManager':
                await updateEmployeeManager([response.updateEmployeeManagerId, response.updateEmployeeId]);
                break;
            case 'employeesByDepartment':
                await viewEmployeesByDepartment([response.departmentIdToViewEmployees]);
                break;
            case 'employeesByManager':
                await viewEmployeesByManager([response.managerIdToViewEmployees]);
                break;
            case 'deleteInformation':
                switch(response.whatToDelete) {
                    case 'department':
                        await deleteInfo(response.whatToDelete, [response.deleteDepartmentId]);
                        break;
                    case 'role':
                        await deleteInfo(response.whatToDelete, [response.deleteRoleId]);
                        break;
                    case 'employee':
                        await deleteInfo(response.whatToDelete, [response.deleteEmployeeId]);
                        break;
                }
                break;
            default:
                console.log('No action found.');
                break;
            }

        init();
    })
}
 

init();
