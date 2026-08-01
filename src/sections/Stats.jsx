import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/i18n/LanguageContext";

export const Stats = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      stats: [
        {
          value: "2+",
          label: "Years of experience",
          detail: "Internships, freelance, and personal projects.",
        },
        {
          value: "6+",
          label: "Projects delivered",
          detail: "Web, mobile, ERP, and fintech platforms.",
        },
        {
          value: "3",
          label: "NGO partnerships",
          detail: "Tech volunteering for mission-driven organizations.",
        },
      ],
    },
    fr: {
      stats: [
        {
          value: "2+",
          label: "Années d'expérience",
          detail: "Stages, freelance et projets personnels.",
        },
        {
          value: "6+",
          label: "Projets livrés",
          detail: "Web, mobile, ERP et fintech.",
        },
        {
          value: "3",
          label: "Partenariats ONG",
          detail: "Volontariat tech pour organisations à mission.",
        },
      ],
    },
  }[language];

  return (
    <section id="stats" className="border-b border-border py-16 md:py-24">
      <div className="site-container">
        <div className="grid md:grid-cols-3 gap-px bg-border">
          {content.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i + 1}>
              <div className="bg-background p-8 md:p-10">
                <div className="flex items-start gap-4 mb-4">
                  <p className="stat-value text-5xl md:text-6xl">{stat.value}</p>
                  <span className="mt-3 h-10 w-px shrink-0 bg-[var(--color-gold-muted)]/50" />
                </div>
                <p className="text-sm font-medium mb-2">{stat.label}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {stat.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
