import { useTranslation } from "react-i18next";

const Connected = () => {
  const { t } = useTranslation();

  return (
    <section className="success-panel">
      <h1>{t("connected.title")}</h1>
      <p>{t("connected.body")}</p>
      <a className="cta-button mt-4 inline-flex" href="/book">
        {t("connected.cta")}
      </a>
    </section>
  );
};

export default Connected;
