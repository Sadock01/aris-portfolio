import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { useLanguage } from "@/i18n/LanguageContext";
import sadPortrait from "@/assets/sad.webp";

export const About = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      label: "About",
      title: "I build for teams, users, and communities that need reliable software.",
      body: [
        "I'm a software engineer based in Abomey-Calavi, Benin, specializing in Flutter, React, Next.js, and Django. I turn product ideas into scalable web and mobile solutions — from ERP systems to fintech interfaces.",
        "Beyond commercial work, I dedicate time to tech volunteering: building digital tools for NGOs at no development cost, so organizations can focus on their mission while only covering hosting.",
      ],
      skills: [
        "Software Engineering",
        "Flutter",
        "React / Next.js",
        "Django",
        "PostgreSQL",
        "Tech Volunteering",
      ],
      locationLine1: "Abomey-Calavi",
      locationLine2: "Benin",
    },
    fr: {
      label: "A propos",
      title:
        "Je construis pour les equipes, les utilisateurs et les communautes qui ont besoin de logiciels fiables.",
      body: [
        "Je suis ingenieur logiciel base a Abomey-Calavi, Benin, specialise en Flutter, React, Next.js et Django. Je transforme les idees produit en solutions web et mobile evolutives.",
        "En plus du travail commercial, je consacre du temps au tech volunteering : creer des outils numeriques pour les ONG sans frais de developpement.",
      ],
      skills: [
        "Ingenierie logicielle",
        "Flutter",
        "React / Next.js",
        "Django",
        "PostgreSQL",
        "Volontariat Tech",
      ],
      locationLine1: "Abomey-Calavi",
      locationLine2: "Benin",
    },
  }[language];

  return (
    <section id="about" className="border-b border-border py-20 md:py-32">
      <div className="site-container">
        <div className="grid lg:grid-cols-[minmax(0,400px)_1fr] gap-12 lg:gap-20 xl:gap-24 items-start">
          <Reveal className="w-full max-w-[400px] mx-auto lg:mx-0">
            <div className="about-photo">
              <div className="about-photo__frame">
                <img
                  src={sadPortrait}
                  alt="Sadock Tohon"
                  className="about-photo__img"
                />
              </div>
              <div className="about-location-badge">
                <p className="about-location-badge__city">{content.locationLine1}</p>
                <p className="about-location-badge__country">{content.locationLine2}</p>
              </div>
            </div>
          </Reveal>

          <div className="min-w-0">
            <Reveal>
              <SectionLabel>{content.label}</SectionLabel>
              <h2 className="section-title mb-10 max-w-2xl">{content.title}</h2>
            </Reveal>

            {content.body.map((paragraph, i) => (
              <Reveal key={paragraph.slice(0, 24)} delay={i + 1}>
                <p className="about-body">{paragraph}</p>
              </Reveal>
            ))}

            <Reveal delay={2}>
              <div className="flex flex-wrap gap-2.5 mt-10">
                {content.skills.map((skill) => (
                  <span key={skill} className="about-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
