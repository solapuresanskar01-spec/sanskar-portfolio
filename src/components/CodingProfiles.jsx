import { ArrowUpRight, Code2, ContactRound } from 'lucide-react'
import { links } from '../data/links.js'

const profiles = [
  {
    name: 'GitHub',
    identity: 'solapuresanskar01-spec',
    description: 'Projects and code',
    url: links.github,
    icon: Code2,
    label: 'Open Sanskar’s GitHub profile in a new tab',
  },
  {
    name: 'LeetCode',
    identity: 'sanskarsolapure',
    description: 'Programming practice',
    url: links.leetcode,
    icon: Code2,
    label: 'Open Sanskar’s LeetCode profile in a new tab',
  },
  {
    name: 'LinkedIn',
    identity: 'Sanskar Solapure',
    description: 'Professional profile',
    url: links.linkedin,
    icon: ContactRound,
    label: 'Open Sanskar’s LinkedIn profile in a new tab',
  },
]

function CodingProfiles() {
  return (
    <section className="section section-anchor" id="profiles">
      <div className="container">
        <div className="section-heading section-heading-row">
          <div>
            <p className="eyebrow">05 — AROUND THE WEB</p>
            <h2>Find me <span>online.</span></h2>
          </div>
          <p className="section-aside">No inflated stats. Just the places<br />where I learn, build, and connect.</p>
        </div>
        <div className="profile-grid">
          {profiles.map(({ name, identity, description, url, icon: Icon, label }) => (
            <a
              className="profile-card"
              href={url}
              key={name}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
            >
              <span className="profile-icon"><Icon size={21} /></span>
              <span className="profile-copy">
                <strong>{name}</strong>
                <small className="profile-identity">{identity}</small>
                <small>{description}</small>
              </span>
              <ArrowUpRight className="profile-arrow" size={18} />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CodingProfiles
