import { useRef, useState } from "react";

export const ContactCard = ({ label, value, href, action }) => {
  const cardRef = useRef(null);
  const [glow, setGlow] = useState({ x: 0, y: 0, visible: false });

  const handlePointerMove = (event) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    setGlow({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      visible: true,
    });
  };

  const handlePointerLeave = () => {
    setGlow((current) => ({ ...current, visible: false }));
  };

  const isExternal = href.startsWith("http");

  return (
    <article
      ref={cardRef}
      className="contact-card"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        "--contact-glow-x": `${glow.x}px`,
        "--contact-glow-y": `${glow.y}px`,
        "--contact-glow-opacity": glow.visible ? 1 : 0,
      }}
    >
      <span className="contact-card__glow" aria-hidden="true" />
      <p className="contact-card__label">{label}</p>
      <p className="contact-card__value">{value}</p>
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="contact-card__link"
      >
        {action} ↗
      </a>
    </article>
  );
};
