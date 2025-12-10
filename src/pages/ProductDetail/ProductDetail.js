// src/pages/ProductDetail/ProductDetail.js (UPDATED)
import React, { Component } from 'react';
import { shopifyClient } from '../../shopify/shopifyClient';
import ShopifyBuyButton from '../../shopify/BuyButton'; // Import the BuyButton
import './ProductDetail.css';

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      selectedVariant: null,
      selectedImage: 0,
      quantity: 1,
      isLoading: true,
      error: null,
      isInWishlist: false,
      debugInfo: null
    };
  }

  componentDidMount() {
    this.loadProduct();
    this.checkWishlistStatus();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.productId !== this.props.productId) {
      this.loadProduct();
    }
  }

  loadProduct = async () => {
    const { productId } = this.props;

    if (!productId) {
      this.setState({ 
        error: 'No product specified.', 
        isLoading: false 
      });
      return;
    }

    try {
      this.setState({ 
        isLoading: true, 
        error: null,
        debugInfo: `Loading product with handle: ${productId}` 
      });

      console.log('🔄 Loading product:', productId);
      
      const connectionTest = await shopifyClient.testConnection();
      console.log('Connection test:', connectionTest);
      
      if (!connectionTest.success) {
        throw new Error(`Shopify connection failed: ${connectionTest.message}`);
      }

      console.log('📦 Fetching product details...');
      const data = await shopifyClient.getProductByHandle(productId);
      console.log('📦 Product data received:', data);
      
      if (!data) {
        throw new Error('No data received from Shopify');
      }
      
      if (!data.productByHandle) {
        console.warn('Product not found by handle. Trying direct ID lookup...');
        const allProducts = await shopifyClient.getProducts(50);
        console.log('All products:', allProducts);
        
        if (allProducts && allProducts.products && allProducts.products.edges) {
          const foundProduct = allProducts.products.edges.find(
            edge => edge.node.handle === productId
          )?.node;
          
          if (foundProduct) {
            console.log('✅ Product found via search!');
            this.setProductData(foundProduct);
            return;
          }
        }
        
        throw new Error(`Product "${productId}" not found in Shopify store.`);
      }

      this.setProductData(data.productByHandle);

    } catch (error) {
      console.error('❌ Error loading product:', error);
      this.setState({
        error: `Failed to load product: ${error.message || 'Unknown error'}`,
        isLoading: false,
        product: null,
        debugInfo: error.toString()
      });
    }
  };

  setProductData = (product) => {
    console.log('🎉 Setting product data:', product);
    console.log('Product ID:', product.id);
    console.log('Product title:', product.title);
    console.log('Product handle:', product.handle);
    console.log('Product description:', product.description?.substring(0, 100) + '...');
    console.log('Product images count:', product.images?.edges?.length || 0);
    console.log('Product variants count:', product.variants?.edges?.length || 0);

    const defaultVariant = product.variants?.edges?.[0]?.node || null;
    
    this.setState({
      product,
      selectedVariant: defaultVariant,
      isLoading: false,
      error: null,
      debugInfo: `Product loaded successfully. Title: ${product.title}`
    });
  };

  checkWishlistStatus = () => {
    const { productId } = this.props;
    const wishlist = JSON.parse(localStorage.getItem('droptrendzy_wishlist') || '[]');
    const isInWishlist = wishlist.some(item => item.handle === productId);
    this.setState({ isInWishlist });
  };

  getFullDescription = (product) => {
    if (!product) {
      return '<p class="no-description">No description available.</p>';
    }

    if (product.descriptionHtml && product.descriptionHtml.length > 50) {
      if (product.descriptionHtml.endsWith('...') || product.descriptionHtml.includes('...')) {
        console.log('DescriptionHtml appears truncated');
        return this.formatPlainDescription(product.description);
      }
      return product.descriptionHtml;
    }

    if (product.description && product.description.length > 0) {
      return this.formatPlainDescription(product.description);
    }

    return '<p class="no-description">No description available.</p>';
  };

  formatPlainDescription = (text) => {
    if (!text) return '<p class="no-description">No description available.</p>';
    
    let cleanText = text.replace(/\.\.\.$/, '');
    
    const paragraphs = cleanText
      .split('\n')
      .filter(line => line.trim().length > 0)
      .map(line => `<p>${line.trim()}</p>`);
    
    if (paragraphs.length === 0) {
      return '<p class="no-description">No description available.</p>';
    }
    
    return paragraphs.join('');
  };

  handleWishlistToggle = () => {
    const { product } = this.state;
    const { productId } = this.props;
    const { isInWishlist } = this.state;
    
    const wishlist = JSON.parse(localStorage.getItem('droptrendzy_wishlist') || '[]');
    
    if (isInWishlist) {
      const updatedWishlist = wishlist.filter(item => item.handle !== productId);
      localStorage.setItem('droptrendzy_wishlist', JSON.stringify(updatedWishlist));
      this.setState({ isInWishlist: false });
    } else {
      const wishlistItem = {
        id: product?.id,
        handle: productId,
        title: product?.title,
        featuredImage: product?.featuredImage,
        priceRange: product?.priceRange,
        availableForSale: product?.variants?.edges?.[0]?.node?.availableForSale || false
      };
      
      wishlist.push(wishlistItem);
      localStorage.setItem('droptrendzy_wishlist', JSON.stringify(wishlist));
      this.setState({ isInWishlist: true });
    }
    
    if (this.props.updateWishlistCount) {
      this.props.updateWishlistCount();
    }
  };

  handleVariantSelect = (variantId) => {
    const { product } = this.state;
    if (!product?.variants?.edges) return;

    const variant = product.variants.edges.find(
      (edge) => edge.node.id === variantId
    )?.node;

    if (variant) {
      this.setState({ selectedVariant: variant });
    }
  };

  handleImageSelect = (index) => {
    this.setState({ selectedImage: index });
  };

  handleQuantityChange = (change) => {
    this.setState((prevState) => ({
      quantity: Math.max(1, Math.min(10, prevState.quantity + change))
    }));
  };

  formatPrice = (amount) => {
    if (!amount) return '0.00';
    return parseFloat(amount).toFixed(2);
  };

  handleAddToCart = () => {
    const { product, selectedVariant, quantity } = this.state;
    const { addToCart } = this.props;
    
    if (!product || !selectedVariant) {
      return;
    }
    
    if (addToCart) {
      addToCart(product, selectedVariant.id, quantity);
    }
  };

  handleRetry = () => {
    this.loadProduct();
  };

  render() {
    const { navigateTo } = this.props;
    const { product, selectedVariant, selectedImage, quantity, isLoading, error, isInWishlist, debugInfo } = this.state;

    if (isLoading) {
      return (
        <div className="product-detail-loading">
          <div className="spinner"></div>
          <p>Loading product details...</p>
          <p className="loading-subtext">Fetching from Shopify store</p>
        </div>
      );
    }

    if (error || !product) {
      return (
        <div className="product-detail-error">
          <div className="error-container glass-card">
            <div className="error-icon">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <h2>Product Not Available</h2>
            <p className="error-message">{error || 'This product is not available.'}</p>
            
            {debugInfo && (
              <div className="debug-info">
                <p><strong>Debug Info:</strong> {debugInfo}</p>
              </div>
            )}

            <div className="error-solutions">
              <p><strong>Possible reasons:</strong></p>
              <ul>
                <li>Product might have been removed from the store</li>
                <li>Shopify store connection issue</li>
                <li>Incorrect product handle or ID</li>
                <li>Network connectivity problem</li>
              </ul>
            </div>

            <div className="error-actions">
              <button 
                className="btn-modern"
                onClick={this.handleRetry}
              >
                <i className="fas fa-redo"></i>
                Try Again
              </button>
              <button 
                className="btn-modern-outline"
                onClick={() => navigateTo('products')}
              >
                <i className="fas fa-arrow-left"></i>
                Back to Products
              </button>
            </div>
          </div>
        </div>
      );
    }

    const images = product.images?.edges || [];
    const variants = product.variants?.edges || [];
    const price = selectedVariant?.price?.amount || product.priceRange?.minVariantPrice?.amount || '0.00';
    const comparePrice = selectedVariant?.compareAtPrice?.amount;
    const discount = comparePrice && price < comparePrice
      ? Math.round(((comparePrice - price) / comparePrice) * 100)
      : 0;

    return (
      <div className="product-detail-page">
        <div className="breadcrumb-modern">
          <button className="breadcrumb-link" onClick={() => navigateTo('home')}>
            Home
          </button>
          <i className="fas fa-chevron-right"></i>
          <button className="breadcrumb-link" onClick={() => navigateTo('products')}>
            Products
          </button>
          <i className="fas fa-chevron-right"></i>
          <span className="current">{product.title}</span>
        </div>

        <div className="product-detail-container">
          {/* Product Images */}
          <div className="product-images-section">
            <div className="main-image-container">
              {images.length > 0 ? (
                <img
                  src={images[selectedImage]?.node?.url}
                  alt={images[selectedImage]?.node?.altText || product.title}
                  className="main-image"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/600x600?text=No+Image';
                  }}
                />
              ) : (
                <div className="image-placeholder">
                  <i className="fas fa-image"></i>
                  <span>No image available</span>
                </div>
              )}
              
              <button 
                className={`wishlist-button ${isInWishlist ? 'active' : ''}`}
                onClick={this.handleWishlistToggle}
                title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
              >
                <i className={`fas fa-heart ${isInWishlist ? 'fas' : 'far'}`}></i>
              </button>
            </div>

            {images.length > 1 && (
              <div className="thumbnail-images">
                {images.map((img, index) => (
                  <button
                    key={index}
                    className={`thumbnail-btn ${index === selectedImage ? 'active' : ''}`}
                    onClick={() => this.handleImageSelect(index)}
                  >
                    <img
                      src={img.node.url}
                      alt={img.node.altText || `Product image ${index + 1}`}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/100x100?text=Image';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="product-info-section glass-card">
            <div className="product-header">
              <h1 className="product-title">{product.title}</h1>
              
              <div className="product-badges">
                {discount > 0 && (
                  <span className="badge discount">
                    <i className="fas fa-tag"></i>
                    -{discount}% OFF
                  </span>
                )}
                {selectedVariant?.availableForSale ? (
                  <span className="badge in-stock">
                    <i className="fas fa-check-circle"></i>
                    In Stock
                  </span>
                ) : (
                  <span className="badge out-of-stock">
                    <i className="fas fa-times-circle"></i>
                    Out of Stock
                  </span>
                )}
              </div>
            </div>

            <div className="product-description">
              <h3>
                <i className="fas fa-info-circle"></i>
                Description
              </h3>
              <div 
                className="description-content"
                dangerouslySetInnerHTML={{ 
                  __html: this.getFullDescription(product) 
                }} 
              />
            </div>

            {variants.length > 1 && (
              <div className="variant-option">
                <h4><i className="fas fa-box"></i> Options:</h4>
                <div className="variant-buttons">
                  {variants.map((edge, index) => (
                    <button
                      key={index}
                      className={`variant-btn ${
                        selectedVariant?.id === edge.node.id ? 'selected' : ''
                      } ${!edge.node.availableForSale ? 'disabled' : ''}`}
                      onClick={() => this.handleVariantSelect(edge.node.id)}
                      disabled={!edge.node.availableForSale}
                    >
                      {edge.node.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="product-pricing">
              <div className="price-display">
                <span className="current-price">INR {this.formatPrice(price)}</span>
                {comparePrice && comparePrice > price && (
                  <span className="compare-price">INR {this.formatPrice(comparePrice)}</span>
                )}
              </div>
              
              {discount > 0 && (
                <div className="discount-display">
                  <span className="save-amount">
                    <i className="fas fa-badge-percent"></i>
                    Save INR {this.formatPrice(comparePrice - price)} ({discount}%)
                  </span>
                </div>
              )}
            </div>

            <div className="quantity-selector">
              <label>
                <i className="fas fa-sort-amount-up"></i>
                Quantity:
              </label>
              <div className="quantity-controls">
                <button
                  className="quantity-btn"
                  onClick={() => this.handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <i className="fas fa-minus"></i>
                </button>
                <span className="quantity-display">{quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() => this.handleQuantityChange(1)}
                  disabled={quantity >= 10}
                >
                  <i className="fas fa-plus"></i>
                </button>
              </div>
            </div>

            <div className="buy-button-section">
              {/* Replace custom button with ShopifyBuyButton */}
              <ShopifyBuyButton
                product={product}
                variantId={selectedVariant?.id}
                quantity={quantity}
                label={selectedVariant?.availableForSale ? "Add to Cart" : "Out of Stock"}
                price={this.formatPrice(price)}
                disabled={!selectedVariant?.availableForSale}
                onAddToCart={this.handleAddToCart} // This calls props.addToCart
                className="product-detail-buy-button"
              />
            </div>

            <div className="product-policy-note">
              <i className="fas fa-shield-alt"></i>
              <div>
                <h4>Purchase Protection</h4>
                <p>
                  Full refund/replacement with unboxing video evidence.
                  <button 
                    className="policy-link-btn"
                    onClick={() => navigateTo('refund-policy')}
                  >
                    Learn more
                  </button>
                </p>
              </div>
            </div>

            <div className="trust-badges">
              <div className="trust-badge">
                <i className="fas fa-shipping-fast"></i>
                <div>
                  <strong>Free Shipping</strong>
                  <span>Over INR 100</span>
                </div>
              </div>
              <div className="trust-badge">
                <i className="fas fa-shield-alt"></i>
                <div>
                  <strong>Secure Payment</strong>
                  <span>256-bit SSL</span>
                </div>
              </div>
              <div className="trust-badge">
                <i className="fas fa-undo"></i>
                <div>
                  <strong>3-Day Returns</strong>
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

export default ProductDetail;