/* global React */

/* Minimal outline icons - thin geometric linework matching ICT's schematic
   system. Stroke-only, monochrome (inherits the ink colour). */
function WhyIcon({ kind }) {
  const common = { width: 30, height: 30, viewBox: "0 0 30 30", fill: "none",
    stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round",
    "aria-hidden": true };
  switch (kind) {
    case "delivery": // end-to-end flow: connected nodes, start → end
      return (
        <svg {...common}>
          <line x1="6" y1="15" x2="24" y2="15" />
          <circle cx="6" cy="15" r="2.4" />
          <circle cx="15" cy="15" r="2.4" />
          <circle cx="24" cy="15" r="2.4" />
        </svg>);

    case "global": // globe: meridian + equator
      return (
        <svg {...common}>
          <circle cx="15" cy="15" r="10.5" />
          <ellipse cx="15" cy="15" rx="4.4" ry="10.5" />
          <line x1="4.5" y1="15" x2="25.5" y2="15" />
        </svg>);

    case "resilient": // layered architecture / foundations
      return (
        <svg {...common}>
          <rect x="4.5" y="5.5" width="21" height="5" rx="1" />
          <rect x="4.5" y="12.5" width="21" height="5" rx="1" />
          <rect x="4.5" y="19.5" width="21" height="5" rx="1" />
        </svg>);

    case "managed": // monitoring: screen + uptime pulse
      return (
        <svg {...common}>
          <rect x="3.5" y="6" width="23" height="14" rx="1.5" />
          <line x1="11" y1="25" x2="19" y2="25" />
          <line x1="15" y1="20" x2="15" y2="25" />
          <polyline points="7,14 10.5,14 12.5,10.5 15.5,17 17.5,13 19.5,14 23,14" />
        </svg>);

    case "partnership": // two linked rings - continuity & partnership
    default:
      return (
        <svg {...common}>
          <circle cx="11.5" cy="15" r="6.5" />
          <circle cx="18.5" cy="15" r="6.5" />
        </svg>);

  }
}

function WhyICT() {
  const pillars = [
  {
    icon: "delivery",
    h: "End-to-end delivery",
    p: "From strategy and architecture through deployment, support, and optimisation, under one accountable partner across the full lifecycle."
  },
  {
    icon: "global",
    h: "Local expertise, global standards",
    p: "Deep understanding of Qatar's market and regulation, combined with international best practice and certified engineering."
  },
  {
    icon: "resilient",
    h: "Resilient architectures",
    p: "Cloud, cybersecurity, and AI foundations designed for security, continuity, and long-term operational resilience."
  },
  {
    icon: "managed",
    h: "Managed services excellence",
    p: "Dedicated, SLA-backed operational support for mission-critical environments, monitored, maintained, and continuously improved."
  },
  {
    icon: "partnership",
    h: "Long-term partnership",
    p: "A trusted partner focused on outcomes, reliability, and continuity, not one-off projects."
  }];


  return (
    <section className="section s-paper why" id="why">
      <div className="wrap">
        <div className="why__head">
          <div className="shead reveal acc-orange">
            <p className="kicker">Why ICT</p>
            <h2 className="shead__title" style={{ maxWidth: "400px", width: "360px" }}>
              Built to be <span className="tword">relied on</span>.
            </h2>
          </div>
          <div className="why__headcol reveal d1">
            <p className="lead" style={{ maxWidth: "40ch" }}>
              Practical reasons enterprises and government bodies across Qatar choose ICT to
              design, deploy, secure, and operate the technology they depend on.
            </p>
            <a className="tlink head-link" href="Why-ICT.html">
              Why ICT? <span className="ar" aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <div className="why__grid">
          {pillars.map((p, i) =>
          <div className={"why__item reveal d" + (i % 3 + 1)} key={p.icon}>
              <div className="why__inner">
                <span className="why__icon"><WhyIcon kind={p.icon} /></span>
                <h3 className="why__h">{p.h}</h3>
                <p className="why__p">{p.p}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

window.WhyICT = WhyICT;