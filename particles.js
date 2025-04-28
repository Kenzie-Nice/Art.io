// Mouse move event to track mouse position
document.addEventListener('mousemove', function(e) {
    particles.forEach(particle => {
        // Only move particles that are supposed to follow the mouse
        if (particle.shouldFollowMouse) {
            const particleRect = particle.getBoundingClientRect();
            const particleX = particleRect.left + particleRect.width / 2;
            const particleY = particleRect.top + particleRect.height / 2;

            // Calculate the distance between the particle and the mouse
            const deltaX = e.clientX - particleX;
            const deltaY = e.clientY - particleY;

            // Smooth transition towards the mouse (using interpolation)
            const speed = 0.1; // Lower value means slower following
            const moveX = deltaX * speed;
            const moveY = deltaY * speed;

            // Apply the new position
            particle.style.left = particleX + moveX + 'px';
            particle.style.top = particleY + moveY + 'px';
        }
    });
});
