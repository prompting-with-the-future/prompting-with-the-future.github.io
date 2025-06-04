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
  const slider = document.getElementById('videoSlider');
  const video2 = document.getElementById('video2');
  
  if (slider && video2) {
    slider.addEventListener('input', function() {
      const value = this.value;
      video2.style.clipPath = `inset(0 ${100 - value}% 0 0)`;
    });
  }
});
