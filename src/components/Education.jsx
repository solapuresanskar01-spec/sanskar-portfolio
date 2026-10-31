import { ArrowUpRight, GraduationCap, MapPin } from 'lucide-react'

function Education() {
  return (
    <section className="section section-muted section-anchor" id="education">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">04 — EDUCATION</p>
          <h2>Learning the <span>fundamentals.</span></h2>
        </div>
        <article className="education-card">
          <div className="education-symbol"><GraduationCap size={24} /></div>
          <div className="education-details">
            <p className="education-degree">Bachelor’s degree · Computer Science Engineering</p>
            <h3>All India Shri Shivaji Memorial Society’s<br className="desktop-break" /> Institute of Information Technology</h3>
            <p className="education-location"><MapPin size={15} /> Pune, Maharashtra, India</p>
          </div>
          <div className="education-date">
            <span>Expected graduation</span>
            <strong>2029</strong>
            <ArrowUpRight size={17} />
          </div>
        </article>
      </div>
    </section>
  )
}

export default Education
