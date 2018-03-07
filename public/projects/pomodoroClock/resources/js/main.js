var minuteDisplay = document.querySelector('#minutes');
var secondsDisplay = document.querySelector('#seconds');
var workBtn = document.querySelector('#work');
var breakBtn = document.querySelector('#break')

var bar = new ProgressBar.Circle('#progress-circle', {
	strokeWidth: 1,
	easing: 'linear',
	duration: 1400,
	color: '#ff4732',
	trailColor: '#d1d5d6',
	trailWidth: 1,
	svgStyle: null
});

var alarm = document.querySelector('#alarm');

var on ,timer, workSession, minutes, seconds, percentage, progress, seconds, minutes, 
savedBreakMinutes, savedWorkMinutes, workMinutes, breakMinutes;

workMinutes = 25;
breakMinutes = 5;
savedWorkMinutes = workMinutes;
savedBreakMinutes = breakMinutes;
on = false;
minutes = workMinutes;
seconds = 0;

displayTime();
startWork();

document.querySelector('#start').addEventListener('click', startTimer);
document.querySelector('#stop').addEventListener('click', stopTimer);
document.querySelector('#up').addEventListener('click', incrementTime)
document.querySelector('#down').addEventListener('click', decrementTime)
document.querySelector('#reset').addEventListener('click', function() {
	savedWorkMinutes = 25;
	savedBreakMinutes = 5;
	resetTimer(savedWorkMinutes, savedBreakMinutes);
});
workBtn.addEventListener('click', function() {
	startWork(workMinutes);
});
breakBtn.addEventListener('click', function() {
	startBreak(breakMinutes);
});

function startTimer() {
	if (!on) {
		on = true
		if (workSession) {
			percentage = 1 / ((workMinutes * 60) + seconds);	
		} else {
			percentage = 1 / ((breakMinutes * 60) + seconds);
		}
		timer = setInterval(function() {

			displayTime();
			
			if (seconds > 0) {		
				seconds--;
				fillCircle()
			} else if (seconds == 0 && minutes > 0) {
				seconds = 59;
				if (workSession) {
					workMinutes--;
				} else {
					breakMinutes--
				}			
				fillCircle();
			} else {
				alarm.play();
				workSession ? setTimeout( startBreak ,1000) : setTimeout( startWork ,1000);				
				setTimeout(startTimer, 3000);
			}
		}, 1000)
	}
};

function startBreak() {
	workSession = false;

	breakBtn.classList.add('active')
	workBtn.classList.remove('active');

	resetTimer(savedWorkMinutes, savedBreakMinutes);
}

function startWork() {
	workSession = true;

	workBtn.classList.add('active')
	breakBtn.classList.remove('active');

	resetTimer(savedWorkMinutes, savedBreakMinutes);
}

function incrementTime() {
	if (workSession) {
		if (workMinutes < 60) {
			workMinutes++;
			savedWorkMinutes = workMinutes;
		}
	} else {
		if (breakMinutes < 60) {
			breakMinutes++;
			savedBreakMinutes = breakMinutes;
		}
	}
	resetTimer(savedWorkMinutes, savedBreakMinutes);
	displayTime();
}

function decrementTime() {
	if (workSession) {
		if (workMinutes > 1) {
			workMinutes--;
			savedWorkMinutes = workMinutes;
		}
	} else {
		if (breakMinutes > 1) {
			breakMinutes--;
			savedBreakMinutes = breakMinutes
		}
	}
	resetTimer(savedWorkMinutes, savedBreakMinutes);
	displayTime();
}

function stopTimer() {
	on = false;
	clearInterval(timer);

}

function resetTimer(resetWorkMinutes, resetBreakMinutes) {
	clearInterval(timer);
	on = false;
	progress = 0;
	percentage = 0;
	seconds = 0;
	workMinutes = resetWorkMinutes;
	breakMinutes = resetBreakMinutes;
	bar.animate(0);
	displayTime();
}

function displayTime() {
	
	if (workSession) {
		minutes = workMinutes;
	} else {
		minutes = breakMinutes;
	}

	if (minutes < 10) {
		minuteDisplay.textContent = '0' + minutes;
	} else {
		minuteDisplay.textContent = minutes;
	}
	if (seconds >= 10) {
		secondsDisplay.textContent = seconds;
	} else {
		secondsDisplay.textContent = '0' + seconds;
	}
}

function fillCircle() {
	progress += percentage;
	if (progress > 1) {
		progress = 1;
	}
	bar.animate(progress);
}