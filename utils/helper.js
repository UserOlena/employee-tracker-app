const { employeesListForPrompt, selectAll } = require('../queries.js');


async function renderEmployeesChoicesList() {
    const employeesList = await employeesListForPrompt();
    const employeeChoices = [];
       
    employeesList.forEach(element => {
        const employee = {
            name: `${element.first_name} ${element.last_name} - ${element.department_name}`,
            value: `${element.id}`,
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
            value: `${element.id}`,
        }
    
        departmentChoices.push(department);
    })
      
    console.log(departmentChoices);
    return departmentChoices;
}


module.exports = { renderEmployeesChoicesList, renderDepartmentsList }