import { ContactCard } from "@/components/ContactCard";
import { Reveal } from "@/components/Reveal";
import { ResumeLink } from "@/components/ResumeLink";
import { SectionLabel } from "@/components/SectionLabel";
import {
  PROFILE_EMAIL,
  PROFILE_LINKS,
  PROFILE_PHONE,
} from "@/constants/profile";
import { useLanguage } from "@/i18n/LanguageContext";

const channels = {
  en: [
    {
      label: "Email",
      value: PROFILE_EMAIL,
      href: PROFILE_LINKS.email,
      action: "Write to me",
    },
    {
      label: "LinkedIn",
      value: "/in/sadock-tohon-0b265b271",
      href: PROFILE_LINKS.linkedin,
      action: "Connect",
    },
    {
      label: "GitHub",
      value: "Sadock01",
      href: PROFILE_LINKS.github,
      action: "View profile",
    },
    {
      label: "Phone",
      value: PROFILE_PHONE,
      href: PROFILE_LINKS.phone,
      action: "Call me",
    },
  ],
  fr: [
    {
      label: "Email",
      value: PROFILE_EMAIL,
      href: PROFILE_LINKS.email,
      action: "M'ecrire",
    },
    {
      label: "LinkedIn",
      value: "/in/sadock-tohon-0b265b271",
      href: PROFILE_LINKS.linkedin,
      action: "Se connecter",
    },
    {
      label: "GitHub",
      value: "Sadock01",
      href: PROFILE_LINKS.github,
      action: "Voir le profil",
    },
    {
      label: "Telephone",
      value: PROFILE_PHONE,
      href: PROFILE_LINKS.phone,
      action: "Appeler",
    },
  ],
};

export const Contact = () => {
  const { language } = useLanguage();
  const year = new Date().getFullYear();

  const content = {
    en: {
      label: "Contact",
      title: "Let's build something that lasts.",
      availability:
        "Available for freelance, collaborations & NGO tech volunteering",
      start: "Start a conversation",
      resume: "Download resume",
      work: "Work",
      location: "Abomey-Calavi, Benin",
    },
    fr: {
      label: "Contact",
      title: "Construisons quelque chose de durable.",
      availability:
        "Disponible pour freelance, collaborations & tech volunteering ONG",
      start: "Demarrer une conversation",
      resume: "Telecharger le CV",
      work: "Parcours",
      location: "Abomey-Calavi, Benin",
    },
  }[language];

  const links = channels[language];

  return (
    <section id="contact" className="contact-section border-b border-border/40">
      <div className="site-container contact-shell">
        <Reveal className="contact-header">
          <SectionLabel>{content.label}</SectionLabel>
          <h2 className="contact-title">{content.title}</h2>

          <div className="contact-badge">
            <span className="contact-badge__dot" aria-hidden="true" />
            <span className="contact-badge__text">{content.availability}</span>
            <span className="contact-badge__ring" aria-hidden="true" />
          </div>
        </Reveal>

        <div className="contact-cards stagger-children-mobile">
          {links.map((channel, index) => (
            <Reveal key={channel.label} delay={(index % 4) + 1}>
              <ContactCard
                label={channel.label}
                value={channel.value}
                href={channel.href}
                action={channel.action}
              />
            </Reveal>
          ))}
        </div>

        <Reveal delay={2} className="contact-actions">
          <a href={PROFILE_LINKS.email} className="contact-btn contact-btn--primary">
            {content.start}
          </a>
          <ResumeLink className="contact-btn contact-btn--secondary">
            {content.resume}
          </ResumeLink>
        </Reveal>

        <div className="contact-footer">
          <p className="contact-footer__copy">© {year} Sadock Tohon</p>
          <div className="contact-footer__meta">
            <a href="#journey" className="contact-footer__link">
              {content.work}
            </a>
            <span className="contact-footer__location">{content.location}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
