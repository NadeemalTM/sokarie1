import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import './CategoriesPage.css'

const CategoriesPage = ({ onAddToCart }) => {
  const { products, addToCart } = useApp()
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = ['all', 'clothing', 'eyewear', 'accessories', 'shoes']

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  const handleAddToCart = (product) => {
    addToCart(product)
    onAddToCart(`${product.name} added to cart!`, 'success')
  }

  return (
    <div className="categories-page">
      <div className="page-header">
        <h1>Shop by Categories</h1>
        <p>Discover our curated collection of fashion items across different categories</p>
      </div>

      <div className="categories-container">
        <div className="category-filters">
          <h3>Filter by Category</h3>
          <div className="filter-buttons">
            {categories.map(category => (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category === 'all' ? 'All Items' : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <div className="product-overlay">
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
              <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-price">${product.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoriesPage
