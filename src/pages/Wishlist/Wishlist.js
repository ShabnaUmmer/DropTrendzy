// src/pages/Wishlist/Wishlist.js
import React, { Component } from 'react';
import './Wishlist.css';

class Wishlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wishlistItems: [],
      isLoading: false,
      showConfirmClear: false
    };
  }

  componentDidMount() {
    this.loadWishlist();
    
    // Listen for wishlist updates from other components
    window.addEventListener('storage', this.handleStorageChange);
    window.addEventListener('wishlistUpdated', this.loadWishlist);
  }

  componentWillUnmount() {
    window.removeEventListener('storage', this.handleStorageChange);
    window.removeEventListener('wishlistUpdated', this.loadWishlist);
  }

  handleStorageChange = (e) => {
    if (e.key === 'droptrendzy_wishlist') {
      this.loadWishlist();
    }
  };

  loadWishlist = () => {
    try {
      const savedWishlist = JSON.parse(localStorage.getItem('droptrendzy_wishlist') || '[]');
      console.log('📥 Loaded wishlist items:', savedWishlist.length);
      this.setState({ wishlistItems: savedWishlist });
    } catch (error) {
      console.error('Error loading wishlist:', error);
      this.setState({ wishlistItems: [] });
    }
  };

  handleRemoveFromWishlist = (productId, e) => {
    if (e) e.stopPropagation();
    
    const updatedWishlist = this.state.wishlistItems.filter(item => item.id !== productId);
    
    this.setState({ wishlistItems: updatedWishlist });
    localStorage.setItem('droptrendzy_wishlist', JSON.stringify(updatedWishlist));
    
    // Dispatch event to update Navbar count
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new Event('wishlistUpdated'));
    
    if (this.props.updateWishlistCount) {
      this.props.updateWishlistCount();
    }

    this.showNotification('Removed from wishlist', 'success');
  };

  handleClearWishlist = () => {
    this.setState({ showConfirmClear: true });
  };

  confirmClearWishlist = () => {
    this.setState({ 
      wishlistItems: [],
      showConfirmClear: false 
    });
    
    localStorage.removeItem('droptrendzy_wishlist');
    
    // Dispatch events to update count
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new Event('wishlistUpdated'));
    
    if (this.props.updateWishlistCount) {
      this.props.updateWishlistCount();
    }
    
    this.showNotification('Wishlist cleared', 'success');
  };

  cancelClearWishlist = () => {
    this.setState({ showConfirmClear: false });
  };

  handleViewProduct = (item) => {
    if (this.props.navigateTo) {
      this.props.navigateTo('product-detail', item.handle);
    }
  };

  showNotification = (message, type = 'info') => {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.wishlist-notification');
    existingNotifications.forEach(notification => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    });

    const notification = document.createElement('div');
    notification.className = `wishlist-notification ${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas fa-${type === 'error' ? 'exclamation-circle' : type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 3000);
  };

  getPrice = (item) => {
    if (item.priceRange?.minVariantPrice?.amount) {
      return item.priceRange.minVariantPrice.amount;
    }
    if (item.price) {
      return item.price;
    }
    return '0.00';
  };

  render() {
    const { wishlistItems, showConfirmClear } = this.state;
    const { navigateTo } = this.props;

    return (
      <div className="wishlist-page">
        <div className="wishlist-bg">
          <div className="heart-bg">❤️</div>
          <div className="heart-bg">❤️</div>
          <div className="heart-bg">❤️</div>
        </div>

        <div className="container">
          {/* Page Header */}
          <div className="wishlist-header">
            <h1 className="gradient-text">Your Wishlist</h1>
            <p className="subtitle">Items you've saved for later</p>
            
            <div className="wishlist-stats glass-card">
              <div className="stat-item">
                <i className="fas fa-heart"></i>
                <span>{wishlistItems.length} {wishlistItems.length === 1 ? 'Item' : 'Items'}</span>
              </div>
            </div>
          </div>

          {/* Empty Wishlist State */}
          {wishlistItems.length === 0 ? (
            <div className="empty-wishlist glass-card">
              <i className="fas fa-heart-broken empty-icon"></i>
              <h2>Your Wishlist is Empty</h2>
              <p>Click the heart icon on products to add them here</p>
              <button 
                className="btn-modern"
                onClick={() => navigateTo('products')}
              >
                <i className="fas fa-shopping-bag"></i>
                Browse Products
              </button>
            </div>
          ) : (
            <>
              {/* Clear Wishlist Button */}
              <div className="wishlist-actions">
                <button 
                  className="btn-modern-outline danger"
                  onClick={this.handleClearWishlist}
                >
                  <i className="fas fa-trash"></i>
                  Clear All Items
                </button>
              </div>

              {/* Wishlist Items */}
              <div className="wishlist-grid">
                {wishlistItems.map((item, index) => (
                  <div 
                    key={item.id || item.handle || index} 
                    className="wishlist-item-card glass-card"
                    onClick={() => this.handleViewProduct(item)}
                  >
                    {/* Remove Button */}
                    <button 
                      className="remove-btn"
                      onClick={(e) => this.handleRemoveFromWishlist(item.id, e)}
                      title="Remove from wishlist"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                    
                    {/* Product Image */}
                    <div className="item-image">
                      <img 
                        src={item.featuredImage?.url || item.image || 'https://via.placeholder.com/400x400?text=No+Image'} 
                        alt={item.title}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
                        }}
                      />
                    </div>
                    
                    {/* Product Info */}
                    <div className="item-info">
                      <h3 className="item-title">{item.title}</h3>
                      
                      <div className="item-price">
                        <span className="current-price">
                          ${this.getPrice(item)}
                        </span>
                      </div>
                      
                      <div className="item-status">
                        <span className={`status-badge ${item.availableForSale ? 'in-stock' : 'out-of-stock'}`}>
                          <i className={`fas fa-${item.availableForSale ? 'check-circle' : 'times-circle'}`}></i>
                          {item.availableForSale ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                      
                      <div className="view-product-btn">
                        <i className="fas fa-eye"></i>
                        View Product
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Clear Wishlist Confirmation Modal */}
        {showConfirmClear && (
          <div className="modal-overlay">
            <div className="confirm-modal glass-card">
              <div className="modal-header">
                <i className="fas fa-exclamation-triangle warning-icon"></i>
                <h3>Clear Wishlist</h3>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to clear your entire wishlist?</p>
                <p className="warning-text">This action cannot be undone.</p>
              </div>
              <div className="modal-actions">
                <button 
                  className="btn-modern-outline"
                  onClick={this.cancelClearWishlist}
                >
                  Cancel
                </button>
                <button 
                  className="btn-modern danger"
                  onClick={this.confirmClearWishlist}
                >
                  Clear Wishlist
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Wishlist;