const RESUME_PREVIEW_URL = `${import.meta.env.BASE_URL}?resume=1`;

export const ResumeLink = ({ className, children }) => (
  <a
    href={RESUME_PREVIEW_URL}
    target="_blank"
    rel="noopener noreferrer"
    className={className}
  >
    {children}
  </a>
);
