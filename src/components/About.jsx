import { ArrowUpRight, Braces, Code2, GraduationCap } from 'lucide-react'

const highlights = [
  { icon: GraduationCap, label: 'Studying', value: 'Computer Science Engineering' },
  { icon: Code2, label: 'Practicing', value: 'Programming & problem solving' },
  { icon: Braces, label: 'Building', value: 'Practical software projects' },
]

function About() {
  return (
    <section className="section section-anchor" id="about">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">01 — A LITTLE ABOUT ME</p>
          <h2>Curiosity, meet <span>code.</span></h2>
        </div>
        <div className="about-grid">
          <div className="about-copy">
            <p>
              Hi, I&apos;m Sanskar Solapure, a second-year Computer Science Engineering student at AISSMS Institute of Information Technology, Pune.
            </p>
            <p>
              I&apos;m interested in full-stack development and exploring Artificial Intelligence and Machine Learning. I enjoy turning real-world problems into practical software solutions and learning new technologies through hands-on projects.
            </p>
            <p>
              Through Smart Campus, I&apos;ve gained practical experience with database integration, Supabase, and application deployment. I also practice problem-solving through LeetCode and participate in coding contests and hackathons.
            </p>
            <p>
              I&apos;m currently strengthening my programming fundamentals and looking for internship opportunities where I can contribute to real projects, learn from experienced developers, and improve my engineering skills.
            </p>
            <a className="text-link" href="#contact">
              Let’s connect <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="about-highlights">
            {highlights.map(({ icon: Icon, label, value }) => (
              <div className="highlight-row" key={label}>
                <span className="highlight-icon"><Icon size={19} /></span>
                <span className="highlight-text">
                  <span>{label}</span>
                  <strong>{value}</strong>
                </span>
                <span className="highlight-arrow">↗</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
