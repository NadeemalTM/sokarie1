import React, { useState } from 'react'
import { AppProvider } from './context/AppContext'
import Header from './components/Header'
import Hero from './components/Hero'
import CategoryGrid from './components/CategoryGrid'
import AccessoriesSection from './components/AccessoriesSection'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import SearchModal from './components/SearchModal'
import CartModal from './components/CartModal'
import UserModal from './components/UserModal'
import Notification from './components/Notification'
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
      <div className="App">
        <Header onCartClick={() => setIsCartOpen(!isCartOpen)} />
        <Hero onAddToCart={showNotification} />
        <CategoryGrid onAddToCart={showNotification} />
        <AccessoriesSection onAddToCart={showNotification} />
        <Newsletter />
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
    </AppProvider>
  )
}

export default App
