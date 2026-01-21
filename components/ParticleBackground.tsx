import React, { useRef, useEffect } from 'react';

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: any[] = [];
    const count = 150; // More particles for a starry sky

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      x = Math.random() * canvas.width;
      y = Math.random() * canvas.height;
      r = Math.random() * 0.8 + 0.2; // Smaller radius for stars
      vx = Math.random() * 0.1 - 0.05; // Very slow movement
      vy = Math.random() * 0.1 - 0.05; // Very slow movement
      a = Math.random() * 0.5 + 0.3; // Alpha for twinkling

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${this.a})`;
        ctx.fill();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // Twinkle effect
        if (Math.random() > 0.99) {
          this.a = Math.random() * 0.5 + 0.3;
        }

        if (this.x < -this.r) this.x = canvas.width + this.r;
        if (this.x > canvas.width + this.r) this.x = -this.r;
        if (this.y < -this.r) this.y = canvas.height + this.r;
        if (this.y > canvas.height + this.r) this.y = -this.r;
        
        this.draw();
      }
    }

    const init = () => {
      resize();
      particles = Array.from({ length: count }, () => new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => p.update());
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();
    window.addEventListener('resize', init);

    return () => {
      window.removeEventListener('resize', init);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
};

export default ParticleBackground;