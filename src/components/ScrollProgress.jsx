import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

const SECTIONS = [
  { id: "hero", labels: { en: "Home", fr: "Accueil" } },
  { id: "about", labels: { en: "About", fr: "À propos" } },
  { id: "systems", labels: { en: "Systems", fr: "Systèmes" } },
  { id: "volunteering", labels: { en: "Volunteering", fr: "Volontariat" } },
  { id: "journey", labels: { en: "Journey", fr: "Parcours" } },
  { id: "education", labels: { en: "Education", fr: "Formation" } },
  { id: "stats", labels: { en: "Impact", fr: "Impact" } },
  { id: "testimonials", labels: { en: "Praise", fr: "Témoignages" } },
  { id: "contact", labels: { en: "Contact", fr: "Contact" } },
];

export const ScrollProgress = () => {
  const { language } = useLanguage();
  const [activeId, setActiveId] = useState("hero");
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    const update = () => {
      const offset = window.innerHeight * 0.35;
      let current = SECTIONS[0].id;

      SECTIONS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= window.scrollY + offset) {
          current = id;
        }
      });

      setActiveId(current);
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
    <nav
      className="section-nav fixed right-6 top-1/2 z-40 hidden lg:flex -translate-y-1/2 flex-col items-end gap-8"
      aria-label="Navigation par sections"
      onMouseLeave={() => setHoveredId(null)}
    >
      {SECTIONS.map(({ id, labels }) => {
        const isActive = activeId === id;
        const isHovered = hoveredId === id;
        const showLabel = isActive || isHovered;

        return (
          <a
            key={id}
            href={`#${id}`}
            className="section-nav-item"
            aria-label={labels[language]}
            aria-current={isActive ? "true" : undefined}
            onMouseEnter={() => setHoveredId(id)}
            onFocus={() => setHoveredId(id)}
            onBlur={() => setHoveredId(null)}
          >
            <span
              className={`section-nav-label ${showLabel ? "is-visible" : ""}`}
            >
              {labels[language]}
            </span>
            <span
              className={`section-nav-dash ${
                isActive ? "is-active" : isHovered ? "is-hover" : ""
              }`}
            />
          </a>
        );
      })}
    </nav>
  );
};
