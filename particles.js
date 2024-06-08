document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particlesArray = [];
    let mouse = {
        x: null,
        y: null,
        speed: 0,
        lastX: null,
        lastY: null
    };

    // Event listener to capture mouse movement
    canvas.addEventListener('mousemove', (event) => {
        if (mouse.lastX && mouse.lastY) {
            const dx = event.x - mouse.lastX;
            const dy = event.y - mouse.lastY;
            mouse.speed = Math.sqrt(dx * dx + dy * dy);
        }
        mouse.x = event.x;
        mouse.y = event.y;
        mouse.lastX = event.x;
        mouse.lastY = event.y;
        for (let i = 0; i < 5; i++) {
            particlesArray.push(new Particle());
        }
    });

    // Function to calculate color based on speed
    function getColorBasedOnSpeed(speed) {
        const maxSpeed = 50;
        const normalizedSpeed = Math.min(speed / maxSpeed, 1);
        const hue = normalizedSpeed * 360;
        return `hsl(${hue}, 100%, 50%)`;
    }

    // Particle class
    class Particle {
        constructor() {
            this.x = mouse.x;
            this.y = mouse.y;
            this.size = Math.random() * 5 + 1;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
            this.color = getColorBasedOnSpeed(mouse.speed);
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.size > 0.2) this.size -= 0.1;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();

            if (particlesArray[i].size <= 0.2) {
                particlesArray.splice(i, 1);
                i--;
            }
        }
        requestAnimationFrame(animate);
    }

    animate();

    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    console.log("Particle system initialized");
});
