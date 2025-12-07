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
      wishlistCount: 0
    };
  }

  async componentDidMount() {
    await this.loadProductsFromShopify();
    this.updateWishlistCount();
  }

  loadProductsFromShopify = async () => {
    try {
      this.setState({ isLoading: true, error: null });
      
      console.log('🔄 Loading products from Shopify...');
      
      // Test connection first
      const connectionTest = await shopifyClient.testConnection();
      if (!connectionTest.success) {
        throw new Error(`Shopify connection failed: ${connectionTest.message}`);
      }
      
      console.log('✅ Connected to Shopify, fetching products...');
      
      // Fetch products
      const data = await shopifyClient.getProducts(20);
      
      if (!data || !data.products || !data.products.edges) {
        throw new Error('No products returned from Shopify');
      }
      
      console.log(`✅ Loaded ${data.products.edges.length} products`);
      
      // Process products with proper fallbacks
      const products = data.products.edges.map(edge => {
        const product = edge.node;
        
        return {
          ...product,
          id: product.id?.split('/').pop() || product.handle || `product-${Date.now()}`,
          featuredImage: product.featuredImage || {
            url: 'https://via.placeholder.com/400x400?text=No+Image',
            altText: product.title || 'Product Image'
          },
          isFeatured: Math.random() > 0.7, // Randomly feature some products
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
        products: [] // Set empty array to prevent crashes
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
      pageData: data 
    });
    
    // Scroll to top on page change
    window.scrollTo(0, 0);
    
    // Update wishlist count if needed
    if (page === 'wishlist') {
      this.updateWishlistCount();
    }
  };

  renderCurrentPage = () => {
    const { currentPage, pageData, products } = this.state;

    switch (currentPage) {
      case 'products':
        return (
          <Products 
            products={products}
            navigateTo={this.navigateTo}
          />
        );
      
      case 'product-detail':
        return (
          <ProductDetail 
            productId={pageData}
            navigateTo={this.navigateTo}
          />
        );
      
      case 'wishlist':
        return (
          <Wishlist 
            navigateTo={this.navigateTo}
            updateWishlistCount={this.updateWishlistCount}
          />
        );
      
      case 'about':
        return <About navigateTo={this.navigateTo} />;
      
      case 'contact':
        return <Contact navigateTo={this.navigateTo} />;

      case 'refund-policy':
        return <RefundPolicy navigateTo={this.navigateTo} />;
      
      case 'home':
      default:
        return (
          <Home 
            products={products}
            navigateTo={this.navigateTo}
            wishlistCount={this.state.wishlistCount}
            updateWishlistCount={this.updateWishlistCount}
          />
        );
    }
  };

  handleRetry = () => {
    this.setState({ isLoading: true, error: null });
    this.loadProductsFromShopify();
  };

  render() {
    const { isLoading, error, currentPage } = this.state;

    return (
      <div className="App">
        {/* FIX: Pass currentPage prop to Navbar */}
        <Navbar 
          navigateTo={this.navigateTo} 
          currentPage={currentPage}  // <-- THIS IS THE FIX!
          wishlistCount={this.state.wishlistCount}
        />
        
        <main className="app-main">
          {error ? (
            <div className="app-error glass-card">
              <div className="error-icon">
                <i className="fas fa-exclamation-triangle"></i>
              </div>
              <h2>Store Connection Error</h2>
              <p className="error-message">{error}</p>
              <div className="error-solutions">
                <p>Possible solutions:</p>
                <ul>
                  <li>Check your Shopify store is active</li>
                  <li>Verify storefront access token is valid</li>
                  <li>Ensure products exist in your Shopify store</li>
                  <li>Check network connection</li>
                </ul>
              </div>
              <div className="error-actions">
                <button 
                  className="btn-modern"
                  onClick={this.handleRetry}
                >
                  <i className="fas fa-redo"></i>
                  Retry Connection
                </button>
                <button 
                  className="btn-modern-outline"
                  onClick={() => window.open('https://droptrendzy.myshopify.com/admin', '_blank')}
                >
                  <i className="fas fa-external-link-alt"></i>
                  Go to Shopify Admin
                </button>
              </div>
            </div>
          ) : isLoading ? (
            <div className="loading-spinner-full">
              <div className="spinner"></div>
              <p>Connecting to your Shopify store...</p>
              <p className="loading-subtext">Fetching products and settings</p>
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