import { useEffect, useState } from "react";

export const MobileScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const value = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      setProgress(Math.min(1, Math.max(0, value)));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="mobile-scroll-progress lg:hidden" aria-hidden="true">
      <span
        className="mobile-scroll-progress__fill"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
};
