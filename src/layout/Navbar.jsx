import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { PROFILE_LINKS } from "@/constants/profile";
import { useLanguage } from "@/i18n/LanguageContext";
import siteLogo from "@/assets/miniature_portefolio.png";
import { Github, Linkedin, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = {
  en: [
    { href: "#hero", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#volunteering", label: "Volunteering" },
    { href: "#journey", label: "Journey" },
    { href: "#contact", label: "Contact" },
  ],
  fr: [
    { href: "#hero", label: "Accueil" },
    { href: "#about", label: "A propos" },
    { href: "#volunteering", label: "Volontariat" },
    { href: "#journey", label: "Parcours" },
    { href: "#contact", label: "Contact" },
  ],
};

export const Navbar = () => {
  const { language } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const links = navLinks[language];

  useEffect(() => {
    const sectionIds = links.map((l) => l.href.replace("#", ""));

    const sync = () => {
      const offset = window.innerHeight * 0.35;
      let candidate = "hero";
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= window.scrollY + offset) candidate = id;
      });
      setActiveSection(candidate);
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [links]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-md">
      <nav className="hero-container flex h-[4.5rem] items-center justify-between">
        <a
          href="#hero"
          className="site-brand hover:opacity-80 transition-opacity duration-300 shrink-0"
          aria-label="Sadock Tohon"
        >
          <img
            src={siteLogo}
            alt=""
            className="site-brand__logo"
            width={36}
            height={36}
          />
          <span className="font-serif text-base tracking-tight">
            ST<span className="text-muted-foreground">.</span>
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-8 ml-auto mr-8">
          {links.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={`nav-link ${isActive ? "is-active text-foreground" : "text-muted-foreground"}`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-5 shrink-0">
          <LanguageSwitcher />
          <div className="flex items-center gap-4 text-muted-foreground">
            <a
              href={PROFILE_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors duration-300"
              aria-label="GitHub"
            >
              <Github size={17} strokeWidth={1.5} />
            </a>
            <a
              href={PROFILE_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={17} strokeWidth={1.5} />
            </a>
          </div>
        </div>

        <button
          className="lg:hidden p-2 text-foreground ml-auto"
          onClick={() => setIsMobileMenuOpen((p) => !p)}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <div className="hero-container py-8 flex flex-col gap-5">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={`text-base transition-colors ${
                  activeSection === link.href.replace("#", "")
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
              </a>
            ))}
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </header>
  );
};
