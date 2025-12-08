import React, { Component } from 'react';
import './TermsConditions.css';

class TermsConditions extends Component {
  render() {
    return (
      <div className="terms-conditions-page">
        <div className="container">
          <div className="terms-header glass-card">
            <h1 className="gradient-text">Terms & Conditions</h1>
            <p className="terms-date">Effective Date: January 2024</p>
            <p className="terms-subtitle">Please read these terms carefully before using our services</p>
          </div>

          <div className="terms-content">
            {/* Acceptance Section */}
            <section className="terms-section glass-card">
              <div className="section-header">
                <i className="fas fa-check-circle"></i>
                <h2>Acceptance of Terms</h2>
              </div>
              <div className="terms-text">
                <p>By accessing and using DROPTRENDZY (https://droptrendzy.netlify.app), you accept and agree to be bound by these Terms & Conditions.</p>
                <div className="highlight-box">
                  <i className="fas fa-exclamation-triangle"></i>
                  <p><strong>Important:</strong> If you do not agree with any part of these terms, please do not use our website.</p>
                </div>
              </div>
            </section>

            {/* Account Terms */}
            <section className="terms-section glass-card">
              <div className="section-header">
                <i className="fas fa-user"></i>
                <h2>Account Registration</h2>
              </div>
              <div className="terms-list">
                <div className="term-item">
                  <div className="term-number">1</div>
                  <div>
                    <h4>Account Responsibility</h4>
                    <p>You are responsible for maintaining the confidentiality of your account credentials.</p>
                  </div>
                </div>
                <div className="term-item">
                  <div className="term-number">2</div>
                  <div>
                    <h4>Accurate Information</h4>
                    <p>You must provide accurate, current, and complete information during registration.</p>
                  </div>
                </div>
                <div className="term-item">
                  <div className="term-number">3</div>
                  <div>
                    <h4>Account Security</h4>
                    <p>Notify us immediately of any unauthorized use of your account.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Products & Orders */}
            <section className="terms-section glass-card">
              <div className="section-header">
                <i className="fas fa-shopping-bag"></i>
                <h2>Products & Orders</h2>
              </div>
              <div className="product-terms">
                <div className="product-term">
                  <i className="fas fa-box-open"></i>
                  <div>
                    <h4>Product Information</h4>
                    <p>We strive for accuracy but cannot guarantee all product details are error-free.</p>
                  </div>
                </div>
                <div className="product-term">
                  <i className="fas fa-shipping-fast"></i>
                  <div>
                    <h4>Order Processing</h4>
                    <p>Orders are processed within 24 hours. Shipping times vary by location.</p>
                  </div>
                </div>
                <div className="product-term">
                  <i className="fas fa-money-bill-wave"></i>
                  <div>
                    <h4>Pricing</h4>
                    <p>All prices are in USD. We reserve the right to change prices without notice.</p>
                  </div>
                </div>
                <div className="product-term">
                  <i className="fas fa-ban"></i>
                  <div>
                    <h4>Order Cancellation</h4>
                    <p>Orders can be cancelled within 1 hour of placement if not yet processed.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Payments */}
            <section className="terms-section glass-card">
              <div className="section-header">
                <i className="fas fa-credit-card"></i>
                <h2>Payment Terms</h2>
              </div>
              <div className="payment-info">
                <div className="payment-method">
                  <i className="fas fa-lock"></i>
                  <h4>Secure Payments</h4>
                  <p>All payments are processed securely through Razorpay.</p>
                </div>
                <div className="payment-method">
                  <i className="fas fa-receipt"></i>
                  <h4>Payment Methods</h4>
                  <p>We accept credit/debit cards, UPI, net banking, and digital wallets.</p>
                </div>
                <div className="payment-method">
                  <i className="fas fa-exchange-alt"></i>
                  <h4>Refunds</h4>
                  <p>Refunds are processed according to our Refund Policy (3-day window).</p>
                </div>
              </div>
              <div className="warning-note">
                <i className="fas fa-exclamation-circle"></i>
                <p>Chargebacks or payment disputes without prior contact may result in account suspension.</p>
              </div>
            </section>

            {/* User Conduct */}
            <section className="terms-section glass-card">
              <div className="section-header">
                <i className="fas fa-gavel"></i>
                <h2>Prohibited Activities</h2>
              </div>
              <div className="prohibited-list">
                <div className="prohibited-item">
                  <i className="fas fa-times-circle"></i>
                  <span>Fraudulent purchases or unauthorized transactions</span>
                </div>
                <div className="prohibited-item">
                  <i className="fas fa-times-circle"></i>
                  <span>Attempting to bypass security measures</span>
                </div>
                <div className="prohibited-item">
                  <i className="fas fa-times-circle"></i>
                  <span>Using automated systems to place orders</span>
                </div>
                <div className="prohibited-item">
                  <i className="fas fa-times-circle"></i>
                  <span>Making false claims or providing misleading information</span>
                </div>
                <div className="prohibited-item">
                  <i className="fas fa-times-circle"></i>
                  <span>Reselling products without authorization</span>
                </div>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section className="terms-section glass-card">
              <div className="section-header">
                <i className="fas fa-balance-scale"></i>
                <h2>Limitation of Liability</h2>
              </div>
              <div className="liability-content">
                <p>DROPTRENDZY shall not be liable for:</p>
                <ul>
                  <li>Indirect, incidental, or consequential damages</li>
                  <li>Shipping delays caused by third-party carriers</li>
                  <li>Product damage during transit (subject to refund policy)</li>
                  <li>Inaccurate product descriptions from suppliers</li>
                </ul>
                <div className="disclaimer">
                  <i className="fas fa-info-circle"></i>
                  <p><strong>Maximum Liability:</strong> Our maximum liability shall not exceed the purchase price of the product in question.</p>
                </div>
              </div>
            </section>

            {/* Changes to Terms */}
            <section className="terms-section glass-card">
              <div className="section-header">
                <i className="fas fa-sync-alt"></i>
                <h2>Changes to Terms</h2>
              </div>
              <div className="changes-info">
                <p>We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting.</p>
                <div className="update-notice">
                  <i className="fas fa-bell"></i>
                  <p>It is your responsibility to review these terms periodically for updates.</p>
                </div>
              </div>
            </section>

            {/* Governing Law */}
            <section className="terms-section glass-card">
              <div className="section-header">
                <i className="fas fa-globe"></i>
                <h2>Governing Law</h2>
              </div>
              <div className="law-info">
                <p>These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in India.</p>
                <div className="jurisdiction">
                  <i className="fas fa-landmark"></i>
                  <span>Jurisdiction: Courts in India</span>
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section className="terms-section glass-card contact-section">
              <div className="section-header">
                <i className="fas fa-headset"></i>
                <h2>Contact Us</h2>
              </div>
              <p>For questions about these Terms & Conditions:</p>
              <div className="contact-details">
                <a href="mailto:droptrendzy782@gmail.com" className="contact-link">
                  <i className="fas fa-envelope"></i>
                  droptrendzy782@gmail.com
                </a>
                <a href="tel:+919946737794" className="contact-link">
                  <i className="fas fa-phone"></i>
                  +91 9946737794
                </a>
                <a href="/contact-us" className="contact-link" onClick={(e) => {
                  e.preventDefault();
                  this.props.navigateTo('contact');
                }}>
                  <i className="fas fa-comments"></i>
                  Contact Form
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default TermsConditions;