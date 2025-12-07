// src/components/ProductGrid/ProductGrid.js
import React, { Component } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './ProductGrid.css';

class ProductGrid extends Component {
  render() {
    const { products, addToCart, addToWishlist, showOriginalPrice = false, navigateTo } = this.props;

    if (!products || products.length === 0) {
      return (
        <div className="empty-grid">
          <i className="fas fa-search"></i>
          <h3>No products found</h3>
          <p>Try adjusting your filters or search terms</p>
        </div>
      );
    }

    return (
      <div className="product-grid">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
            addToWishlist={addToWishlist}
            showOriginalPrice={showOriginalPrice}
            navigateTo={navigateTo} 
          />
        ))}
      </div>
    );
  }
}

export default ProductGrid;