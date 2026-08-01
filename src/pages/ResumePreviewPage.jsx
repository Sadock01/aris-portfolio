import { Download, X } from "lucide-react";
import resumePdf from "@/assets/sadock-resume.pdf";
import { RESUME_FILENAME } from "@/constants/profile";
import { useLanguage } from "@/i18n/LanguageContext";

const copy = {
  en: {
    title: "Resume preview",
    subtitle: "Review the CV below, then download if you'd like a copy.",
    download: "Download PDF",
    close: "Close preview",
  },
  fr: {
    title: "Aperçu du CV",
    subtitle: "Consultez le CV ci-dessous, puis téléchargez-le si vous le souhaitez.",
    download: "Télécharger le PDF",
    close: "Fermer l'aperçu",
  },
};

export const ResumePreviewPage = () => {
  const { language } = useLanguage();
  const labels = copy[language] ?? copy.en;

  const handleClose = () => {
    window.close();
    window.location.href = "/";
  };

  return (
    <div className="resume-page">
      <header className="resume-page__header">
        <div>
          <p className="resume-page__title">{labels.title}</p>
          <p className="resume-page__subtitle">{labels.subtitle}</p>
        </div>
        <button
          type="button"
          className="resume-page__icon-btn"
          onClick={handleClose}
          aria-label={labels.close}
        >
          <X size={18} strokeWidth={1.5} />
        </button>
      </header>

      <main className="resume-page__viewer">
        <iframe
          src={`${resumePdf}#toolbar=0&navpanes=0&scrollbar=1`}
          title={labels.title}
          className="resume-page__iframe"
        />
      </main>

      <footer className="resume-page__footer">
        <button type="button" className="contact-btn contact-btn--secondary" onClick={handleClose}>
          {labels.close}
        </button>
        <a
          href={resumePdf}
          download={RESUME_FILENAME}
          className="contact-btn contact-btn--primary resume-page__download"
        >
          <Download size={16} strokeWidth={1.75} />
          {labels.download}
        </a>
      </footer>
    </div>
  );
};
