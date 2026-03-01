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
                <a href="tel:+972546225654" className="icon-link-block-large">
                  <span className="icon-phone" />
                  <span>
                    {t("contact.phoneLabel")}:{" "}
                    <span className="phone-ltr">+972-54-622-5654</span>
                  </span>
                </a>
                <a href="mailto:moria@rodriglaw.com" className="icon-link-block-large">
                  <span className="icon-mail" />
                  <span>{t("contact.emailLabel")}: moria@rodriglaw.com</span>
                </a>
                <a
                  href="https://wa.me/972546225654"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-link-block-large"
                >
                  <span className="icon-whatsapp" />
                  <span>{t("home.contactWhatsapp")}</span>
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
