import { useState } from 'react'
import { ArrowDownToLine, Menu, Moon, Sun, X } from 'lucide-react'
import { resumeConfig } from '../data/resume.js'

const navigation = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

function Navbar({ theme, activeSection, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false)

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className="topbar">
      <nav className="nav-wrap container" aria-label="Main navigation">
        <a className="brand" href="#home" onClick={closeMenu}>
          <span className="brand-mark">S.</span>
          <span>Sanskar Solapure</span>
        </a>

        <button
          className="icon-button mobile-menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div
          className={`nav-content${menuOpen ? ' nav-content-open' : ''}`}
          id="primary-navigation"
        >
          <div className="nav-links">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                aria-current={activeSection === item.href.slice(1) ? 'location' : undefined}
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="nav-actions">
            <button
              className="icon-button theme-toggle"
              type="button"
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              aria-pressed={theme === 'dark'}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            {resumeConfig.available ? (
              <a
                className="button button-small button-outline"
                href={resumeConfig.filePath}
                download={resumeConfig.downloadFileName}
                aria-label="Download Sanskar Solapure's resume"
              >
                <ArrowDownToLine size={15} />
                Resume
              </a>
            ) : (
              <button
                className="button button-small button-outline button-disabled"
                type="button"
                disabled
                aria-disabled="true"
                title="Add a resume PDF to enable this download"
              >
                <ArrowDownToLine size={15} />
                Resume
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
