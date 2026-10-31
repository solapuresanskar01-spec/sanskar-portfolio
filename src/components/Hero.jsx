import { ArrowDown, ArrowRight, Code2, ContactRound } from 'lucide-react'
import { links } from '../data/links.js'

const socialLinks = [
  { label: 'GitHub', href: links.github, icon: Code2 },
  { label: 'LinkedIn', href: links.linkedin, icon: ContactRound },
  { label: 'LeetCode', href: links.leetcode, icon: Code2 },
]

function Hero({ onViewProjects }) {
  return (
    <section className="hero-section section-anchor" id="home">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> HELLO, WORLD! I'M</p>
          <h1>SANSKAR <span>SOLAPURE</span></h1>
          <p className="internship-badge">
            <span className="internship-indicator" aria-hidden="true" />
            Open to Software Development Internships
          </p>
          <div className="hero-socials" aria-label="Social profiles">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                className="social-link"
                href={href}
                key={label}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
              >
                <Icon size={16} />
                <span>{label}</span>
              </a>
            ))}
          </div>
          <p className="hero-role">Aspiring Software Engineer</p>
          <p className="hero-tech-stack">C++ <span>·</span> Python <span>·</span> JavaScript</p>
          <p className="hero-description">
            Computer Science Engineering student building practical projects,
            solving programming challenges, and turning ideas into useful software.
          </p>
          <div className="hero-buttons">
            <a className="button button-primary" href="#projects" onClick={onViewProjects}>
              View Projects <ArrowRight size={17} />
            </a>
            <a className="button button-quiet" href="#contact">Contact Me</a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="floating-chip chip-top">Building in public <span>↗</span></div>
          <div className="hero-language-badges" aria-label="Programming languages">
            <span className="language-badge"><b aria-hidden="true">C++</b><span>C++</span></span>
            <span className="language-badge"><b aria-hidden="true">Py</b><span>Python</span></span>
            <span className="language-badge"><b aria-hidden="true">JS</b><span>JavaScript</span></span>
          </div>
        </div>
      </div>
      <a className="scroll-cue" href="#about">
        <span>Scroll to explore</span><ArrowDown size={15} />
      </a>
    </section>
  )
}

export default Hero
