import { ArrowDownToLine, ExternalLink, FileText } from 'lucide-react'
import { resumeConfig } from '../data/resume.js'

function Resume() {
  return (
    <section className="resume-section section-anchor" id="resume">
      <div className="container resume-panel">
        <div className="resume-icon"><FileText size={22} /></div>
        <div className="resume-copy">
          <p className="eyebrow">THE NEXT CHAPTER</p>
          <h2>Let’s build something <span>useful.</span></h2>
          <p>
            {resumeConfig.available
              ? 'Take a look at my resume and the work I’m growing through.'
              : 'Resume coming soon. The PDF has not been added yet.'}
          </p>
        </div>
        {resumeConfig.available ? (
          <div className="resume-actions">
            <a
              className="button button-primary resume-button"
              href={resumeConfig.filePath}
              download={resumeConfig.downloadFileName}
            >
              <ArrowDownToLine size={17} /> Download Resume
            </a>
            <a
              className="button button-outline resume-button"
              href={resumeConfig.filePath}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={17} /> View Resume
            </a>
          </div>
        ) : (
          <button
            className="button button-primary resume-button button-disabled"
            type="button"
            disabled
            aria-disabled="true"
            title="Add a resume PDF to enable this download"
          >
            <ArrowDownToLine size={17} /> Resume coming soon
          </button>
        )}
      </div>
    </section>
  )
}

export default Resume
