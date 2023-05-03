//arithmetic fuctions
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
const operatorArray = ['multiply', 'divide', '!', 'add', 'subtract', '+', 'x', '-', '/'];


const calculatorButtons = document.querySelectorAll('.facePad');
calculatorButtons.forEach(function (key) {
	key.addEventListener('click', function() {
		console.log('First Int is :' + firstInt);
		console.log('Second Int is :' + secondInt);
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
				setTimeout(clearCalculator, 5000);
				return
			}
			if (secondInt === undefined) {
				return firstInt;
				setTimeout(clearCalculator, 5000);
				return
			} else {
				if (floatCheck) {
					var result = evaluate (operator, parseFloat(firstInt), parseFloat(secondInt));
					document.getElementById("input").innerHTML = result;
					document.getElementById("resultField").innerHTML = result;
					setTimeout(clearCalculator, 15000);
					return
				} else {
					var result = evaluate (operator, parseInt(firstInt), parseInt(secondInt));
					document.getElementById("input").innerHTML = result;
					document.getElementById("resultField").innerHTML = result;
					setTimeout(clearCalculator, 15000);
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
						displayUpdate('' + key.innerHTML);
						//running total update;
						headerDisplayUpdate(result);
						firstInt = result;
						secondInt = undefined;
						return
					} else {
						var result = evaluate (operator, parseInt(firstInt), parseInt(secondInt));
						firstInt = result;
						secondInt = undefined;
						//running total update;
						headerDisplayUpdate(result);
						displayUpdate('' + key.innerHTML);
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
			return
		}
		//cases for integer input
		if (typeof(parseInt(key.id)) === 'number') {
			//in case of !operatorCheck
			if (!operatorCheck) {
				firstIntUpdate(key.id);
				displayUpdate(key.id);
				return
			}

			if (secondInt === undefined){
				console.log('starting 2nd Int. key.id: ' + key.id);
				secondIntUpdate(key.id);
				displayUpdate(' ' + key.id);
				return
			} else {
				secondIntUpdate(key.id);
				displayUpdate(key.id);
				return
			}
		}
		//float check
		if (key.id === '.') {
			if (floatCheck === true) {
				document.getElementById("input").innerHTML = "Too many decimals."
				setTimeout(clearCalculator, 5000);
				return
			}
			if (!operatorCheck) {
				firstIntUpdate(key.id);
				floatCheck = true;
			} else {
				secondIntUpdate(key.id);
				floatCheck = true;
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
	header.innerHTML = character;
	return
}


function displayUpdate (character) {
	var display = document.getElementById("input").innerHTML;
	if (operatorArray.includes(display)) {
		document.getElementById("input").innerHTML = character;
		return
	}
	if (display === 'Waiting for user input...') {
		display = '';
	}
	if (operatorArray.includes(character)) {
		document.getElementById("input").innerHTML = character;
		return
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
	// set #input innerHTML to "Waiting user input..."
	document.getElementById("input").innerHTML = '';
	document.getElementById("resultField").innerHTML = '&nbsp';

}
