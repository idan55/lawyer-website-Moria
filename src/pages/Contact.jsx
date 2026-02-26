import OfficeMap from "../components/OfficeMap";

const Contact = () => {
  const addressText = "הסיבים 49 פתח תקווה";
  const lat = 32.0831515;
  const lng = 34.8567889;
  const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  const wazeUrl = `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`;

  return (
    <section className="space-y-5">
      <p className="eyebrow">Contact</p>
      <h1 className="section-title">Contact and office details</h1>
      <div className="grid gap-5 md:grid-cols-2">
        <article className="content-card space-y-2">
          <p className="card-copy">
            Phone: <span className="phone-ltr">+972-54-622-5654</span>
          </p>
          <p className="card-copy">Email: moria@rodriglaw.com</p>
          <p className="card-copy">Address: {addressText}</p>
          <p className="card-copy">
            Office hours: 9:00 - 16:00, Sunday to Thursday
          </p>
        </article>
        {mapboxToken ? (
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
                rel="noopener noreferrer"
                className="map-link-button"
              >
                Open in Google Maps
              </a>
              <a
                href={wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="map-link-button ghost"
              >
                Open in Waze
              </a>
            </div>
          </div>
        ) : (
          <article className="mapbox-card mapbox-fallback">
            <p className="card-copy">
              Mapbox token missing. Add <code>VITE_MAPBOX_TOKEN</code> to your
              frontend environment file to display the live map.
            </p>
            <p className="card-copy">
              Coordinates: {lat}, {lng}
            </p>
          </article>
        )}
      </div>
    </section>
  );
};

export default Contact;
