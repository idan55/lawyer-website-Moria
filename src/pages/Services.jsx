import { useTranslation } from "react-i18next";

const Services = () => {
  const { t } = useTranslation();
  const legalItems = [
    t("services.legalItems.consulting"),
    t("services.legalItems.contracts"),
    t("services.legalItems.property"),
    t("services.legalItems.inheritance"),
  ];

  const notaryItems = [
    t("services.notaryItems.signatures"),
    t("services.notaryItems.affidavits"),
    t("services.notaryItems.copies"),
    t("services.notaryItems.confirmations"),
  ];

  return (
    <section className="section_services">
      <div className="page-padding">
        <div className="container-large">
          <div className="padding-vertical-large space-y-6">
            <p className="eyebrow">{t("services.eyebrow")}</p>
            <h1 className="section-title">{t("services.title")}</h1>
            <div className="grid gap-4 md:grid-cols-2">
              <article className="content-card">
                <h2 className="card-title">{t("services.legalTitle")}</h2>
                <div className="space-y-2">
                  {legalItems.map((item) => (
                    <p key={item} className="card-copy benefit-row">
                      <span className="benefit-dot" />
                      <span>{item}</span>
                    </p>
                  ))}
                </div>
              </article>
              <article className="content-card">
                <h2 className="card-title">{t("services.notaryTitle")}</h2>
                <div className="space-y-2">
                  {notaryItems.map((item) => (
                    <p key={item} className="card-copy benefit-row">
                      <span className="benefit-dot" />
                      <span>{item}</span>
                    </p>
                  ))}
                </div>
              </article>
            </div>
            <p className="section-copy">{t("services.note")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
