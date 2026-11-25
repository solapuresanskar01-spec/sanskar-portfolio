import { ArrowDownRight, ArrowUpRight, Mail } from 'lucide-react'
import { portfolioOwner } from '../data/portfolio.js'
import SocialLinks from './SocialLinks.jsx'

function Hero() {
  return (
    <section aria-labelledby="hero-title" className="hero" id="home">
      <div className="hero__card">
        <div className="hero__content">
          <p className="hero__eyebrow">
            <span aria-hidden="true" className="hero__status-dot" />
            {portfolioOwner.role}
          </p>
          <h1 className="hero__title" id="hero-title">{portfolioOwner.name}</h1>
          <p className="hero__education">{portfolioOwner.education}</p>
          <p className="hero__graduation">{portfolioOwner.graduation}</p>
          <a className="hero__email" href={`mailto:${portfolioOwner.email}`}>
            <Mail aria-hidden="true" size={17} strokeWidth={1.8} />
            <span>{portfolioOwner.email}</span>
          </a>

          <div className="hero__actions">
            <a className="button button--primary hero__projects-button" href="#projects">
              View Projects
              <ArrowDownRight aria-hidden="true" size={18} />
            </a>
            <a className="button button--secondary" href={`mailto:${portfolioOwner.email}`}>
              Email Me
              <ArrowUpRight aria-hidden="true" size={17} />
            </a>
            <a className="button button--text" href={portfolioOwner.resume} rel="noreferrer" target="_blank">
              Resume
              <ArrowUpRight aria-hidden="true" size={16} />
            </a>
          </div>

          <SocialLinks className="hero__socials" showLabels />
        </div>

        <div className="hero__portrait">
          <img
            alt="Illustrated portrait of Sanskar Solapure"
            className="hero__portrait-image"
            src="/assets/profile.png"
          />
          <span aria-hidden="true" className="hero__portrait-caption">PUNE, INDIA</span>
        </div>
      </div>
    </section>
  )
}

export default Hero
