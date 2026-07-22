import { useEffect, useRef } from "react";

export const HeroFlakes = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationId = 0;
    let flakes = [];
    let disposed = false;

    const createFlakes = (count) =>
      Array.from({ length: count }, () => ({
        x: Math.random(),
        y: Math.random(),
        size: 1 + Math.random() * 2.5,
        speed: 0.00008 + Math.random() * 0.00014,
        drift: (Math.random() - 0.5) * 0.00006,
        opacity: 0.08 + Math.random() * 0.22,
        wobble: Math.random() * Math.PI * 2,
      }));

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth;
      height = parent.clientHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      flakes = createFlakes(Math.floor((width * height) / 18000));
    };

    const draw = (time) => {
      if (disposed) return;

      ctx.clearRect(0, 0, width, height);

      flakes.forEach((flake) => {
        flake.y -= flake.speed;
        flake.x += flake.drift + Math.sin(time * 0.001 + flake.wobble) * 0.00003;

        if (flake.y < -0.05) flake.y = 1.05;
        if (flake.x < -0.05) flake.x = 1.05;
        if (flake.x > 1.05) flake.x = -0.05;

        const px = flake.x * width;
        const py = flake.y * height;

        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${flake.opacity})`;
        ctx.arc(px, py, flake.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    resize();
    animationId = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    return () => {
      disposed = true;
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="hero-flakes pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
    />
  );
};
