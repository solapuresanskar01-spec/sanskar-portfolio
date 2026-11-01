import { skillGroups } from '../data/skills.js'

function Skills() {
  return (
    <section className="section section-muted section-anchor" id="skills">
      <div className="container">
        <div className="section-heading">
          <h2>Skills</h2>
        </div>
        <dl className="skill-groups">
          {skillGroups.map((group) => (
            <div className="skill-group" key={group.name}>
              <dt>{group.name}</dt>
              <dd>
                {group.skills.map((skill) => (
                  <span className="skill-item" key={skill.name}>
                    <span>{skill.name}</span>
                    {skill.context && <small>{skill.context}</small>}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export default Skills
