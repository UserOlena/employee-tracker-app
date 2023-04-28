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
                console.log(`${newDepartment} department has succesfully been added to the department database table!`);
            }
        });

}


function addRole(newRole) {

}


//connection.end();

module.exports = { selectAll, addNewDepartment }