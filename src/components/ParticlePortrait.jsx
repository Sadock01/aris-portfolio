import { useEffect, useRef } from "react";
import portraitSrc from "@/assets/sad.webp";

const LENS_RADIUS = 68;
const SAMPLE_STEP = 5;
const MAX_PARTICLES = 3200;
const PORTRAIT_SIZE = 900;

const createParticles = (ctx, width, height, radius) => {
  const imageData = ctx.getImageData(0, 0, width, height).data;
  const particles = [];
  const cx = width / 2;
  const cy = height / 2;

  for (let y = 0; y < height; y += SAMPLE_STEP) {
    for (let x = 0; x < width; x += SAMPLE_STEP) {
      if (particles.length >= MAX_PARTICLES) return particles;

      const dx = x - cx;
      const dy = y - cy;
      if (Math.hypot(dx, dy) > radius - 2) continue;

      const i = (y * width + x) * 4;
      const r = imageData[i];
      const g = imageData[i + 1];
      const b = imageData[i + 2];
      const a = imageData[i + 3];

      if (a < 30) continue;

      const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      if (brightness < 0.06) continue;

      particles.push({
        homeX: x,
        homeY: y,
        x: x + (Math.random() - 0.5) * width * 0.75,
        y: y + (Math.random() - 0.5) * height * 0.75,
        brightness,
        size: 0.9 + brightness * 1.4,
        delay: Math.random() * 0.35,
      });
    }
  }

  return particles;
};

const buildSourceCanvas = (image, size) => {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2 - 4;

  ctx.fillStyle = "#0a0a0a";
  ctx.fillRect(0, 0, size, size);

  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.clip();

  const scale =
    Math.max(size / image.naturalWidth, size / image.naturalHeight) * 1.08;
  const drawW = image.naturalWidth * scale;
  const drawH = image.naturalHeight * scale;
  const offsetX = (size - drawW) * 0.5;
  const offsetY = (size - drawH) * 0.02;

  ctx.filter = "grayscale(100%) contrast(1.12) brightness(0.94)";
  ctx.drawImage(image, offsetX, offsetY, drawW, drawH);
  ctx.filter = "none";
  ctx.restore();

  return { canvas, radius };
};

