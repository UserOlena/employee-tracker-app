const { sqlSelect, employeesListForPrompt } = require('../queries.js');


// function passes SQL to the "connection.query()" to retrieve the current departments when a user selects the "view all departments" option.
async function showDepartments() {
    const sql = `
        SELECT * FROM department;`;
    sqlSelect(sql);
}


// function passes SQL to the "connection.query()" to retrieve the current roles when a user selects the "view all roles" option.
async function showRoles() {
    const sql = `
        SELECT r.id, r.title, r.salary, d.name 
        FROM role r
            LEFT JOIN department d on r.department_id = d.id;`;
    sqlSelect(sql);
}


// function passes SQL to the "connection.query()" to retrieve the current employees information and their assosiated data from role and department tables when a user selects the "view all employees" option.
async function showEmployees() {
    const sql = `
        SELECT e.id, e.first_name, e.last_name, r.title, r.salary, d.name as department_name, coalesce(manager.first_name, "manager does") as manager_first_name, coalesce(manager.last_name, "not apply") as manager_last_name
        FROM employee e
            LEFT JOIN role r on e.role_id = r.id
            LEFT JOIN department d on r.department_id = d.id
            LEFT JOIN employee manager on e.manager_id = manager.id;`;
    sqlSelect(sql);
}


async function renderEmployeesChoicesList() {
    const employeesList = await employeesListForPrompt();
    const employeeChoices = [];
       
    employeesList.forEach(element => {
        const employee = {
            name: `${element.first_name} ${element.last_name} - ${element.department_name}`,
            value: element.id,
        }
    
        employeeChoices.push(employee);
    })
      
    return employeeChoices;
}


async function renderDepartmentsList() {
    const departmentList = await selectAll('department');
    const departmentChoices = [];
       
    departmentList.forEach(element => {
        const department = {
            name: `${element.name}`,
            value: element.id,
        }
    
        departmentChoices.push(department);
    })
      
    console.log(departmentChoices);
    return departmentChoices;
}


module.exports = { showDepartments, showRoles, showEmployees, renderEmployeesChoicesList, renderDepartmentsList }