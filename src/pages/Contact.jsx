import OfficeMap from "../components/OfficeMap";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();
  const addressText = "הסיבים 49 פתח תקווה";
  const lat = 32.0831515;
  const lng = 34.8567889;
  const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  const wazeUrl = `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`;

  return (
    <section className="section_contact">
      <div className="page-padding">
        <div className="container-large">
          <div className="padding-vertical-large space-y-5">
            <p className="eyebrow">{t("contact.eyebrow")}</p>
            <h1 className="section-title">{t("contact.title")}</h1>
            <br />
            <div className="grid gap-5 md:grid-cols-2">
              <article className="content-card space-y-2">
                <a href="tel:+972546225654" className="contact-action-link">
                  <span className="contact-action-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M6.6 3.8a2 2 0 0 1 2.2-.5l2.2.9a2 2 0 0 1 1.2 2.3l-.4 2a2 2 0 0 1-1.7 1.6c.9 1.9 2.4 3.4 4.3 4.3a2 2 0 0 1 1.6-1.7l2-.4a2 2 0 0 1 2.3 1.2l.9 2.2a2 2 0 0 1-.5 2.2l-1.2 1.2a3 3 0 0 1-3 .8c-3.1-.8-6.1-2.7-8.8-5.3-2.6-2.7-4.5-5.7-5.3-8.8a3 3 0 0 1 .8-3L6.6 3.8Z"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="contact-action-text">
                    <span className="contact-action-label">{t("contact.phoneLabel")}</span>
                    <span className="phone-ltr contact-action-value">+972-54-622-5654</span>
                  </span>
                </a>
                <a href="mailto:moria@rodriglaw.com" className="contact-action-link">
                  <span className="contact-action-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5v-9Z"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      />
                      <path
                        d="m5 8 7 5 7-5"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="contact-action-text">
                    <span className="contact-action-label">{t("contact.emailLabel")}</span>
                    <span className="contact-action-value">moria@rodriglaw.com</span>
                  </span>
                </a>
                <a
                  href="https://wa.me/972546225654"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-action-link"
                >
                  <span className="contact-action-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 4a8 8 0 0 0-6.9 12l-1 4 4-1A8 8 0 1 0 12 4Z"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.2 10.2c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .5.4.2.5.7 1.7.8 1.8.1.2.1.4 0 .6-.1.2-.2.3-.4.5l-.3.3c-.1.1-.2.3 0 .5.2.3.8 1.3 2 1.8 1.6.7 1.6.5 1.9.5.2 0 .9-.4 1-.7.1-.3.1-.6.1-.7-.1-.2-.3-.3-.5-.4l-1.2-.6c-.2-.1-.4-.1-.6.1l-.4.5c-.1.1-.3.2-.5.1-.3-.1-1.1-.4-2-.9-.7-.5-1.1-1-1.3-1.3-.1-.2 0-.3.1-.5l.3-.4c.1-.2.2-.3.2-.4.1-.2 0-.4 0-.5l-.6-1.5Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  <span className="contact-action-text">
                    <span className="contact-action-label">{t("home.contactWhatsapp")}</span>
                    <span className="contact-action-value phone-ltr">+972-54-622-5654</span>
                  </span>
                </a>
                <p className="card-copy">
                  {t("contact.addressLabel")}: {addressText}
                </p>
                <p className="card-copy">
                  {t("contact.officeHours")}
                </p>
              </article>
              {mapboxToken ? (
                <div className="contact-map-wrapper">
                  <div className="mapbox-card mapbox-zoom-in">
                    <OfficeMap
                      lat={lat}
                      lng={lng}
                      label={t("brand.name")}
                    />
                  </div>
                  <div className="map-links-row">
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="map-link-button"
                    >
                      {t("contact.openGoogle")}
                    </a>
                    <a
                      href={wazeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="map-link-button ghost"
                    >
                      {t("contact.openWaze")}
                    </a>
                  </div>
                </div>
              ) : (
                <article className="mapbox-card mapbox-fallback">
                  <p className="card-copy">
                    {t("contact.mapboxMissing")}{" "}
                    <code>VITE_MAPBOX_TOKEN</code>{" "}
                    {t("contact.mapboxMissingSuffix")}
                  </p>
                  <p className="card-copy">
                    {t("contact.coordinates")}: {lat}, {lng}
                  </p>
                </article>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
