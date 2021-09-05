const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");

//calculate first and second values depending on operator
const calculate = {
	"/": (firstNumber, secondNumber) => firstNumber / secondNumber,
	"*": (firstNumber, secondNumber) => firstNumber * secondNumber,
	"+": (firstNumber, secondNumber) => firstNumber + secondNumber,
	"-": (firstNumber, secondNumber) => firstNumber - secondNumber,
	"=": (firstNumber, secondNumber) => secondNumber,
}

let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

function sendNumberValue(number){
    // if current display value is 0, replace it, if not add number
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue === "0" ? number : displayValue + number;
}


function sendNumberValue(number){
	if(awaitingNextValue){
		calculatorDisplay.textContent = number;
		awaitingNextValue = false;
	}else{
		const displayValue = calculatorDisplay.textContent;
		calculatorDisplay.textContent = displayValue === "0" ? number : displayValue + number;
	}
}


function reset(){
	calculatorDisplay.textContent = "0";
    firstValue = 0;
    operatorValue = "";
    awaitingNextValue = false;
}

clearBtn.addEventListener("click", reset);

function addDecimal(){
	//if operator pressed, do not add decimal
	if(awaitingNextValue)return;
	//if mno decimal, add one
    if(!calculatorDisplay.textContent.includes(".")){
    	calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}


function useOperator(operator){
	const currentValue = Number(calculatorDisplay.textContent);

    if(operatorValue && awaitingNextValue) return;

	if(!firstValue){
		firstValue = currentValue;
	}else{
		console.log(firstValue, operatorValue, currentValue);
		const calculation = calculate[operatorValue](firstValue, currentValue);
		console.log("calculation", calculation);
		calculatorDisplay.textContent = calculation;
	}
	awaitingNextValue = true;
	operatorValue = operator;
}


//add event listeners for numbers, operators , decimal buttons

inputBtns.forEach((inputBtn) => {
  if(inputBtn.classList.length === 0){
  	inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
  }else if(inputBtn.classList.contains("operator")){
     inputBtn.addEventListener("click", () => useOperator(inputBtn.value));
  }else if(inputBtn.classList.contains("decimal")){
     inputBtn.addEventListener("click", () => addDecimal());
  } 
});