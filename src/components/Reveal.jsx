import { useEffect, useRef } from "react";

const VARIANTS = {
  up: "reveal--up",
  soft: "reveal--soft",
  fade: "reveal--fade",
  slide: "reveal--slide",
};

const getObserverOptions = () => {
  const isMobile = window.matchMedia("(max-width: 767px)").matches;

  return {
    threshold: isMobile ? 0.02 : 0.08,
    rootMargin: isMobile ? "0px 0px 12% 0px" : "0px 0px -3% 0px",
  };
};

export const Reveal = ({
  children,
  className = "",
  delay = 0,
  variant = "soft",
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }

    let observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add("is-visible");
        observer.unobserve(el);
      }
    }, getObserverOptions());

    observer.observe(el);

    const revealIfInView = () => {
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const visible =
        rect.top < viewportHeight * 0.94 && rect.bottom > viewportHeight * 0.06;

      if (visible) {
        el.classList.add("is-visible");
        observer.unobserve(el);
      }
    };

    requestAnimationFrame(revealIfInView);

    const media = window.matchMedia("(max-width: 767px)");
    const resetObserver = () => {
      if (el.classList.contains("is-visible")) return;

      observer.disconnect();
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      }, getObserverOptions());
      observer.observe(el);
      requestAnimationFrame(revealIfInView);
    };

    media.addEventListener("change", resetObserver);

    return () => {
      observer.disconnect();
      media.removeEventListener("change", resetObserver);
    };
  }, []);

  const variantClass = VARIANTS[variant] ?? VARIANTS.soft;
  const delayStyle =
    delay > 0 ? { transitionDelay: `${Math.min(delay, 8) * 130}ms` } : undefined;

  return (
    <div
      ref={ref}
      className={`reveal ${variantClass} ${className}`}
      style={delayStyle}
    >
      {children}
    </div>
  );
};
