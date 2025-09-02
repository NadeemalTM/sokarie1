import React from 'react'
import './FeaturesPage.css'

const FeaturesPage = () => {
  const features = [
    {
      icon: '🚚',
      title: 'Free Shipping',
      description: 'Free shipping on orders over $100. Fast and reliable delivery worldwide.',
      details: 'We offer complimentary shipping on all orders above $100. Our partnership with premium carriers ensures your items arrive safely and on time.'
    },
    {
      icon: '↩️',
      title: 'Easy Returns',
      description: '30-day return policy. No questions asked, hassle-free returns.',
      details: 'Not satisfied with your purchase? Return any item within 30 days for a full refund. Our return process is simple and customer-friendly.'
    },
    {
      icon: '🔒',
      title: 'Secure Payment',
      description: 'Your payment information is protected with bank-level security.',
      details: 'We use industry-standard SSL encryption to protect your personal and payment information. Shop with confidence knowing your data is secure.'
    },
    {
      icon: '🎯',
      title: 'Quality Guarantee',
      description: 'Premium quality materials and craftsmanship in every item.',
      details: 'We partner with trusted manufacturers and conduct rigorous quality checks to ensure every product meets our high standards.'
    },
    {
      icon: '💬',
      title: '24/7 Support',
      description: 'Round-the-clock customer support for all your needs.',
      details: 'Our dedicated support team is available 24/7 to help with any questions or concerns. Contact us via chat, email, or phone.'
    },
    {
      icon: '👗',
      title: 'Style Consultation',
      description: 'Personal styling advice from our fashion experts.',
      details: 'Get personalized style recommendations from our team of fashion experts. Book a consultation to discover your perfect look.'
    }
  ]

  return (
    <div className="features-page">
      <div className="page-header">
        <h1>Why Choose Sokarie</h1>
        <p>Discover the features that make shopping with us an exceptional experience</p>
      </div>

      <div className="features-container">
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <div className="feature-details">{feature.details}</div>
            </div>
          ))}
        </div>

        <div className="additional-features">
          <div className="feature-section">
            <h2>Premium Shopping Experience</h2>
            <div className="feature-content">
              <div className="feature-text">
                <h3>Curated Collections</h3>
                <p>Our fashion experts carefully select each item in our collection, ensuring you have access to the latest trends and timeless classics. Every piece is chosen for its quality, style, and versatility.</p>
                
                <h3>Personalized Recommendations</h3>
                <p>Our AI-powered recommendation engine learns your style preferences to suggest items you'll love. The more you shop, the better our recommendations become.</p>
                
                <h3>Exclusive Member Benefits</h3>
                <p>Join our VIP program for early access to sales, exclusive discounts, and special member-only events. Enjoy perks like priority shipping and dedicated customer service.</p>
              </div>
              <div className="feature-image">
                <img src="/src/images/1 (1).png" alt="Premium Experience" />
              </div>
            </div>
          </div>

          <div className="stats-section">
            <h2>Our Achievements</h2>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">50K+</div>
                <div className="stat-label">Happy Customers</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">1000+</div>
                <div className="stat-label">Fashion Items</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">99%</div>
                <div className="stat-label">Satisfaction Rate</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Customer Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturesPage
