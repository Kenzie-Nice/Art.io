// particles.js

// Create an array to store the particles
let particles = [];

// Create a particle class
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 1; // Random size between 1 and 3
        this.speedY = Math.random() * 1 + 0.2; // Random speed between 0.2 and 1.2
        this.color = "white"; // Particle color
    }

    // Method to update particle position
    update() {
        this.y += this.speedY; // Particle falls down

        // Reset the particle when it reaches the bottom
        if (this.y >= window.innerHeight) {
            this.y = -this.size; // Restart at the top
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

// Log canvas size for debugging
console.log("Canvas dimensions:", canvas.width, canvas.height);

// Create an array of particles
for (let i = 0; i < 150; i++) { // 150 particles for a fuller effect
    particles.push(new Particle(Math.random() * window.innerWidth, Math.random() * window.innerHeight));
}

// Log particles array size for debugging
console.log("Particles created:", particles.length);

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
