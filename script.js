const expressionDisplay = document.querySelector(".expression");
const resultDisplay = document.querySelector(".result");

const buttons = document.querySelectorAll("button");

let justCalculated = false;

let expression = "";
let result = "";

const operators = ["+", "-", "×", "÷"];

buttons.forEach((button) => {

    button.addEventListener("click", () => {

        const value = button.textContent;
        
        if(value === "AC") {
            expression = "";
            result = "";
            justCalculated = false;

            expressionDisplay.textContent = "0";
            resultDisplay.textContent = "0";
        }

        else if ( value === "⌫"){

            expression = expression.slice(0, -1);

            expressionDisplay.textContent = expression;

            expressionDisplay.scrollLeft = expressionDisplay.scrollWidth;

            if(expression === ""){
                resultDisplay.textContent = "0";
            }
        }

         else if (value === "=") {

            if(expression === "") return;

            const lastChar = expression.slice(-1);

            if(operators.includes(lastChar)) {
                resultDisplay.textContent = "Error";
                return;
            }

            try {

                result = eval(
                    expression
                        .replace(/×/g, "*")
                        .replace(/÷/g, "/")
                );

                resultDisplay.textContent = result;
                resultDisplay.scrollLeft = resultDisplay.scrollWidth;

                expression = result.toString();
                justCalculated = true;
                expressionDisplay.textContent = expression;
            }
            catch {
                resultDisplay.textContent = "Error";
            }

         }

         else {


            resultDisplay.textContent = "";

            if(
                expression === "" &&
                operators.includes(value) &&
                value !== "-"
            ) {
                return;
            }

            const lastChar = expression.slice(-1);

            if(
                operators.includes(value) &&
                operators.includes(lastChar)
            ) {
                return;
            }

            if (value === ".") {

                const currentNumber = expression.split(/[+\-×÷]/).pop();

                if (currentNumber.includes(".")) {
                    return;
                }

            }

            if(justCalculated && !operators.includes(value)) {
                expression = "";
                justCalculated = false;
            }

            expression += value;
            justCalculated = false;

            expressionDisplay.textContent = expression;
            expressionDisplay.scrollLeft = expressionDisplay.scrollWidth;
         }

    });

});