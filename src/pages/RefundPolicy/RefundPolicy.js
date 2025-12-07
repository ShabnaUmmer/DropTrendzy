// src/pages/RefundPolicy/RefundPolicy.js - COMPLETE FIXED
import React, { Component } from 'react';
import './RefundPolicy.css';

class RefundPolicy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showVideoModal: false
    };
  }

  openVideoModal = () => {
    this.setState({ showVideoModal: true });
  };

  closeVideoModal = () => {
    this.setState({ showVideoModal: false });
  };

  render() {
    // Your YouTube Shorts video ID
    const youtubeVideoId = "AIlUdkK1YME";
    
    // Regular YouTube URL for opening in new tab
    const youtubeUrl = `https://www.youtube.com/watch?v=${youtubeVideoId}`;
    
    return (
      <div className="refund-policy-page">
        <div className="container">
          <div className="policy-header glass-card">
            <h1 className="gradient-text">Refund & Return Policy</h1>
            <p className="policy-date">Last Updated: January 2024</p>
          </div>

          <div className="policy-content">
            {/* Important Notice Section */}
            <section className="policy-section glass-card">
              <div className="section-header">
                <i className="fas fa-exclamation-triangle"></i>
                <h2>Important Notice</h2>
              </div>
              <div className="warning-banner">
                <i className="fas fa-video"></i>
                <div>
                  <h3>⚠️ Unboxing Video is MANDATORY</h3>
                  <p>For any damage or return claims, an unboxing video is required. Without proper video evidence, we cannot process refunds or replacements.</p>
                </div>
              </div>
            </section>

            {/* Unboxing Guidelines Section */}
            <section className="policy-section glass-card">
              <div className="section-header">
                <i className="fas fa-list-ol"></i>
                <h2>Unboxing Video Guidelines</h2>
              </div>
              
              <div className="video-sample">
                <h3>Sample Unboxing Video</h3>
                {/* Option 1: Direct link to YouTube (opens in new tab) */}
                <a 
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sample-video-btn"
                >
                  <i className="fab fa-youtube"></i>
                  WATCH ON YOUTUBE
                </a>
                
                <p className="video-note">
                  <i className="fas fa-info-circle"></i>
                  Watch this example to see proper unboxing technique
                </p>
              </div>

              <div className="guidelines-grid">
                <div className="guideline-step">
                  <div className="step-number">1</div>
                  <h4>Label Verification</h4>
                  <p>Take clear images of parcel label showing shipping details</p>
                </div>
                
                <div className="guideline-step">
                  <div className="step-number">2</div>
                  <h4>360° View</h4>
                  <p>Show complete 360-degree view of parcel before opening</p>
                </div>
                
                <div className="guideline-step">
                  <div className="step-number">3</div>
                  <h4>Complete Unpacking</h4>
                  <p>Unpack from edge to edge showing all components</p>
                </div>
                
                <div className="guideline-step">
                  <div className="step-number">4</div>
                  <h4>Damage Documentation</h4>
                  <p>Immediately show any physical damage or usage marks</p>
                </div>
                
                <div className="guideline-step">
                  <div className="step-number">5</div>
                  <h4>Single Unedited Clip</h4>
                  <p>Video must be one continuous clip without edits</p>
                </div>
              </div>
            </section>

            {/* Return Process Section */}
            <section className="policy-section glass-card">
              <div className="section-header">
                <i className="fas fa-sync-alt"></i>
                <h2>Return & Replacement Process</h2>
              </div>
              
              <div className="process-flow">
                <div className="process-step">
                  <i className="fas fa-video"></i>
                  <h4>1. Record Video</h4>
                  <p>Follow guidelines above</p>
                </div>
                <div className="arrow">→</div>
                <div className="process-step">
                  <i className="fas fa-envelope"></i>
                  <h4>2. Email Support</h4>
                  <p>droptrendzy782@gmail.com</p>
                </div>
                <div className="arrow">→</div>
                <div className="process-step">
                  <i className="fas fa-check-circle"></i>
                  <h4>3. Verification</h4>
                  <p>48-hour review</p>
                </div>
                <div className="arrow">→</div>
                <div className="process-step">
                  <i className="fas fa-shipping-fast"></i>
                  <h4>4. Shipment</h4>
                  <p>Immediate replacement</p>
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section className="policy-section glass-card contact-section">
              <div className="section-header">
                <i className="fas fa-headset"></i>
                <h2>Need Help?</h2>
              </div>
              
              <p>For refund policy questions, contact us:</p>
              
              <div className="contact-options">
                <a href="mailto:droptrendzy782@gmail.com" className="contact-option">
                  <i className="fas fa-envelope"></i>
                  Email Support
                </a>
                <a href="https://wa.me/919946737794" target="_blank" rel="noopener noreferrer" className="contact-option">
                  <i className="fab fa-whatsapp"></i>
                  WhatsApp
                </a>
                <a href="tel:+919946737794" className="contact-option">
                  <i className="fas fa-phone"></i>
                  Call +91 9946737794
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default RefundPolicy;