import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Header from './components/Header'
import Footer from './components/Footer'
import SearchModal from './components/SearchModal'
import CartModal from './components/CartModal'
import UserModal from './components/UserModal'
import Notification from './components/Notification'
import HomePage from './pages/HomePage'
import CategoriesPage from './pages/CategoriesPage'
import FeaturesPage from './pages/FeaturesPage'
import BlogPage from './pages/BlogPage'
import PagesPage from './pages/PagesPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import HelpCenterPage from './pages/HelpCenterPage'
import './App.css'

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [notification, setNotification] = useState({ message: '', type: 'success', isVisible: false })

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type, isVisible: true })
  }

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }))
  }

  return (
    <AppProvider>
      <Router>
        <div className="App">
          <Header onCartClick={() => setIsCartOpen(!isCartOpen)} />
          
          <Routes>
            <Route path="/" element={<HomePage onAddToCart={showNotification} />} />
            <Route path="/categories" element={<CategoriesPage onAddToCart={showNotification} />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/pages" element={<PagesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/help" element={<HelpCenterPage />} />
          </Routes>
          
          <Footer />
          <SearchModal />
          <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
          <UserModal />
          <Notification 
            message={notification.message}
            type={notification.type}
            isVisible={notification.isVisible}
            onClose={hideNotification}
          />
        </div>
      </Router>
    </AppProvider>
  )
}

export default App
