// particles.js

// Create an array to store the particles
let particles = [];
let neonParticle;

// Store the mouse position
let mouseX = 0;
let mouseY = 0;

// Create a particle class
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1; // Smaller size for glitter
        this.speedX = Math.random() * 0.5 - 0.25; // Slow down horizontal speed
        this.speedY = Math.random() * 0.5 + 0.2; // Slightly slower vertical speed for smooth fall
        this.color = `hsl(${Math.random() * 360}, 100%, 85%)`; // Random color for glitter effect
        this.opacity = Math.random() * 0.5 + 0.5; // Random opacity for a soft glow effect
        this.shouldFollowMouse = Math.random() < 0.3; // Only a few particles will follow the mouse
    }

    // Method to update particle position
    update() {
        if (this.shouldFollowMouse) {
            let angle = Math.atan2(mouseY - this.y, mouseX - this.x);
            let speed = 0.3;
            this.x += Math.cos(angle) * speed;
            this.y += Math.sin(angle) * speed;
        }
        this.x += this.speedX;
        this.y += this.speedY;

        // Keep particles within bounds
        if (this.x <= 0 || this.x >= window.innerWidth) this.speedX *= -1;
        if (this.y >= window.innerHeight) this.y = 0; // Reset to top of the screen after reaching bottom
    }

    // Method to draw the particle with a glittery effect
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity; // Add opacity for glowing effect
        ctx.fill();
        ctx.globalAlpha = 1; // Reset alpha back to normal after drawing
    }
}

// Create a NeonParticle class for the neon particle moving around
class NeonParticle {
    constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.size = 10; // Larger size for the neon effect
        this.speedX = Math.random() * 2 - 1; // Random speed for neon particle
        this.speedY = Math.random() * 2 - 1; // Random vertical speed for neon particle
        this.color = 'hsl(210, 100%, 50%)'; // Neon blue color
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Keep neon particle within bounds and make it bounce
        if (this.x <= 0 || this.x >= window.innerWidth) this.speedX *= -1;
        if (this.y <= 0 || this.y >= window.innerHeight) this.speedY *= -1;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

// Initialize the canvas and start animation
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Create an array of particles
for (let i = 0; i < 200; i++) { // More particles for glitter effect
    particles.push(new Particle(Math.random() * window.innerWidth, Math.random() * window.innerHeight));
}

// Create the neon particle
neonParticle = new NeonParticle();

// Mouse event listener to track mouse position
window.addEventListener("mousemove", (event) => {
    mouseX = event.x;
    mouseY = event.y;
});

// Create an audio element for background music
const audio = new Audio('603711__musicbymisterbates__emotional-spiritual-soundtrack-respect.mp3');
audio.loop = true;
audio.volume = 0.2;
audio.play();

// Create the music button
const button = document.createElement('button');
button.innerHTML = "Click to Play Music";
button.style.position = 'fixed';
button.style.bottom = '30px';
button.style.left = '50%';
button.style.transform = 'translateX(-50%)';
button.style.padding = '12px 28px';
button.style.fontSize = '16px';
button.style.fontFamily = 'Helvetica Neue, sans-serif';
button.style.fontWeight = '500';
button.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
button.style.color = '#ffffff';
button.style.border = '1px solid rgba(255, 255, 255, 0.3)';
button.style.borderRadius = '8px';
button.style.backdropFilter = 'blur(8px)';
button.style.cursor = 'pointer';
button.style.transition = 'all 0.3s ease';
button.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';


button.addEventListener('mouseover', () => {
    button.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    button.style.transform = 'translateX(-50%) scale(1.05)';
    button.style.boxShadow = '0 6px 24px rgba(0, 0, 0, 0.3)';
});

button.addEventListener('mouseout', () => {
    button.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    button.style.transform = 'translateX(-50%) scale(1)';
    button.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
});


document.body.appendChild(button);

// Toggle audio playback on button click
button.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        button.innerHTML = "Click to Pause Music";
    } else {
        audio.pause();
        button.innerHTML = "Click to Play Music";
    }
});

// Update and draw the particles every frame
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    particles.forEach(particle => {
        particle.update();
        particle.draw(ctx);
    });

    // Update and draw the neon particle
    neonParticle.update();
    neonParticle.draw(ctx);

    requestAnimationFrame(animate); // Keep animating
}

animate(); // Start the animation
