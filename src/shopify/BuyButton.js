// src/shopify/BuyButton.js
import React, { Component } from 'react';
import './BuyButton.css';

class ShopifyBuyButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      error: null,
      success: false
    };
  }

  handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const { 
      product, 
      variantId, 
      quantity = 1, 
      onAddToCart,
      disabled = false 
    } = this.props;
    
    if (disabled || !product || !variantId) {
      return;
    }
    
    this.setState({ isLoading: true, error: null });
    
    try {
      // Call the parent's addToCart function from App.js
      if (onAddToCart) {
        onAddToCart(product, variantId, quantity);
        
        // Show success state
        this.setState({ 
          isLoading: false, 
          success: true 
        });
        
        // Reset success state after 2 seconds
        setTimeout(() => {
          this.setState({ success: false });
        }, 2000);
      } else {
        // Fallback: Direct redirect if no cart system
        this.redirectToShopifyCart(product, variantId, quantity);
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      this.setState({ 
        isLoading: false, 
        error: error.message || 'Failed to add to cart' 
      });
    }
  }

  // Fallback method if no cart system
  redirectToShopifyCart = (product, variantId, quantity) => {
    const domain = 'droptrendzy.myshopify.com';
    
    // Extract variant ID from GraphQL ID if needed
    let shopifyVariantId = variantId;
    if (variantId.includes('/')) {
      const parts = variantId.split('/');
      shopifyVariantId = parts[parts.length - 1];
    }
    
    const cartUrl = `https://${domain}/cart/${shopifyVariantId}:${quantity}`;
    
    // Open in new tab
    window.open(cartUrl, '_blank');
    this.setState({ isLoading: false });
  }

  render() {
    const { 
      variant = 'primary', 
      label = 'Add to Cart',
      price,
      disabled = false,
      className = ''
    } = this.props;
    
    const { isLoading, error, success } = this.state;

    if (error) {
      return (
        <div className="shopify-buy-error">
          <i className="fas fa-exclamation-triangle"></i>
          <p>{error}</p>
        </div>
      );
    }

    return (
      <div className={`shopify-buy-button-container ${className}`}>
        {price && (
          <div className="product-price-display">
            ${parseFloat(price).toFixed(2)}
          </div>
        )}
        
        <button
          className={`shopify-buy-button ${variant} ${isLoading ? 'loading' : ''} ${success ? 'success' : ''} ${disabled ? 'disabled' : ''}`}
          onClick={this.handleAddToCart}
          disabled={disabled || isLoading}
        >
          {isLoading ? (
            <>
              <div className="loading-spinner"></div>
              Adding...
            </>
          ) : success ? (
            <>
              <i className="fas fa-check-circle"></i>
              Added!
            </>
          ) : (
            <>
              <i className="fas fa-shopping-bag"></i>
              {label}
            </>
          )}
        </button>
        
        {!disabled && !success && (
          <div className="cart-note">
            <i className="fas fa-shopping-cart"></i>
            <span>Added to cart</span>
          </div>
        )}
      </div>
    );
  }
}

export default ShopifyBuyButton;