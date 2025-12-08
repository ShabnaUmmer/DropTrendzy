// src/App.js 
import React, { Component } from 'react';
import { shopifyClient } from './shopify/shopifyClient';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Wishlist from './pages/Wishlist/Wishlist';
import RefundPolicy from './pages/RefundPolicy/RefundPolicy';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions/TermsConditions';
import ShippingPolicy from './pages/ShippingPolicy/ShippingPolicy';
import CartPage from './pages/CartPage/CartPage';
import Cart from './components/Cart/Cart';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'home',
      products: [],
      pageData: null,
      isLoading: true,
      error: null,
      wishlistCount: 0,
      cartItems: [],
      cartOpen: false,
      cartItemCount: 0
    };
  }

  async componentDidMount() {
    await this.loadProductsFromShopify();
    this.updateWishlistCount();
    this.loadCartFromStorage();
  }

  // Load cart from localStorage
  loadCartFromStorage = () => {
    try {
      const savedCart = localStorage.getItem('droptrendzy_cart');
      if (savedCart) {
        const cartItems = JSON.parse(savedCart);
        const cartItemCount = this.calculateCartItemCount(cartItems);
        this.setState({ 
          cartItems, 
          cartItemCount 
        });
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };

  // Save cart to localStorage
  saveCartToStorage = (cartItems) => {
    try {
      localStorage.setItem('droptrendzy_cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  };

  // Calculate total items in cart
  calculateCartItemCount = (cartItems) => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  // Calculate cart total
  calculateCartTotal = (cartItems) => {
    return cartItems.reduce((total, item) => {
      return total + (parseFloat(item.price) * item.quantity);
    }, 0);
  };

  // Add to cart function
  addToCart = (product, variantId, quantity = 1) => {
    const { cartItems } = this.state;
    
    // Check if item already exists
    const existingItemIndex = cartItems.findIndex(
      item => item.productId === product.id && item.variantId === variantId
    );

    let updatedCart;
    
    if (existingItemIndex >= 0) {
      // Update quantity if exists
      updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      const variant = product.variants?.edges?.find(
        edge => edge.node.id === variantId
      )?.node;

      const newItem = {
        id: `${product.id}-${variantId}`,
        productId: product.id,
        variantId,
        title: product.title,
        handle: product.handle,
        variantTitle: variant?.title || 'Default',
        price: variant?.price?.amount || product.priceRange?.minVariantPrice?.amount,
        compareAtPrice: variant?.compareAtPrice?.amount,
        quantity,
        image: product.featuredImage?.url || product.images?.edges?.[0]?.node?.url,
        availableForSale: variant?.availableForSale || false
      };

      updatedCart = [...cartItems, newItem];
    }

    const cartItemCount = this.calculateCartItemCount(updatedCart);
    
    this.setState({
      cartItems: updatedCart,
      cartItemCount,
      cartOpen: true // Open cart when item is added
    }, () => {
      this.saveCartToStorage(updatedCart);
      this.showCartNotification('Added to cart!', 'success');
    });
  };

  // Remove from cart
  removeFromCart = (itemId) => {
    const updatedCart = this.state.cartItems.filter(item => item.id !== itemId);
    const cartItemCount = this.calculateCartItemCount(updatedCart);
    
    this.setState({
      cartItems: updatedCart,
      cartItemCount
    }, () => {
      this.saveCartToStorage(updatedCart);
    });
  };

  // Update quantity
  updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      this.removeFromCart(itemId);
      return;
    }

    const updatedCart = this.state.cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: Math.min(newQuantity, 10) } : item
    );

    const cartItemCount = this.calculateCartItemCount(updatedCart);
    
    this.setState({
      cartItems: updatedCart,
      cartItemCount
    }, () => {
      this.saveCartToStorage(updatedCart);
    });
  };

  // Clear cart
  clearCart = () => {
    this.setState({
      cartItems: [],
      cartItemCount: 0
    }, () => {
      localStorage.removeItem('droptrendzy_cart');
    });
  };

  // Toggle cart drawer
  toggleCart = () => {
    this.setState(prevState => ({ cartOpen: !prevState.cartOpen }));
  };

  // Show notification
  showCartNotification = (message, type = 'success') => {
    const notification = document.createElement('div');
    notification.className = `cart-notification ${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas fa-${type === 'error' ? 'exclamation-circle' : type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    if (!document.querySelector('#cart-notification-styles')) {
      const style = document.createElement('style');
      style.id = 'cart-notification-styles';
      style.textContent = `
        .cart-notification {
          position: fixed;
          top: 100px;
          right: 20px;
          padding: 1rem 1.5rem;
          border-radius: 8px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
          z-index: 9999;
          animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
          max-width: 300px;
        }
        .cart-notification.success {
          background: linear-gradient(135deg, #00c9a7, #00d4aa);
          color: white;
        }
        .cart-notification.error {
          background: linear-gradient(135deg, #ff6b6b, #ff4757);
          color: white;
        }
        .notification-content {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeOut {
          to { opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
    
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 3000);
  };

  // Load products function
  loadProductsFromShopify = async () => {
    try {
      this.setState({ isLoading: true, error: null });
      const data = await shopifyClient.getProducts(20);
      
      if (!data || !data.products || !data.products.edges) {
        throw new Error('No products returned from Shopify');
      }
      
      const products = data.products.edges.map(edge => {
        const product = edge.node;
        return {
          ...product,
          id: product.id?.split('/').pop() || product.handle || `product-${Date.now()}`,
          featuredImage: product.featuredImage || {
            url: 'https://via.placeholder.com/400x400?text=No+Image',
            altText: product.title || 'Product Image'
          },
          isFeatured: Math.random() > 0.7,
          priceRange: product.priceRange || {
            minVariantPrice: {
              amount: '0.00',
              currencyCode: 'USD'
            }
          }
        };
      });
      
      this.setState({ 
        products, 
        isLoading: false,
        error: null 
      });
      
    } catch (error) {
      console.error('❌ Error loading products:', error);
      this.setState({ 
        error: error.message || 'Failed to load products from Shopify',
        isLoading: false,
        products: []
      });
    }
  };

  updateWishlistCount = () => {
    try {
      const wishlist = JSON.parse(localStorage.getItem('droptrendzy_wishlist') || '[]');
      this.setState({ wishlistCount: wishlist.length });
    } catch (error) {
      console.error('Error updating wishlist count:', error);
    }
  };

  navigateTo = (page, data = null) => {
    console.log(`Navigating to: ${page}`, data);
    this.setState({ 
      currentPage: page,
      pageData: data,
      cartOpen: false // Close cart when navigating
    });
    
    window.scrollTo(0, 0);
    
    if (page === 'wishlist') {
      this.updateWishlistCount();
    }
  };

  handleCheckout = () => {
    const { cartItems } = this.state;
    
    // Build Shopify checkout URL
    const domain = 'droptrendzy.myshopify.com';
    const cartLines = cartItems.map(item => {
      const variantId = item.variantId.split('/').pop();
      return `${variantId}:${item.quantity}`;
    }).join(',');
    
    const checkoutUrl = `https://${domain}/cart/${cartLines}`;
    
    // Open in new tab
    window.open(checkoutUrl, '_blank');
  };

  renderCurrentPage = () => {
    const { currentPage, pageData, products, cartItems } = this.state;
    const cartTotal = this.calculateCartTotal(cartItems);

    switch (currentPage) {
      case 'products':
        return (
          <Products 
            products={products}
            navigateTo={this.navigateTo}
            addToCart={this.addToCart}
          />
        );
      
      case 'product-detail':
        return (
          <ProductDetail 
            productId={pageData}
            navigateTo={this.navigateTo}
            addToCart={this.addToCart}
          />
        );
      
      case 'wishlist':
        return (
          <Wishlist 
            navigateTo={this.navigateTo}
            updateWishlistCount={this.updateWishlistCount}
            addToCart={this.addToCart}
          />
        );
      
      case 'cart':
        return (
          <CartPage
            cartItems={cartItems}
            cartTotal={cartTotal}
            navigateTo={this.navigateTo}
            removeFromCart={this.removeFromCart}
            updateQuantity={this.updateQuantity}
            clearCart={this.clearCart}
            handleCheckout={this.handleCheckout}
          />
        );
      
      case 'about':
        return <About navigateTo={this.navigateTo} />;
      
      case 'contact':
        return <Contact navigateTo={this.navigateTo} />;

      case 'refund-policy':
        return <RefundPolicy navigateTo={this.navigateTo} />;
      
      case 'privacy-policy':
        return <PrivacyPolicy navigateTo={this.navigateTo} />;
      
      case 'terms-conditions':
        return <TermsConditions navigateTo={this.navigateTo} />;
      
      case 'shipping-policy':
        return <ShippingPolicy navigateTo={this.navigateTo} />;
      
      case 'home':
      default:
        return (
          <Home 
            products={products}
            navigateTo={this.navigateTo}
            wishlistCount={this.state.wishlistCount}
            updateWishlistCount={this.updateWishlistCount}
            addToCart={this.addToCart}
          />
        );
    }
  };

  handleRetry = () => {
    this.setState({ isLoading: true, error: null });
    this.loadProductsFromShopify();
  };

  render() {
    const { isLoading, error, currentPage, cartItems, cartOpen, cartItemCount } = this.state;
    const cartTotal = this.calculateCartTotal(cartItems);

    return (
      <div className="App">
        <Navbar 
          navigateTo={this.navigateTo} 
          currentPage={currentPage}
          wishlistCount={this.state.wishlistCount}
          cartItemCount={cartItemCount}
          toggleCart={this.toggleCart}
        />
        
        {/* Cart Drawer Component */}
        {cartOpen && (
          <Cart
            cartItems={cartItems}
            cartTotal={cartTotal}
            cartItemCount={cartItemCount}
            toggleCart={this.toggleCart}
            removeFromCart={this.removeFromCart}
            updateQuantity={this.updateQuantity}
            handleCheckout={this.handleCheckout}
            clearCart={this.clearCart}
          />
        )}
        
        <main className="app-main">
          {error ? (
            <div className="app-error glass-card">
              <div className="error-icon">
                <i className="fas fa-exclamation-triangle"></i>
              </div>
              <h2>Store Connection Error</h2>
              <p className="error-message">{error}</p>
              <button 
                className="btn-modern"
                onClick={this.handleRetry}
              >
                <i className="fas fa-redo"></i>
                Retry Connection
              </button>
            </div>
          ) : isLoading ? (
            <div className="loading-spinner-full">
              <div className="spinner"></div>
              <p>Loading store...</p>
            </div>
          ) : (
            this.renderCurrentPage()
          )}
        </main>
        
        <Footer navigateTo={this.navigateTo} />
      </div>
    );
  }
}

export default App;