const operators = {
    Add: 0,
    Subtract: 1,
    Multiply: 2,
    Divide: 3,
}

const numberField = document.getElementById("number-field");
const numbers = document.getElementsByClassName("number");
const clear = document.getElementById("clear");
const add = document.getElementById("plus");
const minus = document.getElementById("minus");
const equals = document.getElementById("equals");
const multiply = document.getElementById("times");
const divide = document.getElementById("divide");
const negative = document.getElementById("negative");
const percentage = document.getElementById("percentage");
const decimal = document.getElementById("decimal");

let firstNumber = undefined;
let currentOperator = undefined;
let isStartingNextNumber = false;

setNumberButtonEvents();
setOperatorButtonEvents();
setColorChangeEvents();

clear.addEventListener("click", () => {
    onClearClicked();
});

equals.addEventListener("click", () => {
    operate();
});

negative.addEventListener("click", () => {
    if (numberField.textContent[0] === "-") {
        let currentContext = numberField.textContent;
        numberField.textContent = currentContext.slice(1);
    } else {
        let currentContext = numberField.textContent;
        numberField.textContent = "-" + currentContext;
    }
});

percentage.addEventListener("click", () => {
    numberField.textContent = parseFloat(numberField.textContent) / 100;
})

decimal.addEventListener("click", () => {
    onDecimialClicked();
});

addEventListener("keydown", (event) => {
    event.preventDefault();

    if (parseInt(event.key) >= 0 && parseInt(event.key) <= 9) {
        for (number of numbers) {
            if (number.textContent === event.key) {
                changeColor(number, "#808080", "#9c9a9a");
            }
        }
        insertNumberToNumberField(event.key);
    }

    if (event.shiftKey && event.key === "+") {
        changeColor(add, "#ffa70f", "#ffd30f");
        onOperatorClicked(operators.Add);
    }

    if (event.key === "-") {
        changeColor(minus, "#ffa70f", "#ffd30f");
        onOperatorClicked(operators.Subtract);
    }

    if (event.key === "/") {
        changeColor(divide, "#ffa70f", "#ffd30f");
        onOperatorClicked(operators.Divide);
    }

    if (event.shiftKey && event.key === "*") {
        changeColor(multiply, "#ffa70f", "#ffd30f");
        onOperatorClicked(operators.Multiply);
    }

    if (event.key === "Escape") {
        changeColor(clear, "#474747", "#616161");
        onClearClicked();
    }

    if (event.shiftKey && event.key === "%") {
        changeColor(percentage, "#474747", "#616161");
        numberField.textContent = parseFloat(numberField.textContent) / 100;
    }

    if (event.key === ".") {
        changeColor(decimal, "#808080", "#9c9a9a");
        onDecimialClicked();
    }

    if (event.key === "Enter" || event.key === "=") {
        changeColor(divide, "#ffa70f", "#ffd30f");
        operate();
    }

    if (event.key === "Backspace") {
        numberField.textContent = numberField.textContent.slice(0, numberField.textContent.length - 1);

        console.log(numberField.textContent.length);
        if (numberField.textContent.length === 0) {
            numberField.textContent = "0";
        }
    }

    console.log(event.key);
})

function setNumberButtonEvents() {
    for (let number of numbers) {
        number.addEventListener("click", () => {
            insertNumberToNumberField(number.textContent);
        });
    }
}

function insertNumberToNumberField(num) {
    if (numberField.textContent === "0" || isStartingNextNumber) {
        numberField.textContent = "";
    }
    numberField.textContent += num;
    setNumberFieldTextSize();
    isStartingNextNumber = false;
}

function setColorChangeEvents() {
    const lightGray = document.getElementsByClassName("gray");
    const darkGray = document.getElementsByClassName("dark");
    const orange = document.getElementsByClassName("orange");

    for (let button of lightGray) {
        button.addEventListener("click", () => {
            changeColor(button, "#808080", "#9c9a9a");
        });
    }

    for (let button of darkGray) {
        button.addEventListener("click", () => {
            changeColor(button, "#474747", "#616161");
        });
    }

    for (let button of orange) {
        button.addEventListener("click", () => {
            changeColor(button, "#ffa70f", "#ffd30f");
        });
    }
}

function changeColor(element, initial, after) {
        element.style.backgroundColor = after;
        setTimeout(() => element.style.backgroundColor = initial, 200);
}

function setOperatorButtonEvents() {
    add.addEventListener("click", () => {
        onOperatorClicked(operators.Add);
    });
    
    minus.addEventListener("click", () => {
        onOperatorClicked(operators.Subtract);
    });
    
    multiply.addEventListener("click", () => {
        onOperatorClicked(operators.Multiply);
    });
    
    divide.addEventListener("click", () => {
        onOperatorClicked(operators.Divide);
    });
}

function onOperatorClicked(operator) {
    currentOperator = operator;
    firstNumber = parseFloat(numberField.textContent);
    isStartingNextNumber = true;
}

function operate() {
    let solution = 0;

    switch(currentOperator) {
        case operators.Add:
            solution = firstNumber + parseFloat(numberField.textContent);
            break;
        
        case operators.Subtract:
            solution = firstNumber - parseFloat(numberField.textContent);
            break;
        
        case operators.Multiply:
            solution = firstNumber * parseFloat(numberField.textContent);
            break;
        
        case operators.Divide:
            if (firstNumber === 0 || parseFloat(numberField.textContent) === 0) {
                solution = "WHAT!?";
                firstNumber = undefined;
                isStartingNextNumber = true;
            } else if (firstNumber !== 0 || parseFloat(numberField.textContent) !== 0) {
                solution = firstNumber / parseFloat(numberField.textContent);
            }
            break;

        default:
            break;
    }

    numberField.textContent = solution;
    setNumberFieldTextSize();
}

function onClearClicked() {
    numberField.textContent = "0";
    setNumberFieldTextSize();
    firstNumber = undefined;
    currentOperator = undefined;
}

function onDecimialClicked() {
    if (parseFloat(numberField.textContent) % 1 === 0) {
        numberField.textContent += ".";
    }
}

function setNumberFieldTextSize() {
    const defaultSize = 48;
    const lengthOver = numberField.textContent.length - 9;
    const subtractionAmount = lengthOver * 2.5;
    let finalAmount = lengthOver >= 1 ? defaultSize - subtractionAmount : defaultSize;
    finalAmount = finalAmount <= 16 ? 16 : finalAmount;

    numberField.style.fontSize = finalAmount + "px";
}