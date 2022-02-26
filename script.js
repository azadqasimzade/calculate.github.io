const display = document.querySelector('.calculator-input');
const keys = document.querySelector('.calculator-keys');

let displayValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

updateDisplay();

function updateDisplay() {
    display.value = displayValue;
}

keys.addEventListener('click', (e) => {
    const element = e.target;
    const value = element.value;

    if (!element.matches('button')) return;

    switch (element.value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value);
            break;
        case '.':
            inputDecimal();
            break;
        case 'clear':
            inputClear();
            break;
        default:
            inputNumber(value);
    }
    updateDisplay();
});

// handle operator
function handleOperator(nextOperator) {
    const value = parseFloat(displayValue);

    if (operator && waitingForSecondValue) {
        operator = nextOperator;
        return;
    }

    if (firstValue === null) {
        firstValue = value;
    } else if (operator) {
        const result = calculate(firstValue, value, operator);

        displayValue = `${parseFloat(result.toFixed(8))}`;
        firstValue = result;
    }

    waitingForSecondValue = true;
    operator = nextOperator;
    console.log(displayValue, firstValue, operator, waitingForSecondValue);
}

// calculate
function calculate(first, second, operator) {
    if (operator === '+') {
        return first + second;
    } else if (operator === '-') {
        return first - second;
    } else if (operator === '*') {
        return first * second;
    } else if (operator === '/') {
        return first / second;
    }
    return second;
}

// input number
function inputNumber(num) {
    if (waitingForSecondValue) {
        displayValue = num;
        waitingForSecondValue = false;
    } else {
        displayValue = displayValue === '0' ? num : displayValue + num;
    }
    console.log(displayValue, firstValue, operator, waitingForSecondValue);
}

// decimal
function inputDecimal() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
    }
}

// clear
function inputClear() {
    displayValue = '0';
}