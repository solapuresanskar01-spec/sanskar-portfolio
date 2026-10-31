import { ArrowUpRight, Mail } from 'lucide-react'
import { links } from '../data/links.js'

function Contact() {
  return (
    <section className="section contact-section section-anchor" id="contact">
      <div className="container contact-grid">
        <div>
          <p className="eyebrow">06 — GET IN TOUCH</p>
          <h2>Have an opportunity?<br /><span>Let’s talk.</span></h2>
          <p className="contact-intro">
            Open to learning-focused software engineering internship opportunities
            and conversations about building useful software.
          </p>
        </div>
        <a className="contact-email" href={links.email}>
          <span className="contact-mail-icon"><Mail size={20} /></span>
          <span><small>Drop me a line</small><strong>solapuresanskar01@gmail.com</strong></span>
          <ArrowUpRight size={20} />
        </a>
      </div>
    </section>
  )
}

export default Contact
