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
        this.speedY = Math.random() * 2 - 1; // Random vertical speed
        this.color = this.randomColor(); // Random initial color
        this.shouldFollowMouse = Math.random() < 0.5; // 50% chance for each particle to follow the mouse
    }

    // Method to get a random color
    randomColor() {
        const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A6', '#FFFF33', '#33FFF7']; // Array of colors
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // Method to update particle position
    update() {
        if (this.shouldFollowMouse) {
            // Follow mouse position
            let angle = Math.atan2(mouseY - this.y, mouseX - this.x);
            let speed = 0.5; // Adjust this value to control how fast particles follow the mouse
            this.x += Math.cos(angle) * speed;
            this.y += Math.sin(angle) * speed;
        }
        this.x += this.speedX;
        this.y += this.speedY;

        // Change color over time by adjusting the particle's color after each frame
        if (Math.random() < 0.01) { // 1% chance to change color per frame
            this.color = this.randomColor(); // Change the color
        }

        if (this.x <= 0 || this.x >= window.innerWidth) {
            this.speedX *= -1; // Reverse horizontal speed when hitting window edges
        }
        if (this.y <= 0 || this.y >= window.innerHeight) {
            this.speedY *= -1; // Reverse vertical speed when hitting window edges
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

// Mouse event listener to track mouse position
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
