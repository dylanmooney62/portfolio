var body = document.querySelector('body');
const colours = ['#ee5253', '#10ac84', '#5f27cd', '#01a3a4', '#222f3e', '#778ca3', '#8854d0','#eb3b5a']
var colourIndex = 0;

window.onload = function() {
	getData();
}
function getData() {
	$.ajax({
		url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=famous',
		type: 'POST',
		data: {},
		dataType: 'json',
		beforeSend: function (xhr) {
			xhr.setRequestHeader("X-Mashape-Authorization", "CPo2y3lLbAmshaXrZ0WSHwWvTWARp1drmm4jsnmAKZtcXK6OBP");
		},
		success: function (data) {
			document.querySelector('.quote').textContent = data.quote
			document.querySelector('.author').innerHTML = '&mdash; ' + data.author;
			changeTweet(data.quote, data.author);

		},
		error: function (err) {
			console.log("Failure!...");
			console.log(err);
		}
	});
}

document.querySelector('.new-quote').addEventListener('click', function () {
	getData();
	changeBackground();
});

function changeBackground() {
	colourIndex++;
	if(colourIndex > 7) {
		colourIndex = 0;
	}
	body.style.backgroundColor = colours[colourIndex];
}

function changeTweet(quote, author) {
	var tweet = `https://twitter.com/intent/tweet?text="${quote}" - ${author}`;
	document.getElementById('twitter').setAttribute('href', tweet);
}