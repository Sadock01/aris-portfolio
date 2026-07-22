import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { PROFILE_LINKS } from "@/constants/profile";
import { useLanguage } from "@/i18n/LanguageContext";

const testimonials = {
  en: [
    {
      quote:
        "Sadock delivers clean, reliable code and communicates clearly across technical and non-technical stakeholders.",
      author: "Team Lead",
      role: "Technology Company · Benin",
      initials: "TL",
    },
    {
      quote:
        "Strong ownership on the ERP project — from backend architecture to frontend delivery, always focused on results.",
      author: "Private Client",
      role: "ERP Nodus · Remote",
      initials: "PC",
    },
    {
      quote:
        "Dedicated volunteer with genuine commitment to community impact and cross-cultural collaboration.",
      author: "Program Coordinator",
      role: "Takeshi Nihongo Gakkou · Cotonou",
      initials: "TC",
    },
  ],
  fr: [
    {
      quote:
        "Sadock livre un code propre et fiable, avec une communication claire entre parties techniques et non techniques.",
      author: "Team Lead",
      role: "Entreprise technologique · Benin",
      initials: "TL",
    },
    {
      quote:
        "Forte ownership sur le projet ERP — de l'architecture backend a la livraison frontend.",
      author: "Client prive",
      role: "ERP Nodus · Remote",
      initials: "CP",
    },
    {
      quote:
        "Volontaire dedie avec un vrai engagement communautaire et interculturel.",
      author: "Coordinateur",
      role: "Takeshi Nihongo Gakkou · Cotonou",
      initials: "TC",
    },
  ],
};

export const Testimonials = () => {
  const { language } = useLanguage();
  const items = testimonials[language];
  const labels = {
    en: {
      label: "What people say",
      title: "Endorsed by colleagues and collaborators.",
      more: "More on LinkedIn",
    },
    fr: {
      label: "Ils en parlent",
      title: "Recommande par des collegues et collaborateurs.",
      more: "Plus sur LinkedIn",
    },
  }[language];

  return (
    <section id="testimonials" className="border-b border-border py-20 md:py-32">
      <div className="site-container">
        <Reveal>
          <SectionLabel>{labels.label}</SectionLabel>
          <h2 className="section-title mb-16 max-w-2xl">{labels.title}</h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <Reveal key={item.author} delay={i + 1}>
              <blockquote className="quote-card h-full flex flex-col">
                <p className="font-serif text-lg leading-relaxed text-foreground/90 mb-8 flex-1">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <footer className="flex items-center gap-3 pt-6 border-t border-border">
                  <div className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-[10px] text-muted-foreground">
                    {item.initials}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{item.author}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.role}
                    </p>
                  </div>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>

        <Reveal delay={2}>
          <a
            href={PROFILE_LINKS.linkedin}
            className="editorial-link mt-12 inline-block"
          >
            {labels.more} →
          </a>
        </Reveal>
      </div>
    </section>
  );
};
