function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <a className="footer-brand" href="#home">Sanskar Solapure</a>
        <p>© {new Date().getFullYear()} Sanskar Solapure</p>
        <a className="back-top" href="#home">Back to top</a>
      </div>
    </footer>
  )
}

export default Footer
