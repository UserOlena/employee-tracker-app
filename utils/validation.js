// 
function isDecimal(value) {
    const decimalRegex = /^\d+(\.\d{1,2})?$/;
    if (decimalRegex.test(value)) {
      return true;
    } else {
      return "Input is not a valid decimal number.";
    }
}


// function checks that the user input is of the VARCHAR(30) data type
function isVarChar30(value) {
    const varcharRegex = /^.{1,30}$/;
    const isValid = varcharRegex.test(value);

    if (isValid) {
        return true;
    } else {
        return 'The input must have a length between 1 and 30 characters and cannot be empty.';
    }
}




module.exports = { isDecimal, isVarChar30, }