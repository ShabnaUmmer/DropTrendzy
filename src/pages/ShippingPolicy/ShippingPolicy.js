import React, { Component } from 'react';
import './ShippingPolicy.css';

class ShippingPolicy extends Component {
  render() {
    return (
      <div className="shipping-policy-page">
        <div className="container">
          <div className="shipping-header glass-card">
            <h1 className="gradient-text">Shipping Policy</h1>
            <p className="shipping-date">Last Updated: January 2024</p>
            <p className="shipping-subtitle">Fast, reliable delivery to your doorstep</p>
          </div>

          <div className="shipping-content">
            {/* Processing Time */}
            <section className="shipping-section glass-card">
              <div className="section-header">
                <i className="fas fa-clock"></i>
                <h2>Order Processing Time</h2>
              </div>
              <div className="processing-info">
                <div className="processing-card">
                  <div className="processing-icon">
                    <i className="fas fa-box"></i>
                  </div>
                  <h4>Standard Processing</h4>
                  <p><strong>1-2 Business Days</strong></p>
                  <p className="card-desc">Most orders are processed within 24 hours</p>
                </div>
                <div className="processing-card">
                  <div className="processing-icon">
                    <i className="fas fa-calendar-alt"></i>
                  </div>
                  <h4>Weekend Orders</h4>
                  <p><strong>Processed Next Business Day</strong></p>
                  <p className="card-desc">Orders placed on weekends processed Monday</p>
                </div>
                <div className="processing-card">
                  <div className="processing-icon">
                    <i className="fas fa-exclamation-triangle"></i>
                  </div>
                  <h4>Holiday Periods</h4>
                  <p><strong>Extended Processing</strong></p>
                  <p className="card-desc">During holidays, processing may take 3-5 days</p>
                </div>
              </div>
            </section>

            {/* Shipping Methods */}
            <section className="shipping-section glass-card">
              <div className="section-header">
                <i className="fas fa-shipping-fast"></i>
                <h2>Shipping Methods & Time</h2>
              </div>
              <div className="shipping-methods">
                <div className="method-card standard">
                  <div className="method-header">
                    <i className="fas fa-truck"></i>
                    <h4>Standard Shipping</h4>
                  </div>
                  <div className="method-details">
                    <p><strong>Delivery Time:</strong> 7-14 business days</p>
                    <p><strong>Cost:</strong> Calculated at checkout</p>
                    <p><strong>Tracking:</strong> Yes (provided via email)</p>
                    <p><strong>Insurance:</strong> Included up to $100</p>
                  </div>
                </div>
                <div className="method-card express">
                  <div className="method-header">
                    <i className="fas fa-rocket"></i>
                    <h4>Express Shipping</h4>
                  </div>
                  <div className="method-details">
                    <p><strong>Delivery Time:</strong> 3-7 business days</p>
                    <p><strong>Cost:</strong> $15.99 flat rate</p>
                    <p><strong>Tracking:</strong> Yes (real-time updates)</p>
                    <p><strong>Insurance:</strong> Included up to $500</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Shipping Rates */}
            <section className="shipping-section glass-card">
              <div className="section-header">
                <i className="fas fa-money-bill-wave"></i>
                <h2>Shipping Rates</h2>
              </div>
              <div className="rates-table">
                <table>
                  <thead>
                    <tr>
                      <th>Order Value</th>
                      <th>Standard Shipping</th>
                      <th>Express Shipping</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Under $50</td>
                      <td>$5.99</td>
                      <td>$15.99</td>
                    </tr>
                    <tr>
                      <td>$50 - $100</td>
                      <td>$3.99</td>
                      <td>$15.99</td>
                    </tr>
                    <tr>
                      <td>$100 - $200</td>
                      <td>FREE</td>
                      <td>$10.99</td>
                    </tr>
                    <tr>
                      <td>Over $200</td>
                      <td>FREE</td>
                      <td>FREE</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="free-shipping-banner">
                <i className="fas fa-gift"></i>
                <div>
                  <h4>🎉 Free Standard Shipping on Orders Over $100!</h4>
                  <p>Free express shipping on orders over $200</p>
                </div>
              </div>
            </section>

            {/* Delivery Areas */}
            <section className="shipping-section glass-card">
              <div className="section-header">
                <i className="fas fa-globe-americas"></i>
                <h2>Delivery Areas</h2>
              </div>
              <div className="delivery-areas">
                <div className="area-card domestic">
                  <h4><i className="fas fa-home"></i> Domestic (India)</h4>
                  <ul>
                    <li>All major cities: 5-10 business days</li>
                    <li>Tier 2/3 cities: 8-14 business days</li>
                    <li>Remote areas: 10-21 business days</li>
                  </ul>
                </div>
                <div className="area-card international">
                  <h4><i className="fas fa-plane"></i> International</h4>
                  <ul>
                    <li>USA/Canada: 10-20 business days</li>
                    <li>Europe: 12-25 business days</li>
                    <li>Australia/NZ: 15-30 business days</li>
                    <li>Other regions: 20-40 business days</li>
                  </ul>
                </div>
              </div>
              <div className="restrictions-note">
                <i className="fas fa-exclamation-circle"></i>
                <p><strong>Note:</strong> We cannot ship to PO Boxes, APO/FPO addresses, or certain restricted countries.</p>
              </div>
            </section>

            {/* Tracking & Updates */}
            <section className="shipping-section glass-card">
              <div className="section-header">
                <i className="fas fa-map-marker-alt"></i>
                <h2>Order Tracking</h2>
              </div>
              <div className="tracking-steps">
                <div className="tracking-step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Order Confirmation</h4>
                    <p>Immediate email with order details</p>
                  </div>
                </div>
                <div className="tracking-step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>Processing Update</h4>
                    <p>Email when order is being prepared</p>
                  </div>
                </div>
                <div className="tracking-step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Shipping Confirmation</h4>
                    <p>Email with tracking number & link</p>
                  </div>
                </div>
                <div className="tracking-step">
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <h4>Delivery Updates</h4>
                    <p>SMS/email notifications on delivery status</p>
                  </div>
                </div>
              </div>
              <div className="tracking-note">
                <i className="fas fa-mobile-alt"></i>
                <p><strong>Pro Tip:</strong> Download the carrier's app for real-time tracking updates.</p>
              </div>
            </section>

            {/* Delivery Issues */}
            <section className="shipping-section glass-card">
              <div className="section-header">
                <i className="fas fa-exclamation-triangle"></i>
                <h2>Delivery Issues</h2>
              </div>
              <div className="issue-solutions">
                <div className="issue-card">
                  <div className="issue-icon">
                    <i className="fas fa-search"></i>
                  </div>
                  <h4>Lost Packages</h4>
                  <p>Contact us within 30 days of estimated delivery</p>
                  <p className="solution"><strong>Solution:</strong> We'll initiate a trace or reship</p>
                </div>
                <div className="issue-card">
                  <div className="issue-icon">
                    <i className="fas fa-home"></i>
                  </div>
                  <h4>Failed Delivery</h4>
                  <p>If you're not available, carrier will leave notice</p>
                  <p className="solution"><strong>Solution:</strong> Follow carrier's instructions for redelivery</p>
                </div>
                <div className="issue-card">
                  <div className="issue-icon">
                    <i className="fas fa-box-open"></i>
                  </div>
                  <h4>Damaged Package</h4>
                  <p>Document damage with photos/videos immediately</p>
                  <p className="solution"><strong>Solution:</strong> Email us evidence for replacement</p>
                </div>
              </div>
            </section>

            {/* Important Notes */}
            <section className="shipping-section glass-card">
              <div className="section-header">
                <i className="fas fa-clipboard-list"></i>
                <h2>Important Notes</h2>
              </div>
              <div className="notes-list">
                <div className="note-item">
                  <i className="fas fa-check-circle"></i>
                  <span>Delivery times are estimates, not guarantees</span>
                </div>
                <div className="note-item">
                  <i className="fas fa-check-circle"></i>
                  <span>Shipping costs are non-refundable unless error is on our part</span>
                </div>
                <div className="note-item">
                  <i className="fas fa-check-circle"></i>
                  <span>Customs/duties are buyer's responsibility for international orders</span>
                </div>
                <div className="note-item">
                  <i className="fas fa-check-circle"></i>
                  <span>Provide accurate address - we're not responsible for wrong addresses</span>
                </div>
                <div className="note-item">
                  <i className="fas fa-check-circle"></i>
                  <span>Signature may be required for high-value orders</span>
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section className="shipping-section glass-card contact-section">
              <div className="section-header">
                <i className="fas fa-headset"></i>
                <h2>Shipping Questions?</h2>
              </div>
              <p>Contact our shipping support team:</p>
              <div className="contact-actions">
                <a href="mailto:droptrendzy782@gmail.com?subject=Shipping%20Inquiry" className="contact-action">
                  <i className="fas fa-envelope"></i>
                  Email Shipping Support
                </a>
                <a href="tel:+919946737794" className="contact-action">
                  <i className="fas fa-phone"></i>
                  Call: +91 9946737794
                </a>
                <a href="https://wa.me/919946737794?text=Hi,%20I%20have%20a%20shipping%20question" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="contact-action">
                  <i className="fab fa-whatsapp"></i>
                  WhatsApp Shipping Support
                </a>
              </div>
              <div className="response-time">
                <i className="fas fa-clock"></i>
                <span>Response Time: Within 24 hours (Mon-Fri, 9AM-6PM IST)</span>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default ShippingPolicy;