export const ParticlePortrait = ({ src = portraitSrc, className = "" }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    let particles = [];
    let sourceCanvas = null;
    let sourceRadius = 0;
    let assemble = 0;
    let width = 0;
    let height = 0;
    let radius = 0;
    let mouse = { x: -9999, y: -9999, active: false, inCircle: false };
    let disposed = false;
    let bitmapReady = false;

    const image = new Image();
    image.src = src;
    image.decoding = "async";

    const applyBitmap = () => {
      const built = buildSourceCanvas(image, PORTRAIT_SIZE);
      if (!built) return;
      sourceCanvas = built.canvas;
      sourceRadius = built.radius;
      particles = createParticles(
        sourceCanvas.getContext("2d", { willReadFrequently: true }),
        PORTRAIT_SIZE,
        PORTRAIT_SIZE,
        sourceRadius
      );
      assemble = 0;
      bitmapReady = true;
      resizeDisplay();
    };

    const resizeDisplay = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      radius = Math.min(width, height) / 2 - 4;

      if (width < 2 || height < 2) return;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onImageLoad = async () => {
      try {
        await image.decode();
      } catch {
        /* decode optional */
      }
      applyBitmap();
    };

    const clipCircle = () => {
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, radius, 0, Math.PI * 2);
      ctx.clip();
    };

    const drawLens = () => {
      if (!mouse.inCircle) return;

      ctx.save();
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, LENS_RADIUS, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(sourceCanvas, 0, 0, width, height);
      ctx.restore();

      ctx.strokeStyle = "rgba(201, 168, 108, 0.9)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, LENS_RADIUS, 0, Math.PI * 2);
      ctx.stroke();
    };

    const draw = () => {
      if (disposed) return;

      if (bitmapReady && sourceCanvas && width > 0 && height > 0) {
        ctx.clearRect(0, 0, width, height);
        if (assemble < 1) assemble = Math.min(1, assemble + 0.018);

        ctx.save();
        clipCircle();

        const scale = width / PORTRAIT_SIZE;
        const hideRadius = mouse.inCircle ? LENS_RADIUS * 0.95 : 0;

        for (let i = 0; i < particles.length; i += 1) {
          const p = particles[i];
          const px = p.x * scale;
          const py = p.y * scale;

          const t = Math.max(
            0,
            Math.min(1, (assemble - p.delay) / Math.max(0.2, 1 - p.delay))
          );
          const ease = 1 - Math.pow(1 - t, 3);

          let targetX = p.homeX;
          let targetY = p.homeY;

          if (mouse.inCircle) {
            const dx = p.x - mouse.lensX;
            const dy = p.y - mouse.lensY;
            const dist = Math.hypot(dx, dy);

            if (dist < LENS_RADIUS * 1.4) {
              const push = (1 - dist / (LENS_RADIUS * 1.4)) * 52;
              const angle = dist > 0 ? Math.atan2(dy, dx) : 0;
              targetX = p.homeX + Math.cos(angle) * push;
              targetY = p.homeY + Math.sin(angle) * push;
            }
          }

          p.x += (targetX - p.x) * 0.14;
          p.y += (targetY - p.y) * 0.14;

          if (mouse.inCircle) {
            const dist = Math.hypot(px - mouse.x, py - mouse.y);
            if (dist < hideRadius) continue;
          }

          const alpha = (0.14 + p.brightness * 0.72) * (0.4 + ease * 0.6);
          ctx.fillStyle = `rgba(245,245,245,${alpha})`;
          ctx.fillRect(px, py, p.size * scale, p.size * scale);
        }

        drawLens();
        ctx.restore();

        ctx.strokeStyle = "rgba(201, 168, 108, 0.35)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, radius + 1, 0, Math.PI * 2);
        ctx.stroke();
      }

      animationId = requestAnimationFrame(draw);
    };

    const setMouse = (clientX, clientY, active) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = clientX - rect.left;
      mouse.y = clientY - rect.top;
      mouse.active = active;

      const cx = width / 2;
      const cy = height / 2;
      mouse.inCircle =
        active && Math.hypot(mouse.x - cx, mouse.y - cy) <= radius;

      if (mouse.inCircle) {
        const scale = width / PORTRAIT_SIZE;
        mouse.lensX = mouse.x / scale;
        mouse.lensY = mouse.y / scale;
        mouse.lensR = LENS_RADIUS / scale;
      }
    };

    const onMouseMove = (e) => setMouse(e.clientX, e.clientY, true);
    const onMouseLeave = () => {
      mouse.active = false;
      mouse.inCircle = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onTouchMove = (e) => {
      const touch = e.touches[0];
      if (touch) setMouse(touch.clientX, touch.clientY, true);
    };
    const onTouchEnd = () => onMouseLeave();

    const resizeObserver = new ResizeObserver(() => {
      resizeDisplay();
    });

    image.addEventListener("load", onImageLoad);
    resizeObserver.observe(container);
    resizeDisplay();
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("touchmove", onTouchMove, { passive: true });
    canvas.addEventListener("touchend", onTouchEnd);

    if (image.complete) onImageLoad();
    animationId = requestAnimationFrame(draw);

    return () => {
      disposed = true;
      cancelAnimationFrame(animationId);
      image.removeEventListener("load", onImageLoad);
      resizeObserver.disconnect();
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
    };
  }, [src]);

  return (
    <div
      ref={containerRef}
      className={`particle-portrait particle-portrait--round ${className}`}
    >
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className="particle-portrait__fallback"
      />
      <canvas ref={canvasRef} className="particle-portrait__canvas" aria-hidden="true" />
    </div>
  );
};
