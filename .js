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
function operate (operand, x, y) {
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
var firstInt = undefined;
var secondInt = undefined;
var operator = undefined;

function clearCalculator () {
	floatCheck = false;
	firstInt = undefined;
	secondInt = undefined;
	operator = undefined;
	// set #input innerHTML to "Waiting user input..."
}