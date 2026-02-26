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
                    <a href="tel:+972546225654" className="icon-link-block">
                      <span className="icon-phone" />
                      <span className="icon-text phone-ltr">+972-54-622-5654</span>
                    </a>
                    <p className="footer-meta">moria@rodriglaw.com</p>
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
