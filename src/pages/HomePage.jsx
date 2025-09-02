import React from 'react'
import Hero from '../components/Hero'
import CategoryGrid from '../components/CategoryGrid'
import AccessoriesSection from '../components/AccessoriesSection'
import Newsletter from '../components/Newsletter'
import './HomePage.css'

const HomePage = ({ onAddToCart }) => {
  return (
    <div className="home-page">
      <Hero onAddToCart={onAddToCart} />
      <CategoryGrid onAddToCart={onAddToCart} />
      <AccessoriesSection onAddToCart={onAddToCart} />
      <Newsletter />
    </div>
  )
}

export default HomePage
