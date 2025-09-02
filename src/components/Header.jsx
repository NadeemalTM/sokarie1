import React from 'react'
import { useApp } from '../context/AppContext'
import './Header.css'

const Header = ({ onCartClick }) => {
  const { cartCount, toggleSearch, toggleUserMenu, user } = useApp()

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <h1>Sokarie</h1>
        </div>
        <nav className="nav">
          <ul>
            <li><a href="#home">HOME</a></li>
            <li><a href="#categories">CATEGORIES</a></li>
            <li><a href="#features">FEATURES</a></li>
            <li><a href="#blog">BLOG</a></li>
            <li><a href="#pages">PAGES</a></li>
          </ul>
        </nav>
        <div className="header-icons">
          <button className="icon-btn" onClick={toggleSearch} title="Search">
            🔍
          </button>
          <button className="icon-btn" onClick={toggleUserMenu} title="Account">
            {user ? '👤' : '🚪'}
          </button>
          <button 
            className="icon-btn cart" 
            onClick={onCartClick}
            title="Shopping Cart"
          >
            🛒
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
