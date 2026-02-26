const Services = () => {
  const legalItems = [
    "Civil and commercial legal consulting",
    "Contract drafting, review and negotiation",
    "Representation in property and transaction matters",
    "Guidance for inheritance and estate proceedings",
  ];

  const notaryItems = [
    "Verification and certification of signatures",
    "Notarial affidavits and powers of attorney",
    "Certified true copies of official documents",
    "Notarial confirmations for local and cross-border use",
  ];

  return (
    <section className="section_services">
      <div className="page-padding">
        <div className="container-large">
          <div className="padding-vertical-large space-y-6">
            <p className="eyebrow">Services</p>
            <h1 className="section-title">Legal and notarial areas of practice</h1>
            <div className="grid gap-4 md:grid-cols-2">
              <article className="content-card">
                <h2 className="card-title">Legal Services</h2>
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
                <h2 className="card-title">Notary Services</h2>
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
            <p className="section-copy">
              [TODO: Add specific service pages or downloadable service brochure link.]
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
