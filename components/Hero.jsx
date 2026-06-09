/* global React, window, document */

/* =========================================================================
   HERO - geometric "network sphere" + floating particle field (ICT colours)
   No cursor interaction. Globe breathes slowly; particles drift/orbit around
   it; a circular glow sits centred behind the globe. Reduced-motion safe.
   ========================================================================= */

const { useEffect: useEffectHero, useRef: useRefHero } = React;

function HeroArt() {
  const fgRef = useRefHero(null);
  const hostRef = useRefHero(null);
  const artRef = useRefHero(null);

  useEffectHero(() => {
    const host = hostRef.current ? hostRef.current.closest(".hero") : null;
    const stops = [];
    if (window.ICTField && fgRef.current) {
      stops.push(window.ICTField(fgRef.current, { mode: "orbit", host, focal: { x: 0.66, y: 0.42 }, count: 380, radius: [0.24, 0.84], opacity: 0.82, speed: 0.7, parallax: 0, cursor: false }));
    }
    return () => stops.forEach((s) => s && s());
  }, []);

  useEffectHero(() => {
    const el = artRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    el.classList.add("is-fading");
    // setTimeout runs even in background tabs, so the art can never get stuck hidden
    const t = setTimeout(() => el.classList.remove("is-fading"), 1700);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="hero__art" ref={(n) => {hostRef.current = n;artRef.current = n;}} aria-hidden="true">
      <img
        className="hero__bgimg"
        src="assets/hero-bg.png"
        alt=""
        loading="eager"
        decoding="async" />
      
      <div className="hero__scrim"></div>
      <canvas className="hero__field" ref={fgRef}></canvas>
    </div>);

}

function Hero() {
  return (
    <section className="hero s-ink-deep" id="top">
      <div className="hero__ambient" aria-hidden="true"></div>
      <HeroArt />
      <div className="wrap hero__grid">
        <div className="hero__head hero__head--load">
          <p className="kicker hero__kicker">ICT&nbsp;·&nbsp;Empowering digital transformation</p>
          <h1 className="hero__title" style={{ maxWidth: "760px" }}>
            Your trusted partner for <em><span style={{ color: "#0098ff" }}>digital transformation</span></em> in Qatar.
          </h1>
          <p className="hero__sub lead">
            ICT has grown from a trusted systems integrator into a digital
            transformation catalyst, helping enterprises across Qatar move faster
            and smarter. From consulting and cloud to cybersecurity, data, AI, and
            managed services, we turn complex challenges into measurable outcomes.
          </p>
          <div className="hero__cta">
            <a className="btn btn--primary" href="Contact-Us.html">
              Schedule a consultation <span className="ar" aria-hidden="true">→</span>
            </a>
            <a className="tlink" href="#services" style={{ justifyContent: "flex-start", alignItems: "center" }}>
              Explore our services <span className="ar" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>

      <div className="wrap">
        <div className="hero__meta hero__meta--load">
          <span className="hero__meta-item">Transforming business since <b>2005</b></span>
          <span className="hero__meta-item"><b data-countup>250+</b> AI use cases deployed</span>
          <span className="hero__meta-item">Headquartered in <b>Doha, Qatar</b></span>
        </div>
      </div>
    </section>);

}

window.Hero = Hero;