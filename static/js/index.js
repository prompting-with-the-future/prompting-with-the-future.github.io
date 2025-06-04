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
  const sliderContainer = document.querySelector('.slider-container');
  
  if (slider && video2 && sliderContainer) {
    // Function to update video clip path
    function updateVideoClip(value) {
      video2.style.clipPath = `inset(0 ${100 - value}% 0 0)`;
      slider.value = value;
    }

    // Handle slider input
    slider.addEventListener('input', function() {
      updateVideoClip(this.value);
    });

    // Handle click on slider container
    sliderContainer.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const value = (x / rect.width) * 100;
      updateVideoClip(Math.max(0, Math.min(100, value)));
    });

    // Handle drag on slider container
    let isDragging = false;

    sliderContainer.addEventListener('mousedown', function(e) {
      isDragging = true;
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const value = (x / rect.width) * 100;
      updateVideoClip(Math.max(0, Math.min(100, value)));
    });

    document.addEventListener('mousemove', function(e) {
      if (isDragging) {
        const rect = sliderContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const value = (x / rect.width) * 100;
        updateVideoClip(Math.max(0, Math.min(100, value)));
      }
    });

    document.addEventListener('mouseup', function() {
      isDragging = false;
    });
  }
});
