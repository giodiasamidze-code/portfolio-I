import { useEffect, useRef } from "react";

export default function Particles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = (burst = false) => ({
      x: burst
        ? canvas.width * 0.28 + (Math.random() - 0.5) * 120
        : Math.random() * canvas.width,
      y: burst ? canvas.height * 0.55 : canvas.height + Math.random() * 40,
      size: Math.random() * 3 + 0.5,
      speedY: -(Math.random() * 1.8 + 0.4),
      speedX: (Math.random() - 0.5) * 0.8,
      life: burst ? Math.random() * 80 + 40 : Math.random() * 100 + 20,
      maxLife: 0,
      hue: Math.random() > 0.5 ? 115 : 75,
      alpha: Math.random() * 0.6 + 0.2,
      flicker: Math.random() * Math.PI * 2,
    });

    const init = () => {
      particles = Array.from({ length: 90 }, () => createParticle());
      particles.forEach((p) => {
        p.maxLife = p.life;
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.life -= 1;
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.flicker) * 0.15;
        p.flicker += 0.04;
        p.size *= 0.9995;

        const progress = p.life / p.maxLife;
        const glow = p.alpha * progress;

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        gradient.addColorStop(0, `hsla(${p.hue}, 100%, 55%, ${glow})`);
        gradient.addColorStop(0.4, `hsla(${p.hue}, 100%, 45%, ${glow * 0.4})`);
        gradient.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, ${glow * 0.9})`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        if (p.life <= 0) {
          particles[i] = createParticle();
          particles[i].maxLife = particles[i].life;
        }
      });

      animationId = requestAnimationFrame(draw);
    };

    resize();
    init();
    draw();

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="particles-canvas" aria-hidden="true" />;
}
