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
  // Function to initialize a multiple choice section
  function initMultipleChoice(thumbId, videoId, choicesId) {
    const thumb = document.getElementById(thumbId);
    const video = document.getElementById(videoId);
    const buttons = document.querySelectorAll(`#${choicesId} button`);

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

      // Add event listener for video ended
      video.addEventListener('ended', () => {
        setTimeout(() => {
          video.classList.add("is-hidden");
          thumb.classList.remove("is-cloaked");
        }, 1000); // Wait 1 second after video ends
      }, { once: true }); // Use once: true to prevent multiple listeners
    }

    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        // first click: swap thumbnail → video element
        if (!video.classList.contains("is-hidden")) {
          // video already visible, do nothing
        } else {
          thumb.classList.add("is-cloaked");
          video.classList.remove("is-hidden");
        }
        loadAndPlay(btn.dataset.video);

        // Reset all buttons to default state
        buttons.forEach(b => {
          b.classList.remove('is-danger', 'is-success');
        });

        // Set colors based on button selection
        if (choicesId === "mc-choices" && btn.textContent.includes('B')) {
          btn.classList.add('is-success'); // Green for correct answer in first section
        } else if (choicesId === "mc-choices-two" && btn.textContent.includes('C')) {
          btn.classList.add('is-success'); // Green for correct answer in second section
        } else {
          btn.classList.add('is-danger'); // Red for incorrect answers
        }
      });
    });
  }

  // Initialize both multiple choice sections
  initMultipleChoice("mc-thumb", "mc-video", "mc-choices");
  initMultipleChoice("mc-thumb-two", "mc-video-two", "mc-choices-two");
});

/* ============================================================
   Enable "Play with sound" in every video‑comparison block
   ============================================================ */
document.querySelectorAll(".play-sound-btn").forEach(btn => {
btn.addEventListener("click", () => {
  // grab all videos
  const videos = Array.from(document.querySelectorAll("video"));

  // select the video with id "tune_real" or "tune_twin"
  const tuneReal = videos.find(v => v.id === "tune_real");
  const tuneTwin = videos.find(v => v.id === "tune_twin");

  if (!tuneReal || !tuneTwin) {
    console.error("Could not find one or both videos");
    return;
  }

  tuneReal.muted = false;           // un‑mute
  tuneReal.play().catch(err => console.error("Error playing tune_real:", err));  // play (or restart)
  tuneTwin.muted = false;           // un‑mute
  tuneTwin.play().catch(err => console.error("Error playing tune_twin:", err));  // play (or restart)

  // good UX: remove the button so it can't be clicked again
  btn.remove();
}, { once: true });            // listener self‑destructs anyway
});