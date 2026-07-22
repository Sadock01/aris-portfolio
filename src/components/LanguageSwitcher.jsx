import { useLanguage } from "@/i18n/LanguageContext";

const labels = { en: "EN", fr: "FR" };

export const LanguageSwitcher = () => {
  const { language, setLanguage, supportedLanguages } = useLanguage();

  return (
    <div className="inline-flex items-center gap-0.5 w-fit shrink-0">
      {supportedLanguages.map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => setLanguage(lang)}
          className={`px-2.5 py-1 text-xs tracking-wide transition-colors duration-300 ${
            language === lang
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {labels[lang]}
        </button>
      ))}
    </div>
  );
};
