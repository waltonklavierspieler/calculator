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
	return operand(x, y);
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

const calculatorButtons = document.querySelectorAll('.facePad');
calculatorButtons.forEach(function (key) {
	key.addEventListener('click', function() {
		const operatorArray = ['multiply', 'divide', '!', 'add', 'subtract'];
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
					setTimeout(clearCalculator, 15000);
				} else {
					var result = evaluate (operator, parseInt(firstInt), parseInt(secondInt));
					document.getElementById("input").innerHTML = result;
					setTimeout(clearCalculator, 15000);
				}
				return;
			}
		}
		//cases for operand input
		if (operatorArray.includes(key.id)) {
			if (operatorCheck) {
				document.getElementById("input").innerHTML = 'ERROR: two operands in a row.';
				setTimeout(clearCalculator, 5000);
				return
			}
			if (firstInt === undefined) {
				document.getElementById("input").innerHTML = 'Must input a number first.';
				setTimeout(clearCalculator, 5000);
				return;
			}
			operatorCheck = true;
			operator = key.id;
			console.log("Operator is " + operator + "and the type is " + typeof(operator));
			floatCheck = false;
			displayUpdate(key.innerHTML);
			return
		}
		//cases for integer input
		if (typeof(parseInt(key.id)) === 'number') {
			//in case of !operatorCheck
			if (!operatorCheck) {
				firstIntUpdate(key.id);
				displayUpdate(key.id);
			} else {
				secondIntUpdate(key.id);
				displayUpdate(key.id);
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
			} else {
				secondIntUpdate(key.id);
			}
		}
		return displayUpdate(key.id);
	});
});
console.log(document.getElementById("input").innerHTML);

function firstIntUpdate(x) {
	firstInt += x;
}

function secondIntUpdate(x) {
	secondInt += x;
}

//function to update the display
function displayUpdate (character) {
	console.log(operatorCheck);
	var display = document.getElementById("input").innerHTML;
	if (display === 'Waiting for user input...') {
		display = '';
	}
	if (operatorCheck) {
		console.log('Pressed an operator');
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
}
