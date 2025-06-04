window.HELP_IMPROVE_VIDEOJS = false;


$(document).ready(function() {
    // Check for click events on the navbar burger icon

    var options = {
			slidesToScroll: 1,
			slidesToShow: 1,
			loop: true,
			infinite: true,
			autoplay: true,
			autoplaySpeed: 5000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);
	
    bulmaSlider.attach();

})

// Video Comparison Slider
document.addEventListener('DOMContentLoaded', function() {
  const divisionLine = document.getElementById('divisionLine');
  const video2 = document.getElementById('video2');
  let isDragging = false;

  function updateDivisionPosition(clientX) {
    const container = divisionLine.parentElement;
    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    divisionLine.style.left = `${percentage}%`;
    video2.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
  }

  function onMouseDown(e) {
    isDragging = true;
    document.body.style.cursor = 'grabbing';
  }

  function onMouseMove(e) {
    if (!isDragging) return;
    updateDivisionPosition(e.clientX);
  }

  function onMouseUp() {
    isDragging = false;
    document.body.style.cursor = '';
  }

  if (divisionLine && video2) {
    divisionLine.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }
});
