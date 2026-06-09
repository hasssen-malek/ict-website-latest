/* global React */
const { useState: useStateNav, useEffect: useEffectNav, useRef: useRefNav } = React;

const NAV_ITEMS = [
  {
    id: "services",
    label: "Services",
    href: "Homepage.html#services",
    panel: [
      { no: "01", h: "Cloud & Infrastructure Transformation", p: "Resilient, scalable, future-ready infrastructure.", href: "Cloud-Infrastructure-Transformation.html" },
      { no: "02", h: "Cybersecurity & Digital Resilience", p: "Protection, detection, and continuity at enterprise scale.", href: "Cybersecurity-Digital-Resilience.html" },
      { no: "03", h: "AI & Intelligent Automation", p: "Governed AI and automation that drive measurable outcomes.", href: "AI-Intelligent-Automation.html" },
      { no: "04", h: "Managed & Support Services", p: "Operate and optimise mission-critical environments.", href: "Managed-Support-Services.html" },
    ],
  },
  { id: "approach", label: "Approach", href: "Approach.html" },
  {
    id: "stories",
    label: "Success Stories",
    href: "Homepage.html#stories",
    panel: [
      { no: "01", h: "Financial Services", p: "Governed, cited decision intelligence.", href: "Financial-Services.html" },
      { no: "02", h: "Education & Research", p: "Unified, access-aware enterprise search.", href: "Education-Research.html" },
      { no: "03", h: "Public Sector", p: "Hybrid cloud, migrated without disruption.", href: "Public-Sector.html" },
    ],
  },
  {
    id: "about",
    label: "About ICT",
    href: "Homepage.html#about",
    panel: [
      { no: "01", h: "Company Overview", p: "Who we are and what we operate.", href: "Company-Overview.html" },
      { no: "02", h: "Technology Partnerships", p: "The global ecosystems behind our delivery.", href: "Technology-Partnerships.html" },
      { no: "03", h: "Why ICT", p: "Why enterprises rely on ICT.", href: "Why-ICT.html" },
      { no: "04", h: "Contact Us", p: "Talk to ICT about your priorities.", href: "Contact-Us.html" },
    ],
  },
];

