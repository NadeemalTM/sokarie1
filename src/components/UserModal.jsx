import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import './UserModal.css'

const UserModal = () => {
  const { user, loginUser, logoutUser, isUserMenuOpen, toggleUserMenu } = useApp()
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = (e) => {
    e.preventDefault()
    // Demo login - in real app, validate with backend
    if (formData.email && formData.password) {
      loginUser({
        id: 1,
        email: formData.email,
        name: formData.name || formData.email.split('@')[0]
      })
      setFormData({ email: '', password: '', name: '', confirmPassword: '' })
      toggleUserMenu()
    }
  }

  const handleRegister = (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    if (formData.email && formData.password && formData.name) {
      loginUser({
        id: 1,
        email: formData.email,
        name: formData.name
      })
      setFormData({ email: '', password: '', name: '', confirmPassword: '' })
      toggleUserMenu()
    }
  }

  const handleLogout = () => {
    logoutUser()
    toggleUserMenu()
  }

  if (!isUserMenuOpen) return null

  return (
    <div className="user-modal-overlay" onClick={toggleUserMenu}>
      <div className="user-modal" onClick={e => e.stopPropagation()}>
        <div className="user-header">
          <h3>{user ? 'Account' : isLogin ? 'Login' : 'Register'}</h3>
          <button className="close-btn" onClick={toggleUserMenu}>✕</button>
        </div>
        
        <div className="user-content">
          {user ? (
            <div className="user-profile">
              <div className="profile-info">
                <h4>Welcome, {user.name}!</h4>
                <p>{user.email}</p>
              </div>
              <div className="profile-actions">
                <button className="profile-btn">My Orders</button>
                <button className="profile-btn">Profile Settings</button>
                <button className="profile-btn">Wishlist</button>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="auth-container">
              <div className="auth-tabs">
                <button 
                  className={`tab ${isLogin ? 'active' : ''}`}
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </button>
                <button 
                  className={`tab ${!isLogin ? 'active' : ''}`}
                  onClick={() => setIsLogin(false)}
                >
                  Register
                </button>
              </div>
              
              <form onSubmit={isLogin ? handleLogin : handleRegister}>
                {!isLogin && (
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                )}
                
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email"
                  />
                </div>
                
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your password"
                  />
                </div>
                
                {!isLogin && (
                  <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      placeholder="Confirm your password"
                    />
                  </div>
                )}
                
                <button type="submit" className="auth-btn">
                  {isLogin ? 'Login' : 'Register'}
                </button>
              </form>
              
              {isLogin && (
                <div className="auth-footer">
                  <a href="#" className="forgot-link">Forgot Password?</a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserModal
