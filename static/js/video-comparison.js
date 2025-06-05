// Define video pairs
const videoPairs = [
    {
        left: "static/videos/bird_gaussian.mp4",
        right: "static/videos/bird_mesh.mp4",
        leftLabel: "Gaussian",
        rightLabel: "Mesh"
    },
    // Add more video pairs here
    // Example:
    // {
    //     left: "static/videos/another_gaussian.mp4",
    //     right: "static/videos/another_mesh.mp4",
    //     leftLabel: "Gaussian 2",
    //     rightLabel: "Mesh 2"
    // }
];

let currentPairIndex = 0;
let isAnimating = false;

function createVideoSlide(pair) {
    const slide = document.createElement('div');
    slide.className = 'video-slide';
    
    const video1 = document.createElement('video');
    video1.className = 'comparison-video';
    video1.autoplay = true;
    video1.muted = true;
    video1.loop = true;
    video1.src = pair.left;
    
    const video2 = document.createElement('video');
    video2.className = 'comparison-video';
    video2.autoplay = true;
    video2.muted = true;
    video2.loop = true;
    video2.src = pair.right;
    video2.style.clipPath = 'inset(0 50% 0 0)';
    
    const divisionLine = document.createElement('div');
    divisionLine.className = 'division-line';
    divisionLine.id = 'divisionLine';
    
    slide.appendChild(video1);
    slide.appendChild(video2);
    slide.appendChild(divisionLine);
    
    return slide;
}

function updateVideoPair(index, direction) {
    if (isAnimating) return;
    isAnimating = true;
    
    const pair = videoPairs[index];
    const container = document.querySelector('.video-slide-container');
    const currentSlide = container.querySelector('.video-slide');
    const newSlide = createVideoSlide(pair);
    
    // Set initial position for new slide
    newSlide.style.position = 'absolute';
    newSlide.style.top = '0';
    newSlide.style.left = direction === 'right' ? '100%' : '-100%';
    
    // Add new slide to container
    container.appendChild(newSlide);
    
    // Animate current slide out
    currentSlide.classList.add(direction === 'right' ? 'slide-out-left' : 'slide-out-right');
    
    // Animate new slide in
    newSlide.classList.add(direction === 'right' ? 'slide-in-left' : 'slide-in-right');
    
    // Update labels
    const leftLabel = document.querySelector('.slider-label span:first-child');
    const rightLabel = document.querySelector('.slider-label span:last-child');
    leftLabel.textContent = pair.leftLabel;
    rightLabel.textContent = pair.rightLabel;
    
    // Update navigation buttons
    document.querySelector('.nav-left').style.visibility = index === 0 ? 'hidden' : 'visible';
    document.querySelector('.nav-right').style.visibility = index === videoPairs.length - 1 ? 'hidden' : 'visible';
    
    // Clean up after animation
    setTimeout(() => {
        container.removeChild(currentSlide);
        newSlide.style.position = 'relative';
        newSlide.style.left = '0';
        isAnimating = false;
    }, 500);
}

function nextVideoPair() {
    if (currentPairIndex < videoPairs.length - 1 && !isAnimating) {
        currentPairIndex++;
        updateVideoPair(currentPairIndex, 'right');
    }
}

function prevVideoPair() {
    if (currentPairIndex > 0 && !isAnimating) {
        currentPairIndex--;
        updateVideoPair(currentPairIndex, 'left');
    }
}

// Initialize the first video pair
document.addEventListener('DOMContentLoaded', () => {
    updateVideoPair(0, 'right');
}); 