import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";
import { StackDiagram } from "@/components/StackDiagram";
import { useLanguage } from "@/i18n/LanguageContext";

const Highlight = ({ children }) => (
  <span className="systems-highlight">{children}</span>
);

export const DevStack = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      label: "Engineering intelligence",
      title: "Tools that make systems ship.",
      intro: (
        <>
          Beyond shipping products, I build the stack that supports them.{" "}
          <Highlight>Full-stack engineering</Highlight> brings mobile, web, and
          backend into one flow — with <Highlight>Flutter</Highlight>,{" "}
          <Highlight>Next.js</Highlight>, and <Highlight>Django</Highlight> keeping
          design and code aligned from prototype to production.
        </>
      ),
      items: [
        {
          dot: "gold",
          name: "Flutter",
          description:
            "Cross-platform mobile apps with native performance and polished UX.",
        },
        {
          dot: "teal",
          name: "Next.js",
          description:
            "Scalable web interfaces, SSR-ready surfaces, and product dashboards.",
        },
        {
          dot: "violet",
          name: "REST API",
          description:
            "Django endpoints, authentication, and business logic behind the product.",
        },
        {
          dot: "blue",
          name: "PostgreSQL",
          description:
            "Structured data, reliable queries, and long-term persistence.",
        },
      ],
    },
    fr: {
      label: "Intelligence ingénierie",
      title: "Des outils qui font livrer les systèmes.",
      intro: (
        <>
          Au-delà des livraisons, je construis le stack qui les porte.{" "}
          <Highlight>L&apos;ingénierie full-stack</Highlight> relie mobile, web et
          backend — avec <Highlight>Flutter</Highlight>,{" "}
          <Highlight>Next.js</Highlight> et <Highlight>Django</Highlight> pour
          garder produit et code alignés du prototype à la production.
        </>
      ),
      items: [
        {
          dot: "gold",
          name: "Flutter",
          description:
            "Apps mobile cross-platform, performantes et soignées.",
        },
        {
          dot: "teal",
          name: "Next.js",
          description:
            "Interfaces web évolutives, SSR et tableaux de bord produit.",
        },
        {
          dot: "violet",
          name: "REST API",
          description:
            "Endpoints Django, authentification et logique métier.",
        },
        {
          dot: "blue",
          name: "PostgreSQL",
          description:
            "Données structurées, requêtes fiables et persistance durable.",
        },
      ],
    },
  }[language];

  return (
    <section
      id="systems"
      className="systems-section border-b border-border py-20 md:py-32 overflow-hidden"
    >
      <div className="site-container">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(300px,440px)] gap-14 lg:gap-16 xl:gap-20 items-center">
          <div>
            <Reveal>
              <SectionLabel>{content.label}</SectionLabel>
              <h2 className="systems-title mb-8 max-w-xl">{content.title}</h2>
            </Reveal>

            <Reveal delay={1}>
              <p className="systems-intro">{content.intro}</p>
            </Reveal>

            <Reveal delay={2}>
              <ul className="stack-list">
                {content.items.map((item) => (
                  <li key={item.name} className="stack-list__item group">
                    <div className="stack-list__row">
                      <span
                        className={`stack-dot stack-dot--${item.dot}`}
                        aria-hidden="true"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="stack-list__name">{item.name}</p>
                        <p className="stack-list__desc">{item.description}</p>
                      </div>
                      <span className="stack-list__chevron" aria-hidden="true">
                        ↗
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={2} className="hidden md:block">
            <StackDiagram />
          </Reveal>
        </div>
      </div>
    </section>
  );
};
