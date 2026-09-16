const footerLinks = ['FAQ', 'Help Centre', 'Account', 'Media Centre', 'Investor Relations', 'Jobs', 'Ways to Watch', 'Terms of Use', 'Privacy', 'Cookie Preferences', 'Corporate Information', 'Contact Us', 'Speed Test', 'Legal Notices', 'Only on Netflix']

function Footer() {
  return <footer className="home-footer">
    <p>Questions? Call <a href="tel:0008009191743">000-800-919-1743</a></p>
    <div className="footer-links">
      {footerLinks.map((item) => <a href={`#${item.toLowerCase().replaceAll(' ', '-')}`} key={item}>{item}</a>)}
    </div>
    <button className="language-button" type="button">Aあ English <span>▾</span></button>
    <p>Netflix India</p>
  </footer>
}

export default Footer
