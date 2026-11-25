import { CodeXml } from 'lucide-react'
import { socialLinks } from '../data/portfolio.js'

function SocialLinks({ className = '', showLabels = false }) {
  return (
    <ul aria-label="Social profiles" className={`social-links ${className}`.trim()}>
      {socialLinks.map(({ href, icon, label }) => {
        return (
          <li key={label}>
            <a
              aria-label={label}
              className="social-links__link"
              href={href}
              rel="noopener noreferrer"
              target="_blank"
            >
              {icon === 'github' ? (
                <svg
                  aria-hidden="true"
                  className="social-links__github-icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 .297a12 12 0 0 0-3.793 23.385c.6.111.82-.261.82-.577v-2.234c-3.338.726-4.043-1.416-4.043-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.419-1.305.762-1.605-2.665-.304-5.467-1.333-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.323 3.3 1.23a11.5 11.5 0 0 1 6.007 0c2.29-1.553 3.296-1.23 3.296-1.23.655 1.652.243 2.873.12 3.176.77.84 1.235 1.91 1.235 3.221 0 4.61-2.807 5.624-5.48 5.921.43.372.814 1.103.814 2.222v3.293c0 .319.216.694.825.576A12.001 12.001 0 0 0 12 .297Z" />
                </svg>
              ) : icon === 'code' ? (
                <CodeXml aria-hidden="true" size={18} strokeWidth={1.8} />
              ) : (
                <span aria-hidden="true" className={`social-links__mark social-links__mark--${icon}`}>
                  in
                </span>
              )}
              {showLabels && <span>{label}</span>}
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export default SocialLinks
