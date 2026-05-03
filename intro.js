const canvas = document.getElementById('introCanvas');
const ctx = canvas.getContext('2d');
const textWrapper = document.getElementById('textWrapper');
const introLayer = document.getElementById('intro-layer');

// 1. Setup Canvas Bubbles
let particles = [];
function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 4 + 1,
            speed: Math.random() * 1 + 0.5,
            opacity: Math.random() * 0.5
        });
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0084ff";
    
    particles.forEach(p => {
        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        p.y -= p.speed;
        if (p.y < -10) p.y = canvas.height + 10;
    });
    requestAnimationFrame(animate);
}

// 2. Timing Logic
// After 1 second: Show the Black and Blue text
setTimeout(() => {
    textWrapper.classList.add('show-now');
}, 1000);

// After 5 seconds: Fade out the whole intro
setTimeout(() => {
    introLayer.classList.add('fade-out');
    
    // After fade completes (1.5s): Show Home Screen
    setTimeout(() => {
        introLayer.style.display = 'none';
        document.getElementById('app-root').classList.remove('hidden');
        if(window.initHomePage) window.initHomePage();
    }, 1500);
}, 5000);

window.addEventListener('resize', init);
init();
animate();