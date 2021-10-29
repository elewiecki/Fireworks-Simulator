const canvas = document.querySelector("canvas");
const c = canvas.getContext('2d');
canvas.width = innerWidth;
canvas.height = innerHeight;
let morters = [];
let particles = [];
let stars = [];

let gravity = 0.1;

class Particle {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
        this.lifeSpan = Math.random() * (130 - 50) + 50
    }
    draw() {
        c.globalAlpha = this.alpha
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }
    update() {
        this.draw();
        this.velocity.y += gravity
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
        this.lifeSpan -= 1
    }
}



function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = "rgba(0, 0, 0, 0.5)";
    c.fillRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        star.draw();
    })
    morters.forEach((morter, index) => {
        if (morter.lifeSpan <= 0) {
            setTimeout(() => {
                morters.splice(index, 1);
            }, 0);
            for (let i = 0; i < Math.random() * (100 - 50) + 50; ++i) {
                particles.push(new Particle(morter.x, morter.y, Math.random() * 1.5, "red", { x: (Math.random() - 0.5) * 8, y: (Math.random() - 0.5) * 8 }))
            }
            let rand = Math.random();
            if (rand < 0.1) { Xplosion(morter); } else if (rand < 0.25) { circular(morter); } else if (rand < 0.5) { square(morter); } else { random(morter); }
        }
        morter.update();
    });
    particles.forEach((particle, index) => {
        if (particle.lifeSpan <= 0) {
            setTimeout(() => {
                particles.splice(index, 1);
            }, 0);
        }
        particle.update();
    });
}

function spawnFireWorks() {
    setInterval(() => {
        const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
        morters.push(new Particle(Math.random() * (canvas.width - 300) + 150, canvas.height, 8, color, { x: (Math.random() - 0.5) * 5, y: (Math.random() - 0.5) * 6 - 10 }));
    }, Math.random() * (1000 - 500) + 500)
}

function spawnStars() {
    for (let i = 0; i < 500; ++i) {
        stars.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height, Math.random(), "white", { x: 0, y: 0 }));
    }
}

spawnStars();
animate();
spawnFireWorks();

function Xplosion(morter) {
    for (let i = -4; i <= 4; ++i) {
        particles.push(new Particle(morter.x, morter.y, Math.random() * (6 - 3) + 3, morter.color, { x: i, y: i }));
        particles.push(new Particle(morter.x, morter.y, Math.random() * (6 - 3) + 3, morter.color, { x: i, y: -i }));
    }
}

function circular(morter) {
    for (let i = 0; i < 2 * Math.PI; i += Math.PI / 12) {
        particles.push(new Particle(morter.x, morter.y, Math.random() * (6 - 3) + 3, morter.color, { x: 4 * Math.cos(i), y: -4 * Math.sin(i) }));
    }
}


function square(morter) {
    for (let i = -4; i <= 0; ++i) {
        particles.push(new Particle(morter.x, morter.y, Math.random() * (6 - 3) + 3, morter.color, { x: i, y: i + 4 }));
        particles.push(new Particle(morter.x, morter.y, Math.random() * (6 - 3) + 3, morter.color, { x: -i, y: i + 4 }));
        particles.push(new Particle(morter.x, morter.y, Math.random() * (6 - 3) + 3, morter.color, { x: i, y: -i - 4 }));
        particles.push(new Particle(morter.x, morter.y, Math.random() * (6 - 3) + 3, morter.color, { x: i + 4, y: i }));
    }
}

function random(morter) {
    for (let i = 0; i < Math.random() * (100 - 50) + 50; ++i) {
        particles.push(new Particle(morter.x, morter.y, Math.random() * 6, morter.color, { x: (Math.random() - 0.5) * 8, y: (Math.random() - 0.5) * 8 }))
    }
}