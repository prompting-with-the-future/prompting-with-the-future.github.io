window.HELP_IMPROVE_VIDEOJS = false;


$(document).ready(function() {
    // Check for click events on the navbar burger icon

    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 5000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);
	
    bulmaSlider.attach();

})

// Multiple‑choice logic (auto‑runs once DOM is ready)
document.addEventListener("DOMContentLoaded", () => {
  const thumb   = document.getElementById("mc-thumb");
  const video   = document.getElementById("mc-video");
  const buttons = document.querySelectorAll("#mc-choices button");

  if (!thumb || !video || buttons.length === 0) return; // markup missing

  function loadAndPlay(src) {
    // If the requested video is already loaded, just replay it
    if (video.src.endsWith(src)) {
      video.currentTime = 0;
      video.play();
      return;
    }
    video.pause();
    video.src = src;
    video.load();
    video.play();
  }

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      // first click: swap thumbnail → video element
      if (!video.classList.contains("is-hidden")) {
        // video already visible, do nothing
      } else {
        thumb.classList.add("is-hidden");
        video.classList.remove("is-hidden");
      }
      loadAndPlay(btn.dataset.video);

      // Reset all buttons to default state
      buttons.forEach(b => {
        b.classList.remove('is-danger', 'is-success');
      });

      // Set colors based on button selection
      if (btn.textContent.includes('B.')) {
        btn.classList.add('is-success'); // Green for correct answer
      } else {
        btn.classList.add('is-danger'); // Red for incorrect answers
      }
    });
  });
});