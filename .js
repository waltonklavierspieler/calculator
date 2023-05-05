//arithmetic functions:
function add(x, y) {
	return x + y;
}

function subtract (x, y) {
	return x - y;
}

function multiply (x, y) {
	return x*y;
}

function divide (x, y) {
	return x/y;
}

function exponent (x, y) {
	var total = 1;
	if (y > 0) {
		for (var i = 1; i <= y; i++) {
			total *= x;
		}
	}

	if (y < 0) {
		for (var i = -1; i >= y; i--) {
			total *= (1/x);
		}
	}
	return total;
}

function sqrt (num) {
	return Math.sqrt(num);
}

function factorial (num) {
	var result = num;
	for (var i = num-1; i > 0; i--) {
		result *= i;
	}
	return result;
}
//operand function
function evaluate (operand, x, y) {
	if (operand === 'multiply') {
		return multiply (x, y);
	}
	if (operand === 'divide') {
		return divide (x, y);
	}
	if (operand === 'add') {
		return add (x, y);
	}
	if (operand === 'subtract') {
		return subtract (x, y);
	}
	if (operand === '!') {
		return factorial (x);
	}
	if (operand === 'exponent') {
		return exponent (x, y);
	}
}

// variables to store the different input integers and the operand;
var floatCheck = false;
var operatorCheck = false;
var firstInt = undefined;
var secondInt = undefined;
var operator = undefined;
var equalRun = false;
const operatorArray = ['multiply', 'divide', '!', 'add', 'subtract', '+', 'x', '-', '/'];


const calculatorButtons = document.querySelectorAll('.facePad');
calculatorButtons.forEach(function (key) {
	key.addEventListener('click', function() {
		const statementsArray = ['Input a number first.', 'ERROR',
								'Too many decimals.', 'U R Cute'];
		//check for display === whatever possible statements
		if (statementsArray.includes(document.getElementById("input").innerHTML)) {
			clearCalculator();
		}
		if (key.id === ':)') {
			document.getElementById("input").innerHTML = 'U R Cute';
			return;
		}
		//check for clear button
		if (key.id === 'C') {
			clearCalculator();
			return
		}
		if (equalRun) {
			if (!operatorArray.includes(key.id)) {
				clearCalculator();
			}
			equalRun = false;
		}
		//check for = button
		if (key.id === '=') {
			if (firstInt === undefined) {
				document.getElementById("input").innerHTML = 'Input a number first.';
				return
			}
			if (secondInt === undefined) {
				return firstInt;
			} else {
				if (firstInt.includes('.') || secondInt.includes('.')) {
					var result = evaluate (operator, parseFloat(firstInt), parseFloat(secondInt));
					document.getElementById("resultField").innerHTML = document.getElementById("input").innerHTML + ' =';
					document.getElementById("input").innerHTML = result;
					firstInt = result;
					equalRun = true;
					return
				} else {
					var result = evaluate (operator, parseInt(firstInt), parseInt(secondInt));
					document.getElementById("resultField").innerHTML = document.getElementById("input").innerHTML + ' =';
					document.getElementById("input").innerHTML = result;
					firstInt = result;
					equalRun = true;
					return
				}
				return;
			}
		}
		if (operatorArray.includes(key.id)) {
			if (operatorCheck) {
				if (secondInt !== undefined) {
					if (floatCheck) {
						var result = evaluate (operator, parseFloat(firstInt), parseFloat(secondInt));
						result = result.toFixed(3);
						displayUpdate(' ' + key.innerHTML);
						displayLengthCheck();
						firstInt = result;
						secondInt = undefined;
						operator = key.id;
						stringOfOperatorsCheck = true;
						return
					} else {
						var result = evaluate (operator, parseInt(firstInt), parseInt(secondInt));
						result = result.toFixed(3);
						firstInt = result;
						secondInt = undefined;
						operator = key.id;
						displayUpdate(' ' + key.innerHTML);
						displayLengthCheck();
						stringOfOperatorsCheck = true;
						return
					}
				} else {
					document.getElementById("input").innerHTML = 'ERROR';
					return
				}
			}
			if (firstInt === undefined) {
				document.getElementById("input").innerHTML = 'Input a number first.';
				return;
			}
			operatorCheck = true;
			operator = key.id;
			floatCheck = false;
			displayUpdate(' ' + key.innerHTML);
			displayLengthCheck();
			return
		}
		//float check
		if (key.id === ".") {
			if (floatCheck === true) {
				document.getElementById("input").innerHTML = "Too many decimals."
				setTimeout(clearCalculator, 2000);
				return
			}
			if (!operatorCheck) {
				firstIntUpdate(key.id);
				displayUpdate(key.id);
				displayLengthCheck();
				floatCheck = true;
				return
			} else {
				secondIntUpdate(key.id);
				displayUpdate(key.id);
				displayLengthCheck();
				floatCheck = true;
				return
			}

		}

		//cases for integer input
		if (typeof(parseInt(key.id)) === 'number') {
			//in case of !operatorCheck
			if (!operatorCheck) {
				firstIntUpdate(key.id);
				displayUpdate(key.id);
				displayLengthCheck();
				return
			}

			if (secondInt === undefined){
				secondIntUpdate(key.id);
				displayUpdate(' ' + key.id);
				displayLengthCheck();
				return
			} else {
				secondIntUpdate(key.id);
				displayUpdate(key.id);
				displayLengthCheck();
				return
			}
		}

		return displayUpdate(key.id);
	});
});

function firstIntUpdate(x) {
	if (firstInt === undefined) {
		firstInt = ''
	}
	firstInt += x;
}

function secondIntUpdate(x) {
	if (secondInt === undefined) {
		secondInt = ''
	}
	secondInt += x;
}

//function to update the displays
function headerDisplayUpdate (character) {
	var header = document.getElementById("resultField");
	header.innerHTML += character;
	return
}

function displayLengthCheck () {
	var display = document.getElementById("input").innerHTML;
	var length = display.length;
	if (display.length >= 18) {
	document.getElementById("input").innerHTML = '...' + display.slice(length - 16);
	return
	}
}
function displayUpdate (character, multipleOpsCheck) {
	var display = document.getElementById("input").innerHTML;
	if (operatorArray.includes(display)) {
		document.getElementById("input").innerHTML = character;
		return
	}
	if (display === 'Waiting for user input...') {
		display = '';
	}
	display += character;
	document.getElementById("input").innerHTML = display;
}

function clearCalculator () {
	floatCheck = false;
	firstInt = undefined;
	secondInt = undefined;
	operator = undefined;
	operatorCheck = false;
	equalRun = false;
	// set #input innerHTML to "Waiting user input..."
	document.getElementById("input").innerHTML = '';
	document.getElementById("resultField").innerHTML = '&nbsp';

}
