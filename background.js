const canvas = document.getElementById("background"),
  ctx = canvas.getContext("2d"),
  // change here
  particles_num = 125,
  particle_size = 2.5,
  particle_speed = 0.5,
  particle_transparency = 0.5;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * particle_size;
    this.speedX = Math.random() * particle_speed;
    this.speedY = Math.random() * particle_speed;
    this.alpha = Math.random() * particle_transparency;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // preventing overflow
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.reset();
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
    ctx.fill();
  }
}

const particles = Array.from({ length: particles_num }, () => new Particle());

// entry function
function animate_background() {
  ctx.fillStyle = "#141414";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animate_background);
}
