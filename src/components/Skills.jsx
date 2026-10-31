import { ArrowUpRight } from 'lucide-react'
import { skillGroups } from '../data/skills.js'

function Skills() {
  return (
    <section className="section section-muted section-anchor" id="skills">
      <div className="container">
        <div className="section-heading section-heading-row">
          <div>
            <p className="eyebrow">02 — THE TOOLKIT</p>
            <h2>Skills I’m <span>growing.</span></h2>
          </div>
          <p className="section-aside">A work in progress, by design.<br />Learning through practice and projects.</p>
        </div>
        <div className="skill-grid">
          {skillGroups.map((group, index) => (
            <article className="skill-card" key={group.name}>
              <div className="skill-card-top">
                <span className="skill-index">0{index + 1}</span>
                <ArrowUpRight size={17} />
              </div>
              <h3>{group.name}</h3>
              <div className="skill-list">
                {group.skills.map((skill) => (
                  <span className="skill-pill" key={skill.name}>
                    {skill.name}
                    {skill.status && <small>{skill.status}</small>}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