function Caret() {
  return (
    <svg className="nav__caret" viewBox="0 0 12 12" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 4.5l3 3 3-3" />
    </svg>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useStateNav(false);
  const [openId, setOpenId] = useStateNav(null);
  const [mobileOpen, setMobileOpen] = useStateNav(false);
  const [openSub, setOpenSub] = useStateNav(null);
  const timer = useRefNav(null);
  const burgerRef = useRefNav(null);
  const sheetRef = useRefNav(null);

  useEffectNav(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffectNav(() => {
    const onKey = (e) => { if (e.key === "Escape") { setOpenId(null); setMobileOpen(false); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Body scroll lock + focus management + focus trap while the mobile menu is open
  useEffectNav(() => {
    if (mobileOpen) {
      document.documentElement.style.overflow = "hidden";
      const sheet = sheetRef.current;
      if (sheet) {
        const first = sheet.querySelector(".navm__close");
        if (first) first.focus();
      }
    } else {
      document.documentElement.style.overflow = "";
      // Return focus to the trigger only if focus is still inside the (closing) sheet
      const active = document.activeElement;
      if (burgerRef.current && (!active || active === document.body || (sheetRef.current && sheetRef.current.contains(active)))) {
        burgerRef.current.focus();
      }
      setOpenSub(null);
    }
    return () => { document.documentElement.style.overflow = ""; };
  }, [mobileOpen]);

  // Trap Tab focus within the open mobile sheet
  const onSheetKeyDown = (e) => {
    if (e.key !== "Tab") return;
    const sheet = sheetRef.current;
    if (!sheet) return;
    const focusable = Array.from(
      sheet.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
    ).filter((el) => el.offsetParent !== null || el === document.activeElement);
    if (focusable.length === 0) return;
    const firstEl = focusable[0];
    const lastEl = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === firstEl) {
      e.preventDefault();
      lastEl.focus();
    } else if (!e.shiftKey && document.activeElement === lastEl) {
      e.preventDefault();
      firstEl.focus();
    }
  };

  const open = (id) => { if (timer.current) clearTimeout(timer.current); setOpenId(id); };
  const close = () => { if (timer.current) clearTimeout(timer.current); timer.current = setTimeout(() => setOpenId(null), 130); };

  return (
    <React.Fragment>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <header className={"nav" + (scrolled ? " is-scrolled" : "")}>
        <nav className="nav__row" aria-label="Primary">
          <a href="Homepage.html" className="nav__logo" aria-label="ICT home">
            <img src="assets/ict-logo-small.png" alt="ICT" />
          </a>

          <ul className="nav__links">
            {NAV_ITEMS.map((item) => {
              const isOpen = openId === item.id;
              return (
                <li
                  key={item.id}
                  className={"nav__item" + (isOpen ? " is-open" : "")}
                  onMouseEnter={() => item.panel && open(item.id)}
                  onMouseLeave={() => item.panel && close()}
                >
                  <a
                    href={item.href}
                    className="nav__link"
                    aria-haspopup={item.panel ? "true" : undefined}
                    aria-expanded={item.panel ? isOpen : undefined}
                    onClick={(e) => { if (item.panel) { e.preventDefault(); setOpenId(isOpen ? null : item.id); } }}
                  >
                    <span>{item.label}</span>
                    {item.panel ? <Caret /> : null}
                  </a>
                  {item.panel && isOpen ? (
                    <div className="nav__panel" role="menu" onMouseEnter={() => open(item.id)} onMouseLeave={close}>
                      {item.panel.map((l) => (
                        <a key={l.no} className="nav__panel-link" href={l.href} role="menuitem" onClick={() => setOpenId(null)}>
                          <span className="nav__panel-no">{l.no}</span>
                          <span className="nav__panel-h">{l.h}</span>
                          <span className="nav__panel-ar" aria-hidden="true">→</span>
                          <span className="nav__panel-p">{l.p}</span>
                        </a>
                      ))}
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>

          <span className="nav__spacer" />

          <a className="nav__cta" href="Contact-Us.html">
            <span>Schedule a consultation</span>
            <span className="ar" aria-hidden="true">→</span>
          </a>

          <button
            className={"nav__burger" + (mobileOpen ? " is-open" : "")}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((v) => !v)}
            type="button"
            ref={burgerRef}
          >
            <span className="nav__burger-label">{mobileOpen ? "Close" : "Menu"}</span>
            <span className="nav__burger-icon" aria-hidden="true"><span /><span /><span /></span>
          </button>
        </nav>
      </header>

      <div className={"navm" + (mobileOpen ? " is-open" : "")} id="mobile-nav">
          <div className="navm__scrim" onClick={() => setMobileOpen(false)} aria-hidden="true" />
          <aside
            className="navm__sheet"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            ref={sheetRef}
            onKeyDown={onSheetKeyDown}
            {...(!mobileOpen ? { inert: "", "aria-hidden": "true" } : {})}
          >
            <div className="navm__head">
              <a href="Homepage.html" className="navm__logo" aria-label="ICT home" onClick={() => setMobileOpen(false)}>
                <img src="assets/ict-logo-small.png" alt="ICT" />
              </a>
              <button className="navm__close" aria-label="Close navigation menu" onClick={() => setMobileOpen(false)} type="button">
                <span>Close</span>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
              </button>
            </div>

            <nav className="navm__body" aria-label="Mobile">
              {NAV_ITEMS.map((item) => {
                const subOpen = openSub === item.id;
                return (
                  <div className={"navm__group" + (subOpen ? " is-open" : "")} key={item.id}>
                    <div className="navm__row">
                      <a className="navm__link" href={item.href} onClick={() => setMobileOpen(false)}>
                        {item.label}
                      </a>
                      {item.panel ? (
                        <button
                          className="navm__toggle"
                          type="button"
                          aria-label={(subOpen ? "Collapse " : "Expand ") + item.label}
                          aria-expanded={subOpen}
                          aria-controls={"navm-sub-" + item.id}
                          onClick={() => setOpenSub(subOpen ? null : item.id)}
                        >
                          <svg viewBox="0 0 14 14" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3.5 5.5l3.5 3.5 3.5-3.5" /></svg>
                        </button>
                      ) : null}
                    </div>
                    {item.panel ? (
                      <div className="navm__sub" id={"navm-sub-" + item.id}>
                        <div className="navm__sub-inner" {...(!subOpen ? { inert: "" } : {})}>
                          {item.panel.map((l) => (
                            <a key={l.no} href={l.href} onClick={() => setMobileOpen(false)}>
                              <span className="navm__sub-no" aria-hidden="true">{l.no}</span>
                              <span>{l.h}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </nav>

            <div className="navm__foot">
              <a className="btn btn--primary navm__cta" href="Contact-Us.html" onClick={() => setMobileOpen(false)}>
                Schedule a consultation <span className="ar" aria-hidden="true">→</span>
              </a>
              <div className="navm__contact">
                <a href="mailto:info@ict.com.qa">info@ict.com.qa</a>
                <span aria-hidden="true">·</span>
                <span>Doha, Qatar</span>
              </div>
              <p className="navm__brandline">ICT. Empowering digital transformation in Qatar.</p>
            </div>
          </aside>
        </div>
    </React.Fragment>
  );
}

window.Nav = Nav;
