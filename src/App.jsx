import Hero from './components/Hero.jsx'
import GitHubContributions from './components/GitHubContributions.jsx'
import Navbar from './components/Navbar.jsx'
import './styles/phase3.css'

function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar />
      <main className="portfolio-main" id="main-content">
        <Hero />
        <GitHubContributions />
      </main>
    </>
  )
}

export default App
