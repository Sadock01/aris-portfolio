import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { useLanguage } from "@/i18n/LanguageContext";

const MissionCard = ({ label, statement, points }) => (
  <div className="mission-card">
    <SectionLabel>{label}</SectionLabel>
    <h3 className="mission-statement">
      {statement}
      <span className="mission-orbit" aria-hidden="true" />
    </h3>
    <ul className="mission-list">
      {points.map((point) => (
        <li key={point}>
          <span className="mission-bullet" aria-hidden="true" />
          <span>{point}</span>
        </li>
      ))}
    </ul>
  </div>
);

export const MissionVision = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      missionTitle: "My mission",
      mission:
        "Build reliable, accessible software and free digital solutions that reduce friction for teams, users, and nonprofits.",
      missionPoints: [
        "Ship production-ready code with clear, maintainable architecture",
        "Make performance and accessibility a default, not an afterthought",
        "Support NGOs with professional tools at no development cost",
      ],
      visionTitle: "My vision",
      vision:
        "Technology that opens doors — for businesses, communities, and the next generation of builders across Africa and beyond.",
      visionPoints: [
        "Bridge engineering craft with real social impact",
        "Keep learning, leading, and raising the bar with every project",
        "Collaborate across cultures, languages, and disciplines",
      ],
    },
    fr: {
      missionTitle: "Ma mission",
      mission:
        "Construire des logiciels fiables et accessibles, et des solutions numeriques gratuites qui simplifient la vie des equipes, des utilisateurs et des ONG.",
      missionPoints: [
        "Livrer du code pret pour la production, propre et maintenable",
        "Faire de la performance et de l'accessibilite une priorite par defaut",
        "Accompagner les ONG avec des outils pro sans frais de developpement",
      ],
      visionTitle: "Ma vision",
      vision:
        "Une technologie qui ouvre des portes — pour les entreprises, les communautes et la prochaine generation de builders en Afrique et ailleurs.",
      visionPoints: [
        "Relier l'ingenierie a un impact social concret",
        "Continuer a apprendre, innover et elever le niveau a chaque projet",
        "Collaborer au-dela des cultures, des langues et des disciplines",
      ],
    },
  }[language];

  return (
    <section className="border-b border-border py-20 md:py-32">
      <div className="site-container">
        <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
          <Reveal delay={1}>
            <MissionCard
              label={content.missionTitle}
              statement={content.mission}
              points={content.missionPoints}
            />
          </Reveal>

          <Reveal delay={2}>
            <MissionCard
              label={content.visionTitle}
              statement={content.vision}
              points={content.visionPoints}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
};
