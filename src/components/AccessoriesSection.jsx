import React from 'react'
import { useApp } from '../context/AppContext'
import './AccessoriesSection.css'

const AccessoriesSection = ({ onAddToCart }) => {
  const { products, addToCart } = useApp()

  const handleShopNow = () => {
    // Add a featured accessories item to cart
    const accessoryProduct = products.find(p => p.category === 'accessories') || products[5]
    addToCart(accessoryProduct)
    onAddToCart(`${accessoryProduct.name} added to cart!`, 'success')
  }

  return (
    <section className="accessories-section">
      <div className="accessories-container">
        <div className="accessories-content">
          <div className="accessories-tags">
            <span>HAT</span>
            <span>HANDBAG</span>
            <span>SHOES</span>
            <span>EYEWEAR</span>
          </div>
          <h2>Accessories for her</h2>
          <div className="divider"></div>
          <p>
            Consectetur adipiscing elit sed diam nonummy nibh euismod 
            tincidunt ut laoreet dolore
          </p>
          <button className="shop-now-btn" onClick={handleShopNow}>
            ADD TO CART
          </button>
        </div>
        <div className="accessories-image">
          <img src="/src/images/1 (1).png" alt="Accessories model" />
        </div>
      </div>
    </section>
  )
}

export default AccessoriesSection
