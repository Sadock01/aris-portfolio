import { SectionLabel } from "@/components/SectionLabel";
import { useLanguage } from "@/i18n/LanguageContext";
import erpImage from "@/assets/projects/localhost_5173_.png";

const projectsByLanguage = {
  en: [
    {
      number: "01",
      title: "ERP Nodus",
      client: "Private Client · Remote · 2025",
      metric: "Full-stack ERP",
      metricDetail: "Next.js + Django + PostgreSQL business platform",
      tags: ["Next.js", "Django", "PostgreSQL", "Backend"],
      image: erpImage,
      link: "#",
    },
    {
      number: "02",
      title: "Crypto Trading Platform",
      client: "Personal Project · 2025",
      metric: "Fintech UI",
      metricDetail: "Dashboard analytics and market-focused trading workflows",
      tags: ["React", "Fintech", "Dashboard", "UI/UX"],
      image: erpImage,
      link: "#",
    },
    {
      number: "03",
      title: "Portfolio Platform",
      client: "Personal Project · 2026",
      metric: "Live",
      metricDetail: "Multilingual portfolio with contact automation and NGO volunteering",
      tags: ["React", "Tailwind", "EmailJS", "i18n"],
      image: erpImage,
      link: "#",
    },
    {
      number: "04",
      title: "Enterprise Internship Projects",
      client: "Local Technology Company · Feb 2025 - Apr 2026",
      metric: "1 yr 3 mo",
      metricDetail: "Web/mobile maintenance, mail server setup, shop management platform",
      tags: ["Web", "Mobile", "Testing", "DevOps"],
      image: erpImage,
      link: "#",
    },
  ],
  fr: [
    {
      number: "01",
      title: "ERP Nodus",
      client: "Client prive · Remote · 2025",
      metric: "ERP full-stack",
      metricDetail: "Plateforme metier Next.js + Django + PostgreSQL",
      tags: ["Next.js", "Django", "PostgreSQL", "Backend"],
      image: erpImage,
      link: "#",
    },
    {
      number: "02",
      title: "Plateforme Crypto Trading",
      client: "Projet personnel · 2025",
      metric: "UI Fintech",
      metricDetail: "Dashboard analytics et workflows de trading orientes marche",
      tags: ["React", "Fintech", "Dashboard", "UI/UX"],
      image: erpImage,
      link: "#",
    },
    {
      number: "03",
      title: "Portfolio Platform",
      client: "Projet personnel · 2026",
      metric: "Live",
      metricDetail: "Portfolio multilingue avec contact automatise et volontariat ONG",
      tags: ["React", "Tailwind", "EmailJS", "i18n"],
      image: erpImage,
      link: "#",
    },
    {
      number: "04",
      title: "Projets de stage entreprise",
      client: "Entreprise locale · Fev 2025 - Avr 2026",
      metric: "1 an 3 mois",
      metricDetail: "Maintenance web/mobile, serveur mail, plateforme shop management",
      tags: ["Web", "Mobile", "Tests", "DevOps"],
      image: erpImage,
      link: "#",
    },
  ],
  ja: [
    {
      number: "01",
      title: "ERP Nodus",
      client: "個人クライアント · リモート · 2025",
      metric: "フルスタックERP",
      metricDetail: "Next.js + Django + PostgreSQL の業務プラットフォーム",
      tags: ["Next.js", "Django", "PostgreSQL", "Backend"],
      image: erpImage,
      link: "#",
    },
    {
      number: "02",
      title: "暗号資産トレーディング",
      client: "個人プロジェクト · 2025",
      metric: "Fintech UI",
      metricDetail: "ダッシュボード分析とマーケット志向の取引ワークフロー",
      tags: ["React", "Fintech", "Dashboard", "UI/UX"],
      image: erpImage,
      link: "#",
    },
    {
      number: "03",
      title: "Portfolio Platform",
      client: "個人プロジェクト · 2026",
      metric: "Live",
      metricDetail: "多言語対応ポートフォリオとNGOボランティア支援",
      tags: ["React", "Tailwind", "EmailJS", "i18n"],
      image: erpImage,
      link: "#",
    },
    {
      number: "04",
      title: "企業インターン案件",
      client: "ローカルIT企業 · 2025年2月 - 2026年4月",
      metric: "1年3か月",
      metricDetail: "Web/モバイル保守、メールサーバー、ショップ管理プラットフォーム",
      tags: ["Web", "Mobile", "Testing", "DevOps"],
      image: erpImage,
      link: "#",
    },
  ],
};

export const Projects = () => {
  const { language } = useLanguage();
  const projects = projectsByLanguage[language];
  const labels = {
    en: {
      label: "Selected projects",
      title: "Web, mobile, and fintech products — shipped with real impact.",
      all: "All projects",
    },
    fr: {
      label: "Projets selectionnes",
      title: "Produits web, mobile et fintech — livres avec un vrai impact.",
      all: "Tous les projets",
    },
    ja: {
      label: "厳選プロジェクト",
      title: "Web、モバイル、Fintech — 実インパクトのあるプロダクト。",
      all: "すべてのプロジェクト",
    },
  }[language];

  return (
    <section id="work" className="border-b border-border">
      <div className="site-container py-16 md:py-24">
        <SectionLabel>{labels.label}</SectionLabel>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <h2 className="section-title max-w-3xl">{labels.title}</h2>
          <a href="https://github.com/Sadock01/" className="editorial-link shrink-0">
            {labels.all} →
          </a>
        </div>

        <div>
          {projects.map((project) => (
            <a
              key={project.number}
              href={project.link}
              className="project-card group grid md:grid-cols-[80px_1fr_200px] gap-6 md:gap-10 items-start"
            >
              <span className="font-serif text-2xl text-muted-foreground">
                {project.number}
              </span>

              <div>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="text-xl md:text-2xl font-medium group-hover:underline underline-offset-4">
                    {project.title}
                  </h3>
                  <span className="text-muted-foreground text-sm">↗</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{project.client}</p>
                <div className="overflow-hidden border border-border mb-4 max-w-xl">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full aspect-video object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="md:text-right">
                <p className="font-serif text-2xl md:text-3xl">{project.metric}</p>
                <p className="text-sm text-muted-foreground mt-2 max-w-[200px] md:ml-auto">
                  {project.metricDetail}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
