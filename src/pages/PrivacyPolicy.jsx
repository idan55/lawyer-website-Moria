import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <section className="section_contact">
      <div className="page-padding">
        <div className="container-large">
          <div className="padding-vertical-large space-y-5">
            <p className="eyebrow">{t("privacy.eyebrow")}</p>
            <h1 className="section-title">{t("privacy.title")}</h1>
            <p className="section-copy">{t("privacy.intro")}</p>

            <article className="content-card privacy-card">
              <h2 className="card-title">{t("privacy.sections.scope.title")}</h2>
              <p className="card-copy">{t("privacy.sections.scope.body")}</p>
            </article>

            <article className="content-card privacy-card">
              <h2 className="card-title">{t("privacy.sections.data.title")}</h2>
              <p className="card-copy">{t("privacy.sections.data.body")}</p>
              <ul className="privacy-list">
                <li>{t("privacy.sections.data.items.name")}</li>
                <li>{t("privacy.sections.data.items.email")}</li>
                <li>{t("privacy.sections.data.items.phone")}</li>
                <li>{t("privacy.sections.data.items.service")}</li>
                <li>{t("privacy.sections.data.items.language")}</li>
                <li>{t("privacy.sections.data.items.slot")}</li>
              </ul>
            </article>

            <article className="content-card privacy-card">
              <h2 className="card-title">{t("privacy.sections.purpose.title")}</h2>
              <ul className="privacy-list">
                <li>{t("privacy.sections.purpose.items.availability")}</li>
                <li>{t("privacy.sections.purpose.items.appointments")}</li>
                <li>{t("privacy.sections.purpose.items.communication")}</li>
                <li>{t("privacy.sections.purpose.items.records")}</li>
                <li>{t("privacy.sections.purpose.items.analytics")}</li>
              </ul>
            </article>

            <article className="content-card privacy-card">
              <h2 className="card-title">{t("privacy.sections.systems.title")}</h2>
              <ul className="privacy-list">
                <li>{t("privacy.sections.systems.items.calendar")}</li>
                <li>{t("privacy.sections.systems.items.database")}</li>
                <li>{t("privacy.sections.systems.items.clarity")}</li>
              </ul>
            </article>

            <article className="content-card privacy-card">
              <h2 className="card-title">{t("privacy.sections.cookies.title")}</h2>
              <p className="card-copy">{t("privacy.sections.cookies.body1")}</p>
              <p className="card-copy">{t("privacy.sections.cookies.body2")}</p>
            </article>

            <article className="content-card privacy-card">
              <h2 className="card-title">{t("privacy.sections.legalBasis.title")}</h2>
              <p className="card-copy">{t("privacy.sections.legalBasis.body")}</p>
            </article>

            <article className="content-card privacy-card">
              <h2 className="card-title">{t("privacy.sections.disclosure.title")}</h2>
              <p className="card-copy">{t("privacy.sections.disclosure.body")}</p>
            </article>

            <article className="content-card privacy-card">
              <h2 className="card-title">{t("privacy.sections.retention.title")}</h2>
              <p className="card-copy">{t("privacy.sections.retention.body")}</p>
            </article>

            <article className="content-card privacy-card">
              <h2 className="card-title">{t("privacy.sections.security.title")}</h2>
              <p className="card-copy">{t("privacy.sections.security.body")}</p>
            </article>

            <article className="content-card privacy-card">
              <h2 className="card-title">{t("privacy.sections.rights.title")}</h2>
              <p className="card-copy">{t("privacy.sections.rights.body")}</p>
            </article>

            <article className="content-card privacy-card">
              <h2 className="card-title">{t("privacy.sections.contact.title")}</h2>
              <p className="card-copy">
                {t("brand.name")}
                <br />
                {t("privacy.sections.contact.phoneLabel")}:{" "}
                <span className="phone-ltr">+972-54-622-5654</span>
                <br />
                {t("privacy.sections.contact.emailLabel")}: moria@rodriglaw.com
                <br />
                {t("privacy.sections.contact.addressLabel")}: הסיבים 49 פתח תקווה
              </p>
            </article>

            <article className="content-card privacy-card">
              <h2 className="card-title">{t("privacy.sections.revisions.title")}</h2>
              <p className="card-copy">{t("privacy.sections.revisions.body")}</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
