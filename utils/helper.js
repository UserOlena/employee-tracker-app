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
        SELECT r.id, r.title, r.salary, d.name as department_name
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


// function invokes connection.query() passing the specific values provided by user in the prompt in order to add a new department name to the DB
async function addNewDepartment(valuesArray) {
    const sql = `
        INSERT INTO department(name)
        VALUES (?);`;
    const log = `The new ${valuesArray} department has been added to the database successfully!`;
    await sqlInsert(sql, valuesArray, log);
}


// function invokes connection.query() passing the specific values provided by user in the prompt in order to add a new job role to the DB
async function addNewRole(valuesArray) {
    const sql = `
    INSERT INTO role(title, salary, department_id)
    VALUES (?, ?, ?);`;
    const log = `The new ${valuesArray[0]} role and assosiated salary of ${valuesArray[1]} has been added to the database successfully!`;
    await sqlInsert(sql, valuesArray, log);
}


// function invokes connection.query() passing the specific values provided by user in the prompt in order to add a new employee to the DB
async function addNewEmployee(valuesArray) {
    const sql = `
    INSERT INTO employee(first_name, last_name, role_id, manager_id)
    VALUES (?, ?, ?, ?);`;
    const log = `New employee ${valuesArray[0]} ${valuesArray[1]} has been added to the "employee" database table succesfully!`;
    await sqlInsert(sql, valuesArray, log);
}


// function invokes connection.query() passing the specific values provided by user in the prompt in order to update employee role.
async function updateEmployeeRole(valuesArray) {
    const sql = `
        UPDATE employee
        SET role_id = ?
        WHERE id = ?;`;
    const log = `Employee's role has been updated successfully!`   
    await sqlInsert(sql, valuesArray, log);
}


// function that retrieves a list of current employees (id, first_name, last_name) from the employee table and their corresponding title 
// from the role table and generates the choices list for the list type prompt
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


// function renders all the roles from the DB and generates the choices list for the list type prompt
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
    return roleChoices;    
}


// function renders all the departments from the DB and generates the choices list for the list type prompt
async function renderDepartmentList() {
    const departList = await showDepartments();
    const departChoices = [];

    departList.forEach(element => {
        const department = {
            name: `${element.name}`,
            value: element.id,
        }
        departChoices.push(department);
    })
    return departChoices;
}


// function renders all the managers from the DB and generates the choices list for the list type prompt
async function renderManagerChoicesList() {
    const sql = `
        SELECT e.id, e.first_name, e.last_name, coalesce(r.title, "no title applied") as title
        FROM employee e 
            LEFT JOIN role r on e.role_id = r.id
        Where r.id in (1, 2, 3, 9, 11, 12, 13, 16, 18);`;
    const employeesList = await sqlSelect(sql);
    const employeeChoices = [
        {
        name: 'Manager doesn\'t apply to this employee',
        value: null, 
        }
    ];
       
    employeesList.forEach(element => {
        const employee = {
            name: `${element.first_name} ${element.last_name} - ${element.title}`,
            value: element.id,
        }   
        employeeChoices.unshift(employee);
    })     
    return employeeChoices;
}


// function that take department ID as a parameter and retrieves the total salary of employees working in that department.
async function departmTotalBudget(departmId) {
    const sql = `
    SELECT SUM(salary) AS "Total Salary For Chosen Department"
    FROM employee e
		JOIN role r
    WHERE e.role_id = r.id
    AND r.department_id = ?;`;
    const result = await sqlSelect(sql, departmId);
    console.table(result);
}


// function invokes connection.query() passing the sql code and the value in order to delete specific information provided by user in the prompts. 
async function deleteInfo(tableName, values) {
    const sql = `
    DELETE FROM ${tableName}
    WHERE id = ?;`;
    const log = `The ${tableName} has been deleted from the database successfully!`;
    await sqlInsert(sql, values, log);
    //const DeleteInfo = new ActionsOnDb(sql, values);
    // DeleteInfo.delete(sql, values);
   // DeleteInfo.delete();
}


// function invokes connection.query() passing the specific values provided by user in the prompt in order to update employee's manager in the DB
async function updateEmployeeManager(values) {
    const sql = `
        UPDATE employee
        SET manager_id = ?
        WHERE id = ?;`;
    const log = `The employee's manager has been updated successfully!`;
    await sqlInsert(sql, values, log)
}


async function viewEmployeesByDepartment(values) {
    const sql = `           
        SELECT e.id, e.first_name, e.last_name, r.title, r.salary, manager.first_name as manager_first_name, manager.last_name as manager_last_name
        FROM employee e
            JOIN role r on e.role_id = r.id
            JOIN employee manager on e.manager_id = manager.id
            JOIN department d on r.department_id = d.id
        WHERE d.id = ?;`;
    const result = await sqlSelect(sql, values);
    console.table(result);
}



// class ActionsOnDb {
//     constructor(sql, values) {
//         this.sql = sql;
//         this.values = values;
//     }

//     async delete() {
//         await sqlInsert(this.sql, this.values);
//     }
// }


module.exports = { 
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
    renderManagerChoicesList,
    departmTotalBudget,
    deleteInfo,
    updateEmployeeManager,
    viewEmployeesByDepartment
}