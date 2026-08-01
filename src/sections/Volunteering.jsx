import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { useLanguage } from "@/i18n/LanguageContext";

const Highlight = ({ children }) => (
  <span className="systems-highlight">{children}</span>
);

const VolunteerCard = ({ label, items }) => (
  <div className="volunteer-card">
    <p className="section-label mb-6">[ {label} ]</p>
    <ul className="mission-list">
      {items.map((item) => (
        <li key={item}>
          <span className="mission-bullet" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const volunteeringData = {
  en: {
    label: "Tech volunteering",
    title: "Free digital solutions for nonprofits — you only cover hosting.",
    intro: (
      <>
        Supporting mission-driven organizations is a core part of my work. I
        volunteer my <Highlight>engineering time</Highlight> so your team can
        focus on <Highlight>impact</Highlight> — your organization only covers{" "}
        <Highlight>hosting</Highlight> and domain costs.
      </>
    ),
    freeTitle: "What I build for free",
    coversTitle: "What your organization covers",
    offers: [
      "Website design and development tailored to your mission",
      "Landing pages for campaigns, events, and fundraising",
      "Donation, registration, and contact workflows",
      "Simple admin dashboards for day-to-day operations",
      "Technical guidance and long-term maintenance support",
    ],
    requirements: [
      "A valid nonprofit or NGO mission",
      "A clear project scope and realistic timeline",
      "Hosting and domain covered by your organization",
      "One responsive point of contact for collaboration",
    ],
    cta: "Request a free build",
    ctaSecondary: "Start a conversation",
  },
  fr: {
    label: "Volontariat tech",
    title: "Solutions numériques gratuites pour les ONG — vous ne payez que l'hébergement.",
    intro: (
      <>
        Accompagner les organisations à mission est au cœur de mon engagement.
        J&apos;offre mon <Highlight>temps d&apos;ingénierie</Highlight> pour que
        votre équipe se concentre sur l&apos;<Highlight>impact</Highlight> — vous
        ne prenez en charge que l&apos;<Highlight>hébergement</Highlight> et le
        domaine.
      </>
    ),
    freeTitle: "Ce que je construis gratuitement",
    coversTitle: "Ce que votre organisation prend en charge",
    offers: [
      "Conception et développement web adaptés à votre mission",
      "Landing pages pour campagnes, événements et collecte de fonds",
      "Workflows de dons, inscription et contact",
      "Dashboards d'administration simples pour vos opérations",
      "Accompagnement technique et maintenance long terme",
    ],
    requirements: [
      "Une mission ONG ou organisation à but non lucratif valide",
      "Un périmètre de projet et un calendrier réalistes",
      "Hébergement et domaine pris en charge par l'organisation",
      "Un interlocuteur disponible pour la collaboration",
    ],
    cta: "Demander une solution gratuite",
    ctaSecondary: "Démarrer une conversation",
  },
};

export const Volunteering = () => {
  const { language } = useLanguage();
  const content = volunteeringData[language];

  return (
    <section id="volunteering" className="border-b border-border py-20 md:py-32">
      <div className="site-container">
        <Reveal>
          <SectionLabel>{content.label}</SectionLabel>
          <h2 className="section-title mb-8 max-w-3xl">{content.title}</h2>
          <p className="volunteering-intro">{content.intro}</p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-5 lg:gap-6 mb-12">
          <Reveal delay={1}>
            <VolunteerCard label={content.freeTitle} items={content.offers} />
          </Reveal>

          <Reveal delay={2}>
            <VolunteerCard label={content.coversTitle} items={content.requirements} />
          </Reveal>
        </div>

        <Reveal delay={2}>
          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <a href="#contact" className="btn-primary">
              {content.cta}
            </a>
            <a href="#contact" className="btn-outline-gold">
              {content.ctaSecondary}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
