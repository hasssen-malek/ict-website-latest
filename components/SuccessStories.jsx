/* global React */

/* Success Stories - curated portfolio: a section intro (headline + lead),
   one full-width featured story, then two secondary story cards side-by-side.
   Homepage thumbnails are clean framed images (the fade-to-dark treatment is
   reserved for the case-study hero pages). Each story carries a brand accent. */

const STORIES = [
  {
    sector: "Financial Services", corner: "CASE / 01", href: "Financial-Services.html",
    img: "assets/stories/financial.jpg", accent: "blue", pos: "50% 38%",
    title: "Intelligent investment research assistant",
    tags: ["AI", "Azure OpenAI", "Knowledge Retrieval", "Arabic NLP"],
    desc: "Investment data was fragmented across systems. ICT deployed a governed, Arabic-first retrieval platform, with every recommendation traceable back to its source."
  },
  {
    sector: "Education & Research", corner: "CASE / 02", href: "Education-Research.html",
    img: "assets/stories/research.jpg", accent: "magenta", pos: "50% 42%",
    title: "AI-powered unified enterprise search",
    tags: ["Enterprise Search", "Semantic Search", "AI"],
    desc: "Access-aware semantic search across large document collections, returning relevant results quickly while respecting existing governance and permissions."
  },
  {
    sector: "Public Sector", corner: "CASE / 03", href: "Public-Sector.html",
    img: "assets/stories/public.jpg", accent: "orange", pos: "50% 26%",
    title: "Modernising the data center with hybrid cloud",
    tags: ["Hybrid Cloud", "Sovereign Cloud", "Migration"],
    desc: "On-premises infrastructure extended into a sovereign cloud landing zone, with workloads migrated while maintaining governance and operational continuity."
  }
];

function StoryTags({ tags }) {
  return (
    <ul className="story__tags">
      {tags.map((t) => <li className="story__tag" key={t}>{t}</li>)}
    </ul>);
}

function SuccessStories() {
  const featured = STORIES[0];
  const secondary = STORIES.slice(1);

  return (
    <section className="section s-ink" id="stories">
      <div className="story__glow" aria-hidden="true"></div>
      <div className="wrap">
        <div className="story__intro reveal acc-blue">
          <div>
            <p className="kicker">Success stories</p>
            <h2 className="shead__title" style={{ marginTop: "22px", maxWidth: "13ch" }}>
              Measurable <span className="tword">impact</span>, across industries.
            </h2>
          </div>
          <p className="story__lead">From AI-powered knowledge platforms to cloud modernisation and critical infrastructure transformation, ICT delivers measurable outcomes across highly regulated industries.</p>
        </div>

        <div className="story__system">
        {/* Featured story */}
        <article className={"story story--featured story--link reveal acc-" + featured.accent} key={featured.corner}>
          <div className="story__media">
            <img src={featured.img} alt="" loading="lazy" style={{ objectPosition: featured.pos }} />
          </div>
          <div className="story__text">
            <div className="story__meta">
              <span className="story__mk" aria-hidden="true"></span>
              <span className="story__case">{featured.corner}</span>
              <span className="story__sector">{featured.sector}</span>
            </div>
            <h3 className="story__title">{featured.title}</h3>
            <StoryTags tags={featured.tags} />
            <p className="story__desc">{featured.desc}</p>
            <a className="tlink story__stretch" href={featured.href}>Read case study <span className="ar" aria-hidden="true">→</span></a>
          </div>
        </article>

        {/* Secondary stories */}
        <div className="story__grid">
          {secondary.map((s) =>
          <article className={"story-card story--link reveal acc-" + s.accent} key={s.corner}>
              <div className="story-card__media">
                <img src={s.img} alt="" loading="lazy" style={{ objectPosition: s.pos }} />
              </div>
              <div className="story-card__body">
                <div className="story__meta">
                  <span className="story__mk" aria-hidden="true"></span>
                  <span className="story__case">{s.corner}</span>
                  <span className="story__sector">{s.sector}</span>
                </div>
                <h3 className="story-card__title">{s.title}</h3>
                <StoryTags tags={s.tags} />
                <p className="story-card__desc">{s.desc}</p>
                <a className="tlink story__stretch" href={s.href}>Read case study <span className="ar" aria-hidden="true">→</span></a>
              </div>
            </article>
          )}
        </div>
        </div>
      </div>
    </section>);
}

window.SuccessStories = SuccessStories;
