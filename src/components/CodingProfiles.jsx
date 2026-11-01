import { links } from '../data/links.js'

const profiles = [
  { name: 'GitHub', identity: 'solapuresanskar01-spec', url: links.github },
  { name: 'LeetCode', identity: 'sanskarsolapure', url: links.leetcode },
  { name: 'LinkedIn', identity: 'Sanskar Solapure', url: links.linkedin },
]

function CodingProfiles() {
  return (
    <section className="section section-anchor" id="profiles">
      <div className="container">
        <div className="section-heading">
          <h2>Profiles</h2>
        </div>
        <ul className="profile-list">
          {profiles.map(({ name, identity, url }) => (
            <li key={name}>
              <a href={url} target="_blank" rel="noopener noreferrer">
                <span>{name}</span>
                <span>{identity}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default CodingProfiles
