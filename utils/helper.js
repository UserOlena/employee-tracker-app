const { sqlSelect, sqlInsert } = require('../queries.js');


// function passes SQL to the "connection.query()" to retrieve the current departments when a user selects the "view all departments" option.
async function showDepartments() {
    const sql = `
        SELECT * FROM department;`;  
    const result = await sqlSelect(sql);
    return result;
}


// function passes SQL to the "connection.query()" to retrieve the current roles when a user selects the "view all roles" option.
async function showRoles() {
    const sql = `
        SELECT r.id, r.title, r.salary, d.name 
        FROM role r
            LEFT JOIN department d on r.department_id = d.id;`;
    const result = await sqlSelect(sql);;
    return result;
}


// function passes SQL to the "connection.query()" to retrieve the current employees information and their assosiated data from role and department tables when a user selects the "view all employees" option.
async function showEmployees() {
    const sql = `
        SELECT e.id, e.first_name, e.last_name, r.title, r.salary, d.name as department_name, coalesce(manager.first_name, "manager does") as manager_first_name, coalesce(manager.last_name, "not apply") as manager_last_name
        FROM employee e
            LEFT JOIN role r on e.role_id = r.id
            LEFT JOIN department d on r.department_id = d.id
            LEFT JOIN employee manager on e.manager_id = manager.id;`;
        const result = await sqlSelect(sql);
        return result;
}


async function addNewDepartment(valuesArray) {
    const sql = `
        INSERT INTO department(name)
        VALUES (?);`;
    const log = `The new ${valuesArray} department has been added to the database successfully!`;
    await sqlInsert(sql, valuesArray, log);
}


async function addNewRole(valuesArray) {
    const sql = `
    INSERT INTO role(title, salary, department_id)
    VALUES (?, ?, ?);`;
    const log = `The new ${valuesArray[0]} role and assosiated salary of ${valuesArray[1]} has been added to the database successfully!`;
    await sqlInsert(sql, valuesArray, log);
}


async function addNewEmployee(valuesArray) {
    const sql = `
    INSERT INTO employee(first_name, last_name, role_id, manager_id)
    VALUES (?, ?, ?, ?);`;
    const log = `New employee ${valuesArray[0]} ${valuesArray[1]} has been added to the "employee" database table succesfully!`;
    await sqlInsert(sql, valuesArray, log);
}


async function updateEmployeeRole(valuesArray) {

    const sql = `
        UPDATE employee
        SET role_id = ?
        WHERE id = ?;`;
    const log = `Employee's role has been updated successfully!`   
    await sqlInsert(sql, valuesArray, log);
}


// function that retrieves a list of current employees (id, first_name, last_name) from the employee table and their corresponding title from the role table.
async function renderEmployeesChoicesList() {
    const sql = `
        SELECT e.id, e.first_name, e.last_name, coalesce(r.title, "no title applied") as title
        FROM employee e 
            LEFT JOIN role r on e.role_id = r.id;`;
    const employeesList = await sqlSelect(sql);
    const employeeChoices = [];
       
    employeesList.forEach(element => {
        const employee = {
            name: `${element.first_name} ${element.last_name} - ${element.title}`,
            value: element.id,
        }
    
        employeeChoices.push(employee);
    })
      
    return employeeChoices;
}


async function renderRolesList() {
    const rolesList = await showRoles();
    const roleChoices = [];
       
    rolesList.forEach(element => {
        const role = {
            name: `${element.title}`,
            value: element.id,
        }
    
        roleChoices.push(role);
    })
      
    console.log(roleChoices);
    return roleChoices;    
}


module.exports = { showDepartments, showRoles, showEmployees, addNewDepartment, addNewRole, addNewEmployee, updateEmployeeRole, renderEmployeesChoicesList, renderRolesList }