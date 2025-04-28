// particles.js

// Create an array to store the particles
let particles = [];

// Create a particle class
class Particle {
    constructor(x) {
        this.x = x; // Fixed horizontal position for all particles
        this.y = Math.random() * -100; // Start above the screen
        this.size = Math.random() * 2 + 1; // Random size between 1 and 3
        this.speedY = Math.random() * 0.5 + 0.5; // Speed of falling
        this.color = "white"; // Particle color
    }

    // Method to update particle position
    update() {
        this.y += this.speedY; // Move particle downward

        // Reset particle when it reaches the bottom
        if (this.y >= window.innerHeight) {
            this.y = -this.size; // Reset position to the top
            this.x = Math.random() * window.innerWidth; // Random horizontal position
        }
    }

    // Method to draw the particle on the screen
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

// Create an array of particles that fall from a consistent starting point
for (let i = 0; i < 150; i++) { // Number of particles
    particles.push(new Particle(Math.random() * window.innerWidth)); // Random horizontal starting point
}

// Update and draw the particles every frame
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    particles.forEach(particle => {
        particle.update();
        particle.draw(ctx);
    });
    requestAnimationFrame(animate); // Keep animating
}

// Start animation
animate();
