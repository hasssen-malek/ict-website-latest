/* global window, document */
/* =========================================================================
   ICT - enhance.js · progressive enhancement (vanilla, dependency-free)
   • Count-up: any [data-countup] element animates its numeric value from 0
     when scrolled into view (once). Parses an optional prefix/suffix and
     decimal precision from the element's own text, so the final, correct
     value is what ships in the DOM (no-JS & reduced-motion safe).
   Performance: transform/opacity-free; a single rAF per active counter.
   ========================================================================= */
(function () {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const seen = new WeakSet();
  const pending = new Set();   // observed counters that haven't started yet

  function start(el) {
    if (!pending.has(el)) return;
    pending.delete(el);
    if (io) io.unobserve(el);
    animate(el);
  }

  const io = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => {
        for (const e of entries) {
          if (e.isIntersecting) start(e.target);
        }
      }, { threshold: 0.45, rootMargin: "0px 0px -8% 0px" })
    : null;

  // If the page first rendered in a background tab, the observer's initial
  // callback can be suppressed; when the tab becomes visible, re-check.
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState !== "visible") return;
    for (const el of [...pending]) {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) start(el);
    }
  });

  function parse(text) {
    // leading non-digits (prefix) · number (digits, commas, one dot) · trailing (suffix)
    const m = String(text).trim().match(/^(\D*?)(\d[\d,]*(?:\.\d+)?)(.*)$/s);
    if (!m) return null;
    const numStr = m[2];
    const clean = numStr.replace(/,/g, "");
    const dot = clean.indexOf(".");
    return {
      prefix: m[1],
      suffix: m[3],
      target: parseFloat(clean),
      dec: dot === -1 ? 0 : clean.length - dot - 1,
      grouped: numStr.indexOf(",") !== -1,
    };
  }

  function fmt(v, p) {
    let s = p.dec ? v.toFixed(p.dec) : String(Math.round(v));
    if (p.grouped) s = Number(s).toLocaleString("en-US");
    return p.prefix + s + p.suffix;
  }

  function animate(el) {
    const p = el.__cu;
    if (!p) return;
    const dur = 1500, t0 = performance.now();
    const ease = (x) => 1 - Math.pow(1 - x, 3); // easeOutCubic - premium, no overshoot
    function frame(now) {
      const k = Math.min(1, (now - t0) / dur);
      el.textContent = fmt(p.target * ease(k), p);
      if (k < 1) requestAnimationFrame(frame);
      else el.textContent = fmt(p.target, p);
    }
    requestAnimationFrame(frame);
  }

  function register(el) {
    if (seen.has(el)) return;
    seen.add(el);
    const p = parse(el.textContent);
    if (!p) return;                 // non-numeric (e.g. "Zero") - leave as authored
    el.__cu = p;
    el.style.fontVariantNumeric = "tabular-nums"; // no width jitter while counting
    if (reduce || !io) return;      // keep the authored final value
    el.textContent = fmt(0, p);
    pending.add(el);
    io.observe(el);
  }

  function scan() {
    document.querySelectorAll("[data-countup]").forEach(register);
  }

  function init() {
    scan();
    // React renders asynchronously - pick up counters as they mount.
    const mo = new MutationObserver(() => scan());
    mo.observe(document.body, { childList: true, subtree: true });
  }

  if (document.body) init();
  else document.addEventListener("DOMContentLoaded", init);

  window.ICTCountUp = { scan };
})();
