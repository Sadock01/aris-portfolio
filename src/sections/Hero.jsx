import { HeroFlakes } from "@/components/HeroFlakes";
import { ParticlePortrait } from "@/components/ParticlePortrait";
import { Reveal } from "@/components/Reveal";
import { ResumeLink } from "@/components/ResumeLink";
import { useLanguage } from "@/i18n/LanguageContext";

export const Hero = () => {
  const { language } = useLanguage();

  const t = {
    en: {
      location: "Abomey-Calavi, Benin",
      tags: "Software Engineering / Flutter / React / Next.js / Django",
      headline:
        "Building scalable web and mobile products — and free digital solutions for NGOs.",
      ctaWork: "View work",
      ctaContact: "Get in touch",
      ctaResume: "Resume",
    },
    fr: {
      location: "Abomey-Calavi, Benin",
      tags: "Ingenierie logicielle / Flutter / React / Next.js / Django",
      headline:
        "Je construis des produits web et mobile evolutifs — et des solutions gratuites pour les ONG.",
      ctaWork: "Voir le parcours",
      ctaContact: "Me contacter",
      ctaResume: "CV",
    },
  }[language];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden border-b border-border pt-[4.5rem]"
    >
      <HeroFlakes />

      <div className="hero-container relative z-10 w-full py-16 md:py-24 lg:py-28">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_auto] gap-10 lg:gap-14 xl:gap-16 items-center">
          <div className="max-w-2xl">
            <Reveal>
              <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground leading-relaxed mb-8 md:mb-10">
                {t.location}
                <br />
                {t.tags}
              </p>
            </Reveal>

            <Reveal delay={1}>
              <div className="hero-title-wrap group mb-8 md:mb-10">
                <h1 className="hero-title" aria-label="Sadock Tohon">
                  <span className="hero-title-base">
                    <span className="block text-foreground">Sadock</span>
                    <span className="block text-[#8a8278]">Tohon</span>
                  </span>
                  <span className="hero-title-fx" aria-hidden="true">
                    <span className="hero-title-fx-layer hero-title-fx-layer--a">
                      Sadock
                      <br />
                      Tohon
                    </span>
                    <span className="hero-title-fx-layer hero-title-fx-layer--b">
                      Sadock
                      <br />
                      Tohon
                    </span>
                    <span className="hero-title-fx-layer hero-title-fx-layer--c">
                      Sadock
                      <br />
                      Tohon
                    </span>
                  </span>
                </h1>
              </div>
            </Reveal>

            <Reveal delay={2}>
              <div className="flex items-start gap-6 mb-10 md:mb-12 max-w-lg">
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed flex-1">
                  {t.headline}
                </p>
                <span className="hero-orbit hidden sm:block shrink-0" aria-hidden="true" />
              </div>
            </Reveal>

            <Reveal delay={3}>
              <div className="flex flex-wrap items-center gap-3 md:gap-4">
                <a href="#journey" className="btn-primary">
                  {t.ctaWork}
                </a>
                <a href="#contact" className="btn-outline-gold">
                  {t.ctaContact}
                </a>
                <ResumeLink className="btn-resume">
                  {t.ctaResume} ↗
                </ResumeLink>
              </div>
            </Reveal>
          </div>

          <div className="hidden lg:flex justify-center pr-8 xl:pr-14 shrink-0">
            <ParticlePortrait className="h-[min(42vw,380px)] w-[min(42vw,380px)]" />
          </div>
        </div>
      </div>

      <div className="lg:hidden hero-container relative z-10 pb-16">
        <Reveal delay={1} variant="soft">
          <div className="mx-auto h-[260px] w-[260px]">
            <ParticlePortrait className="h-full w-full" />
          </div>
        </Reveal>
      </div>
    </section>
  );
};
