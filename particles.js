// === NEW CODE TO ADD: Falling Poem Lines ===

// Poem lines from Rilke
const poemLines = [
    "I live my life in widening circles",
    "that reach out across the world.",
    "I may not complete this last one,",
    "but I give myself to it.",
    "I circle around God, around the primordial tower.",
    "I've been circling for thousands of years",
    "and I still don't know: am I a falcon,",
    "a storm, or a great song?"
];

// Poem particle class
class PoemParticle {
    constructor(text) {
        this.text = text;
        this.x = Math.random() * canvas.width;
        this.y = -50; // Start above the screen
        this.speedY = Math.random() * 0.5 + 0.2; // Slow fall
        this.opacity = 0;
        this.fadeInSpeed = 0.01;
        this.fontSize = 20;
    }

    update() {
        this.y += this.speedY;
        if (this.opacity < 1) {
            this.opacity += this.fadeInSpeed;
        }
    }

    draw(ctx) {
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = "#e0f7ff"; // Very light blue/white glow
        ctx.font = `${this.fontSize}px serif`;
        ctx.fillText(this.text, this.x, this.y);
        ctx.globalAlpha = 1;
    }
}

let activePoemParticles = [];
let poemIndex = 0;

function spawnPoemParticle() {
    if (poemIndex < poemLines.length) {
        activePoemParticles.push(new PoemParticle(poemLines[poemIndex]));
        poemIndex++;

        // Random delay between spawning next line
        setTimeout(spawnPoemParticle, Math.random() * 2000 + 1000); // 1-3 seconds delay
    }
}

// Start spawning the poem lines after a short pause
setTimeout(spawnPoemParticle, 2000);


// === UPDATE YOUR animate() FUNCTION to draw them ===
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    
    particles.forEach(particle => {
        particle.update();
        particle.draw(ctx);
    });

    brightParticle.update();
    brightParticle.draw(ctx);

    activePoemParticles.forEach(poem => {
        poem.update();
        poem.draw(ctx);
    });

    requestAnimationFrame(animate); // Keep animating
}
