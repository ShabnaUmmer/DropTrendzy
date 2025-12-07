// src/shopify/BuyButton.js
import React, { Component } from 'react';
import './BuyButton.css'; // Create this CSS file

class ShopifyBuyButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      error: null
    };
  }

  handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    this.setState({ isLoading: true });
    
    const { variantId, productId, quantity = 1 } = this.props;
    
    // Direct Shopify cart URL method (Simpler & more reliable)
    const domain = 'droptrendzy.myshopify.com';
    
    if (variantId) {
      // Redirect to Shopify cart with the variant
      window.open(`https://${domain}/cart/${variantId}:${quantity}`, '_blank');
    } else if (productId) {
      // If only product ID is available, use this format
      window.open(`https://${domain}/cart/${productId}:${quantity}`, '_blank');
    }
    
    this.setState({ isLoading: false });
  }

  render() {
    const { 
      variant = 'primary', 
      label = 'Add to Cart',
      price,
      disabled = false 
    } = this.props;
    const { isLoading, error } = this.state;

    if (error) {
      return (
        <div className="shopify-buy-error">
          <i className="fas fa-exclamation-triangle"></i>
          <p>Unable to load buy button</p>
        </div>
      );
    }

    return (
      <div className="shopify-buy-button-container">
        {price && (
          <div className="product-price-display">
            ${parseFloat(price).toFixed(2)}
          </div>
        )}
        
        <button
          className={`shopify-buy-button ${variant} ${isLoading ? 'loading' : ''}`}
          onClick={this.handleAddToCart}
          disabled={disabled || isLoading}
        >
          {isLoading ? (
            <>
              <div className="loading-spinner"></div>
              Adding...
            </>
          ) : (
            <>
              <i className="fas fa-shopping-bag"></i>
              {label}
            </>
          )}
        </button>
        
        {!disabled && (
          <div className="cart-note">
            <i className="fas fa-external-link-alt"></i>
            <span>Opens in new tab</span>
          </div>
        )}
      </div>
    );
  }
}

export default ShopifyBuyButton;