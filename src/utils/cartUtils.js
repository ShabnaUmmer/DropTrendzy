// src/utils/cartUtils.js

export const addToCart = (variantId, quantity = 1) => {
  try {
    // Extract Shopify variant ID
    const variantParts = variantId?.split('/') || [];
    const shopifyVariantId = variantParts[variantParts.length - 1];
    
    if (!shopifyVariantId) {
      throw new Error('Invalid variant ID');
    }
    
    // Your Shopify domain
    const shopifyDomain = process.env.REACT_APP_SHOPIFY_DOMAIN || 'droptrendzy.myshopify.com';
    
    // Your Vercel URL
    const vercelUrl = process.env.REACT_APP_SITE_URL || 'https://droptrendzy.vercel.app';
    
    // Create return URL to go back to your Vercel app after checkout
    const returnUrl = `${vercelUrl}/thank-you`;
    
    // Build Shopify cart URL
    const cartUrl = `https://${shopifyDomain}/cart/${shopifyVariantId}:${quantity}?return_to=${encodeURIComponent(returnUrl)}`;
    
    // Open in new tab
    const newWindow = window.open(cartUrl, '_blank');
    
    if (!newWindow) {
      throw new Error('Popup blocked. Please allow popups for this site.');
    }
    
    return {
      success: true,
      cartUrl,
      message: 'Redirecting to cart...'
    };
    
  } catch (error) {
    console.error('Cart error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

export const showCartNotification = (message, type = 'success') => {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `cart-notification ${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${type === 'error' ? 'exclamation-circle' : type === 'success' ? 'check-circle' : 'info-circle'}"></i>
      <span>${message}</span>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Add styles if not exists
  if (!document.getElementById('cart-notification-styles')) {
    const style = document.createElement('style');
    style.id = 'cart-notification-styles';
    style.textContent = `
      .cart-notification {
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        z-index: 9999;
        animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
        max-width: 300px;
      }
      .cart-notification.success {
        background: linear-gradient(135deg, #00c9a7, #00d4aa);
        color: white;
      }
      .cart-notification.error {
        background: linear-gradient(135deg, #ff6b6b, #ff4757);
        color: white;
      }
      .cart-notification.info {
        background: var(--primary-gradient);
        color: white;
      }
      .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes fadeOut {
        to { opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
  
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 3000);
};