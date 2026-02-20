const hoverSound = new Audio('paperEffect.mp3');
const woodSound = new Audio('woodsound.wav');
const gunShot = new Audio('gunshot.mp3')

hoverSound.volume = 0.5;
woodSound.volume = 0.3; 
gunShot.volume = 0.5;

const posters = document.querySelectorAll('.wantedPoster');
const wall = document.querySelector('.title');

document.addEventListener("click", () => {
  gunShot.currentTime = 0;
  gunShot.play();
});

if (wall) { 
  wall.addEventListener('mouseenter', () => {
    woodSound.currentTime = 0; 
    woodSound.play().catch(e => {}); 
  });
}

posters.forEach(poster => {
  poster.addEventListener('mouseenter', () => {
    hoverSound.currentTime = 0;
    hoverSound.play();
  });
});

