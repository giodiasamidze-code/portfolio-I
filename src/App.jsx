import { useState, useEffect, useRef } from "react";
import "./App.css";
import profilePhoto from "./assets/profile.png";
import Particles from "./components/Particles";
import CustomCursor from "./components/CustomCursor";
import GlitchText from "./components/GlitchText";
import ScrollReveal from "./components/ScrollReveal";

const projects = [
  {
    id: "01",
    title: "ძმები",
    desc: "თანამედროვე რესტორნის ვებსაიტი — მენიუ, ინფორმაცია, ონლაინ დაჯავშნა. სუფთა ნავიგაცია, მიმზიდველი UI, სრული რესპონსივი.",
    tags: ["React", "Node.js", "TypeScript"],
    live: "#",
    github: "#",
    offset: "offset-left",
  },
  {
    id: "02",
    title: "მირას ყვავილები",
    desc: "ყვავილების ონლაინ მაღაზია — კატალოგი, თაიგულების არჩევა, სწრაფი დაჯავშნა. UX-ზე ორიენტირებული e-commerce გამოცდილება.",
    tags: ["React", "Node.js", "TypeScript"],
    live: "#",
    github: "#",
    offset: "offset-right",
  },
  {
    id: "03",
    title: "კოტეჯების პლატფორმა",
    desc: "დაჯავშნის სისტემა კოტეჯებისთვის — ფილტრაცია, კალენდარი, ადმინ პანელი. Full-stack არქიტექტურა.",
    tags: ["React", "API", "PostgreSQL"],
    live: "#",
    github: "#",
    offset: "offset-left",
  },
];

const skills = [
  { name: "HTML", level: 90, icon: "◈" },
  { name: "CSS", level: 88, icon: "◆" },
  { name: "JavaScript", level: 75, icon: "◇" },
  { name: "React", level: 72, icon: "⬡" },
  { name: "Node.js", level: 65, icon: "⬢" },
  { name: "TypeScript", level: 60, icon: "⬣" },
];

const socials = [
  { label: "GitHub", href: "https://github.com", icon: "GH" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "IN" },
  { label: "Email", href: "mailto:gdiasamidze848@gmail.com", icon: "@" },
];

