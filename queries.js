const connection = require('./config/connection.js');


function selectAll(tableName) {
    connection.query(`SELECT * FROM ?;`, [tableName], (error, result) => {
        if (error) {
            throw new Error(error);
        } else {
            console.table(result);
        }
    });
}


function addNewDepartment(newDepartment) {
    connection.query(`
        INSERT INTO department(name)
        VALUES (?);`,
        [newDepartment],
        (error, result) => {
            if (error) {
                console.log(`${result} result`);
                throw new Error(error);
            } else {
                console.log(`${newDepartment} department has succesfully been added to the Department database table!`);
            }
        });

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
            console.log(`New employee ${employeeFirstName} ${employeeLastName} has been succesfully added to the Employee database table!`)
        }
    })
}

employeeFirstName = "); DROP TABLE employee; '";


//connection.end();

module.exports = { selectAll, addNewDepartment, addRole, addEmployee }