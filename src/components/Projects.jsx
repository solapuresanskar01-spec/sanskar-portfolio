import { useState } from 'react'
import { ArrowUpRight, Code2, ExternalLink } from 'lucide-react'
import { projects } from '../data/projects.js'

function isValidExternalUrl(value) {
  try {
    const url = new URL(value)
    return url.protocol === 'https:' || url.protocol === 'http:'
  } catch {
    return false
  }
}

function ProjectCard({ project, index }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  function handlePointerMove(event) {
    if (
      event.pointerType !== 'mouse'
      || window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width
    const y = (event.clientY - bounds.top) / bounds.height
    setTilt({
      x: Number(((0.5 - y) * 4).toFixed(2)),
      y: Number(((x - 0.5) * 4).toFixed(2)),
    })
  }

  function resetTilt() {
    setTilt({ x: 0, y: 0 })
  }

  return (
    <article
      className="project-card"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      style={{ '--tilt-x': `${tilt.x}deg`, '--tilt-y': `${tilt.y}deg` }}
    >
      <div className={`project-art project-art-${index + 1}`} aria-hidden="true">
        <span className="project-art-index">0{index + 1}</span>
        <div className="project-art-mark">{project.name.slice(0, 1)}</div>
        <span className="project-art-line" />
        <ArrowUpRight className="project-art-arrow" size={18} />
      </div>
      <div className="project-card-content">
        <div className="project-title-line">
          <h3>{project.name}</h3>
          <span className="project-status"><i />{project.status}</span>
        </div>
        <p>{project.description}</p>
        <ul className="project-tags" aria-label="Technology stack">
          {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>
        <div className="project-actions project-cta">
          {isValidExternalUrl(project.liveUrl) && (
            <a
              className="button button-primary"
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.name} live demo in a new tab`}
            >
              Live Demo <ExternalLink size={16} />
            </a>
          )}
          {isValidExternalUrl(project.githubUrl) && (
            <a
              className="button button-outline"
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.name} GitHub repository in a new tab`}
            >
              <Code2 size={16} /> GitHub Repository
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
        <div className="section-heading section-heading-row">
          <div>
            <p className="eyebrow">03 — SELECTED WORK</p>
            <h2>Made while <span>learning.</span></h2>
          </div>
          <p className="section-aside">A campus maintenance application built with<br />React, Vite, Supabase, and PostgreSQL.</p>
        </div>
        <div className={`project-grid${projects.length === 1 ? ' project-grid-single' : ''}`}>
          {projects.map((project, index) => (
            <ProjectCard project={project} index={index} key={project.name} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
