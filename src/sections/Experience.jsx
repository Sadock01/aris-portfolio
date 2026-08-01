import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { useLanguage } from "@/i18n/LanguageContext";

const journeyEn = [
  {
    org: "Local Technology Company",
    role: "Software Developer Intern",
    period: "Feb 2025 — Apr 2026",
    title: "Where it began",
    description:
      "A 1 year 3 months internship maintaining web and mobile applications, mail server setup, a shop management platform, and QA testing — learning how production systems actually run.",
  },
  {
    org: "ERP Nodus · Remote",
    role: "Freelance Software Developer",
    period: "2025",
    title: "Building for the web",
    description:
      "Paid ERP project for a private client using Next.js, Django, and PostgreSQL — from backend architecture to frontend delivery.",
  },
  {
    org: "Personal Project",
    role: "Software Developer",
    period: "2025",
    title: "Shipping personal products",
    description:
      "Designed and built a crypto trading interface with dashboard analytics and a market-focused user experience.",
  },
  {
    org: "Takeshi Nihongo Gakkou · Cotonou",
    role: "Volunteer",
    period: "Volunteer",
    title: "Cross-cultural leadership",
    description:
      "Supported daily operations of a Japanese language school and student activities in a multicultural environment.",
  },
  {
    org: "ANEEB · Benin",
    role: "Volunteer",
    period: "Volunteer",
    title: "Youth entrepreneurship",
    description:
      "Organized events and community initiatives for student entrepreneurs across Benin.",
  },
  {
    org: "International Youth Fellowship",
    role: "Volunteer",
    period: "Volunteer",
    title: "Global youth camp",
    description:
      "Handled logistics and participant coordination in an international, multicultural camp setting.",
  },
];

const journeyFr = [
  {
    org: "Entreprise technologique locale",
    role: "Stagiaire Développeur Logiciel",
    period: "Fév 2025 — Avr 2026",
    title: "Là où tout a commencé",
    description:
      "Stage de 1 an 3 mois : maintenance web/mobile, serveur mail, plateforme shop management et tests — comprendre comment tournent les systèmes en production.",
  },
  {
    org: "ERP Nodus · Remote",
    role: "Développeur Freelance",
    period: "2025",
    title: "Construire pour le web",
    description:
      "Projet ERP rémunéré avec Next.js, Django et PostgreSQL — de l'architecture backend à la livraison frontend.",
  },
  {
    org: "Projet personnel",
    role: "Développeur",
    period: "2025",
    title: "Livrer des produits personnels",
    description:
      "Interface crypto trading avec dashboard analytics et une UX orientée marché.",
  },
  {
    org: "Takeshi Nihongo Gakkou · Cotonou",
    role: "Volontaire",
    period: "Volontariat",
    title: "Leadership interculturel",
    description:
      "Appui aux opérations d'une école de langue japonaise et aux activités étudiantes.",
  },
  {
    org: "ANEEB · Bénin",
    role: "Volontaire",
    period: "Volontariat",
    title: "Entrepreneuriat jeunesse",
    description:
      "Organisation d'événements et initiatives pour étudiants entrepreneurs.",
  },
  {
    org: "International Youth Fellowship",
    role: "Volontaire",
    period: "Volontariat",
    title: "Camp international",
    description:
      "Logistique et coordination de participants dans un contexte multiculturel.",
  },
];

export const Experience = () => {
  const { language } = useLanguage();
  const journey = language === "fr" ? journeyFr : journeyEn;
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    let rafId = 0;

    const updateProgress = () => {
      const rect = timeline.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const startOffset = viewportHeight * 0.26;
      const endOffset = viewportHeight * 0.52;
      const progressStart = -rect.top + startOffset;
      const progressEnd = rect.height - (viewportHeight - endOffset);
      const value = progressStart / Math.max(progressEnd, 1);

      setScrollProgress(Math.min(1, Math.max(0, value)));
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const labels = {
    en: {
      label: "My journey",
      title: "Where I have worked.",
      intro:
        "From internship to freelance delivery and community volunteering — a path shaped by building real software, learning in production, and contributing beyond paid work.",
      foundations: "Foundations",
      today: "Today",
    },
    fr: {
      label: "Mon parcours",
      title: "Où j'ai travaillé.",
      intro:
        "Du stage au freelance et au volontariat — un parcours forgé par la construction de vrais produits, l'apprentissage en production et l'engagement au-delà du travail rémunéré.",
      foundations: "Fondations",
      today: "Aujourd'hui",
    },
  }[language];

  const ringCircumference = 2 * Math.PI * 18;

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="journey-section border-b border-border/40 py-24 md:py-36"
    >
      <div className="site-container">
        <div className="journey-layout">
          <aside className="journey-sidebar">
            <Reveal>
              <SectionLabel>{labels.label}</SectionLabel>
              <h2 className="journey-heading">{labels.title}</h2>
              <div className="journey-intro-wrap">
                <p className="journey-intro">{labels.intro}</p>
                <span className="journey-intro-orbit" aria-hidden="true" />
              </div>

              <div
                className="journey-progress"
                aria-hidden="true"
                style={{ "--journey-progress": scrollProgress }}
              >
                <div className="journey-progress__labels">
                  <span>{labels.foundations}</span>
                  <span>{labels.today}</span>
                </div>
                <div className="journey-progress__track">
                  <span className="journey-progress__origin" />
                  <div className="journey-progress__line">
                    <span className="journey-progress__fill" />
                  </div>
                </div>
              </div>
            </Reveal>
          </aside>

          <div className="journey-timeline-wrap">
            <div ref={timelineRef} className="journey-timeline">
              {journey.map((item, idx) => (
                <Reveal key={`${item.org}-${idx}`} delay={(idx % 5) + 1} variant="slide">
                  <article className="journey-entry">
                    <span className="journey-entry__dot" aria-hidden="true" />
                    <div className="journey-entry__content">
                      <p className="journey-entry__meta-primary">
                        {item.org} • {item.role}
                      </p>
                      <p className="journey-entry__meta-secondary">{item.period}</p>
                      <h3 className="journey-entry__title">{item.title}</h3>
                      <p className="journey-entry__desc">{item.description}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            <div className="journey-scroll-ring" aria-hidden="true">
              <svg viewBox="0 0 44 44" className="journey-scroll-ring__svg">
                <circle
                  cx="22"
                  cy="22"
                  r="18"
                  className="journey-scroll-ring__track"
                />
                <circle
                  cx="22"
                  cy="22"
                  r="18"
                  className="journey-scroll-ring__fill"
                  strokeDasharray={ringCircumference}
                  strokeDashoffset={
                    ringCircumference - scrollProgress * ringCircumference
                  }
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
