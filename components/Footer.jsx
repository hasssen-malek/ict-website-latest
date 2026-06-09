/* global React */
function Footer() {
  const columns = [
    [
      {
        h: "Services",
        links: [
          { label: "Cloud & Infrastructure Transformation", href: "Cloud-Infrastructure-Transformation.html" },
          { label: "Cybersecurity & Digital Resilience", href: "Cybersecurity-Digital-Resilience.html" },
          { label: "AI & Intelligent Automation", href: "AI-Intelligent-Automation.html" },
          { label: "Managed & Support Services", href: "Managed-Support-Services.html" },
        ],
      },
    ],
    [
      {
        h: "Success Stories",
        links: [
          { label: "Financial Services", href: "Financial-Services.html" },
          { label: "Education & Research", href: "Education-Research.html" },
          { label: "Public Sector", href: "Public-Sector.html" },
        ],
      },
      {
        h: "Approach",
        links: [
          { label: "The ICT Approach", href: "Approach.html" },
        ],
      },
    ],
    [
      {
        h: "About ICT",
        links: [
          { label: "Company Overview", href: "Company-Overview.html" },
          { label: "Technology Partnerships", href: "Technology-Partnerships.html" },
          { label: "Why ICT", href: "Why-ICT.html" },
          { label: "Contact Us", href: "Contact-Us.html" },
        ],
      },
    ],
  ];

  const socials = [
    { label: "LinkedIn", path: "M20.45 3H3.55A.55.55 0 0 0 3 3.55v16.9c0 .3.25.55.55.55h16.9c.3 0 .55-.25.55-.55V3.55A.55.55 0 0 0 20.45 3zM8.34 18.34H5.67V9.75h2.67v8.59zM7 8.58a1.55 1.55 0 1 1 0-3.1 1.55 1.55 0 0 1 0 3.1zm11.34 9.76h-2.67v-4.18c0-1 0-2.28-1.39-2.28s-1.6 1.08-1.6 2.21v4.25H10V9.75h2.56v1.18h.04a2.81 2.81 0 0 1 2.53-1.39c2.71 0 3.21 1.78 3.21 4.1v4.7z", fill: true },
    { label: "X", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z", fill: true },
  ];

  return (
    <footer className="footer" id="about">
      <div className="wrap">
        <div className="ticks ticks--bar reveal" style={{ marginBottom: "56px" }}><i></i><i></i><i></i><i></i><i></i><i></i></div>

        <div className="footer__top">
          <div className="footer__brand">
            <a className="footer__logo" href="Homepage.html" aria-label="ICT home">
              <img src="assets/ict-logo-mixed.png" alt="ICT, Information and Communication Technology" />
            </a>
            <p className="footer__tag">
              ICT empowers digital transformation across Qatar, from strategy and cloud
              to cybersecurity, data, AI, and managed services.
            </p>
            <div className="footer__contact"><strong>Doha HQ</strong>ICT W.L.L, Doha, Qatar</div>
            <div className="footer__contact"><strong>Contact us</strong>info@ict.com.qa&nbsp;&nbsp;·&nbsp;&nbsp;+974 4440 5000</div>
            <div className="footer__social" aria-label="ICT on social">
              {socials.map((s) => (
                <a key={s.label} href="#" aria-label={s.label}>
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={s.path} /></svg>
                </a>
              ))}
            </div>
          </div>

          <div className="footer__cols">
            {columns.map((groups, ci) => (
              <div className="footer__col" key={ci}>
                {groups.map((g) => (
                  <div className="footer__group" key={g.h}>
                    <div className="footer__h">{g.h}</div>
                    <ul>{g.links.map((l) => <li key={l.label}><a href={l.href}>{l.label}</a></li>)}</ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="footer__bot">
          <div>© {new Date().getFullYear()} ICT W.L.L · Doha, Qatar</div>
          <div className="footer__legal">
            <a href="Privacy-Policy.html">Privacy Policy</a><a href="Terms-of-Use.html">Terms of Use</a><a href="Cookie-Policy.html">Cookie Policy</a><a href="#" data-cookie-settings onClick={(e) => { e.preventDefault(); if (window.ICTConsent) window.ICTConsent.open(); }}>Cookie Preferences</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

window.Footer = Footer;
