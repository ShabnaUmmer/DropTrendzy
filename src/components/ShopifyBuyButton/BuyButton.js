// src/components/ShopifyBuyButton/BuyButton.js - UPDATED
import React, { Component } from 'react';
import './BuyButton.css';

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
    
    const { productId, variantId, quantity = 1, onAddToCart } = this.props;
    
    if (onAddToCart) {
      onAddToCart(productId, variantId, quantity);
    }
    
    // Redirect to Shopify cart
    setTimeout(() => {
      this.setState({ isLoading: false });
      this.redirectToShopifyCart(productId, variantId, quantity);
    }, 1000);
  }

  redirectToShopifyCart = (productId, variantId, quantity) => {
    const shopDomain = 'your-store.myshopify.com';
    let url = `https://${shopDomain}/cart/`;
    
    if (variantId) {
      url += `${variantId}:${quantity}`;
    } else if (productId) {
      url += `${productId}:${quantity}`;
    }
    
    // Open in new tab
    window.open(url, '_blank');
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