/* global React, PartnerLogo */

function Partners() {
  const partners = [
  "Microsoft", "Informatica", "Adobe", "Dataiku",
  "Databricks", "F5", "Forcepoint", "Tenable",
  "Imperva", "Checkmarx", "Progress Sitefinity", "Striim",
  "Imprivata", "Hansa"];


  return (
    <section className="section s-ink partners" id="partners">
      <div className="wrap">
        <div className="partners__head">
          <div className="shead reveal acc-violet">
            <p className="kicker" style={{ width: "400px" }}>Technology partnerships</p>
            <h2 className="shead__title" style={{ maxWidth: "560px", width: "460px" }}>
              Powered by <span className="tword">world-class</span> technology partnerships.
            </h2>
          </div>
          <div className="partners__headcol reveal d1">
            <p className="lead" style={{ maxWidth: "42ch" }}>
              Innovation does not happen alone. We partner with the world's leading
              technology companies to bring best-in-class solutions to every client.
            </p>
            <a className="tlink head-link" href="Technology-Partnerships.html">
              See our partners <span className="ar" aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <div className="partners__grid reveal d1">
          {partners.map((name) =>
          <div className="partners__cell" key={name}>
              <PartnerLogo name={name} />
            </div>
          )}
          {[0, 1].map((i) =>
          <div className="partners__cell partners__cell--empty" key={"empty" + i} aria-hidden="true"></div>
          )}
        </div>
      </div>
    </section>);

}

window.Partners = Partners;