const connection = require('./config/connection.js');


async function selectAll(tableName) {
    try {
        const [ rows ] = await connection.query(`SELECT * FROM ${tableName};`);
        return rows;
    } catch (error) {
        console.log(error);
    }
}


async function addNewDepartment(newDepartment) {
    const sql = `
        INSERT INTO department(name)
        VALUES (?);`
    try {
    await connection.query(sql, [newDepartment]);
    console.log(`${newDepartment} department has succesfully been added to the Department database table!`);
    } catch (error) {
        console.log(error);
    }
}

function addRole(roleTitle, roleSalary, roleDepartmentId) {
    connection.query(`
        INSERT INTO role(title, salary, department_id)
        VALUES (?, ?, ?);`,
        [roleTitle, roleSalary, roleDepartmentId],
        (error, result) => {
            if (error) {
                throw new Error(error);
            } else {
                console.log(`New ${roleTitle} role and it's salary of ${roleSalary} has succesfully been added to the Role database table!`);
            }
        })
}


function addEmployee(employeeFirstName, employeeLastName, employeeRoleId, employeeManagerId) {
 connection.query(`
    INSERT INTO employee(first_name, last_name, role_id, manager_id)
    VALUES (?, ?, ?, ?);`,
    [employeeFirstName, employeeLastName, employeeRoleId, employeeManagerId],
    (error, result) => {
        if (error) {
            throw new Error(error);
        } else {
            console.log(`New employee ${employeeFirstName} ${employeeLastName} has been succesfully added to the Employee database table!`);
        }
    })
}


async function updateEmployeeRole(newRoleId, employeeId) {
    console.log(newRoleId, employeeId)
    const sql = `
        UPDATE employee
        SET role_id = ?
        WHERE id = ?;`;
    const values = [parseInt(employeeId), parseInt(newRoleId)];
    try {
        await connection.query(sql, values);
    } catch (error) {
        console.log(error);
    }
}


// function that retrieves a list of current employees (id, first_name, last_name) from the employee table and their corresponding departments from the department table.
async function employeesListForPrompt() {
    const sql = `
        SELECT e.id, e.first_name, e.last_name, coalesce(d.name, 'no department') as department_name 
        FROM employee e 
            LEFT JOIN role r on e.role_id = r.id 
            LEFT JOIN department d on r.department_id = d.id;`;
    try {
        const [ rows ] = await connection.query(sql);   
        return rows;
    } catch (error) {
        console.log(error);
    }
}


//connection.end();

module.exports = { selectAll, addNewDepartment, addRole, addEmployee, updateEmployeeRole, employeesListForPrompt }