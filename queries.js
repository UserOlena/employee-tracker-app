const connection = require('./config/connection.js');


// function is invoked to fetch information from the database and present it in a tabular format on the console.
async function sqlSelect(sql, values) {
    try {
        const [ result ] = await connection.query(sql, values);
        return result;
    } catch (error) {
        console.log(error);
    }
}


// if the user selects to add specific information from the prompts, the function is designed to insert this new information into the database.
async function sqlInsert(sql, newValues, logInfo) {  
    try {
    await connection.query(sql, newValues);
    console.log(logInfo);
    } catch (error) {
        console.log(error);
    }
}

//connection.end();

module.exports = { sqlSelect, sqlInsert }