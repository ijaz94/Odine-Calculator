//empty variables
let num1 = "";
let num2 = "";
let operator = "";

// Html element's selectors
const numberKeys = document.querySelectorAll(".numberKeys");
const opreatorKeys = document.querySelectorAll(".operators");
const showDisplay = document.querySelector(".output");
const clear = document.querySelector(".clearbtn");
const delBtn = document.querySelector(".deletebtn");
const dotKey = document.querySelector(".dotKey");
const equalKey = document.querySelector(".equalOperator");

// Buttons add event listener's
delBtn.addEventListener("click", deleteNumber);
dotKey.addEventListener("click", appendDot);
clear.addEventListener("click", removeAll);
equalKey.addEventListener("click", () => {
  if (num2 !== "" && num1 !== "") {
    Calculate();
  }
});
numberKeys.forEach((key) =>
  key.addEventListener("click", () => {
    numberHandler(key.textContent);
  })
);
opreatorKeys.forEach((key) =>
  key.addEventListener("click", (e) => {
    operatorHandler(key.textContent);
  })
);
// keyboard event listener
window.addEventListener("keydown", keyDownHandler);
// functions
function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if (num2 == 0) {
    return "Error";
  }
  return num1 / num2;
}

function operate(num1, operator, num2) {
  num1 = Number(num1);
  num2 = Number(num2);
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
  }
}
function numberHandler(num) {
  num2 += num;
  showDisplay.textContent = num1 + operator + num2;
}
function operatorHandler(selectOperator) {
  if (num1 && num2) {
    Calculate();
  }
  num1 = operator + num2;
  operator = selectOperator;

  showDisplay.textContent = num1 + operator;
  num2 = "";
}
// the Main calculation function
function Calculate() {
  let result = Math.round(operate(num1, operator, num2) * 100000) / 100000;
  result = String(result);
  showDisplay.textContent = result;
  num2 = result;
  num1 = "";
  operator = "";
}

function removeAll() {
  num1 = "";
  num2 = "";
  operator = "";
  result = "";
  showDisplay.textContent = "0";
}

function deleteNumber() {
  if (num1 === "" && num2 === "" && operator === "") {
    showDisplay.textContent = "0";
  } else {
    showDisplay.textContent = showDisplay.textContent.slice(0, -1);
    if (num2 === "") {
      operator = "";
      num2 += num1;
      num1 = "";
    } else if (showDisplay.textContent === "") {
      showDisplay.textContent = "0";
      num2 = "";
    } else {
      num2 = num2.slice(0, -1);
    }
  }
}
function appendDot() {
  if (!num2.includes(".")) {
    num2 += ".";
    showDisplay.textContent = num1 + operator + num2;
  }
}

// function for keyboard
function keyDownHandler(e) {
  e.preventDefault();
  if (e.key >= 0 && e.key <= 9) {
    numberHandler(e.key);
  }
  if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "*") {
    operatorHandler(e.key);
  }
  if ((e.key === "Enter" || e.key === "=") && num2 !== "" && num1 !== "") {
    Calculate();
  }
  if (e.key === "Escape" || e.key === "Home") {
    removeAll();
  }
  if (e.key === ".") {
    appendDot();
  }
  if (e.key === "Backspace" || e.key === "Delete") {
    deleteNumber();
  }
}
