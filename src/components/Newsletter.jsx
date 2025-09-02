import React, { useState } from 'react'
import './Newsletter.css'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      console.log('Newsletter signup:', email)
      setIsSubscribed(true)
      setEmail('')
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubscribed(false)
      }, 3000)
    }
  }

  return (
    <section className="newsletter">
      <div className="newsletter-container">
        <h2>Signup and get <span className="highlight">29%</span> discount on next order</h2>
        
        {isSubscribed ? (
          <div className="success-message">
            <h3>✅ Thank you for subscribing!</h3>
            <p>Check your email for your 29% discount code.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="newsletter-form">
            <input
              type="email"
              placeholder="Your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">REGISTER</button>
          </form>
        )}
        
        <p className="newsletter-disclaimer">
          By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
        </p>
        
        <div className="social-icons">
          <a href="#" aria-label="Facebook" onClick={(e) => {e.preventDefault(); alert('Facebook integration coming soon!')}}>📘</a>
          <a href="#" aria-label="Twitter" onClick={(e) => {e.preventDefault(); alert('Twitter integration coming soon!')}}>🐦</a>
          <a href="#" aria-label="Instagram" onClick={(e) => {e.preventDefault(); alert('Instagram integration coming soon!')}}>📷</a>
          <a href="#" aria-label="Pinterest" onClick={(e) => {e.preventDefault(); alert('Pinterest integration coming soon!')}}>📌</a>
          <a href="#" aria-label="Google Plus" onClick={(e) => {e.preventDefault(); alert('Google Plus integration coming soon!')}}>➕</a>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
