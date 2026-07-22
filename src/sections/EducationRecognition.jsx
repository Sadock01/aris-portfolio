import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { useLanguage } from "@/i18n/LanguageContext";

const content = {
  en: {
    recognitionLabel: "Recognition",
    educationLabel: "Education & development",
    recognition: [
      {
        date: "Feb 2025",
        text: "Software engineering internship — production web, mobile, mail server, and QA delivery over 1 year 3 months.",
      },
      {
        date: "2025",
        text: "Freelance ERP project delivered for a private client with Next.js, Django, and PostgreSQL.",
      },
      {
        date: "2025",
        text: "Tech volunteering partnerships with Takeshi Nihongo Gakkou, ANEEB, and International Youth Fellowship.",
      },
      {
        date: "2025",
        text: "Personal fintech product shipped — crypto trading interface with analytics dashboard.",
      },
    ],
    degree: "Licence Professionnelle en Genie Logiciel",
    school: "IFRI · Universite d'Abomey-Calavi · Benin",
    courses: [
      "Flutter & Dart",
      "React / Next.js",
      "Django REST Framework",
      "PostgreSQL",
      "Software Testing & QA",
    ],
  },
  fr: {
    recognitionLabel: "Reconnaissance",
    educationLabel: "Formation & developpement",
    recognition: [
      {
        date: "Fev 2025",
        text: "Stage en ingenierie logicielle — livraison web, mobile, serveur mail et QA sur 1 an 3 mois.",
      },
      {
        date: "2025",
        text: "Projet ERP freelance livre pour un client prive avec Next.js, Django et PostgreSQL.",
      },
      {
        date: "2025",
        text: "Partenariats tech volunteering avec Takeshi Nihongo Gakkou, ANEEB et International Youth Fellowship.",
      },
      {
        date: "2025",
        text: "Produit fintech personnel livre — interface crypto trading avec dashboard analytics.",
      },
    ],
    degree: "Licence Professionnelle en Genie Logiciel",
    school: "IFRI · Universite d'Abomey-Calavi · Benin",
    courses: [
      "Flutter & Dart",
      "React / Next.js",
      "Django REST Framework",
      "PostgreSQL",
      "Tests logiciels & QA",
    ],
  },
};

export const EducationRecognition = () => {
  const { language } = useLanguage();
  const labels = content[language];

  return (
    <section
      id="education"
      className="credentials-section border-b border-border/40 py-24 md:py-32"
    >
      <div className="site-container">
        <div className="credentials-grid">
          <Reveal>
            <SectionLabel>{labels.recognitionLabel}</SectionLabel>
            <ul className="credentials-list">
              {labels.recognition.map((item) => (
                <li key={`${item.date}-${item.text.slice(0, 24)}`} className="credentials-item">
                  <span className="credentials-date">{item.date}</span>
                  <p className="credentials-text">{item.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={1}>
            <SectionLabel>{labels.educationLabel}</SectionLabel>
            <h3 className="credentials-degree">{labels.degree}</h3>
            <p className="credentials-school">{labels.school}</p>
            <p className="credentials-courses">{labels.courses.join(" · ")}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
