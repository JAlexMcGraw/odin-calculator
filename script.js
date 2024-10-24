// displaying the numbers
const display = document.querySelector('#display-text');
// display.innerHTML = 0;

// running total of each of the number and symbols
let valuesAndOperators = [];

const buttons = ["9", "8", "7", "6", "5", "4", "3", "2", "1", "0",
".", "=", "+", "-", "*", "/", "C"]

const operators = ["=", "+", "-", "*", "/", "C"]

let currentValue = "";

let answer;

function selectNumber(value) {
    console.log(`valuesAndOperators length: ${valuesAndOperators.length}`);
    if (value === "C") {
        currentValue = "";
        answer = 0;
        valuesAndOperators = [];
        updateDisplay();
        return
    } else if (value === "=" && valuesAndOperators.length < 3) {
        alert("Need to provide some values to calculate! Resetting...");
        currentValue = "";
        answer = 0;
        valuesAndOperators = [];
        updateDisplay();
        return
    } else if (value === "=") {
        checkZeroDiv = checkIfZeroDivision(valuesAndOperators);
        if (checkZeroDiv) {
            currentValue = "";
            answer = 0;
            valuesAndOperators = [];
            updateDisplay();
            return
        }
    }
    // convert to decimal if it is a number
    console.log(`value selected: ${value}`);
    console.log(`currentValue at beginning: ${currentValue}`);
    if (!isNaN(value) || value === '.') {
        currentValue += value;

        if (!["+", "-", "*", "/"].includes(valuesAndOperators[valuesAndOperators.length - 1])) {
            valuesAndOperators[valuesAndOperators.length - 1] = currentValue;
        } else {
            valuesAndOperators.push(currentValue);
        }
        
    } else {
        const logic = (operator) => ["+", "-", "*", "/"].includes(operator);
        if (valuesAndOperators.some(logic)) {
            // console.log(`second operator: ${value}`);
            midwayAnswer = calculateExpression(valuesAndOperators);
            valuesAndOperators = [];
            valuesAndOperators.push(midwayAnswer);
            updateDisplay();
            valuesAndOperators.push(value);
            currentValue = "";
            // console.log(`vals and ops: ${valuesAndOperators}`);
            return
        }
        // if the current value is not an empty string, then push it to the array. If it is none,
        // then keep the empty string.
        currentValue !== "" && value !== "=" ? valuesAndOperators.push(currentValue) : "";

        currentValue = value;
        // If the last value is not an operator (it is a number or period), then push the new operator
        if (currentValue === "=") {
          
            answer = calculateExpression(valuesAndOperators);
            // console.log(`values and operators at equals: ${valuesAndOperators}`);
            valuesAndOperators.push(answer);
            // return
        } else if (!operators.includes(valuesAndOperators[valuesAndOperators.length - 1])) {
            // console.log(`pushing currentValue bc of operator: ${currentValue}`);
            valuesAndOperators.push(currentValue);
            valuesAndOperators.push("");
        // If the last value of the array is an operator, then replace the last value of the array
        } else {
            valuesAndOperators[valuesAndOperators.length - 1] = currentValue;
        }
        currentValue = "";
        // console.log(`currentValue at end of else: ${currentValue}`);
    }



    console.log(`currentValue at end: ${currentValue}`)
    console.log(`valuesAndOperators at end: ${valuesAndOperators}`)
    updateDisplay();
    // keep value if it is a symbol
    // return value
}

// updating the display number depending on what is in the valuesAndOperators array
// This is not displaying the values
function updateDisplay() {
    let lastValue = valuesAndOperators[valuesAndOperators.length - 1];
    display.textContent = lastValue;
}

function checkIfZeroDivision(array) {
    if (array[array.length - 2] === "/" && array[array.length - 1] === "0") {
        alert("Don't divide by 0 silly!");
        valuesAndOperators.pop();
        currentValue = "";
        return true
    }
}

// Call this when "=" is clicked
// WORK IN PROGRESS
function calculateExpressionMine(array) {
    let runningValue = 0;
    let currentEval = 0;
    let currentOperator = "";

    var math_it_up = {
        '+': function (x, y) { return x + y },
        '-': function (x, y) { return x - y },
        '/': function (x, y) { return x / y }, 
        "*": function (x, y) { return x * y }
    }

    for (let i = 0; i < array.length; i++) {
        if (!isNaN(array[i]) && currentEval === 0) {
            currentEval = array[i];
        } elif (!isNaN(array[i]) && currentEval !== 0) 
            console.log("WORK IN PROGRESS")
        }
    }


// adding an event listener to each button
buttons.forEach(button => {
    // console.log(`button: ${button}`)
    const btn = document.querySelector(`[id='${button}']`)
    // console.log(btn)
    btn.addEventListener('click', () => selectNumber(button))
});

///////////
// This is from ChatGPT to calculate the output
// Define operator precedence and associativity
const precedence = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
};

const isOperator = (token) => ['+', '-', '*', '/'].includes(token);
const isNumber = (token) => !isNaN(parseFloat(token)) && isFinite(token);

// Convert infix expression (array of strings) to postfix (RPN)
function infixToPostfix(arr) {
    const output = [];
    const operators = [];
    
    for (let token of arr) {
        if (isNumber(token)) {
            // If token is a number, add to output
            output.push(token);
        } else if (isOperator(token)) {
            // While there's an operator on the stack with greater precedence, pop it to output
            while (operators.length > 0 && precedence[operators[operators.length - 1]] >= precedence[token]) {
                output.push(operators.pop());
            }
            // Push the current operator onto the stack
            operators.push(token);
        }
    }
    
    // Pop any remaining operators to the output
    while (operators.length > 0) {
        output.push(operators.pop());
    }
    
    return output;
}

// Evaluate the postfix expression
function evaluatePostfix(postfix) {
    const stack = [];
    
    for (let token of postfix) {
        if (isNumber(token)) {
            // Push numbers onto the stack
            stack.push(parseFloat(token));
        } else if (isOperator(token)) {
            // Pop two operands, apply the operator, and push the result back
            const b = stack.pop();
            const a = stack.pop();
            let result;
            switch (token) {
                case '+':
                    result = a + b;
                    break;
                case '-':
                    result = a - b;
                    break;
                case '*':
                    result = a * b;
                    break;
                case '/':
                    result = a / b;
                    break;
            }
            stack.push(result);
        }
    }
    
    // The final result is the only value left in the stack
    return stack.pop();
}

// Main function to calculate the expression
function calculateExpression(arr) {
    const postfix = infixToPostfix(arr);
    return evaluatePostfix(postfix);
}