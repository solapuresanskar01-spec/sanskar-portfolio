import { ArrowUp, Code2, ContactRound } from 'lucide-react'
import { links } from '../data/links.js'

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <a className="footer-brand" href="#home">Sanskar Solapure<span>.</span></a>
        <p>Made with intention · © {new Date().getFullYear()} Sanskar Solapure</p>
        <div className="footer-right">
          <div className="footer-socials" aria-label="Social profiles">
            <a href={links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Code2 size={16} /></a>
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><ContactRound size={16} /></a>
            <a href={links.leetcode} target="_blank" rel="noopener noreferrer" aria-label="LeetCode"><Code2 size={16} /></a>
          </div>
          <a className="back-top" href="#home"><ArrowUp size={15} /> Back to top</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
