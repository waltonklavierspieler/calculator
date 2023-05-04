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

/*
logic:
create an event listener for each button that returns the id tag as a string
check if int or if operand; if so, append as string to firstInt;
	check if '.' is the input; if so turn variable floatCheck to true
		while true, future checks for '.' throw an error; run clear function
	check if operator === undefined;
	continue to do this until event listener returns an operand sign
	while operator!== undefined,
		continue to check for ints and '.', this times appending to secondInt
		check for '=' input
			if input === '=' convert firstInt and secondInt to floats;
			input to operate function

update every output to the display
*/

//three variables to store the different input integers and the operand;
var floatCheck = false;
var operatorCheck = false;
var firstInt = undefined;
var secondInt = undefined;
var operator = undefined;
var stringOfOperatorsCheck = false;
const operatorArray = ['multiply', 'divide', '!', 'add', 'subtract', '+', 'x', '-', '/'];


const calculatorButtons = document.querySelectorAll('.facePad');
calculatorButtons.forEach(function (key) {
	key.addEventListener('click', function() {
		console.log('Key.id: ' + key.id + '. type: ' + typeof(parseInt(key.id)));
		const statementsArray = ['Input a number first.', 'ERROR: two operands in a row.', 'Must input a number first.'];
		//check for display === whatever possible statements
		if (statementsArray.includes(document.getElementById("input").innerHTML)) {
			clearCalculator();
		}
		//check for clear button
		if (key.id === 'C') {
			clearCalculator();
			return
		}
		//check for = button
		if (key.id === '=') {
			if (firstInt === undefined) {
				document.getElementById("input").innerHTML = 'Input a number first.';
				setTimeout(clearCalculator, 3000);
				return
			}
			if (secondInt === undefined) {
				stringOfOperatorsCheck = true;
				return firstInt;
			} else {
				if (firstInt.includes('.') || secondInt.includes('.')) {
					var result = evaluate (operator, parseFloat(firstInt), parseFloat(secondInt));
					result = result.toFixed(3);
					document.getElementById("resultField").innerHTML = document.getElementById("input").innerHTML;
					document.getElementById("input").innerHTML = result;
					firstInt = result;

				stringOfOperatorsCheck = true;
					return
				} else {
					var result = evaluate (operator, parseInt(firstInt), parseInt(secondInt));
					document.getElementById("resultField").innerHTML = document.getElementById("input").innerHTML;
					document.getElementById("input").innerHTML = result;
					firstInt = result;
					stringOfOperatorsCheck = true;
					return
				}
				return;
			}
		}
		//cases for operand input
		if (operatorArray.includes(key.id)) {
			if (operatorCheck) {
				//insert a check here for if both ints are defined to execute the operand
				//and assign the result to firstInt, operatorCheck to false, 2ndInt to undefined.
				if (secondInt !== undefined) {
					if (floatCheck) {
						var result = evaluate (operator, parseFloat(firstInt), parseFloat(secondInt));
						result = result.toFixed(3);
						displayUpdate(' ' + key.innerHTML);
						displayLengthCheck();
						//running total update;
						//headerDisplayUpdate(document.getElementById("input").innerHTML);
						firstInt = result;
						secondInt = undefined;
						operator = key.id;
						return
					} else {
						var result = evaluate (operator, parseInt(firstInt), parseInt(secondInt));
						result = result.toFixed(3);
						//headerDisplayUpdate(document.getElementById("input").innerHTML);
						firstInt = result;
						secondInt = undefined;
						operator = key.id;
						//running total update;
						displayUpdate(' ' + key.innerHTML);
						displayLengthCheck();
						return
					}
				} else {
					console.log('Operator check: ' + operatorCheck);
					document.getElementById("input").innerHTML = 'ERROR: two operands in a row.';
					setTimeout(clearCalculator, 5000);
					return
				}
			}
			if (firstInt === undefined) {
				document.getElementById("input").innerHTML = 'Must input a number first.';
				setTimeout(clearCalculator, 5000);
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
			console.log('decimal');
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
//console.log(document.getElementById("input").innerHTML);

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
	if (display.length >= 18) {
	document.getElementById("input").innerHTML = '...' + display.slice(3);
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
	/*if (operatorArray.includes(character)) {
		document.getElementById("input").innerHTML = character;
		return
	} */
	/*if (multipleOpsCheck) {
		display = character;
		return;
	}*/
	display += character;
	document.getElementById("input").innerHTML = display;
}

function clearCalculator () {
	floatCheck = false;
	firstInt = undefined;
	secondInt = undefined;
	operator = undefined;
	operatorCheck = false;
	// set #input innerHTML to "Waiting user input..."
	document.getElementById("input").innerHTML = '';
	document.getElementById("resultField").innerHTML = '&nbsp';

}
