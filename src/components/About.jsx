function About() {
  return (
    <section className="section section-anchor" id="about">
      <div className="container">
        <div className="section-heading">
          <h2>About</h2>
        </div>
        <div className="about-grid">
          <div className="about-copy">
            <p>
              I’m a second-year Computer Science Engineering student at AISSMS Institute of Information Technology in Pune.
              I built Smart Campus with React, Vite, Supabase, PostgreSQL, and Vercel.
            </p>
            <p>
              I’m interested in full-stack development, artificial intelligence, and machine learning.
              I also practice on LeetCode and have participated in coding contests and hackathons.
            </p>
          </div>
          <dl className="about-facts">
            <div>
              <dt>College</dt>
              <dd>AISSMS Institute of Information Technology</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>Pune, Maharashtra, India</dd>
            </div>
            <div>
              <dt>Focus</dt>
              <dd>Full-stack development, AI, and machine learning</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}

export default About
