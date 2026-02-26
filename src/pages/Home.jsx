import { useState } from "react";
import { useTranslation } from "react-i18next";
import OfficeMap from "../components/OfficeMap";

const Home = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("lawyer");
  const lat = 32.0831515;
  const lng = 34.8567889;
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  const wazeUrl = `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`;

  const lawyerServices = [
    {
      title: t("home.lawyerServices.prenup.title"),
      text: t("home.lawyerServices.prenup.text"),
    },
    {
      title: t("home.lawyerServices.divorce.title"),
      text: t("home.lawyerServices.divorce.text"),
    },
    {
      title: t("home.lawyerServices.property.title"),
      text: t("home.lawyerServices.property.text"),
    },
    {
      title: t("home.lawyerServices.inheritance.title"),
      text: t("home.lawyerServices.inheritance.text"),
    },
    {
      title: t("home.lawyerServices.paternity.title"),
      text: t("home.lawyerServices.paternity.text"),
    },
    {
      title: t("home.lawyerServices.epo.title"),
      text: t("home.lawyerServices.epo.text"),
    },
    {
      title: t("home.lawyerServices.immigration.title"),
      text: t("home.lawyerServices.immigration.text"),
    },
    {
      title: t("home.lawyerServices.realEstate.title"),
      text: t("home.lawyerServices.realEstate.text"),
    },
    {
      title: t("home.lawyerServices.business.title"),
      text: t("home.lawyerServices.business.text"),
    },
  ];

  const notaryServices = [
    {
      title: t("home.notaryServices.wills.title"),
      text: t("home.notaryServices.wills.text"),
    },
    {
      title: t("home.notaryServices.poa.title"),
      text: t("home.notaryServices.poa.text"),
    },
    {
      title: t("home.notaryServices.translations.title"),
      text: t("home.notaryServices.translations.text"),
    },
    {
      title: t("home.notaryServices.childrenTravel.title"),
      text: t("home.notaryServices.childrenTravel.text"),
    },
    {
      title: t("home.notaryServices.alive.title"),
      text: t("home.notaryServices.alive.text"),
    },
    {
      title: t("home.notaryServices.invitations.title"),
      text: t("home.notaryServices.invitations.text"),
    },
    {
      title: t("home.notaryServices.copies.title"),
      text: t("home.notaryServices.copies.text"),
    },
  ];

  const advantages = [
    t("home.advantages.reputation"),
    t("home.advantages.approach"),
    t("home.advantages.confidentiality"),
    t("home.advantages.languages"),
    t("home.advantages.partners"),
    t("home.advantages.location"),
    t("home.advantages.visits"),
    t("home.advantages.payments"),
    t("home.advantages.hours"),
  ];

  return (
    <>
      <section className="section_hero">
        <div className="page-padding">
          <div className="container-large">
            <div className="padding-vertical-large">
              <div className="hero-grid">
                <div className="uui-heroheader01_image-wrapper">
                  <img
                    src="/moria-portrait.jpeg"
                    alt="Portrait"
                    className="image-hero"
                  />
                </div>
                <div className="uui-heroheader01_content">
                  <h1 className="heading-large">{t("home.heroTitle")}</h1>
                  <div className="space-small" />
                  <div className="uui-max-width-medium">
                    <p className="uui-text-size-xlarge">
                      {t("home.heroIntro")}
                      <br />
                      <br />
                      {t("home.heroBody")}
                    </p>
                  </div>
                  <div className="space-large" />
                  <a href="/book" className="button-main">
                    <span>{t("home.heroCta")}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section_about">
        <div className="page-padding">
          <div className="container-large">
            <div className="padding-vertical-large">
              <div className="about-grid">
                <h2 className="header-medium">About</h2>
                <div className="about-wrapper-flex">
                  <div className="about-richtext">
                    <p>
                      Adv. Moria Rodrig provides thorough, precise and
                      accessible legal and notarial services, placing clear
                      communication and personal attention at the center of each
                      case.
                    </p>
                    <p>
                      Clients include residents of Israel as well as people
                      abroad who require fast and accurate handling of
                      documentation and representation.
                    </p>
                    <p>
                      The office works in several languages, allowing each
                      client to receive explanations and documents in the
                      language they are most comfortable with.
                    </p>
                  </div>
                  <div className="about-image-wrapper">
                    <img
                      src="/WhatsApp Image 2026-02-26 at 11.13.24.jpeg"
                      alt="Law office team"
                      className="image-large"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section_services">
        <div className="page-padding">
          <div className="container-large">
            <div className="padding-vertical-large">
              <h2 className="header-medium text-align-center max-width-medium margin-horizontal-auto">
                {t("home.servicesTitle")}
              </h2>
              <div className="space-large" />
              <div className="tabs">
                <div className="tabs-menu">
                  <button
                    type="button"
                    className={`tab-button ${
                      activeTab === "lawyer" ? "tab-button-active" : ""
                    }`}
                    onClick={() => setActiveTab("lawyer")}
                  >
                    {t("home.lawyerTab")}
                  </button>
                  <button
                    type="button"
                    className={`tab-button ${
                      activeTab === "notary" ? "tab-button-active" : ""
                    }`}
                    onClick={() => setActiveTab("notary")}
                  >
                    {t("home.notaryTab")}
                  </button>
                </div>
                <div className="tabs-content">
                  {activeTab === "lawyer" ? (
                    <div className="services-grid">
                      {lawyerServices.map((item) => (
                        <article key={item.title} className="service-cell">
                          <h3 className="header-xsmall">{item.title}</h3>
                          <div className="space-xsmall" />
                          <p className="text-block">{item.text}</p>
                        </article>
                      ))}
                    </div>
                  ) : (
                    <div className="services-grid">
                      {notaryServices.map((item) => (
                        <article key={item.title} className="service-cell">
                          <h3 className="header-xsmall">{item.title}</h3>
                          <div className="space-xsmall" />
                          <p className="text-block">{item.text}</p>
                        </article>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section_features">
        <div className="page-padding">
          <div className="container-large">
            <div className="padding-vertical-large">
              <h2 className="header-medium text-align-center max-width-medium margin-horizontal-auto">
                {t("home.advantagesTitle")}
              </h2>
              <div className="space-large" />
              <div className="features-grid">
                {advantages.map((advantage) => (
                  <div key={advantage} className="feature-cell">
                    <div className="feature-icon" />
                    <div>{advantage}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section_contact">
        <div className="page-padding">
          <div className="container-large">
            <div className="padding-vertical-large">
              <div className="contact-grid">
                <div className="contact-form-wrapper">
                  <h2 id="contacts" className="header-medium">
                    {t("home.contactSectionTitle")}
                  </h2>
                  <div className="space-large" />
                  <form className="contact-form-grid">
                    <div className="uui-form-field-wrapper">
                      <input
                        className="contact-form_input"
                        name="name"
                        placeholder="Your name"
                        type="text"
                      />
                    </div>
                    <div className="uui-form-field-wrapper">
                      <input
                        className="contact-form_input"
                        name="phone"
                        placeholder="Phone number"
                        type="tel"
                      />
                    </div>
                    <div className="uui-form-field-wrapper">
                      <input
                        className="contact-form_input"
                        name="email"
                        placeholder="E-mail"
                        type="email"
                      />
                    </div>
                    <div className="uui-form-field-wrapper">
                      <textarea
                        name="message"
                        maxLength={5000}
                        placeholder="Your question or the issue you want to resolve..."
                        className="contact-form_input text-area"
                      />
                    </div>
                    <div className="contact-button-wrapper">
                      <button type="submit" className="button-main">
                        Submit
                      </button>
                      <label className="uui-form-checkbox">
                        <input type="checkbox" required />
                        <span className="uui-form-checkbox-label">
                          {t("home.contactFormConsent")}
                        </span>
                      </label>
                    </div>
                  </form>
                </div>

                <div className="contact-list">
                  <h2 className="header-small">Contact</h2>
                  <div className="space-small" />
                  <div>
                    <a
                      href="tel:+972546225654"
                      className="icon-link-block-large"
                    >
                      <span className="icon-phone" />
                      <span className="font-size-large phone-ltr">+972-54-622-5654</span>
                    </a>
                    <div className="space-xsmall" />
                    <a
                      href="mailto:moria@rodriglaw.com"
                      className="icon-link-block-large"
                    >
                      <span className="icon-mail" />
                      <span>moria@rodriglaw.com</span>
                    </a>
                    <div className="space-xsmall" />
                    <a
                      href="https://wa.me/972546225654"
                      target="_blank"
                      rel="noreferrer"
                      className="icon-link-block-large"
                    >
                      <span className="icon-whatsapp" />
                      <span>WhatsApp</span>
                    </a>
                    <div className="space-xsmall" />
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="icon-link-block-large"
                    >
                      <span className="icon-pin" />
                      <span>{t("home.contactAddress")}</span>
                    </a>
                  </div>
                  <div className="space-small" />
                  <div className="icon-link-block-large">
                    <span className="icon-clock" />
                    <span>{t("home.contactOfficeHours")}</span>
                  </div>
                  <p className="font-footnote">
                    {t("home.contactOfficeHoursNote")}
                  </p>
                </div>
              </div>
              <div className="space-large" />
              <div className="contact-map-wrapper">
                <div className="mapbox-card mapbox-zoom-in">
                  <OfficeMap
                    lat={lat}
                    lng={lng}
                    label="Moria Rodrig - Law Office and Notary"
                  />
                </div>
                <div className="map-links-row">
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="map-link-button"
                  >
                    {t("home.contactMapGoogle")}
                  </a>
                  <a
                    href={wazeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="map-link-button ghost"
                  >
                    {t("home.contactMapWaze")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="contact-button">
        <a href="/book" className="floating-button-home">
          {t("home.heroCta")}
        </a>
      </div>
    </>
  );
};

export default Home;
