import { useEffect, useState } from 'react'
import Aquarium from './components/Aquarium.jsx'
import GlobalRipple from './components/GlobalRipple.jsx'
import About from './components/About.jsx'
import CodingProfiles from './components/CodingProfiles.jsx'
import Contact from './components/Contact.jsx'
import Education from './components/Education.jsx'
import Footer from './components/Footer.jsx'
import Hero from './components/Hero.jsx'
import Navbar from './components/Navbar.jsx'
import Projects from './components/Projects.jsx'
import Resume from './components/Resume.jsx'
import Skills from './components/Skills.jsx'

const navigationSections = ['home', 'about', 'skills', 'projects', 'education', 'contact']

function App() {
  const [theme, setTheme] = useState(() => (
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
  ))
  const [activeSection, setActiveSection] = useState('home')

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = nextTheme
    setTheme(nextTheme)
  }

  useEffect(() => {
    try {
      window.localStorage.setItem('portfolio-theme', theme)
    } catch (error) {
      console.warn('Theme preference could not be saved.', error)
    }

    const themeColor = document.querySelector('meta[name="theme-color"]')
    if (themeColor) {
      themeColor.content = getComputedStyle(document.querySelector('.site-shell'))
        .getPropertyValue('--palette-background')
        .trim()
    }
  }, [theme])

  useEffect(() => {
    const sections = navigationSections
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    const observer = new IntersectionObserver((entries) => {
      const visibleSections = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => (
          Math.abs(a.boundingClientRect.top - window.innerHeight * 0.4)
          - Math.abs(b.boundingClientRect.top - window.innerHeight * 0.4)
        ))

      if (visibleSections[0]) setActiveSection(visibleSections[0].target.id)
    }, { rootMargin: '-35% 0px -55% 0px' })

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="site-shell" data-theme={theme}>
        <Aquarium />
        <Navbar theme={theme} activeSection={activeSection} onToggleTheme={toggleTheme} />
        <main id="main-content" tabIndex="-1">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Education />
          <CodingProfiles />
          <Resume />
          <Contact />
        </main>
        <Footer />
      </div>
      <GlobalRipple />
    </>
  )
}

export default App
