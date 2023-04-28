const connection = require('./config/connection.js');
const consoleTable = require('console.table');


function selectAll(tableName) {
    connection.query(`SELECT * FROM ${tableName}`, (error, result) => {
        if (error) {
            throw new Error(error);
        } else {
            console.log(result);
        }
    });
}


function viewAllRoles() {

}


function viewAllEmployees() {

}


//connection.end();

module.exports = { selectAll }