// pages/About/About.js
import React, { Component } from 'react';
import './About.css';

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hoveredCard: null
    };
  }

  handleExploreClick = () => {
    // Navigate to Products page
    if (this.props.navigateTo) {
      this.props.navigateTo('products');
    } else {
      // Fallback: Scroll to products section or show alert
      const productsSection = document.getElementById('products');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = '/products';
      }
    }
  }

  render() {
    const { hoveredCard } = this.state;

    return (
      <div className="about-page">
        {/* Animated Background */}
        <div className="animated-bg-about">
          <div className="bg-particles">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="particle" style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 5 + 2}px`,
                height: `${Math.random() * 5 + 2}px`,
                animationDelay: `${Math.random() * 8}s`
              }}></div>
            ))}
          </div>
          <div className="bg-gradient-about"></div>
        </div>
        
        {/* Hero Section */}
        <section className="about-hero">
          <div className="container">
            <h1 className="gradient-text slide-in-up">Our Story</h1>
            <p className="hero-subtitle slide-in-up" style={{animationDelay: '0.2s'}}>
              Trend-Driven Dropshipping. Global Access.
            </p>
          </div>
        </section>

        {/* Mission Section - FIXED: Removed empty right grid */}
        <section className="mission-section">
          <div className="container">
            <div className="mission-content slide-in-up">
              <h2>Smart Commerce, Simplified</h2>
              <p className="mission-description">
                DROPTRENDZY revolutionizes online shopping by connecting you directly 
                with trending products from global suppliers. No inventory, no overhead—just 
                the hottest items delivered straight to your doorstep.
              </p>
              
              <div className="mission-stats">
                <div 
                  className={`stat glass-card ${hoveredCard === 1 ? 'hovered' : ''}`}
                  onMouseEnter={() => this.setState({ hoveredCard: 1 })}
                  onMouseLeave={() => this.setState({ hoveredCard: null })}
                >
                  <i className="fas fa-bolt"></i>
                  <h3>Fast Setup</h3>
                  <p>Launch new products in hours, not weeks</p>
                </div>
                <div 
                  className={`stat glass-card ${hoveredCard === 2 ? 'hovered' : ''}`}
                  onMouseEnter={() => this.setState({ hoveredCard: 2 })}
                  onMouseLeave={() => this.setState({ hoveredCard: null })}
                >
                  <i className="fas fa-sync"></i>
                  <h3>Dynamic Catalog</h3>
                  <p>Products that evolve with market trends</p>
                </div>
                <div 
                  className={`stat glass-card ${hoveredCard === 3 ? 'hovered' : ''}`}
                  onMouseEnter={() => this.setState({ hoveredCard: 3 })}
                  onMouseLeave={() => this.setState({ hoveredCard: null })}
                >
                  <i className="fas fa-shield-alt"></i>
                  <h3>Risk-Free</h3>
                  <p>No inventory costs or storage fees</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="works-section">
          <div className="container">
            <h2 className="section-title slide-in-up">How Dropshipping Works</h2>
            <div className="works-steps">
              <div className="work-step glass-card slide-in-left">
                <div className="step-number">01</div>
                <div className="step-icon">
                  <i className="fas fa-search"></i>
                </div>
                <h3>Discover Trends</h3>
                <p>We continuously monitor market trends to source products with high demand potential</p>
              </div>
              <div className="work-step glass-card slide-in-up">
                <div className="step-number">02</div>
                <div className="step-icon">
                  <i className="fas fa-store"></i>
                </div>
                <h3>You List Products</h3>
                <p>Choose from our curated selection of trending items for your store</p>
              </div>
              <div className="work-step glass-card slide-in-up" style={{animationDelay: '0.1s'}}>
                <div className="step-number">03</div>
                <div className="step-icon">
                  <i className="fas fa-shopping-cart"></i>
                </div>
                <h3>Customers Order</h3>
                <p>When customers purchase, the order is automatically forwarded to our suppliers</p>
              </div>
              <div className="work-step glass-card slide-in-right">
                <div className="step-number">04</div>
                <div className="step-icon">
                  <i className="fas fa-shipping-fast"></i>
                </div>
                <h3>Direct Shipping</h3>
                <p>Suppliers ship products directly to your customers under your brand</p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="values-section">
          <div className="container">
            <h2 className="section-title slide-in-up">Our Advantages</h2>
            <div className="values-grid">
              <div className="value-card glass-card slide-in-up" style={{animationDelay: '0.1s'}}>
                <div className="value-icon">
                  <i className="fas fa-chart-line"></i>
                </div>
                <h3>Trend-Driven Selection</h3>
                <p>We focus on products with proven market demand and growth potential</p>
              </div>
              <div className="value-card glass-card slide-in-up" style={{animationDelay: '0.2s'}}>
                <div className="value-icon">
                  <i className="fas fa-globe"></i>
                </div>
                <h3>Global Supplier Network</h3>
                <p>Access to reliable suppliers worldwide for diverse product options</p>
              </div>
              <div className="value-card glass-card slide-in-up" style={{animationDelay: '0.3s'}}>
                <div className="value-icon">
                  <i className="fas fa-rocket"></i>
                </div>
                <h3>Rapid Adaptation</h3>
                <p>Quickly add or remove products based on market performance</p>
              </div>
              <div className="value-card glass-card slide-in-up" style={{animationDelay: '0.4s'}}>
                <div className="value-icon">
                  <i className="fas fa-hand-holding-usd"></i>
                </div>
                <h3>Low Barrier Entry</h3>
                <p>Start with minimal investment and scale as you grow</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - FIXED: Added onClick handler */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-content slide-in-up">
              <h2>Start Your Dropshipping Journey</h2>
              <p>Join thousands of entrepreneurs building businesses with our curated product selection</p>
              <button 
                className="btn-modern pulse" 
                onClick={this.handleExploreClick}
              >
                Explore Products
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default About;