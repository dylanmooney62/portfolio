var minuteDisplay = document.querySelector('#minutes');
var secondsDisplay = document.querySelector('#seconds');
var workBtn = document.querySelector('#work');
var breakBtn = document.querySelector('#break')
var timer;
var On = false;
var work = true;
var minutes = 1;
var seconds = 0;
var progress = 0;
var percentage;

var savedWorkMinutes = 25;
var savedBreakMinutes = 5;

var workMinutes = 25;
var breakMinutes = 5;
var savedone;

minutes = workMinutes;

var bar = new ProgressBar.Circle('#progress-circle', {
	strokeWidth: 0.5,
	easing: 'linear',
	duration: 1000,
	color: '#32ff7e',
	trailColor: '#ff4732',
	trailWidth: 0.5,
	svgStyle: null
});

displayTime();

document.querySelector('#start').addEventListener('click', startTimer);
document.querySelector('#stop').addEventListener('click', stopTimer);
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

document.querySelector('#up').addEventListener('click', addTime)
document.querySelector('#down').addEventListener('click', removeTime)


function addTime() {
	if(!work) {
		if(breakMinutes < 60) {
			breakMinutes++;
			savedBreakMinutes = breakMinutes;
		} 		
	} else {
		if(workMinutes < 60) {
			workMinutes++;
			savedWorkMinutes = workMinutes;
		}		
	}
	resetTimer(savedWorkMinutes, savedBreakMinutes);
	displayTime();
}


function removeTime() {
	if(!work) {
		if(breakMinutes > 1) {
			breakMinutes--;
			savedBreakMinutes = breakMinutes
		} 		
	} else {
				if(workMinutes > 1) {
			workMinutes--;
			savedWorkMinutes = workMinutes;
		}		
	}
	resetTimer(savedWorkMinutes, savedBreakMinutes);
	displayTime();
}






function startTimer() {

	if(!On) {
		On = true


		if(!work) {
			percentage = 1 / ((breakMinutes * 60) + seconds);
			savedone = percentage
		} else {
			percentage = 1 / ((workMinutes * 60) + seconds);
			savedone = percentage
		}


			timer = setInterval(function() {

				displayTime();

					if(seconds > 0) {
						seconds--;
						fillCircle()
					} else if (seconds == 0 && minutes > 0) {
						seconds = 59;

						if(work) {
							workMinutes--;
						} else {
							breakMinutes--
						}
						fillCircle();
					} else {
						work ? startBreak() : startWork();

						setTimeout(startTimer, 1000);

					}
		
					

			}, 1000)

	}

};









function fillCircle() {
	progress += percentage;


	if(progress > 1) {
		progress = 1;
	}
	console.log(progress);
	bar.animate(progress);
}



function stopTimer() {
	On = false;
	clearInterval(timer);

}


function startBreak() {
	work = false;
	breakBtn.classList.remove('unactive');
	breakBtn.classList.add('active')
	workBtn.classList.add('active');
	workBtn.classList.add('unactive');
	resetTimer(savedWorkMinutes, savedBreakMinutes);


}

function startWork() {
	work = true;
	workBtn.classList.remove('unactive');
	workBtn.classList.add('active')
	breakBtn.classList.add('active');
	breakBtn.classList.add('unactive');
	resetTimer(savedWorkMinutes, savedBreakMinutes);


	
	
}


function resetTimer (resetWorkMinutes, resetBreakMinutes) {
	clearInterval(timer);
	On = false;
	progress = 0;
	percentage = 0;
	seconds = 0;
	workMinutes = resetWorkMinutes;
	breakMinutes = resetBreakMinutes;
	bar.animate(0);	
	displayTime();	
}


function displayTime() {

	if(work) {
		minutes = workMinutes;
	} else {
		minutes = breakMinutes;
	}


	if(minutes < 10) {
		minuteDisplay.textContent = '0' + minutes;
	} else {
		minuteDisplay.textContent = minutes;
	}
		
	if(seconds >= 10 ) {
		secondsDisplay.textContent = seconds;
	} else {
		secondsDisplay.textContent = '0' + seconds;
	}
}

