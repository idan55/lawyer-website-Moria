const PrivacyPolicy = () => {
  return (
    <section className="space-y-5">
      <p className="eyebrow">Legal</p>
      <h1 className="section-title">Privacy Policy</h1>
      <p className="section-copy">
        This Privacy Policy governs personal data processing carried out through the
        website of Moria Rodrig - Law Office and Notary and its integrated online
        appointment booking system.
      </p>

      <article className="content-card privacy-card">
        <h2 className="card-title">1. Scope of processing</h2>
        <p className="card-copy">
          This Policy applies only to data collected and processed via this website,
          including booking requests, technical usage analytics, and related
          communications.
        </p>
      </article>

      <article className="content-card privacy-card">
        <h2 className="card-title">2. Personal data collected</h2>
        <p className="card-copy">When a booking is submitted, the system processes:</p>
        <ul className="privacy-list">
          <li>Full name</li>
          <li>Email address</li>
          <li>Phone number (where provided)</li>
          <li>Service request details</li>
          <li>Preferred meeting language</li>
          <li>Requested date, time slot and meeting duration</li>
        </ul>
      </article>

      <article className="content-card privacy-card">
        <h2 className="card-title">3. Purposes of use</h2>
        <ul className="privacy-list">
          <li>Assess and confirm appointment availability.</li>
          <li>Create and administer confirmed appointments.</li>
          <li>Contact users regarding booking requests.</li>
          <li>Maintain lawful internal service records.</li>
          <li>Monitor and improve website usability and performance.</li>
        </ul>
      </article>

      <article className="content-card privacy-card">
        <h2 className="card-title">4. Systems and processors in active use</h2>
        <ul className="privacy-list">
          <li>
            Google Calendar API: used to check calendar availability and create
            confirmed appointment events.
          </li>
          <li>
            PostgreSQL database: used to store appointment records submitted through
            the booking flow.
          </li>
          <li>
            Microsoft Clarity: used to collect website analytics and interaction
            insights for service and interface improvement.
          </li>
        </ul>
      </article>

      <article className="content-card privacy-card">
        <h2 className="card-title">5. Cookies and analytics notice (Clarity)</h2>
        <p className="card-copy">
          This website uses Microsoft Clarity and similar analytics technologies,
          including cookies and tracking scripts, to understand user behavior,
          troubleshoot usability issues and improve website performance.
        </p>
        <p className="card-copy">
          By continuing to use this website, you acknowledge such analytics
          processing. Browser settings may be used to restrict cookies, noting that
          certain functions may be affected.
        </p>
      </article>

      <article className="content-card privacy-card">
        <h2 className="card-title">6. Legal basis</h2>
        <p className="card-copy">
          Data processing is carried out on applicable legal grounds, including steps
          requested by the data subject prior to service engagement, legitimate
          interests in secure website operation, and legal or professional compliance
          duties.
        </p>
      </article>

      <article className="content-card privacy-card">
        <h2 className="card-title">7. Disclosure and third-party transfer</h2>
        <p className="card-copy">
          Personal data is not sold. Data is disclosed only to the operational
          providers listed above, or where disclosure is required by law, judicial
          order or competent authority.
        </p>
      </article>

      <article className="content-card privacy-card">
        <h2 className="card-title">8. Retention</h2>
        <p className="card-copy">
          Appointment-related records are retained for a period reasonably required
          for service administration, legal obligations and professional record
          management.
        </p>
      </article>

      <article className="content-card privacy-card">
        <h2 className="card-title">9. Security</h2>
        <p className="card-copy">
          Reasonable technical and organizational safeguards are implemented to reduce
          risks of unauthorized access, alteration, loss or misuse of data. Absolute
          security in online systems cannot be guaranteed.
        </p>
      </article>

      <article className="content-card privacy-card">
        <h2 className="card-title">10. Data subject rights</h2>
        <p className="card-copy">
          Subject to applicable law, users may request access, correction or deletion
          of personal data processed through this website.
        </p>
      </article>

      <article className="content-card privacy-card">
        <h2 className="card-title">11. Contact for privacy matters</h2>
        <p className="card-copy">
          Moria Rodrig - Law Office and Notary
          <br />
          Phone: <span className="phone-ltr">+972-54-622-5654</span>
          <br />
          Email: moria@rodriglaw.com
          <br />
          Address: [TODO: Add official office address]
        </p>
      </article>

      <article className="content-card privacy-card">
        <h2 className="card-title">12. Policy revisions</h2>
        <p className="card-copy">
          This Policy may be updated from time to time to reflect legal,
          technological or operational changes. The current published version on this
          page is the governing version.
        </p>
      </article>
    </section>
  );
};

export default PrivacyPolicy;
