const connection = require('./config/connection.js');


function selectAll(tableName) {
    connection.query(`SELECT * FROM ${tableName};`, (error, result) => {
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
        VALUES ('${newDepartment}');`,
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
        VALUES ('${roleTitle}', '${roleSalary}', ${roleDepartmentId});`,
        (error, result) => {
            if (error) {
                throw new Error(error);
            } else {
                console.log(`New ${roleTitle} role and it's salary of ${roleSalary} has succesfully been added to the Role database table!`);
            }
        })
}


//connection.end();

module.exports = { selectAll, addNewDepartment, addRole }