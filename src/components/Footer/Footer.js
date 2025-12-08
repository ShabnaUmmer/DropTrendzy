// src/components/Footer/Footer.js 
import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      subscribed: false
    };
  }

  handleSubscribe = (e) => {
    e.preventDefault();
    if (this.state.email) {
      this.setState({ subscribed: true, email: '' });
      setTimeout(() => {
        this.setState({ subscribed: false });
      }, 3000);
    }
  }

  render() {
    const { email, subscribed } = this.state;
    const { navigateTo } = this.props;

    return (
      <footer className="footer-modern">
        <div className="footer-container">
          {/* Main Footer Content */}
          <div className="footer-main-modern">
            {/* Brand Section */}
            <div className="footer-brand-modern">
              <div className="footer-logo">
                <div className="logo-icon">
                  <i className="fas fa-bolt"></i>
                </div>
                <div className="logo-text">
                  <span className="logo-main">DROPTRENDZY</span>
                  <span className="logo-sub">Curated Trends</span>
                </div>
              </div>
              <p className="footer-description">
                Your premier destination for globally curated premium products. 
                Fast shipping, safe packaging, and the latest trends delivered worldwide.
              </p>
              
              {/* SOCIAL MEDIA LINKS */}
              <div className="social-links-modern">
                <a 
                  href="https://www.facebook.com/DropTrendzy" 
                  target="_blank" 
                  rel="noopener noreferrer nofollow" 
                  className="social-link-modern facebook"
                  title="Follow us on Facebook"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                
                <a 
                  href="https://www.instagram.com/droptrendzy/"
                  target="_blank" 
                  rel="noopener noreferrer nofollow" 
                  className="social-link-modern instagram"
                  title="Follow us on Instagram"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                
                <a 
                  href="https://www.pinterest.com/droptrendzy/"
                  target="_blank" 
                  rel="noopener noreferrer nofollow" 
                  className="social-link-modern pinterest"
                  title="Follow us on Pinterest"
                >
                  <i className="fab fa-pinterest-p"></i>
                </a>
                
                <a 
                  href="https://www.youtube.com/@DropTrendzy"
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link-modern youtube"
                  title="Subscribe on YouTube"
                >
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-links-modern">
              <h4>Quick Links</h4>
              <ul>
                <li><span onClick={() => navigateTo('home')}>Home</span></li>
                <li><span onClick={() => navigateTo('about')}>About Us</span></li>
                <li><span onClick={() => navigateTo('products')}>Products</span></li>
                <li><span onClick={() => navigateTo('contact')}>Contact</span></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className="footer-links-modern">
              <h4>Customer Service</h4>
              <ul>
                <li><span onClick={() => navigateTo('shipping-policy')}>Shipping Info</span></li>
                <li><span onClick={() => navigateTo('refund-policy')}>Refund Policy</span></li>
                <li><span onClick={() => navigateTo('privacy-policy')}>Privacy Policy</span></li>
                <li><span onClick={() => navigateTo('terms-conditions')}>Terms & Conditions</span></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="footer-newsletter-modern">
              <h4>Stay Trendy</h4>
              <p>Subscribe to get updates on new trends and exclusive offers</p>
              
              {subscribed ? (
                <div className="success-message-modern">
                  <i className="fas fa-check-circle"></i>
                  Thank you for subscribing!
                </div>
              ) : (
                <form onSubmit={this.handleSubscribe} className="newsletter-form-modern">
                  <div className="input-group-modern">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => this.setState({ email: e.target.value })}
                      required
                      className="newsletter-input-modern"
                    />
                    <button type="submit" className="newsletter-btn-modern">
                      <i className="fas fa-paper-plane"></i>
                    </button>
                  </div>
                </form>
              )}

              {/* Trust Badges */}
              <div className="trust-badges-modern">
                <div className="trust-badge-modern">
                  <i className="fas fa-shield-alt"></i>
                  <span>Secure Payment</span>
                </div>
                <div className="trust-badge-modern">
                  <i className="fas fa-shipping-fast"></i>
                  <span>Global Shipping</span>
                </div>
                <div className="trust-badge-modern">
                  <i className="fas fa-award"></i>
                  <span>Premium Quality</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Methods & Copyright */}
          <div className="footer-bottom-modern">
            {/* Payment Icons */}
            <div className="payment-section">
              <div className="payment-label">We Accept:</div>
              <div className="payment-icons-modern">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" 
                  alt="Visa" 
                  className="payment-logo"
                  title="Visa"
                />
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" 
                  alt="Mastercard" 
                  className="payment-logo"
                  title="Mastercard"
                />
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" 
                  alt="American Express" 
                  className="payment-logo"
                  title="American Express"
                />
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" 
                  alt="PayPal" 
                  className="payment-logo"
                  title="PayPal"
                />
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" 
                  alt="Apple Pay" 
                  className="payment-logo"
                  title="Apple Pay"
                />
              </div>
            </div>
            
            {/* Copyright Section */}
            <div className="copyright-section">
              <div className="copyright-text">
                <i className="fas fa-copyright"></i>
                <span>2024 DROPTRENDZY. All rights reserved.</span>
              </div>
              <div className="copyright-links">
                <span onClick={() => navigateTo('privacy-policy')}>Privacy Policy</span>
                <span className="divider">•</span>
                <span onClick={() => navigateTo('terms-conditions')}>Terms of Service</span>
                <span className="divider">•</span>
                <span onClick={() => navigateTo('refund-policy')}>Refund Policy</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;