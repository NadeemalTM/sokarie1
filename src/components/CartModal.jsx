import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import './CartModal.css'

const CartModal = ({ isOpen, onClose }) => {
  const { cartItems, cartTotal, cartCount, updateQuantity, removeFromCart } = useApp()
  const [currentStep, setCurrentStep] = useState('cart') // cart, shipping, payment, confirmation
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States'
  })
  const [selectedShipping, setSelectedShipping] = useState('standard')
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingPostalCode: '',
    sameAsShipping: true
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderConfirmed, setOrderConfirmed] = useState(false)

  const handleInputChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value
    })
  }

  const handlePaymentChange = (e) => {
    const { name, value } = e.target
    
    if (name === 'sameAsShipping') {
      setPaymentInfo({
        ...paymentInfo,
        sameAsShipping: e.target.checked
      })
    } else if (name === 'cardNumber') {
      // Format card number with spaces every 4 digits
      const formatted = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim()
      if (formatted.replace(/\s/g, '').length <= 16) {
        setPaymentInfo({
          ...paymentInfo,
          cardNumber: formatted
        })
      }
    } else if (name === 'expiryDate') {
      // Format expiry date as MM/YY
      const formatted = value.replace(/\D/g, '').replace(/(\d{2})(\d{2})/, '$1/$2')
      if (formatted.length <= 5) {
        setPaymentInfo({
          ...paymentInfo,
          expiryDate: formatted
        })
      }
    } else if (name === 'cvv') {
      // Limit CVV to 4 digits
      const formatted = value.replace(/\D/g, '')
      if (formatted.length <= 4) {
        setPaymentInfo({
          ...paymentInfo,
          cvv: formatted
        })
      }
    } else {
      setPaymentInfo({
        ...paymentInfo,
        [name]: value
      })
    }
  }

  const getCardType = (cardNumber) => {
    const number = cardNumber.replace(/\s/g, '')
    if (/^4/.test(number)) return 'visa'
    if (/^5[1-5]/.test(number) || /^2[2-7]/.test(number)) return 'mastercard'
    if (/^3[47]/.test(number)) return 'amex'
    if (/^6/.test(number)) return 'discover'
    return 'unknown'
  }

  const validateCardNumber = (cardNumber) => {
    const number = cardNumber.replace(/\s/g, '')
    return number.length >= 13 && number.length <= 19
  }

  const validateExpiryDate = (expiryDate) => {
    if (expiryDate.length !== 5) return false
    const [month, year] = expiryDate.split('/')
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear() % 100
    const currentMonth = currentDate.getMonth() + 1
    
    const expMonth = parseInt(month)
    const expYear = parseInt(year)
    
    if (expMonth < 1 || expMonth > 12) return false
    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) return false
    
    return true
  }

  const validateCVV = (cvv, cardType) => {
    if (cardType === 'amex') return cvv.length === 4
    return cvv.length === 3
  }

  const handleContinueToShipping = () => {
    setCurrentStep('shipping')
  }

  const handleBackToCart = () => {
    setCurrentStep('cart')
  }

  const handleContinueToPayment = () => {
    // Validate shipping form
    const requiredFields = ['fullName', 'email', 'phone', 'address', 'city', 'postalCode']
    const isValid = requiredFields.every(field => shippingInfo[field].trim() !== '')
    
    if (!isValid) {
      alert('Please fill in all required shipping fields.')
      return
    }
    
    setCurrentStep('payment')
  }

  const handleBackToShipping = () => {
    setCurrentStep('shipping')
  }

  const handleProcessPayment = async () => {
    // Validate payment form
    const requiredPaymentFields = ['cardNumber', 'expiryDate', 'cvv', 'cardholderName']
    const isBasicValid = requiredPaymentFields.every(field => paymentInfo[field].trim() !== '')
    
    if (!isBasicValid) {
      alert('Please fill in all required payment fields.')
      return
    }

    // Advanced validation
    const cardType = getCardType(paymentInfo.cardNumber)
    
    if (!validateCardNumber(paymentInfo.cardNumber)) {
      alert('Please enter a valid card number.')
      return
    }

    if (!validateExpiryDate(paymentInfo.expiryDate)) {
      alert('Please enter a valid expiry date (MM/YY).')
      return
    }

    if (!validateCVV(paymentInfo.cvv, cardType)) {
      alert(`Please enter a valid CVV (${cardType === 'amex' ? '4' : '3'} digits).`)
      return
    }

    setIsProcessing(true)
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setOrderConfirmed(true)
      setCurrentStep('confirmation')
    }, 3000)
  }

  const handleNewOrder = () => {
    setCurrentStep('cart')
    setOrderConfirmed(false)
    setShippingInfo({
      fullName: '',
      email: '',
      phone: '',
      address: '',
      address2: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'United States'
    })
    setPaymentInfo({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: '',
      billingAddress: '',
      billingCity: '',
      billingState: '',
      billingPostalCode: '',
      sameAsShipping: true
    })
    onClose()
  }

  const shippingOptions = {
    standard: { name: 'Standard Shipping', time: '5-7 business days', price: cartTotal > 100 ? 0 : 15 },
    express: { name: 'Express Shipping', time: '2-3 business days', price: 25 },
    overnight: { name: 'Overnight Shipping', time: '1 business day', price: 45 }
  }

  const shippingCost = shippingOptions[selectedShipping].price
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
        <button className="back-btn" onClick={handleBackToCart}>← Back to Cart</button>
        <h3>Shipping Information</h3>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>
      
      <div className="shipping-content">
        <div className="shipping-form">
          <h4>Contact Information</h4>
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
              <label>Email Address *</label>
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
              <label>Phone Number *</label>
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
          
          <h4>Shipping Address</h4>
          <div className="form-group">
            <label>Street Address *</label>
            <input
              type="text"
              name="address"
              value={shippingInfo.address}
              onChange={handleInputChange}
              placeholder="123 Main Street"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Apartment, suite, etc. (Optional)</label>
            <input
              type="text"
              name="address2"
              value={shippingInfo.address2}
              onChange={handleInputChange}
              placeholder="Apt 4B, Suite 100"
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
                placeholder="New York"
                required
              />
            </div>
            <div className="form-group">
              <label>State/Province</label>
              <input
                type="text"
                name="state"
                value={shippingInfo.state}
                onChange={handleInputChange}
                placeholder="NY"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Postal Code *</label>
              <input
                type="text"
                name="postalCode"
                value={shippingInfo.postalCode}
                onChange={handleInputChange}
                placeholder="10001"
                required
              />
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
                <option value="Japan">Japan</option>
                <option value="South Korea">South Korea</option>
                <option value="Singapore">Singapore</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          
          <div className="special-instructions">
            <h4>Special Instructions</h4>
            <textarea
              placeholder="Any special delivery instructions? (Optional)"
              rows="3"
            />
          </div>
        </div>
        
        <div className="shipping-options">
          <h4>Shipping Method</h4>
          {Object.entries(shippingOptions).map(([key, option]) => (
            <div key={key} className="shipping-option">
              <input 
                type="radio" 
                id={key} 
                name="shipping" 
                value={key}
                checked={selectedShipping === key}
                onChange={(e) => setSelectedShipping(e.target.value)}
              />
              <label htmlFor={key}>
                <div className="option-info">
                  <span className="option-name">{option.name}</span>
                  <span className="option-time">{option.time}</span>
                </div>
                <span className="option-price">
                  {option.price === 0 ? 'FREE' : `$${option.price.toFixed(2)}`}
                </span>
              </label>
            </div>
          ))}
          
          <div className="shipping-note">
            <p>📦 All orders are carefully packaged and insured</p>
            <p>🚚 Track your package with real-time updates</p>
            <p>📍 Signature required for orders over $200</p>
          </div>
        </div>
        
        <div className="shipping-actions">
          <button className="back-to-cart-btn" onClick={handleBackToCart}>
            Back to Cart
          </button>
          <button className="continue-payment-btn" onClick={handleContinueToPayment}>
            Continue to Payment
          </button>
        </div>
      </div>
    </>
  )

  const renderPaymentStep = () => (
    <>
      <div className="cart-header">
        <button className="back-btn" onClick={handleBackToShipping}>← Back to Shipping</button>
        <h3>Payment Information</h3>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>
      
      <div className="payment-content">
        <div className="payment-sections">
          <div className="shipping-summary">
            <h4>📦 Shipping Details</h4>
            <div className="address-card">
              <p><strong>{shippingInfo.fullName}</strong></p>
              <p>{shippingInfo.address}</p>
              {shippingInfo.address2 && <p>{shippingInfo.address2}</p>}
              <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.postalCode}</p>
              <p>{shippingInfo.country}</p>
              <div className="contact-info">
                <p>📧 {shippingInfo.email}</p>
                <p>📱 {shippingInfo.phone}</p>
              </div>
              <button className="edit-btn" onClick={handleBackToShipping}>Edit</button>
            </div>
            
            <div className="shipping-method">
              <h5>Shipping Method</h5>
              <div className="selected-shipping">
                <span>{shippingOptions[selectedShipping].name}</span>
                <span>{shippingOptions[selectedShipping].time}</span>
                <span className="shipping-price">
                  {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
            </div>
          </div>
          
          <div className="payment-section">
            <h4>💳 Payment Method</h4>
            <div className="payment-options">
              <div className="payment-option">
                <input type="radio" id="card" name="payment" defaultChecked />
                <label htmlFor="card">
                  <span className="payment-icon">💳</span>
                  Credit/Debit Card
                </label>
              </div>
              <div className="payment-option">
                <input type="radio" id="paypal" name="payment" />
                <label htmlFor="paypal">
                  <span className="payment-icon paypal-icon">🅿️</span>
                  PayPal
                </label>
              </div>
              <div className="payment-option">
                <input type="radio" id="apple" name="payment" />
                <label htmlFor="apple">
                  <span className="payment-icon apple-icon">🍎</span>
                  Apple Pay
                </label>
              </div>
              <div className="payment-option">
                <input type="radio" id="google" name="payment" />
                <label htmlFor="google">
                  <span className="payment-icon google-icon">🔵</span>
                  Google Pay
                </label>
              </div>
            </div>
            
            <div className="card-form">
              <div className="form-group">
                <label>Card Number *</label>
                <div className="card-input-wrapper">
                  <input 
                    type="text" 
                    name="cardNumber"
                    value={paymentInfo.cardNumber}
                    onChange={handlePaymentChange}
                    placeholder="1234 5678 9012 3456" 
                    className={`card-number-input ${getCardType(paymentInfo.cardNumber)}`}
                  />
                  <div className="card-icons">
                    <span className={`card-icon visa ${getCardType(paymentInfo.cardNumber) === 'visa' ? 'active' : ''}`}>
                      VISA
                    </span>
                    <span className={`card-icon mastercard ${getCardType(paymentInfo.cardNumber) === 'mastercard' ? 'active' : ''}`}>
                      MC
                    </span>
                    <span className={`card-icon amex ${getCardType(paymentInfo.cardNumber) === 'amex' ? 'active' : ''}`}>
                      AMEX
                    </span>
                    <span className={`card-icon discover ${getCardType(paymentInfo.cardNumber) === 'discover' ? 'active' : ''}`}>
                      DISC
                    </span>
                  </div>
                </div>
                {paymentInfo.cardNumber && !validateCardNumber(paymentInfo.cardNumber) && (
                  <span className="error-message">Please enter a valid card number</span>
                )}
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Expiry Date *</label>
                  <input 
                    type="text" 
                    name="expiryDate"
                    value={paymentInfo.expiryDate}
                    onChange={handlePaymentChange}
                    placeholder="MM/YY" 
                  />
                  {paymentInfo.expiryDate && !validateExpiryDate(paymentInfo.expiryDate) && (
                    <span className="error-message">Invalid expiry date</span>
                  )}
                </div>
                <div className="form-group">
                  <label>CVV *</label>
                  <input 
                    type="text" 
                    name="cvv"
                    value={paymentInfo.cvv}
                    onChange={handlePaymentChange}
                    placeholder={getCardType(paymentInfo.cardNumber) === 'amex' ? '1234' : '123'} 
                  />
                  {paymentInfo.cvv && !validateCVV(paymentInfo.cvv, getCardType(paymentInfo.cardNumber)) && (
                    <span className="error-message">
                      {getCardType(paymentInfo.cardNumber) === 'amex' ? '4 digits required' : '3 digits required'}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="form-group">
                <label>Cardholder Name *</label>
                <input 
                  type="text" 
                  name="cardholderName"
                  value={paymentInfo.cardholderName}
                  onChange={handlePaymentChange}
                  placeholder="Name as it appears on card"
                  style={{ textTransform: 'uppercase' }}
                />
              </div>
              
              <div className="billing-address-section">
                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      name="sameAsShipping"
                      checked={paymentInfo.sameAsShipping}
                      onChange={handlePaymentChange}
                    />
                    <span className="checkmark">✓</span>
                    Billing address same as shipping address
                  </label>
                </div>
                
                {!paymentInfo.sameAsShipping && (
                  <>
                    <h5>Billing Address</h5>
                    <div className="form-group">
                      <label>Address</label>
                      <input 
                        type="text" 
                        name="billingAddress"
                        value={paymentInfo.billingAddress}
                        onChange={handlePaymentChange}
                        placeholder="Billing street address" 
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>City</label>
                        <input 
                          type="text" 
                          name="billingCity"
                          value={paymentInfo.billingCity}
                          onChange={handlePaymentChange}
                          placeholder="City" 
                        />
                      </div>
                      <div className="form-group">
                        <label>State</label>
                        <input 
                          type="text" 
                          name="billingState"
                          value={paymentInfo.billingState}
                          onChange={handlePaymentChange}
                          placeholder="State" 
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Postal Code</label>
                      <input 
                        type="text" 
                        name="billingPostalCode"
                        value={paymentInfo.billingPostalCode}
                        onChange={handlePaymentChange}
                        placeholder="Postal code" 
                      />
                    </div>
                  </>
                )}
              </div>
              
              <div className="security-info">
                <div className="security-badge">
                  <span className="security-icon">🔒</span>
                  <div className="security-text">
                    <strong>Secure Payment</strong>
                    <p>Your payment information is encrypted and secure</p>
                  </div>
                </div>
                
                <div className="security-features">
                  <div className="security-feature">
                    <span className="security-feature-icon">🛡️</span>
                    <span>SSL Encrypted</span>
                  </div>
                  <div className="security-feature">
                    <span className="security-feature-icon">🔐</span>
                    <span>PCI Compliant</span>
                  </div>
                  <div className="security-feature">
                    <span className="security-feature-icon">✅</span>
                    <span>Fraud Protected</span>
                  </div>
                  <div className="security-feature">
                    <span className="security-feature-icon">💳</span>
                    <span>All Cards Accepted</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="order-summary">
          <h4>📋 Order Summary</h4>
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
              <span>Shipping ({shippingOptions[selectedShipping].name}):</span>
              <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
            </div>
            <div className="summary-row">
              <span>Tax (8%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="payment-guarantee">
            <div className="guarantee-item">
              <span>🛡️</span>
              <span>Money-back guarantee</span>
            </div>
            <div className="guarantee-item">
              <span>🔄</span>
              <span>Easy returns within 30 days</span>
            </div>
            <div className="guarantee-item">
              <span>📞</span>
              <span>24/7 customer support</span>
            </div>
          </div>
        </div>
        
        <div className="payment-actions">
          <button className="back-to-shipping-btn" onClick={handleBackToShipping}>
            Back to Shipping
          </button>
          <button 
            className={`process-payment-btn ${isProcessing ? 'processing' : ''}`}
            onClick={handleProcessPayment}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <span className="spinner">⏳</span>
                Processing Payment...
              </>
            ) : (
              <>
                <span className="lock-icon">🔒</span>
                Pay ${finalTotal.toFixed(2)}
              </>
            )}
          </button>
        </div>
      </div>
    </>
  )

  const renderConfirmationStep = () => (
    <>
      <div className="cart-header">
        <h3>🎉 Order Confirmed!</h3>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>
      
      <div className="confirmation-content">
        <div className="success-message">
          <div className="success-icon">✅</div>
          <h2>Thank you for your order!</h2>
          <p>Your payment has been processed successfully.</p>
          
          <div className="order-details">
            <div className="order-number">
              <strong>Order #SK-{Date.now().toString().slice(-6)}</strong>
            </div>
            <div className="order-total">
              <strong>Total: ${finalTotal.toFixed(2)}</strong>
            </div>
          </div>
        </div>
        
        <div className="confirmation-sections">
          <div className="shipping-confirmation">
            <h4>📦 Shipping Information</h4>
            <div className="confirmation-card">
              <p><strong>{shippingInfo.fullName}</strong></p>
              <p>{shippingInfo.address}</p>
              {shippingInfo.address2 && <p>{shippingInfo.address2}</p>}
              <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.postalCode}</p>
              <p>{shippingInfo.country}</p>
              <div className="shipping-method-confirm">
                <p><strong>Shipping Method:</strong> {shippingOptions[selectedShipping].name}</p>
                <p><strong>Estimated Delivery:</strong> {shippingOptions[selectedShipping].time}</p>
              </div>
            </div>
          </div>
          
          <div className="payment-confirmation">
            <h4>💳 Payment Information</h4>
            <div className="confirmation-card">
              <p><strong>Payment Method:</strong> Credit Card</p>
              <p><strong>Card:</strong> **** **** **** {paymentInfo.cardNumber.replace(/\s/g, '').slice(-4)}</p>
              <p><strong>Card Type:</strong> {getCardType(paymentInfo.cardNumber).toUpperCase()}</p>
              <p><strong>Amount Charged:</strong> ${finalTotal.toFixed(2)}</p>
              <div className="payment-status">
                <span className="status-badge success">✅ Payment Successful</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="order-items">
          <h4>📋 Items Ordered</h4>
          <div className="confirmation-items">
            {cartItems.map(item => (
              <div key={item.id} className="confirmation-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h5>{item.name}</h5>
                  <p>Quantity: {item.quantity}</p>
                  <p className="item-price">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="next-steps">
          <h4>📧 What's Next?</h4>
          <div className="next-steps-list">
            <div className="step">
              <span className="step-icon">📧</span>
              <div className="step-content">
                <strong>Confirmation Email</strong>
                <p>A detailed receipt has been sent to {shippingInfo.email}</p>
              </div>
            </div>
            <div className="step">
              <span className="step-icon">📦</span>
              <div className="step-content">
                <strong>Order Processing</strong>
                <p>Your order will be processed within 1-2 business days</p>
              </div>
            </div>
            <div className="step">
              <span className="step-icon">🚚</span>
              <div className="step-content">
                <strong>Shipping Updates</strong>
                <p>You'll receive tracking information via email and SMS</p>
              </div>
            </div>
            <div className="step">
              <span className="step-icon">📞</span>
              <div className="step-content">
                <strong>Customer Support</strong>
                <p>Contact us 24/7 if you have any questions about your order</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="confirmation-actions">
          <button className="track-order-btn">
            📍 Track Your Order
          </button>
          <button className="continue-shopping-btn" onClick={handleNewOrder}>
            Continue Shopping
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
        {currentStep === 'payment' && renderPaymentStep()}
        {currentStep === 'confirmation' && renderConfirmationStep()}
      </div>
    </div>
  )
}

export default CartModal
