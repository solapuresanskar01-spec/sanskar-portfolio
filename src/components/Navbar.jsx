import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { portfolioOwner } from '../data/portfolio.js'
import SocialLinks from './SocialLinks.jsx'

const sectionLinks = [
  ['Projects', '#projects'],
  ['Skills', '#skills'],
  ['About', '#about'],
  ['Education', '#education'],
]

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuButtonRef = useRef(null)

  useEffect(() => {
    if (!isMenuOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a aria-label={`${portfolioOwner.name}, home`} className="site-brand" href="#home" onClick={closeMenu}>
          <span aria-hidden="true" className="site-brand__monogram">SS</span>
          <span className="site-brand__name">Sanskar Solapure</span>
        </a>

        <button
          aria-controls="primary-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="site-header__menu-toggle"
          onClick={() => setIsMenuOpen((open) => !open)}
          ref={menuButtonRef}
          type="button"
        >
          {isMenuOpen ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
        </button>

        <nav
          aria-label="Main navigation"
          className={`site-navigation${isMenuOpen ? ' site-navigation--open' : ''}`}
          id="primary-navigation"
        >
          <a className="site-navigation__link" href="#home" onClick={closeMenu}>Home</a>
          {sectionLinks.map(([label, href]) => (
            <a className="site-navigation__link" href={href} key={href} onClick={closeMenu}>
              {label}
            </a>
          ))}
          <a className="site-navigation__link" href={`mailto:${portfolioOwner.email}`} onClick={closeMenu}>
            Contact
          </a>
          <div className="site-navigation__mobile-actions">
            <SocialLinks className="site-navigation__socials" />
            <a className="button button--primary" href={`mailto:${portfolioOwner.email}`} onClick={closeMenu}>
              Contact me
            </a>
            <a className="button button--secondary" href={portfolioOwner.resume} onClick={closeMenu} rel="noreferrer" target="_blank">
              Resume
            </a>
          </div>
        </nav>

        <SocialLinks className="site-header__socials" />

        <div className="site-header__actions">
          <a className="button button--secondary" href={portfolioOwner.resume} rel="noreferrer" target="_blank">
            Resume
          </a>
          <a className="button button--primary" href={`mailto:${portfolioOwner.email}`}>
            Contact
          </a>
        </div>
      </div>
    </header>
  )
}

export default Navbar
