var digitBtns = document.querySelectorAll('.digit');
var operatorBtns = document.querySelectorAll('.operator');
var sumDisplay = document.querySelector('#sum-display');
var answerDisplay = document.querySelector('#answer-display')
var decimalOn = true;
var equalsPressed = false;
var sum = [];

var float = 1000000

digitBtns.forEach(digitBtn => {
	digitBtn.addEventListener('click', function() {
			if (equalsPressed) {
				resetCalculator();
			}
			sum.push(this.value);
			sumDisplay.textContent = sum.join('');
	});
});

operatorBtns.forEach(operatorBtn => {
	operatorBtn.addEventListener('click', function() {
		var lastData = sum[sum.length - 1];
		if (sum.length > 0) {
			switch (lastData) {
				case '*':
				case '+':
				case '/':
					sum.pop();
					sum.push(this.value);
					break;
				case '-':
					break;
				default:
					sum.push(this.value);
					equalsPressed = false;
					break;
			}

			decimalOn = true;
			sumDisplay.textContent = sum.join('');
		}
	});
});


document.querySelector('#equals').addEventListener('click', function() {
	if (sum[sum.length - 1] >= 0) {
		var previousAnswer =  Math.round(eval(sum.join('')) * float) / float;
		answerDisplay.textContent = previousAnswer;
		sum = [];
		sum[0] = previousAnswer;
		equalsPressed = true;
	}
});

document.querySelector('#clear-entry').addEventListener('click', function() {
	resetCalculator();
});

document.querySelector('#decimal').addEventListener('click', function() {
	if (equalsPressed) {
		resetCalculator()
	} 
	if (decimalOn) {
		decimalOn = false;
		sum.push(this.value);
		sumDisplay.textContent = sum.join('');
	}
});

document.querySelector('#minus').addEventListener('click', function() {
	lastData = sum[sum.length - 1];
	if (lastData != '-') {
		decimalOn = true;
		sum.push(this.value);
		sumDisplay.textContent = sum.join('');
		equalsPressed = false;
	}
});

function resetCalculator() {
	sum = [];
	answerDisplay.textContent = '0';
	sumDisplay.textContent = '';
	equalsPressed = false;
	decimalOn = true;
}