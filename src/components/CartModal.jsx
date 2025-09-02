import React from 'react'
import { useApp } from '../context/AppContext'
import './CartModal.css'

const CartModal = ({ isOpen, onClose }) => {
  const { cartItems, cartTotal, cartCount, updateQuantity, removeFromCart } = useApp()

  const handleCheckout = () => {
    alert('Proceeding to checkout! This is a demo function.')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="cart-modal-overlay" onClick={onClose}>
      <div className="cart-modal" onClick={e => e.stopPropagation()}>
        <div className="cart-header">
          <h3>Shopping Cart ({cartCount})</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        
        <div className="cart-content">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
              <button onClick={onClose}>Continue Shopping</button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map(item => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p className="item-price">${item.price}</p>
                    </div>
                    <div className="quantity-controls">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        +
                      </button>
                    </div>
                    <button 
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="cart-footer">
                <div className="cart-total">
                  <h3>Total: ${cartTotal.toFixed(2)}</h3>
                </div>
                <div className="cart-actions">
                  <button className="continue-btn" onClick={onClose}>
                    Continue Shopping
                  </button>
                  <button className="checkout-btn" onClick={handleCheckout}>
                    Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default CartModal
