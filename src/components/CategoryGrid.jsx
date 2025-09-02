import React from 'react'
import { useApp } from '../context/AppContext'
import './CategoryGrid.css'

const CategoryGrid = ({ onAddToCart }) => {
  const { products, addToCart } = useApp()

  const handleAddToCart = (product) => {
    addToCart(product)
    onAddToCart(`${product.name} added to cart!`, 'success')
  }

  return (
    <section className="category-grid">
      <div className="grid-container">
        <div className="category-item large">
          <img src="/src/images/1 (2).png" alt="Dress & coat collection" />
          <div className="category-overlay">
            <span className="category-label">CLOTHING</span>
            <h3>Dress & coat collection</h3>
            <button 
              className="shop-btn"
              onClick={() => handleAddToCart(products[0])}
            >
              ADD TO CART
            </button>
          </div>
        </div>
        
        <div className="category-item">
          <img src="/src/images/1 (3).png" alt="Women's Eyewear" />
          <div className="category-overlay">
            <span className="category-label">BECOMING TOP PICK</span>
            <h3>Women's Eyewear</h3>
            <button 
              className="shop-btn"
              onClick={() => handleAddToCart(products[1])}
            >
              ADD TO CART
            </button>
          </div>
        </div>
        
        <div className="category-item">
          <img src="/src/images/1 (4).png" alt="Designer Handbag" />
          <div className="category-overlay colorful">
            <span className="category-label">SHOP BY</span>
            <h3>Designer Handbag</h3>
            <button 
              className="shop-btn"
              onClick={() => handleAddToCart(products[2])}
            >
              ADD TO CART
            </button>
          </div>
        </div>
        
        <div className="category-item">
          <img src="/src/images/1 (5).png" alt="Shoes & Heel" />
          <div className="category-overlay">
            <span className="category-label">SHOP BY</span>
            <h3>Shoes & Heel</h3>
            <button 
              className="shop-btn"
              onClick={() => handleAddToCart(products[3])}
            >
              ADD TO CART
            </button>
          </div>
        </div>
        
        <div className="category-item">
          <img src="/src/images/1 (6).png" alt="Luxury Purse" />
          <div className="category-overlay">
            <span className="category-label">SHOP BY</span>
            <h3>Luxury Purse</h3>
            <button 
              className="shop-btn"
              onClick={() => handleAddToCart(products[4])}
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CategoryGrid
