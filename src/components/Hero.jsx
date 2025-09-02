import React from 'react'
import { useApp } from '../context/AppContext'
import './Hero.css'

const Hero = ({ onAddToCart }) => {
  const { products, addToCart } = useApp()

  const handleDiscoverNow = () => {
    // Add the featured hero product to cart
    const heroProduct = products[5] || products[0] // Fashion Jacket or first available
    addToCart(heroProduct)
    onAddToCart(`${heroProduct.name} added to cart!`, 'success')
  }

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <span className="hero-label">NEW FASHION</span>
          <h1 className="hero-title">Sokarie</h1>
          <h2 className="hero-subtitle">New collection</h2>
          <p className="hero-description">
            Look at the most beautiful and sophisticated fashion that is designed for you to show
          </p>
          <button className="hero-btn" onClick={handleDiscoverNow}>
            DISCOVER NOW
          </button>
        </div>
        <div className="hero-image">
          <img src="/src/images/1 (1).png" alt="Fashion Model" />
        </div>
      </div>
    </section>
  )
}

export default Hero
