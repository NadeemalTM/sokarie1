import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import './CartModal.css'

const CartModal = ({ isOpen, onClose }) => {
  const { cartItems, cartTotal, cartCount, updateQuantity, removeFromCart } = useApp()
  const [currentStep, setCurrentStep] = useState('cart') // cart, shipping, checkout
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United States'
  })

  const handleInputChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value
    })
  }

  const handleContinueToShipping = () => {
    setCurrentStep('shipping')
  }

  const handleBackToCart = () => {
    setCurrentStep('cart')
  }

  const handleContinueToCheckout = () => {
    setCurrentStep('checkout')
  }

  const handleBackToShipping = () => {
    setCurrentStep('shipping')
  }

  const handlePlaceOrder = () => {
    alert('Order placed successfully! This is a demo function.')
    setCurrentStep('cart')
    onClose()
  }

  const shippingCost = cartTotal > 100 ? 0 : 15
  const tax = cartTotal * 0.08
  const finalTotal = cartTotal + shippingCost + tax

  if (!isOpen) return null

  const renderCartStep = () => (
    <>
      <div className="cart-header">
        <h3>Shopping Cart ({cartCount})</h3>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>
      
      <div className="cart-content">
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h4>Your cart is empty</h4>
            <p>Add some items to get started!</p>
            <button className="continue-shopping-btn" onClick={onClose}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p className="item-category">Fashion Item</p>
                    <p className="item-price">${item.price}</p>
                  </div>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="qty-btn"
                    >
                      −
                    </button>
                    <span className="qty-display">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="qty-btn"
                    >
                      +
                    </button>
                  </div>
                  <div className="item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <button 
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                    title="Remove item"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
            
            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>{cartTotal > 100 ? 'FREE' : '$15.00'}</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>${(cartTotal + (cartTotal > 100 ? 0 : 15)).toFixed(2)}</span>
              </div>
              {cartTotal < 100 && (
                <p className="free-shipping-notice">
                  Add ${(100 - cartTotal).toFixed(2)} more for free shipping!
                </p>
              )}
            </div>
            
            <div className="cart-actions">
              <button className="continue-btn" onClick={onClose}>
                Continue Shopping
              </button>
              <button className="checkout-btn" onClick={handleContinueToShipping}>
                Proceed to Shipping
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )

  const renderShippingStep = () => (
    <>
      <div className="cart-header">
        <button className="back-btn" onClick={handleBackToCart}>← Back</button>
        <h3>Shipping Information</h3>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>
      
      <div className="shipping-content">
        <div className="shipping-form">
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={shippingInfo.fullName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={shippingInfo.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                required
              />
            </div>
            <div className="form-group">
              <label>Phone *</label>
              <input
                type="tel"
                name="phone"
                value={shippingInfo.phone}
                onChange={handleInputChange}
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Address *</label>
            <input
              type="text"
              name="address"
              value={shippingInfo.address}
              onChange={handleInputChange}
              placeholder="Street address"
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>City *</label>
              <input
                type="text"
                name="city"
                value={shippingInfo.city}
                onChange={handleInputChange}
                placeholder="City"
                required
              />
            </div>
            <div className="form-group">
              <label>Postal Code *</label>
              <input
                type="text"
                name="postalCode"
                value={shippingInfo.postalCode}
                onChange={handleInputChange}
                placeholder="12345"
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Country *</label>
            <select
              name="country"
              value={shippingInfo.country}
              onChange={handleInputChange}
              required
            >
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Australia">Australia</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        
        <div className="shipping-options">
          <h4>Shipping Options</h4>
          <div className="shipping-option">
            <input type="radio" id="standard" name="shipping" defaultChecked />
            <label htmlFor="standard">
              <div className="option-info">
                <span className="option-name">Standard Shipping</span>
                <span className="option-time">5-7 business days</span>
              </div>
              <span className="option-price">{cartTotal > 100 ? 'FREE' : '$15.00'}</span>
            </label>
          </div>
          <div className="shipping-option">
            <input type="radio" id="express" name="shipping" />
            <label htmlFor="express">
              <div className="option-info">
                <span className="option-name">Express Shipping</span>
                <span className="option-time">2-3 business days</span>
              </div>
              <span className="option-price">$25.00</span>
            </label>
          </div>
          <div className="shipping-option">
            <input type="radio" id="overnight" name="shipping" />
            <label htmlFor="overnight">
              <div className="option-info">
                <span className="option-name">Overnight Shipping</span>
                <span className="option-time">1 business day</span>
              </div>
              <span className="option-price">$45.00</span>
            </label>
          </div>
        </div>
        
        <div className="shipping-actions">
          <button className="back-to-cart-btn" onClick={handleBackToCart}>
            Back to Cart
          </button>
          <button className="continue-checkout-btn" onClick={handleContinueToCheckout}>
            Continue to Checkout
          </button>
        </div>
      </div>
    </>
  )

  const renderCheckoutStep = () => (
    <>
      <div className="cart-header">
        <button className="back-btn" onClick={handleBackToShipping}>← Back</button>
        <h3>Checkout</h3>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>
      
      <div className="checkout-content">
        <div className="checkout-sections">
          <div className="shipping-summary">
            <h4>Shipping Address</h4>
            <div className="address-card">
              <p><strong>{shippingInfo.fullName}</strong></p>
              <p>{shippingInfo.address}</p>
              <p>{shippingInfo.city}, {shippingInfo.postalCode}</p>
              <p>{shippingInfo.country}</p>
              <p>{shippingInfo.email} • {shippingInfo.phone}</p>
              <button className="edit-btn" onClick={handleBackToShipping}>Edit</button>
            </div>
          </div>
          
          <div className="payment-section">
            <h4>Payment Method</h4>
            <div className="payment-options">
              <div className="payment-option">
                <input type="radio" id="card" name="payment" defaultChecked />
                <label htmlFor="card">Credit/Debit Card</label>
              </div>
              <div className="payment-option">
                <input type="radio" id="paypal" name="payment" />
                <label htmlFor="paypal">PayPal</label>
              </div>
              <div className="payment-option">
                <input type="radio" id="apple" name="payment" />
                <label htmlFor="apple">Apple Pay</label>
              </div>
            </div>
            
            <div className="card-form">
              <div className="form-group">
                <label>Card Number</label>
                <input type="text" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input type="text" placeholder="MM/YY" />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input type="text" placeholder="123" />
                </div>
              </div>
              <div className="form-group">
                <label>Cardholder Name</label>
                <input type="text" placeholder="Name on card" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="order-summary">
          <h4>Order Summary</h4>
          <div className="summary-items">
            {cartItems.map(item => (
              <div key={item.id} className="summary-item">
                <img src={item.image} alt={item.name} />
                <div className="item-info">
                  <span className="item-name">{item.name}</span>
                  <span className="item-qty">Qty: {item.quantity}</span>
                </div>
                <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div className="final-summary">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>${shippingCost.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Tax:</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="checkout-actions">
          <button className="back-to-shipping-btn" onClick={handleBackToShipping}>
            Back to Shipping
          </button>
          <button className="place-order-btn" onClick={handlePlaceOrder}>
            Place Order • ${finalTotal.toFixed(2)}
          </button>
        </div>
      </div>
    </>
  )

  return (
    <div className="cart-modal-overlay" onClick={onClose}>
      <div className="cart-modal" onClick={e => e.stopPropagation()}>
        {currentStep === 'cart' && renderCartStep()}
        {currentStep === 'shipping' && renderShippingStep()}
        {currentStep === 'checkout' && renderCheckoutStep()}
      </div>
    </div>
  )
}

export default CartModal
