import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();
  const pressItems = [
    {
      source: "Times of Israel",
      url: "https://blogs.timesofisrael.com/multiculturalism-is-dead-anti-semitism-is-alive/",
    },
    {
      source: "YouTube",
      url: "https://www.youtube.com/watch?v=bw7sLx8nT70",
    },
    {
      source: "gcity.co.il",
      url: "https://www.gcity.co.il/%D7%94%D7%99%D7%A9%D7%92-%D7%9C%D7%A6%D7%99%D7%91%D7%95%D7%A8-%D7%94%D7%A2%D7%95%D7%9C%D7%99%D7%9D-%D7%91%D7%92%D7%91%D7%A2%D7%AA-%D7%A9%D7%9E%D7%95%D7%90%D7%9C/?fbclid=IwAR2q7Wop-o3WoJ2ebwT4YlltfY4x6jIFap46wqC_7VdC5cZL1f2mIxc8ocQ",
    },
    {
      source: "Makor Rishon",
      url: "https://www.makorrishon.co.il/news/article/255834",
    },
    {
      source: "Yediot",
      url: "https://www.yediot.co.il/articles/0,7340,L-5330014,00.html?fbclid=IwAR0RzltfBRm8fa510frZv16dxUF6eV8kHrmqz-LncT9Mcs2sF4mWm11b03g",
    },
    {
      source: "lawidf.co.il",
      url: "https://lawidf.co.il/-/%D7%A2%D7%95%D7%93-%D7%9E%D7%95%D7%A8%D7%99%D7%94-%D7%A8%D7%95%D7%93%D7%A8%D7%99%D7%92/",
    },
  ];

  return (
    <section className="section_about">
      <div className="page-padding">
        <div className="container-large">
          <div className="padding-vertical-large space-y-5">
            <p className="eyebrow">{t("about.eyebrow")}</p>
            <h1 className="section-title">{t("about.title")}</h1>
            <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr] items-start">
              <div className="space-y-3">
                <p className="section-copy">{t("about.p1")}</p>
                <p className="section-copy">{t("about.p2")}</p>
                <p className="section-copy about-long-bio">{t("about.p3")}</p>
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
            <div className="space-small" />
            <br />
            <div className="divider" aria-hidden="true" />
            <div className="space-small" />
            <div className="press-section space-y-3">
              <h2 className="header-small">{t("about.pressTitle")}</h2>
              <a
                href="https://blogs.timesofisrael.com/multiculturalism-is-dead-anti-semitism-is-alive/"
                target="_blank"
                rel="noopener noreferrer"
                className="press-feature-card"
              >
                <div className="press-feature-cover">
                  <img
                    src="/media/newsweek-cover.jpeg"
                    alt="Newsweek cover featuring Moria Rodrig"
                    className="press-feature-image"
                    onError={(event) => {
                      event.currentTarget.src = "/moria-portrait.jpeg";
                    }}
                  />
                </div>
                <div className="press-feature-copy">
                  <span className="press-feature-kicker">Newsweek / Times of Israel</span>
                  <h3 className="press-feature-title">
                    Multiculturalism Is Dead. Anti-Semitism Is Alive.
                  </h3>
                  <p className="press-feature-description">
                    Read the featured commentary and background publication.
                  </p>
                </div>
              </a>
              <div className="press-grid">
                {pressItems.slice(1).map((item) => (
                  <a
                    key={item.url}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="press-link-card"
                  >
                    <span className="press-source">{item.source}</span>
                    <span className="press-link-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
