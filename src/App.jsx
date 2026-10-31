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

function App() {
  const [theme, setTheme] = useState('dark')
  const [projectJourney, setProjectJourney] = useState({ active: false, key: 0 })

  function toggleTheme() {
    setTheme((currentTheme) => currentTheme === 'dark' ? 'light' : 'dark')
  }

  function startProjectJourney() {
    setProjectJourney((journey) => ({ active: true, key: journey.key + 1 }))
  }

  useEffect(() => {
    if (!projectJourney.active) return undefined

    const projectsSection = document.getElementById('projects')
    if (!projectsSection) {
      throw new Error('Projects section was not found.')
    }

    const stopWhenProjectsAreVisible = () => {
      const bounds = projectsSection.getBoundingClientRect()
      if (bounds.top < window.innerHeight && bounds.bottom > 0) {
        setProjectJourney((journey) => ({ ...journey, active: false }))
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setProjectJourney((journey) => ({ ...journey, active: false }))
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(projectsSection)
    window.addEventListener('scroll', stopWhenProjectsAreVisible, { passive: true })
    stopWhenProjectsAreVisible()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', stopWhenProjectsAreVisible)
    }
  }, [projectJourney.active, projectJourney.key])

  return (
    <>
      <div className="site-shell" data-theme={theme}>
        <Aquarium />
        <Navbar theme={theme} onToggleTheme={toggleTheme} />
        <main>
          <Hero onViewProjects={startProjectJourney} />
          <About />
          <Skills />
          <Projects />
          <Education />
          <CodingProfiles />
          <Resume />
          <Contact />
        </main>
        {projectJourney.active && (
          <div className="project-journey-indicator" role="status" aria-label="Scrolling to projects">
            <span />
            <span className="visually-hidden">Scrolling to projects</span>
          </div>
        )}
        <Footer />
      </div>
      <GlobalRipple />
    </>
  )
}

export default App
