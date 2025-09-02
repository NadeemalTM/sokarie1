import React, { useState } from 'react'
import './HelpCenterPage.css'

const HelpCenterPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Topics', icon: '📚' },
    { id: 'orders', name: 'Orders & Shipping', icon: '📦' },
    { id: 'returns', name: 'Returns & Exchanges', icon: '↩️' },
    { id: 'sizing', name: 'Sizing & Fit', icon: '📏' },
    { id: 'account', name: 'Account & Login', icon: '👤' },
    { id: 'payment', name: 'Payment & Billing', icon: '💳' },
    { id: 'care', name: 'Product Care', icon: '🧼' }
  ]

  const helpArticles = [
    {
      id: 1,
      title: "How to track your order",
      category: "orders",
      summary: "Learn how to track your order status and delivery progress.",
      content: "Once your order is shipped, you'll receive a tracking number via email..."
    },
    {
      id: 2,
      title: "Size guide and measurements",
      category: "sizing",
      summary: "Find your perfect fit with our comprehensive sizing guide.",
      content: "Our sizing guide helps you find the perfect fit for every item..."
    },
    {
      id: 3,
      title: "Return and exchange policy",
      category: "returns",
      summary: "Everything you need to know about returns and exchanges.",
      content: "We offer a 30-day return policy for unworn items with original tags..."
    },
    {
      id: 4,
      title: "How to create an account",
      category: "account",
      summary: "Step-by-step guide to creating your Sokarie account.",
      content: "Creating an account gives you access to order history, wishlist, and more..."
    },
    {
      id: 5,
      title: "Payment methods accepted",
      category: "payment",
      summary: "Learn about our accepted payment methods and security.",
      content: "We accept all major credit cards, PayPal, Apple Pay, and Google Pay..."
    },
    {
      id: 6,
      title: "How to care for your garments",
      category: "care",
      summary: "Tips for maintaining the quality and longevity of your clothing.",
      content: "Proper care ensures your Sokarie pieces stay beautiful for years..."
    },
    {
      id: 7,
      title: "Shipping options and costs",
      category: "orders",
      summary: "Information about shipping methods, costs, and delivery times.",
      content: "We offer several shipping options to meet your needs..."
    },
    {
      id: 8,
      title: "How to reset your password",
      category: "account",
      summary: "Steps to reset your password if you've forgotten it.",
      content: "If you've forgotten your password, don't worry - it's easy to reset..."
    }
  ]

  const quickActions = [
    {
      title: "Track Your Order",
      description: "Enter your order number to see real-time tracking",
      icon: "📍",
      action: "Track Now"
    },
    {
      title: "Start a Return",
      description: "Initiate a return or exchange for your recent purchase",
      icon: "📤",
      action: "Return Item"
    },
    {
      title: "Live Chat Support",
      description: "Chat with our customer service team right now",
      icon: "💬",
      action: "Start Chat"
    },
    {
      title: "Size Guide",
      description: "Find your perfect fit with our interactive size guide",
      icon: "📐",
      action: "View Guide"
    }
  ]

  const filteredArticles = helpArticles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="help-center-page">
      <div className="animated-background">
        <div className="floating-shape help-question-1"></div>
        <div className="floating-shape help-question-2"></div>
        <div className="floating-shape help-lightbulb-1"></div>
        <div className="floating-shape help-book-1"></div>
        <div className="floating-shape help-gear-1"></div>
      </div>

      <div className="page-header">
        <h1>Help Center</h1>
        <p>Find answers to your questions and get the help you need</p>
      </div>

      <div className="help-container">
        <section className="search-section">
          <div className="search-container">
            <h2>How can we help you?</h2>
            <div className="search-box">
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="search-btn">🔍</button>
            </div>
          </div>
        </section>

        <section className="quick-actions-section">
          <h2>Quick Actions</h2>
          <div className="quick-actions-grid">
            {quickActions.map((action, index) => (
              <div key={index} className="quick-action-card">
                <div className="action-icon">{action.icon}</div>
                <h3>{action.title}</h3>
                <p>{action.description}</p>
                <button className="action-btn">{action.action}</button>
              </div>
            ))}
          </div>
        </section>

        <section className="help-content-section">
          <div className="content-layout">
            <aside className="category-sidebar">
              <h3>Browse by Category</h3>
              <div className="category-list">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <span className="category-icon">{category.icon}</span>
                    {category.name}
                  </button>
                ))}
              </div>
            </aside>

            <main className="articles-content">
              <div className="articles-header">
                <h2>
                  {selectedCategory === 'all' ? 'All Help Articles' : 
                   categories.find(cat => cat.id === selectedCategory)?.name}
                </h2>
                <p>{filteredArticles.length} articles found</p>
              </div>

              <div className="articles-grid">
                {filteredArticles.map(article => (
                  <article key={article.id} className="help-article">
                    <h3>{article.title}</h3>
                    <p>{article.summary}</p>
                    <button className="read-more-btn">Read More →</button>
                  </article>
                ))}
              </div>

              {filteredArticles.length === 0 && (
                <div className="no-results">
                  <div className="no-results-icon">🔍</div>
                  <h3>No articles found</h3>
                  <p>Try adjusting your search terms or browse by category.</p>
                </div>
              )}
            </main>
          </div>
        </section>

        <section className="contact-support-section">
          <div className="support-card">
            <h2>Still need help?</h2>
            <p>Can't find what you're looking for? Our customer support team is here to help.</p>
            <div className="support-options">
              <button className="support-btn primary">
                💬 Live Chat
              </button>
              <button className="support-btn secondary">
                📧 Email Support
              </button>
              <button className="support-btn secondary">
                📞 Call Us
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default HelpCenterPage
