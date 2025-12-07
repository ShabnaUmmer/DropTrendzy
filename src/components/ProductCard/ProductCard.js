// src/components/ProductCard/ProductCard.js - FIXED
import React, { Component } from 'react';
import ShopifyBuyButton from '../ShopifyBuyButton/BuyButton';
import './ProductCard.css';

class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInWishlist: false
    };
  }

  componentDidMount() {
    this.checkWishlistStatus();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.product !== this.props.product) {
      this.checkWishlistStatus();
    }
  }

  checkWishlistStatus = () => {
    const { product } = this.props;
    if (!product) return;
    
    const wishlist = JSON.parse(localStorage.getItem('droptrendzy_wishlist') || '[]');
    const isInWishlist = wishlist.some(item => item.handle === product.handle);
    this.setState({ isInWishlist });
  };

  handleProductClick = () => {
    const { product, navigateTo } = this.props;
    if (navigateTo && product) {
      navigateTo('product-detail', product.handle);
    }
  };

  handleWishlistToggle = (e) => {
    e.stopPropagation();
    const { product, updateWishlistCount } = this.props;
    const { isInWishlist } = this.state;
    
    if (!product) return;
    
    let wishlist = JSON.parse(localStorage.getItem('droptrendzy_wishlist') || '[]');
    
    if (isInWishlist) {
      // Remove from wishlist
      wishlist = wishlist.filter(item => item.handle !== product.handle);
    } else {
      // Add to wishlist
      const wishlistItem = {
        id: product.id,
        handle: product.handle,
        title: product.title,
        featuredImage: product.featuredImage,
        priceRange: product.priceRange,
        availableForSale: product.variants?.edges[0]?.node?.availableForSale || false
      };
      wishlist.push(wishlistItem);
    }
    
    localStorage.setItem('droptrendzy_wishlist', JSON.stringify(wishlist));
    this.setState({ isInWishlist: !isInWishlist });
    
    if (updateWishlistCount) {
      updateWishlistCount(wishlist.length);
    }
  };

  render() {
    const { product } = this.props;
    const { isInWishlist } = this.state;
    
    if (!product) return null;

    const price = product.priceRange?.minVariantPrice?.amount || '0.00';
    const compareAtPrice = product.variants?.edges[0]?.node?.compareAtPrice?.amount;
    const discount = compareAtPrice 
      ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100) 
      : 0;

    return (
      <div 
        className="product-card" 
        onClick={this.handleProductClick}
      >
        {/* Product Image */}
        <div className="product-image-container">
          <img 
            src={product.featuredImage?.url || 'https://via.placeholder.com/400x400'} 
            alt={product.featuredImage?.altText || product.title}
            className="product-image"
          />
          
          {/* Wishlist Button - Always visible now */}
          <button 
            className={`wishlist-btn ${isInWishlist ? 'active' : ''}`}
            onClick={this.handleWishlistToggle}
            title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <i className={`fas fa-heart ${isInWishlist ? 'fas' : 'far'}`}></i>
          </button>
          
          {discount > 0 && (
            <div className="discount-badge">-{discount}%</div>
          )}
          
          {product.isFeatured && (
            <div className="trending-badge">
              <i className="fas fa-bolt"></i> Trending
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="product-info">
          <h3 className="product-title">{product.title}</h3>
          
          <div className="product-pricing">
            <span className="current-price">${price}</span>
            {compareAtPrice && (
              <span className="compare-at-price">${compareAtPrice}</span>
            )}
          </div>

          {/* Shopify Buy Button */}
          <div onClick={(e) => e.stopPropagation()}>
            <ShopifyBuyButton
              productId={product.id}
              variantId={product.variants?.edges[0]?.node?.id}
              label="Add to Cart"
              price={price}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ProductCard;