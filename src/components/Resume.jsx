import { ArrowDownToLine, ExternalLink } from 'lucide-react'
import { resumeConfig } from '../data/resume.js'

function Resume() {
  if (!resumeConfig.available) return null

  return (
    <section className="resume-section section-anchor" id="resume">
      <div className="container resume-panel">
        <h2>Resume</h2>
        <div className="resume-actions">
          <a
            className="button button-primary resume-button"
            href={resumeConfig.filePath}
            download={resumeConfig.downloadFileName}
          >
            <ArrowDownToLine size={17} /> Download
          </a>
          <a
            className="button button-outline resume-button"
            href={resumeConfig.filePath}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink size={17} /> View
          </a>
        </div>
      </div>
    </section>
  )
}

export default Resume
