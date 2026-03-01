import { NavLink, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Layout = () => {
  const { i18n, t } = useTranslation();

  const navItems = [
    { to: "/", label: t("nav.home") },
    { to: "/about", label: t("nav.about") },
    { to: "/services", label: t("nav.services") },
    { to: "/contact", label: t("nav.contact") },
  ];

  const baseLang = i18n.language.split("-")[0];

  return (
    <div className="body">
      <div className="main-wrapper">
        <header className="navbar">
          <div className="container-large">
            <div className="navbar-wrapper">
              <NavLink to="/" className="navbar-brand">
                <div className="logo-component">
                  <img
                    src="/WhatsApp Image 2026-02-26 at 11.13.13_199x120.jpeg"
                    alt="Moria Rodrig - Law Office and Notary logo"
                    className="logo-image"
                  />
                  <span className="logo-text">{t("brand.name")}</span>
                </div>
              </NavLink>

              <nav className="navbar-menu">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/"}
                    className={({ isActive }) =>
                      `navbar-link ${isActive ? "navbar-link-active" : ""}`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              <div className="navbar-right">
                <div className="navbar-contacts-wrapper">
                  <a href="tel:+972546225654" className="icon-link-block">
                    <span className="icon-phone" />
                    <span className="icon-text phone-ltr">+972-54-622-5654</span>
                  </a>
                </div>
                <div className="lang-wrapper">
                  <select
                    className="lang-select"
                    value={baseLang}
                    onChange={(e) => i18n.changeLanguage(e.target.value)}
                    aria-label={t("nav.language")}
                  >
                    <option value="en">EN</option>
                    <option value="he">HE</option>
                    <option value="fr">FR</option>
                    <option value="nl">NL</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="divider" />
          </div>
        </header>

        <main className="page-main">
          <Outlet />
        </main>

        <footer className="footer">
          <div className="page-padding">
            <div className="container-large">
              <div className="padding-vertical-medium">
                <div className="footer-grid">
                  <div className="footer-logo-frame">
                    <img
                      src="/WhatsApp Image 2026-02-26 at 11.13.13_199x120.jpeg"
                      alt="Moria Rodrig - Law Office and Notary logo"
                      className="footer-logo"
                    />
                  </div>
                  <div>
                    <div className="footer-menu-grid">
                      <NavLink to="/" className="footer-link">
                        {t("nav.home")}
                      </NavLink>
                      <NavLink to="/about" className="footer-link">
                        {t("nav.about")}
                      </NavLink>
                      <NavLink to="/privacy-policy" className="footer-link">
                        {t("footer.privacy")}
                      </NavLink>
                    </div>
                  </div>
                  <div className="footer-contacts-wrapper">
                    <a href="tel:+972546225654" className="footer-contact-link">
                      <span className="footer-contact-icon" aria-hidden="true">
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
                      <span className="icon-text phone-ltr">+972-54-622-5654</span>
                    </a>
                    <a href="mailto:moria@rodriglaw.com" className="footer-contact-link">
                      <span className="footer-contact-icon" aria-hidden="true">
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
                      <span className="footer-meta">moria@rodriglaw.com</span>
                    </a>
                  </div>
                </div>
                <div className="space-large" />
                <div className="divider" />
                <div className="space-xsmall" />
                <div className="footer-credentials-wrapper">
                  <div className="footer-left-wrapper">
                    <div>
                      <span className="current-year">
                        {new Date().getFullYear()}
                      </span>{" "}
                      {t("footer.rights")}
                    </div>
                  </div>
                  <p className="footer-developer">{t("footer.developer")}</p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
