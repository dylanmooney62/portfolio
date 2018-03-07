var modalBtns = document.querySelectorAll('.modal-btn');
var closeBtns = document.querySelectorAll('.close-btn');
var aboutBtn = document.querySelector('#about-btn');


closeBtns.forEach(e => {
	e.addEventListener('click', closeModal);
});

modalBtns.forEach(e => {
    e.addEventListener('click', openModal);
});

function openModal() {
  var value = $(this).data("value");
  var modal = document.querySelector(`#modal-${value}`);
	modal.style.display = 'block';
};

function closeModal() {
	var value = $(this).data("value");
  var modal = document.querySelector(`#modal-${value}`);
	modal.style.display = 'none';
};



$(document).on('click', 'a[href^="#"]', function (event) {
  event.preventDefault();

  $('html, body').animate({
    scrollTop: $($.attr(this, 'href')).offset().top
   }, 1000);
});