export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-background">
      <div className="site-container py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {year} Sadock Tohon
        </p>
        <p className="text-sm text-muted-foreground">
          Abomey-Calavi, Benin · Software Engineer
        </p>
      </div>
    </footer>
  );
};
