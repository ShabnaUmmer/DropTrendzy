import React, { Component } from 'react';
import './PrivacyPolicy.css';

class PrivacyPolicy extends Component {
  render() {
    return (
      <div className="privacy-policy-page">
        <div className="container">
          <div className="policy-header glass-card">
            <h1 className="gradient-text">Privacy Policy</h1>
            <p className="policy-date">Last Updated: January 2024</p>
          </div>

          <div className="policy-content">
            {/* Introduction */}
            <section className="policy-section glass-card">
              <div className="section-header">
                <i className="fas fa-shield-alt"></i>
                <h2>Information We Collect</h2>
              </div>
              <div className="info-grid">
                <div className="info-item">
                  <i className="fas fa-user"></i>
                  <h4>Personal Information</h4>
                  <ul>
                    <li>Full name</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Shipping/billing address</li>
                  </ul>
                </div>
                <div className="info-item">
                  <i className="fas fa-shopping-cart"></i>
                  <h4>Order Information</h4>
                  <ul>
                    <li>Products purchased</li>
                    <li>Payment details (processed via Razorpay)</li>
                    <li>Order history</li>
                    <li>Shipping preferences</li>
                  </ul>
                </div>
                <div className="info-item">
                  <i className="fas fa-chart-line"></i>
                  <h4>Technical Information</h4>
                  <ul>
                    <li>IP address</li>
                    <li>Browser type</li>
                    <li>Device information</li>
                    <li>Website usage data (Google Analytics)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Information */}
            <section className="policy-section glass-card">
              <div className="section-header">
                <i className="fas fa-cogs"></i>
                <h2>How We Use Your Information</h2>
              </div>
              <div className="usage-list">
                <div className="usage-item">
                  <div className="usage-icon">
                    <i className="fas fa-shipping-fast"></i>
                  </div>
                  <div>
                    <h4>Order Processing</h4>
                    <p>Process payments, ship orders, send confirmations</p>
                  </div>
                </div>
                <div className="usage-item">
                  <div className="usage-icon">
                    <i className="fas fa-headset"></i>
                  </div>
                  <div>
                    <h4>Customer Support</h4>
                    <p>Respond to inquiries and provide assistance</p>
                  </div>
                </div>
                <div className="usage-item">
                  <div className="usage-icon">
                    <i className="fas fa-bell"></i>
                  </div>
                  <div>
                    <h4>Communication</h4>
                    <p>Send order updates, promotional offers (opt-in)</p>
                  </div>
                </div>
                <div className="usage-item">
                  <div className="usage-icon">
                    <i className="fas fa-chart-bar"></i>
                  </div>
                  <div>
                    <h4>Improvements</h4>
                    <p>Analyze website usage to enhance user experience</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Data Security */}
            <section className="policy-section glass-card">
              <div className="section-header">
                <i className="fas fa-lock"></i>
                <h2>Data Security</h2>
              </div>
              <div className="security-features">
                <div className="security-badge">
                  <i className="fas fa-credit-card"></i>
                  <span>Secure Payments (Razorpay)</span>
                </div>
                <div className="security-badge">
                  <i className="fas fa-lock"></i>
                  <span>SSL Encryption</span>
                </div>
                <div className="security-badge">
                  <i className="fas fa-database"></i>
                  <span>Limited Data Retention</span>
                </div>
                <div className="security-badge">
                  <i className="fas fa-user-shield"></i>
                  <span>No Unauthorized Sharing</span>
                </div>
              </div>
              <p className="security-note">
                We implement reasonable security measures but cannot guarantee 100% security.
              </p>
            </section>

            {/* Third Parties */}
            <section className="policy-section glass-card">
              <div className="section-header">
                <i className="fas fa-handshake"></i>
                <h2>Third-Party Services</h2>
              </div>
              <div className="third-party-grid">
                <div className="service-card">
                  <div className="service-icon">
                    <i className="fas fa-money-check-alt"></i>
                  </div>
                  <h4>Razorpay</h4>
                  <p>Payment processing</p>
                </div>
                <div className="service-card">
                  <div className="service-icon">
                    <i className="fab fa-google"></i>
                  </div>
                  <h4>Google Analytics</h4>
                  <p>Website analytics</p>
                </div>
                <div className="service-card">
                  <div className="service-icon">
                    <i className="fas fa-truck"></i>
                  </div>
                  <h4>Shipping Partners</h4>
                  <p>Order delivery</p>
                </div>
                <div className="service-card">
                  <div className="service-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <h4>Email Service</h4>
                  <p>Order communications</p>
                </div>
              </div>
            </section>

            {/* Your Rights */}
            <section className="policy-section glass-card">
              <div className="section-header">
                <i className="fas fa-gavel"></i>
                <h2>Your Rights</h2>
              </div>
              <div className="rights-grid">
                <div className="right-item">
                  <i className="fas fa-eye"></i>
                  <h4>Access</h4>
                  <p>Request a copy of your data</p>
                </div>
                <div className="right-item">
                  <i className="fas fa-edit"></i>
                  <h4>Correction</h4>
                  <p>Update inaccurate information</p>
                </div>
                <div className="right-item">
                  <i className="fas fa-trash"></i>
                  <h4>Deletion</h4>
                  <p>Request data deletion (where applicable)</p>
                </div>
                <div className="right-item">
                  <i className="fas fa-ban"></i>
                  <h4>Opt-Out</h4>
                  <p>Unsubscribe from marketing emails</p>
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section className="policy-section glass-card contact-section">
              <div className="section-header">
                <i className="fas fa-question-circle"></i>
                <h2>Questions?</h2>
              </div>
              <p>Contact us for privacy-related inquiries:</p>
              <div className="contact-options">
                <a href="mailto:droptrendzy782@gmail.com" className="contact-option">
                  <i className="fas fa-envelope"></i>
                  Email: droptrendzy782@gmail.com
                </a>
                <a href="tel:+919946737794" className="contact-option">
                  <i className="fas fa-phone"></i>
                  Call: +91 9946737794
                </a>
                <a href="https://wa.me/919946737794" target="_blank" rel="noopener noreferrer" className="contact-option">
                  <i className="fab fa-whatsapp"></i>
                  WhatsApp
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default PrivacyPolicy;