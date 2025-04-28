// particles.js

// Create an array to store the particles
let particles = [];

// Store the mouse position
let mouseX = 0;
let mouseY = 0;

// Create a particle class
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 2; // Random size between 2 and 7
        this.speedX = Math.random() * 2 - 1; // Random horizontal speed
        this.speedY = Math.random() * 1 + 1; // Falling speed, controlled
        this.color = this.randomColor(); // Random initial color
    }

    // Method to get a random color
    randomColor() {
        const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A6', '#FFFF33', '#33FFF7']; // Array of colors
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // Method to update particle position
    update() {
        // Particle falls down with a slight horizontal drift
        this.x += this.speedX;
        this.y += this.speedY;

        // Change color over time by adjusting the particle's color after each frame
        if (Math.random() < 0.01) { // 1% chance to change color per frame
            this.color = this.randomColor(); // Change the color
        }

        // Reset particle position when it falls off the screen
        if (this.y >= window.innerHeight) {
            this.y = -this.size; // Reset position to top
            this.x = Math.random() * window.innerWidth; // Randomize horizontal position
        }

        // Bounce off the sides of the screen
        if (this.x <= 0 || this.x >= window.innerWidth) {
            this.speedX *= -1; // Reverse horizontal speed when hitting window edges
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

// Create an array of particles
for (let i = 0; i < 100; i++) {
    particles.push(new Particle(Math.random() * window.innerWidth, Math.random() * window.innerHeight));
}

// Mouse event listener to track mouse position (even if we're not using it now)
window.addEventListener("mousemove", (event) => {
    mouseX = event.x;
    mouseY = event.y;
});

// Update and draw the particles every frame
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    particles.forEach(particle => {
        particle.update();
        particle.draw(ctx);
    });
    requestAnimationFrame(animate); // Keep animating
}

animate(); // Start the animation
