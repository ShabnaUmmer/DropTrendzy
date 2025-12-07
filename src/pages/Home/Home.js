// src/pages/Home/Home.js 
import React, { Component } from 'react';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trendingProducts: []
    };
  }

  componentDidMount() {
    const { products } = this.props;
    const trendingProducts = products.filter(p => p.isFeatured);
    
    this.setState({
      trendingProducts
    });
  }

  render() {
    const { navigateTo, addToCart } = this.props;
    const { trendingProducts } = this.state;

    return (
      <div className="home-page-modern">
        {/* Hero Section */}
        <section className="hero-section-modern">
          <div className="hero-background">
            <div className="hero-glow-1"></div>
            <div className="hero-glow-2"></div>
          </div>
          
          <div className="container">
            <div className="hero-content-modern">
              <div className="hero-text slide-in-left">
                <h1 className="hero-title-modern">
                  <span className="gradient-text">Curated</span> Trends
                  <br />
                  <span className="gradient-text">Global</span> Reach
                </h1>
                <p className="hero-subtitle-modern">
                  Your premier destination for globally curated premium products. 
                  Fast shipping, safe packaging, and the latest trends delivered worldwide.
                </p>
                <div className="hero-buttons-modern">
                  <button 
                    className="btn-modern"
                    onClick={() => navigateTo('products')}
                  >
                    <i className="fas fa-rocket"></i>
                    Shop Now
                  </button>
                  <button 
                    className="btn-modern-outline"
                    onClick={() => navigateTo('about')}
                  >
                    <i className="fas fa-play-circle"></i>
                    Our Story
                  </button>
                </div>
              </div>
              
              <div className="hero-visual slide-in-right">
                <div className="floating-card">
                  <i className="fas fa-gem"></i>
                  <h3>Premium Quality</h3>
                  <p>Curated Excellence</p>
                </div>
                <div className="floating-card delay-1">
                  <i className="fas fa-shipping-fast"></i>
                  <h3>Fast Shipping</h3>
                  <p>Global Delivery</p>
                </div>
                <div className="floating-card delay-2">
                  <i className="fas fa-shield-alt"></i>
                  <h3>Secure</h3>
                  <p>Safe Shopping</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section-modern">
          <div className="container">
            <div className="section-header-modern">
              <h2 className="gradient-text">Why Choose Us</h2>
              <p>Experience the difference with our premium service</p>
            </div>
            
            <div className="features-grid-modern">
              <div className="feature-card-modern glass-card">
                <div className="feature-icon">
                  <i className="fas fa-globe"></i>
                </div>
                <h3>Global Sourcing</h3>
                <p>Curated from the best markets worldwide</p>
              </div>
              
              <div className="feature-card-modern glass-card">
                <div className="feature-icon">
                  <i className="fas fa-shipping-fast"></i>
                </div>
                <h3>Fast Delivery</h3>
                <p>Free shipping on orders over $100</p>
              </div>
              
              <div className="feature-card-modern glass-card">
                <div className="feature-icon">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h3>Secure Payment</h3>
                <p>256-bit SSL encryption</p>
              </div>
              
              <div className="feature-card-modern glass-card">
                <div className="feature-icon">
                  <i className="fas fa-headset"></i>
                </div>
                <h3>24/7 Support</h3>
                <p>Always here to help you</p>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        {trendingProducts.length > 0 && (
          <section className="products-section-modern">
            <div className="container">
              <div className="section-header-modern">
                <h2 className="gradient-text">Featured Products</h2>
                <p>Discover our premium selection</p>
              </div>
              
              <ProductGrid 
                products={trendingProducts} 
                navigateTo={navigateTo}
                addToCart={addToCart}
              />
            </div>
          </section>
        )}

        {/* Reviews Section - Only show when we have real reviews */}
        <section className="reviews-section-modern">
          <div className="container">
            <div className="section-header-modern">
              <h2 className="gradient-text">Customer Reviews</h2>
              <p>Be the first to share your experience</p>
            </div>
            
            <div className="reviews-grid-modern">
              <div className="review-card-modern glass-card">
                <div className="no-reviews-content">
                  <i className="fas fa-comment-alt"></i>
                  <h3>No Reviews Yet</h3>
                  <p>Be the first to review our products and share your experience with the community.</p>
                  <button 
                    className="btn-modern-outline"
                    onClick={() => navigateTo('products')}
                  >
                    Shop Now & Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Home;