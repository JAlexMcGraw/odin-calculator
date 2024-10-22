// displaying the numbers
const display = document.querySelector('#display-text');
display.innerHTML = 0;

// running total of each of the number and symbols
let valuesAndOperators = [];

const buttons = ["9", "8", "7", "6", "5", "4", "3", "2", "1", "0",
".", "=", "+", "-", "*", "÷"]

// This is used to figure out what to do with which button is clicked.
function selectNumber(value) {
    let currentValue = "";
    // convert to decimal if it is a number
    if (!isNaN(value) || value === '.') {
        currentValue += value;
        // return value === '.' ? value : parseFloat(value);
        return value
    } else {
        valuesAndOperators.push(currentValue);
        currentValue = value;
    }

    console.log(`currentValue: ${currentValue}`)
    console.log(`valuesAndOperators: ${valuesAndOperators}`)
    // keep value if it is a symbol
    return value
}

// adding an event listener to each button
buttons.forEach(button => {
    console.log(`button: ${button}`)
    const btn = document.querySelector(`[id='${button}']`)
    console.log(btn)
    btn.addEventListener('click', () => selectNumber(button))
});

// updating the display number depending on what is in the valuesAndOperators array
function updateDisplay() {
    let lastValue = valuesAndOperators[valuesAndOperators.length - 1];
    display.innerHTML = lastValue;
}

display.addEventListener('click', updateDisplay);