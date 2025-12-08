// src/pages/CartPage/CartPage.js
import React, { Component } from 'react';
import './CartPage.css';

class CartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheckingOut: false
    };
  }

  handleCheckout = () => {
    this.setState({ isCheckingOut: true });
    
    if (this.props.handleCheckout) {
      this.props.handleCheckout();
    }
    
    setTimeout(() => {
      this.setState({ isCheckingOut: false });
    }, 2000);
  };

  formatPrice = (price) => {
    return parseFloat(price || 0).toFixed(2);
  };

  render() {
    const { 
      cartItems = [], 
      cartTotal = 0, 
      navigateTo,
      removeFromCart,
      updateQuantity,
      clearCart
    } = this.props;
    
    const { isCheckingOut } = this.state;
    
    const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    if (cartItems.length === 0) {
      return (
        <div className="cart-page">
          <div className="breadcrumb-modern">
            <button className="breadcrumb-link" onClick={() => navigateTo('home')}>
              Home
            </button>
            <i className="fas fa-chevron-right"></i>
            <span className="current">Cart</span>
          </div>

          <div className="empty-cart-page glass-card">
            <div className="empty-cart-icon">
              <i className="fas fa-shopping-bag"></i>
            </div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any products to your cart yet.</p>
            <div className="empty-cart-actions">
              <button 
                className="btn-modern"
                onClick={() => navigateTo('products')}
              >
                <i className="fas fa-shopping-bag"></i>
                Browse Products
              </button>
              <button 
                className="btn-modern-outline"
                onClick={() => navigateTo('home')}
              >
                <i className="fas fa-home"></i>
                Return Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="cart-page">
        <div className="breadcrumb-modern">
          <button className="breadcrumb-link" onClick={() => navigateTo('home')}>
            Home
          </button>
          <i className="fas fa-chevron-right"></i>
          <span className="current">Cart ({itemCount})</span>
        </div>

        <div className="cart-page-container">
          <div className="cart-items-section glass-card">
            <div className="cart-header">
              <h2>Shopping Cart ({itemCount} items)</h2>
              <button 
                className="clear-cart-btn"
                onClick={() => {
                  if (window.confirm('Clear all items from cart?')) {
                    clearCart();
                  }
                }}
              >
                <i className="fas fa-trash"></i>
                Clear Cart
              </button>
            </div>

            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item-detail">
                  <div className="cart-item-left">
                    <div className="cart-item-image">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/100x100?text=No+Image';
                        }}
                      />
                    </div>
                    
                    <div className="cart-item-info">
                      <h3 className="cart-item-title">
                        {item.title}
                        {!item.availableForSale && (
                          <span className="sold-out-badge">Sold Out</span>
                        )}
                      </h3>
                      <p className="cart-item-variant">{item.variantTitle}</p>
                      <p className="cart-item-price">${this.formatPrice(item.price)} each</p>
                      
                      <div className="cart-item-actions">
                        <div className="quantity-controls">
                          <button
                            className="quantity-btn"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <i className="fas fa-minus"></i>
                          </button>
                          <span className="quantity-display">{item.quantity}</span>
                          <button
                            className="quantity-btn"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= 10}
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                        
                        <button
                          className="remove-item-btn"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <i className="fas fa-trash"></i>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="cart-item-right">
                    <div className="cart-item-total">
                      ${this.formatPrice(parseFloat(item.price) * item.quantity)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="cart-summary-section glass-card">
            <h3>Order Summary</h3>
            
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal ({itemCount} items)</span>
                <span>${this.formatPrice(cartTotal)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span className="free-shipping">
                  <i className="fas fa-shipping-fast"></i>
                  Calculated at checkout
                </span>
              </div>
              <div className="summary-row">
                <span>Tax</span>
                <span>Calculated at checkout</span>
              </div>
              
              <div className="summary-divider"></div>
              
              <div className="summary-row total">
                <span>Estimated Total</span>
                <span className="total-amount">${this.formatPrice(cartTotal)}</span>
              </div>
            </div>

            <div className="checkout-actions">
              <button
                className="btn-modern checkout-btn-full"
                onClick={this.handleCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? (
                  <>
                    <div className="loading-spinner"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <i className="fas fa-lock"></i>
                    Proceed to Checkout
                  </>
                )}
              </button>
              
              <p className="secure-checkout-note">
                <i className="fas fa-shield-alt"></i>
                Secure checkout powered by Shopify
              </p>
              
              <button
                className="continue-shopping-btn"
                onClick={() => navigateTo('products')}
              >
                <i className="fas fa-arrow-left"></i>
                Continue Shopping
              </button>
            </div>

            <div className="trust-badges-summary">
              <div className="trust-badge">
                <i className="fas fa-shield-alt"></i>
                <div>
                  <strong>Secure Payment</strong>
                  <span>256-bit SSL Encryption</span>
                </div>
              </div>
              <div className="trust-badge">
                <i className="fas fa-undo"></i>
                <div>
                  <strong>30-Day Returns</strong>
                  <span>Money Back Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CartPage;