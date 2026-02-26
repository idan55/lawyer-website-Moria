import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();
  return (
    <section className="space-y-5">
      <p className="eyebrow">{t("about.eyebrow")}</p>
      <h1 className="section-title">{t("about.title")}</h1>
      <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] items-start">
        <div className="space-y-3">
          <p className="section-copy">{t("about.p1")}</p>
          <p className="section-copy">{t("about.p2")}</p>
          <p className="section-copy">{t("about.p3")}</p>
        </div>
        <aside className="about-portrait-card">
          <div className="about-portrait-frame">
            <img
              src="/moria-portrait.jpeg"
              alt="Portrait of Adv. Moria Rodrig"
              className="about-portrait-image"
            />
          </div>
          <div className="about-portrait-meta">
            <p className="about-portrait-name">{t("about.name")}</p>
            <p className="about-portrait-role">{t("about.role")}</p>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default About;
