// src/components/ProductSlider/ProductSlider.js
import React, { Component } from 'react';
import './ProductSlider.css';

class ProductSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSlide: 0,
      isAnimating: false
    };
    this.interval = null;
  }

  componentDidMount() {
    this.startAutoSlide();
  }

  componentWillUnmount() {
    this.stopAutoSlide();
  }

  startAutoSlide = () => {
    this.interval = setInterval(() => {
      this.nextSlide();
    }, 4000);
  }

  stopAutoSlide = () => {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  nextSlide = () => {
    this.setState(prevState => ({
      currentSlide: (prevState.currentSlide + 1) % this.props.products.length,
      isAnimating: true
    }));

    setTimeout(() => {
      this.setState({ isAnimating: false });
    }, 500);
  }

  prevSlide = () => {
    this.setState(prevState => ({
      currentSlide: prevState.currentSlide === 0 ? this.props.products.length - 1 : prevState.currentSlide - 1,
      isAnimating: true
    }));

    setTimeout(() => {
      this.setState({ isAnimating: false });
    }, 500);
  }

  goToSlide = (index) => {
    this.setState({
      currentSlide: index,
      isAnimating: true
    });

    setTimeout(() => {
      this.setState({ isAnimating: false });
    }, 500);
  }

  render() {
    const { products } = this.props;
    const { currentSlide, isAnimating } = this.state;

    if (!products.length) return null;

    return (
      <div 
        className="product-slider"
        onMouseEnter={this.stopAutoSlide}
        onMouseLeave={this.startAutoSlide}
      >
        <div className="slider-container">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`slide ${index === currentSlide ? 'active' : ''} ${isAnimating ? 'animating' : ''}`}
              style={{
                backgroundImage: `url(${product.image})`
              }}
            >
              <div className="slide-content">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">${product.price}</p>
                <button className="btn-luxury slide-btn">View Product</button>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button className="slider-arrow prev-arrow" onClick={this.prevSlide}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="slider-arrow next-arrow" onClick={this.nextSlide}>
          <i className="fas fa-chevron-right"></i>
        </button>

        {/* Dots Indicator */}
        <div className="slider-dots">
          {products.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => this.goToSlide(index)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default ProductSlider;