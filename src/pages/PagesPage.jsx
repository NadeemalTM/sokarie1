import React from 'react'
import './PagesPage.css'

const PagesPage = () => {
  const pageLinks = [
    {
      title: 'About Us',
      description: 'Learn about our story, mission, and the team behind Sokarie Fashion.',
      icon: '👥',
      action: () => alert('About Us page - Learn about our company history and values')
    },
    {
      title: 'Contact',
      description: 'Get in touch with our customer service team for any inquiries.',
      icon: '📞',
      action: () => alert('Contact page - Phone: +1-800-SOKARIE, Email: hello@sokarie.com')
    },
    {
      title: 'Size Guide',
      description: 'Find your perfect fit with our comprehensive sizing charts.',
      icon: '📏',
      action: () => alert('Size Guide - Detailed measurements for all our clothing items')
    },
    {
      title: 'Shipping Info',
      description: 'Delivery options, shipping costs, and estimated delivery times.',
      icon: '🚚',
      action: () => alert('Shipping Info - Free shipping over $100, 2-5 business days delivery')
    },
    {
      title: 'Return Policy',
      description: '30-day return policy with easy returns and exchanges.',
      icon: '↩️',
      action: () => alert('Return Policy - 30-day returns, free return shipping')
    },
    {
      title: 'FAQ',
      description: 'Frequently asked questions and helpful answers.',
      icon: '❓',
      action: () => alert('FAQ - Common questions about orders, shipping, and returns')
    },
    {
      title: 'Privacy Policy',
      description: 'How we protect and use your personal information.',
      icon: '🔒',
      action: () => alert('Privacy Policy - We protect your data with industry-standard security')
    },
    {
      title: 'Terms of Service',
      description: 'Terms and conditions for using our website and services.',
      icon: '📄',
      action: () => alert('Terms of Service - Legal terms for using our platform')
    },
    {
      title: 'Careers',
      description: 'Join our team and help shape the future of fashion.',
      icon: '💼',
      action: () => alert('Careers - Currently hiring: Fashion Buyer, UX Designer, Customer Service')
    },
    {
      title: 'Store Locator',
      description: 'Find Sokarie Fashion stores near you.',
      icon: '📍',
      action: () => alert('Store Locator - 12 locations across major cities')
    },
    {
      title: 'Gift Cards',
      description: 'Purchase gift cards for friends and family.',
      icon: '🎁',
      action: () => alert('Gift Cards - Available in $25, $50, $100, and $200 denominations')
    },
    {
      title: 'Loyalty Program',
      description: 'Earn points with every purchase and unlock exclusive rewards.',
      icon: '⭐',
      action: () => alert('Loyalty Program - Earn 1 point per $1 spent, redeem for discounts')
    }
  ]

  return (
    <div className="pages-page">
      <div className="animated-background">
        <div className="floating-shape grid-1"></div>
        <div className="floating-shape grid-2"></div>
        <div className="floating-shape connect-line-1"></div>
        <div className="floating-shape connect-line-2"></div>
        <div className="floating-shape node-1"></div>
        <div className="floating-shape node-2"></div>
        <div className="floating-shape node-3"></div>
      </div>
      <div className="page-header">
        <h1>Site Pages</h1>
        <p>Explore all the helpful pages and resources available on our website</p>
      </div>

      <div className="pages-container">
        <div className="pages-grid">
          {pageLinks.map((page, index) => (
            <div key={index} className="page-card" onClick={page.action}>
              <div className="page-icon">{page.icon}</div>
              <h3 className="page-title">{page.title}</h3>
              <p className="page-description">{page.description}</p>
              <button className="page-btn">Visit Page</button>
            </div>
          ))}
        </div>

        <div className="help-section">
          <h2>Need Help?</h2>
          <div className="help-content">
            <div className="help-text">
              <h3>We're Here to Assist You</h3>
              <p>
                Our customer service team is available 24/7 to help with any questions 
                or concerns you may have. Whether you need sizing help, want to track 
                an order, or need styling advice, we're here for you.
              </p>
              
              <div className="contact-methods">
                <div className="contact-method">
                  <strong>📞 Phone Support</strong>
                  <p>Call us at +1-800-SOKARIE (Mon-Sun, 24/7)</p>
                </div>
                <div className="contact-method">
                  <strong>💬 Live Chat</strong>
                  <p>Chat with us directly on our website</p>
                </div>
                <div className="contact-method">
                  <strong>📧 Email Support</strong>
                  <p>Send us an email at support@sokarie.com</p>
                </div>
              </div>
              
              <button className="contact-btn" onClick={() => alert('Opening live chat...')}>
                Start Live Chat
              </button>
            </div>
            <div className="help-image">
              <img src="/src/images/1 (2).png" alt="Customer Service" />
            </div>
          </div>
        </div>

        <div className="quick-links">
          <h2>Quick Links</h2>
          <div className="quick-links-grid">
            <div className="quick-link-category">
              <h4>Shopping</h4>
              <ul>
                <li><button onClick={() => alert('New Arrivals page')}>New Arrivals</button></li>
                <li><button onClick={() => alert('Sale page')}>Sale Items</button></li>
                <li><button onClick={() => alert('Best Sellers page')}>Best Sellers</button></li>
                <li><button onClick={() => alert('Gift Guide page')}>Gift Guide</button></li>
              </ul>
            </div>
            <div className="quick-link-category">
              <h4>Account</h4>
              <ul>
                <li><button onClick={() => alert('My Orders page')}>My Orders</button></li>
                <li><button onClick={() => alert('Wishlist page')}>Wishlist</button></li>
                <li><button onClick={() => alert('Address Book page')}>Address Book</button></li>
                <li><button onClick={() => alert('Payment Methods page')}>Payment Methods</button></li>
              </ul>
            </div>
            <div className="quick-link-category">
              <h4>Company</h4>
              <ul>
                <li><button onClick={() => alert('Our Story page')}>Our Story</button></li>
                <li><button onClick={() => alert('Press page')}>Press</button></li>
                <li><button onClick={() => alert('Sustainability page')}>Sustainability</button></li>
                <li><button onClick={() => alert('Partnerships page')}>Partnerships</button></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PagesPage
