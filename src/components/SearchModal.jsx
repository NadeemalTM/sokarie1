import React from 'react'
import { useApp } from '../context/AppContext'
import './SearchModal.css'

const SearchModal = () => {
  const { isSearchOpen, searchQuery, setSearchQuery, toggleSearch, products } = useApp()

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (!isSearchOpen) return null

  return (
    <div className="search-modal-overlay" onClick={toggleSearch}>
      <div className="search-modal" onClick={e => e.stopPropagation()}>
        <div className="search-header">
          <h3>Search Products</h3>
          <button className="close-btn" onClick={toggleSearch}>✕</button>
        </div>
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
        </div>
        <div className="search-results">
          {searchQuery && (
            <>
              <h4>Search Results ({filteredProducts.length})</h4>
              {filteredProducts.length > 0 ? (
                <div className="product-list">
                  {filteredProducts.map(product => (
                    <div key={product.id} className="search-product-item">
                      <img src={product.image} alt={product.name} />
                      <div className="product-info">
                        <h5>{product.name}</h5>
                        <p className="product-category">{product.category}</p>
                        <p className="product-price">${product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-results">No products found for "{searchQuery}"</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchModal
