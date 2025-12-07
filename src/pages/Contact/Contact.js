// pages/Contact/Contact.js
import React, { Component } from 'react';
import './Contact.css';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        name: '',
        email: '',
        subject: '',
        message: ''
      },
      errors: {},
      isSubmitting: false,
      isSubmitted: false,
      submitError: ''
    };
  }

  componentDidMount() {
    // Initialize any necessary setup
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: value
      },
      errors: {
        ...prevState.errors,
        [name]: ''
      },
      submitError: ''
    }));
  }

  validateForm = () => {
    const { formData } = this.state;
    const errors = {};

    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) errors.subject = 'Please select a subject';
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  }

  handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!this.validateForm()) return;
  
  this.setState({ isSubmitting: true, submitError: '' });
  
  const { formData } = this.state;
  
  // Function to encode form data
  const encode = (data) => {
    const formData = new FormData();
    
    Object.keys(data).forEach(key => {
      // Replace & with and to avoid HTML encoding issues
      let value = data[key];
      if (typeof value === 'string') {
        value = value.replace(/&/g, 'and');
      }
      formData.append(key, value);
    });
    
    return new URLSearchParams(formData).toString();
  };
  
  // Prepare form data
  const formPayload = {
    "form-name": "contact",
    "name": formData.name,
    "email": formData.email,
    "subject": formData.subject.replace(/&/g, 'and'), // Replace & with "and"
    "message": formData.message,
    "bot-field": "",
    "_replyto": formData.email,
    "_subject": `📧 DROPTRENDZY Contact: ${formData.subject.replace(/&/g, 'and')}`
  };
  
  try {
    console.log('📤 Submitting to Netlify Forms...');
    
    const response = await fetch("/", {
      method: "POST",
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json"
      },
      body: encode(formPayload)
    });
    
    if (response.ok) {
      console.log('✅ Form submitted successfully!');
      this.showSuccess();
    } else {
      throw new Error('Form submission failed');
    }
    
  } catch (error) {
    console.error('❌ Form error:', error);
    this.setState({ 
      isSubmitting: false, 
      submitError: 'Failed to send message. Please email us directly at droptrendzy782@gmail.com'
    });
  }
};
  showSuccess = () => {
    this.setState({ 
      isSubmitting: false, 
      isSubmitted: true,
      formData: { name: '', email: '', subject: '', message: '' }
    });
  }

  render() {
    const { formData, errors, isSubmitting, isSubmitted, submitError } = this.state;

    return (
      <div className="contact-page">
        {/* Animated Background */}
        <div className="animated-bg-contact">
          <div className="bg-particles">
            {[...Array(15)].map((_, i) => (
              <div key={i} className="particle"></div>
            ))}
          </div>
          <div className="bg-gradient-contact"></div>
        </div>
        
        {/* Hero Section */}
        <section className="contact-hero">
          <div className="container">
            <h1 className="gradient-text">Get In Touch</h1>
            <p>
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </section>

        <div className="container">
          <div className="contact-content">
            {/* Contact Form */}
            <div className="contact-form-section glass-card">
              <h2>Send us a Message</h2>
              
              {isSubmitted ? (
                <div className="success-message">
                  <div className="success-icon">
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <h3>Message Sent Successfully!</h3>
                  <p>Thank you for contacting DROPTRENDZY.</p>
                  <p>Your message has been delivered to our team.</p>
                  <div className="confirmation-details">
                    <p><i className="fas fa-user"></i> From: {formData.name}</p>
                    <p><i className="fas fa-envelope"></i> Email: {formData.email}</p>
                  </div>
                  <button 
                    className="btn-modern"
                    onClick={() => this.setState({ isSubmitted: false })}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form 
                  name="contact" 
                  method="POST" 
                  netlify
                  netlify-honeypot="bot-field"
                  onSubmit={this.handleSubmit}
                  className="contact-form"
                  noValidate
                >
                  {/* Netlify Hidden Fields */}
                  <input type="hidden" name="form-name" value="contact" />
                  <input type="hidden" name="_subject" value="New DROPTRENDZY Contact Form Submission" />
                  
                  {/* Honeypot Field - Hidden from users */}
                  <div className="hidden">
                    <label>
                      Don't fill this out if you're human: 
                      <input name="bot-field" />
                    </label>
                  </div>
                  
                  {submitError && (
                    <div className="error-message">
                      <div className="error-icon">
                        <i className="fas fa-exclamation-triangle"></i>
                      </div>
                      <div className="error-content">
                        <h4>Unable to Send Message</h4>
                        <p>{submitError}</p>
                        <div className="error-solution">
                          <p><strong>Quick fix:</strong> Email us directly at:</p>
                          <a href="mailto:droptrendzy782@gmail.com" className="direct-email-link">
                            <i className="fas fa-envelope"></i> droptrendzy782@gmail.com
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">
                        <i className="fas fa-user"></i> Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={this.handleInputChange}
                        className={errors.name ? 'error' : ''}
                        placeholder="Your full name"
                        disabled={isSubmitting}
                        required
                      />
                      {errors.name && <span className="error-text">{errors.name}</span>}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="email">
                        <i className="fas fa-envelope"></i> Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={this.handleInputChange}
                        className={errors.email ? 'error' : ''}
                        placeholder="your@email.com"
                        disabled={isSubmitting}
                        required
                      />
                      {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">
                      <i className="fas fa-tag"></i> Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={this.handleInputChange}
                      className={errors.subject ? 'error' : ''}
                      disabled={isSubmitting}
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Order Support">Order Support</option>
                      <option value="Shipping Question">Shipping Question</option>
                      <option value="Returns & Exchanges">Returns & Exchanges</option>
                      <option value="Wholesale Inquiry">Wholesale Inquiry</option>
                      <option value="Refund Policy">Refund Policy Question</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.subject && <span className="error-text">{errors.subject}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">
                      <i className="fas fa-comment-alt"></i> Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={this.handleInputChange}
                      rows="5"
                      className={errors.message ? 'error' : ''}
                      placeholder="Tell us how we can help you..."
                      disabled={isSubmitting}
                      required
                    ></textarea>
                    <div className="char-count">
                      <span className={formData.message.length < 10 ? 'char-warning' : ''}>
                        {formData.message.length}/500 characters
                      </span>
                      {formData.message.length > 0 && formData.message.length < 10 && (
                        <span className="char-requirement"> (Minimum 10 characters)</span>
                      )}
                    </div>
                    {errors.message && <span className="error-text">{errors.message}</span>}
                  </div>

                  <button 
                    type="submit" 
                    className="btn-modern submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="spinner"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane"></i>
                        Send Message
                      </>
                    )}
                  </button>
                  
                  <div className="form-note">
                    <i className="fas fa-shield-alt"></i>
                    Secured by Netlify Forms • No third-party branding
                  </div>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div className="contact-info-section">
              <h2>Contact Information</h2>
              
              <div className="contact-methods">
                <div className="contact-method glass-card">
                  <div className="method-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="method-info">
                    <h4>Email Us</h4>
                    <a href="mailto:droptrendzy782@gmail.com" className="email-link">
                      droptrendzy782@gmail.com
                    </a>
                    <span>We'll reply within 24 hours</span>
                  </div>
                </div>

                <div className="contact-method glass-card">
                  <div className="method-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div className="method-info">
                    <h4>Call Us</h4>
                    <p>+92 9946737794</p>
                    <span>Mon-Fri from 9am to 6pm EST</span>
                  </div>
                </div>

                <div className="contact-method glass-card">
                  <div className="method-icon">
                    <i className="fab fa-whatsapp"></i>
                  </div>
                  <div className="method-info">
                    <h4>WhatsApp</h4>
                    <p>+91 9946737794</p>
                    <span>Text us anytime</span>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="faq-section">
                <h3>Frequently Asked Questions</h3>
                <div className="faq-list">
                  <div className="faq-item glass-card">
                    <h5>How long does shipping take?</h5>
                    <p>Most orders ship within 24 hours. Delivery takes 3-5 business days.</p>
                  </div>
                  <div className="faq-item glass-card">
                    <h5>What's your return policy?</h5>
                    <p>We offer 3-day returns for all items in original condition.</p>
                  </div>
                  <div className="faq-item glass-card">
                    <h5>Need refund policy details?</h5>
                    <p>
                      <span 
                        className="policy-link"
                        onClick={() => this.props.navigateTo('refund-policy')}
                      >
                        View full refund policy →
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;