function SkillBar({ skill, index }) {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(skill.level), index * 80);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [skill.level, index]);

  return (
    <div className="skill-bar-item" ref={ref}>
      <div className="skill-bar-header">
        <span className="skill-bar-name">{skill.name}</span>
        <span className="skill-bar-pct">{width}%</span>
      </div>
      <div className="skill-bar-track">
        <div className="skill-bar-fill" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 3000);
  };

  return (
    <div className={`app ${loaded ? "app-loaded" : ""}`}>
      <CustomCursor />
      <Particles />

      <div className="noise-overlay" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />

      {/* NAV */}
      <nav className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
        <a href="#" className="nav-logo" data-cursor="hover">
          <span className="nav-logo-text">GG</span>
          <span className="nav-logo-slash">//</span>
          <span className="nav-logo-sub">DEV</span>
        </a>
        <ul className="nav-links">
          <li><a href="#about" data-cursor="hover">About</a></li>
          <li><a href="#skills" data-cursor="hover">Skills</a></li>
          <li><a href="#projects" data-cursor="hover">Projects</a></li>
          <li><a href="#contact" className="nav-cta" data-cursor="hover">Contact</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-watermark" aria-hidden="true">GG</div>

        <div className="hero-grid">
          <div className={`hero-avatar-col ${loaded ? "avatar-revealed" : ""}`}>
            <div className="avatar-smoke" aria-hidden="true" />
            <div className="avatar-frame">
              <div className="avatar-mask-ring" />
              <div className="avatar-inner">
                <img src={profilePhoto} alt="გიორგი დიასამიძე" />
                <div className="avatar-scan" aria-hidden="true" />
              </div>
              <div className="avatar-corner tl" />
              <div className="avatar-corner tr" />
              <div className="avatar-corner bl" />
              <div className="avatar-corner br" />
            </div>
          </div>

          <div className="hero-content">
            <div className="hero-status">
              <span className="status-dot" />
              <span>AVAILABLE FOR WORK</span>
            </div>

            <p className="hero-eyebrow">// FULL-STACK DEVELOPER</p>

            <h1 className="hero-title">
              <GlitchText text="გიორგი" className="hero-name" as="span" />
              <br />
              <span className="hero-surname">
                <GlitchText text="დიასამიძე" as="span" />
              </span>
            </h1>

            <p className="hero-tagline">
              <code className="terminal-line">
                <span className="prompt">&gt;</span> ვებ-აპლიკაციები, რომლებიც{" "}
                <span className="neon-word">არ ივიწყება</span>
              </code>
            </p>

            <div className="hero-actions">
              <a href="#projects" className="btn-neon" data-cursor="hover">
                <span>VIEW WORK</span>
                <span className="btn-arrow">→</span>
              </a>
              <a href="#contact" className="btn-ghost" data-cursor="hover">
                HIRE ME
              </a>
            </div>

            <div className="hero-stats">
              <div className="hero-stat">
                <span className="stat-num">9+</span>
                <span className="stat-label">თვე გამოცდილება</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="stat-num">3</span>
                <span className="stat-label">live პროექტი</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-scroll" aria-hidden="true">
          <span>SCROLL</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* ABOUT */}
      <section className="section about" id="about">
        <ScrollReveal>
          <div className="section-header asymmetric">
            <span className="section-index">01</span>
            <h2 className="section-title">ABOUT</h2>
            <div className="section-line" />
          </div>
        </ScrollReveal>

        <div className="about-grid">
          <ScrollReveal delay={100}>
            <div className="about-card">
              <div className="about-border-glow" />
              <p className="about-lead">
                კოდი 3AM-ზე. <span className="neon">არავითარი კომპრომისი.</span>
              </p>
              <p className="about-body">
                მე ვარ ვებ დეველოპერი, რომელიც ქმნის თანამედროვე, ეფექტურ და
                მომხმარებელზე ორიენტირებულ პროდუქტებს. React, Node.js და
                TypeScript — ჩემი იარაღი. ყოველი პროექტი არის ბитва UI/UX-სა და
                clean code-ს შორის.
              </p>
              <div className="about-code">
                <pre>{`const dev = {
  name: "გიორგი დიასამიძე",
  role: "Full-Stack Developer",
  stack: ["React", "Node", "TS"],
  status: "hunting_bugs()",
};`}</pre>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="about-side">
              <div className="about-tag">// MISSION</div>
              <p>რეალური ღირებულება — მომხმარებლებისთვის და ბიზნესისთვის.</p>
              <div className="about-tag">// FOCUS</div>
              <p>Frontend craft. Backend logic. Zero mercy on bugs.</p>
              <div className="about-tag">// LOCATION</div>
              <p>Georgia — remote ready</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SKILLS */}
      <section className="section skills-section" id="skills">
        <ScrollReveal>
          <div className="section-header asymmetric flip">
            <span className="section-index">02</span>
            <h2 className="section-title">SKILLS</h2>
            <div className="section-line" />
          </div>
        </ScrollReveal>

        <div className="skills-layout">
          <ScrollReveal delay={100}>
            <div className="hex-grid">
              {skills.map((s, i) => (
                <div
                  className="hex-cell"
                  key={s.name}
                  style={{ animationDelay: `${i * 0.08}s` }}
                  data-cursor="hover"
                >
                  <div className="hex-inner">
                    <span className="hex-icon">{s.icon}</span>
                    <span className="hex-name">{s.name}</span>
                    <span className="hex-level">{s.level}%</span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="skill-bars">
              {skills.map((s, i) => (
                <SkillBar key={s.name} skill={s} index={i} />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="section projects-section" id="projects">
        <ScrollReveal>
          <div className="section-header asymmetric">
            <span className="section-index">03</span>
            <h2 className="section-title">PROJECTS</h2>
            <div className="section-line" />
          </div>
        </ScrollReveal>

        <div className="projects-stack">
          {projects.map((p, i) => (
            <ScrollReveal key={p.id} delay={i * 120}>
              <article className={`project-card ${p.offset}`} data-cursor="hover">
                <div className="project-id">{p.id}</div>
                <div className="project-glow" aria-hidden="true" />
                <div className="project-content">
                  <h3 className="project-title">{p.title}</h3>
                  <p className="project-desc">{p.desc}</p>
                  <div className="project-tags">
                    {p.tags.map((t) => (
                      <span className="project-tag" key={t}>{t}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a href={p.live} className="project-link" data-cursor="hover">
                      <span>LIVE</span>
                      <span>↗</span>
                    </a>
                    <a href={p.github} className="project-link" data-cursor="hover">
                      <span>GITHUB</span>
                      <span>⌥</span>
                    </a>
                  </div>
                </div>
                <div className="project-terminal" aria-hidden="true">
                  <div className="terminal-bar">
                    <span /><span /><span />
                  </div>
                  <div className="terminal-body">
                    <span className="t-green">$ deploy --prod</span>
                    <span className="t-dim">building...</span>
                    <span className="t-green">✓ {p.title} online</span>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="section contact-section" id="contact">
        <ScrollReveal>
          <div className="section-header asymmetric flip">
            <span className="section-index">04</span>
            <h2 className="section-title">CONTACT</h2>
            <div className="section-line" />
          </div>
        </ScrollReveal>

        <div className="contact-grid">
          <ScrollReveal delay={100}>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">NAME</label>
                <input id="name" type="text" placeholder="your name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">EMAIL</label>
                <input id="email" type="email" placeholder="you@email.com" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">MESSAGE</label>
                <textarea id="message" rows={4} placeholder="tell me about your project..." required />
              </div>
              <button type="submit" className="btn-neon btn-full" data-cursor="hover">
                {formSent ? "SENT ✓" : "SEND TRANSMISSION"}
              </button>
            </form>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="contact-side">
              <a href="mailto:gdiasamidze848@gmail.com" className="contact-email" data-cursor="hover">
                gdiasamidze848@gmail.com
              </a>
              <p className="contact-note">
                ვეძებ შესაძლებლობას შევუერთდე გუნდს, რომელიც აფასებს bold დიზაინსა და
                clean code-ს.
              </p>
              <div className="social-grid">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="social-icon"
                    aria-label={s.label}
                    data-cursor="hover"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="social-glyph">{s.icon}</span>
                    <span className="social-label">{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <footer className="footer">
        <span className="footer-left">© 2026 GIORGI DIASAMIDZE</span>
        <span className="footer-center neon-flicker">GG // NO MERCY</span>
        <span className="footer-right">FULL-STACK DEV</span>
      </footer>
    </div>
  );
}
