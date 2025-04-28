// particles.js

// Create an array to store the particles
let particles = [];

// Store the mouse position
let mouseX = 0;
let mouseY = 0;

// Create a particle class for the glitter effect
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1; // Smaller size for glitter
        this.speedX = Math.random() * 0.5 - 0.25; // Slow down horizontal speed
        this.speedY = Math.random() * 0.5 + 0.5; // Slightly faster vertical speed for fall
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

// Create a class for the roaming neon particle
class NeonParticle {
    constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.size = 8; // Larger size for the neon particle
        this.speedX = Math.random() * 2 - 1; // Random horizontal speed
        this.speedY = Math.random() * 2 - 1; // Random vertical speed
        this.color = 'hsl(180, 100%, 50%)'; // Neon cyan color
        this.opacity = 1; // Full opacity for the neon effect
    }

    // Method to update neon particle position
    update() {
        // Random roaming behavior to simulate searching
        this.x += this.speedX;
        this.y += this.speedY;

        // If the neon particle hits the screen edge, reverse direction
        if (this.x <= 0 || this.x >= window.innerWidth) this.speedX *= -1;
        if (this.y <= 0 || this.y >= window.innerHeight) this.speedY *= -1;
    }

    // Method to draw the neon particle
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity; // Keep full opacity for the neon particle
        ctx.fill();
        ctx.globalAlpha = 1; // Reset alpha after drawing
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

// Create one neon particle
const neonParticle = new NeonParticle();

// Mouse event listener to track mouse position
window.addEventListener("mousemove", (event) => {
    mouseX = event.x;
    mouseY = event.y;
});

// Create an audio element for background music
const audio = new Audio('603711__musicbymisterbates__emotional-spiritual-soundtrack-respect.mp3');
audio.loop = true; // Make the music loop
audio.volume = 0.2; // Set volume to a low level for background music
audio.play(); // Start the music when the page loads

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
