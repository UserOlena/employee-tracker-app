const connection = require('./config/connection.js');


// function is invoked to fetch information from the database
async function sqlRetrieveData(sql, values) {
    try {
        const [ result ] = await connection.query(sql, values);
        return result;
    } catch (error) {
        console.log(error);
    }
}


// if the user selects to add, modify or delete specific information from the prompts, the function is designed to process this information in the database.
async function sqlModifyData(sql, newValues, logInfo) {  
    try {
    await connection.query(sql, newValues);
    console.log(logInfo);
    } catch (error) {
        console.log(error);
    }
}


module.exports = { sqlRetrieveData, sqlModifyData }