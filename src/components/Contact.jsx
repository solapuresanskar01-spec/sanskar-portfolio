import { useState } from 'react'
import { links } from '../data/links.js'

const email = links.email.slice('mailto:'.length)

function Contact() {
  const [copyStatus, setCopyStatus] = useState('')

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email)
      setCopyStatus('Copied')
    } catch {
      setCopyStatus('Copy failed. Select and copy the email address.')
    }
  }

  return (
    <section className="section contact-section section-anchor" id="contact">
      <div className="container contact-grid">
        <h2>Contact</h2>
        <div className="contact-details">
          <p className="contact-email-text">{email}</p>
          <div className="contact-actions">
            <button className="button button-outline" type="button" onClick={copyEmail}>
              Copy
            </button>
            <a className="button button-primary" href={links.email}>Email</a>
          </div>
          <p className="copy-status" aria-live="polite">{copyStatus}</p>
        </div>
      </div>
    </section>
  )
}

export default Contact
