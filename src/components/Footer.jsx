import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  const handleLinkClick = (linkName) => {
    alert(`${linkName} page coming soon! This is a demo.`)
  }

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>Sokarie Fashion</h3>
            <p>Your destination for elegant and modern fashion pieces. Quality clothing and accessories for the modern woman.</p>
          </div>
          <div className="footer-links">
            <div className="footer-section">
              <h4>Company</h4>
              <ul>
                <li><Link to="/about">About Us</Link></li>
                <li><a href="#" onClick={(e) => {e.preventDefault(); handleLinkClick('Careers')}}>Careers</a></li>
                <li><a href="#" onClick={(e) => {e.preventDefault(); handleLinkClick('Press')}}>Press</a></li>
                <li><Link to="/blog">Blog</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Support</h4>
              <ul>
                <li><Link to="/help">Help Center</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><a href="#" onClick={(e) => {e.preventDefault(); handleLinkClick('Returns')}}>Returns</a></li>
                <li><a href="#" onClick={(e) => {e.preventDefault(); handleLinkClick('Shipping')}}>Shipping</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Legal</h4>
              <ul>
                <li><a href="#" onClick={(e) => {e.preventDefault(); handleLinkClick('Terms & Conditions')}}>Terms & Conditions</a></li>
                <li><a href="#" onClick={(e) => {e.preventDefault(); handleLinkClick('Privacy Policy')}}>Privacy Policy</a></li>
                <li><a href="#" onClick={(e) => {e.preventDefault(); handleLinkClick('Sitemap')}}>Sitemap</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Copyright © 2025 Sokarie Fashion. All Rights Reserved.</p>
          <div className="footer-admin-link">
            <Link to="/admin/login" className="admin-link">Admin Portal</Link>
          </div>
          <div className="currency">
            <span>USD</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
