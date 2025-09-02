import React from 'react'
import Hero from '../components/Hero'
import CategoryGrid from '../components/CategoryGrid'
import AccessoriesSection from '../components/AccessoriesSection'
import Newsletter from '../components/Newsletter'
import './HomePage.css'

const HomePage = ({ onAddToCart }) => {
  return (
    <div className="home-page">
      <div className="animated-background">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
        <div className="floating-shape shape-4"></div>
        <div className="floating-shape shape-5"></div>
      </div>
      <Hero onAddToCart={onAddToCart} />
      <CategoryGrid onAddToCart={onAddToCart} />
      <AccessoriesSection onAddToCart={onAddToCart} />
      <Newsletter />
    </div>
  )
}

export default HomePage
