import { projects } from '../data/projects.js'

function isValidExternalUrl(value) {
  try {
    const url = new URL(value)
    return url.protocol === 'https:' || url.protocol === 'http:'
  } catch {
    return false
  }
}

function ProjectCard({ project }) {
  return (
    <article className="project-card">
      {project.screenshot ? (
        <img
          className="project-screenshot"
          src={project.screenshot}
          width="1920"
          height="1080"
          loading="lazy"
          alt={project.screenshotAlt}
        />
      ) : (
        <div className="project-screenshot-placeholder">
          <p>TODO(sanskar): Add a screenshot for {project.name}.</p>
        </div>
      )}
      <div className="project-card-content">
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <ul className="project-features">
          {project.features.map((feature) => <li key={feature}>{feature}</li>)}
        </ul>
        <p className="project-stack"><strong>Stack:</strong> {project.technologies.join(', ')}</p>
        <div className="project-cta">
          {isValidExternalUrl(project.liveUrl) && (
            <a className="button button-primary" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              Live
            </a>
          )}
          {isValidExternalUrl(project.githubUrl) && (
            <a className="button button-outline" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              Code
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

function Projects() {
  return (
    <section className="section section-anchor" id="projects">
      <div className="container">
        <div className="section-heading">
          <h2>Projects</h2>
        </div>
        <div className="project-grid">
          {projects.map((project) => <ProjectCard project={project} key={project.name} />)}
        </div>
      </div>
    </section>
  )
}

export default Projects
