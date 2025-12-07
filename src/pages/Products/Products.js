// src/pages/Products/Products.js - FIXED
import React, { Component } from 'react';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import './Products.css';

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      filteredProducts: [],
      filters: {
        category: 'all',
        priceRange: 'all',
        rating: 'all',
        sortBy: 'featured'
      },
      isLoading: false
    };
  }

  componentDidMount() {
    const { products } = this.props;
    this.setState({ 
      products: products,
      filteredProducts: products
    });
  }

  render() {
    const { navigateTo, addToCart } = this.props;
    const { filteredProducts } = this.state;

    return (
      <div className="products-page">
        <div className="three-d-bg"></div>
        
        {/* Hero Section */}
        <section className="products-hero">
          <div className="container">
            <h1>Curated Collection</h1>
            <p>Discover premium products from global trends</p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="products-grid-section">
          <div className="container">
            {filteredProducts.length === 0 ? (
              <div className="empty-products">
                <div className="empty-icon">
                  <i className="fas fa-box-open"></i>
                </div>
                <h2>More Products Coming Soon</h2>
                <p>We're carefully selecting the best products for our collection.</p>
                <p>Check back soon or contact us for early access.</p>
                <button 
                  className="btn-luxury"
                  onClick={() => navigateTo('contact')}
                >
                  Contact Us
                </button>
              </div>
            ) : (
              <>
                <div className="results-info">
                  <p>Showing {filteredProducts.length} premium product{filteredProducts.length !== 1 ? 's' : ''}</p>
                </div>
                <ProductGrid 
                  products={filteredProducts}
                  navigateTo={navigateTo}
                  addToCart={addToCart}
                />
              </>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="products-cta">
          <div className="container">
            <div className="cta-content">
              <h2>Can't Find What You're Looking For?</h2>
              <p>We're constantly updating our collection with new global trends.</p>
              <button 
                className="btn-outline-luxury"
                onClick={() => navigateTo('contact')}
              >
                Request a Product
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Products;