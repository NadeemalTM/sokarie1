import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import './Header.css'

const Header = ({ onCartClick }) => {
  const { cartCount, toggleSearch, toggleUserMenu, user } = useApp()
  const location = useLocation()

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <h1>Sokarie</h1>
          </Link>
        </div>
        <nav className="nav">
          <ul>
            <li>
              <Link 
                to="/" 
                className={location.pathname === '/' ? 'active' : ''}
              >
                HOME
              </Link>
            </li>
            <li>
              <Link 
                to="/categories" 
                className={location.pathname === '/categories' ? 'active' : ''}
              >
                CATEGORIES
              </Link>
            </li>
            <li>
              <Link 
                to="/features" 
                className={location.pathname === '/features' ? 'active' : ''}
              >
                FEATURES
              </Link>
            </li>
            <li>
              <Link 
                to="/blog" 
                className={location.pathname === '/blog' ? 'active' : ''}
              >
                BLOG
              </Link>
            </li>
            <li>
              <Link 
                to="/pages" 
                className={location.pathname === '/pages' ? 'active' : ''}
              >
                PAGES
              </Link>
            </li>
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
