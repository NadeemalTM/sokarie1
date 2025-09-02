import React, { useState } from 'react'
import './ContactPage.css'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate form submission
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  const contactInfo = [
    {
      title: "Visit Our Store",
      details: "123 Fashion Avenue, Style District, New York, NY 10001",
      icon: "📍",
      action: "Get Directions"
    },
    {
      title: "Call Us",
      details: "+1 (555) 123-STYLE",
      icon: "📞",
      action: "Call Now"
    },
    {
      title: "Email Us",
      details: "hello@sokarie.com",
      icon: "✉️",
      action: "Send Email"
    },
    {
      title: "Live Chat",
      details: "Available 24/7 for immediate assistance",
      icon: "💬",
      action: "Start Chat"
    }
  ]

  const faqs = [
    {
      question: "What are your store hours?",
      answer: "We're open Monday-Saturday 10AM-8PM, Sunday 12PM-6PM. Our online store is available 24/7."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes! We ship to over 25 countries worldwide. Shipping costs and delivery times vary by location."
    },
    {
      question: "What's your return policy?",
      answer: "We offer a 30-day return policy for unworn items with original tags. Returns are free for orders over $100."
    },
    {
      question: "Do you offer styling consultations?",
      answer: "Absolutely! Book a free consultation with our style experts either in-store or virtually."
    }
  ]

  return (
    <div className="contact-page">
      <div className="animated-background">
        <div className="floating-shape contact-envelope-1"></div>
        <div className="floating-shape contact-envelope-2"></div>
        <div className="floating-shape contact-phone-1"></div>
        <div className="floating-shape contact-chat-bubble-1"></div>
        <div className="floating-shape contact-map-pin-1"></div>
      </div>

      <div className="page-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. Get in touch with our team today.</p>
      </div>

      <div className="contact-container">
        <section className="contact-info-section">
          <h2>Get In Touch</h2>
          <div className="contact-info-grid">
            {contactInfo.map((info, index) => (
              <div key={index} className="contact-info-card">
                <div className="contact-icon">{info.icon}</div>
                <h3>{info.title}</h3>
                <p>{info.details}</p>
                <button className="contact-action-btn">{info.action}</button>
              </div>
            ))}
          </div>
        </section>

        <section className="contact-form-section">
          <div className="form-container">
            <div className="form-header">
              <h2>Send us a Message</h2>
              <p>Fill out the form below and we'll get back to you within 24 hours.</p>
            </div>

            {isSubmitted ? (
              <div className="success-message">
                <div className="success-icon">✅</div>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for contacting us. We'll get back to you soon.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="What is this regarding?"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>
                <button type="submit" className="submit-btn">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </section>

        <section className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="map-section">
          <h2>Find Our Store</h2>
          <div className="map-container">
            <div className="map-placeholder">
              <div className="map-content">
                <h3>📍 Sokarie Fashion Store</h3>
                <p>123 Fashion Avenue<br />Style District<br />New York, NY 10001</p>
                <div className="map-buttons">
                  <button className="map-btn">Get Directions</button>
                  <button className="map-btn">View on Google Maps</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ContactPage
