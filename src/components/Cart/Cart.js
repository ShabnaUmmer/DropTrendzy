// src/components/Cart/Cart.js
import React from 'react';
import './Cart.css';

const Cart = ({ 
  cartItems, 
  cartTotal, 
  cartItemCount, 
  toggleCart, 
  removeFromCart, 
  updateQuantity,
  handleCheckout,
  clearCart
}) => {
  
  const formatPrice = (price) => {
    return parseFloat(price || 0).toFixed(2);
  };

  return (
    <>
      <div className="cart-overlay" onClick={toggleCart}></div>
      <div className="cart-drawer">
        <div className="cart-header">
          <h3>
            <i className="fas fa-shopping-bag"></i>
            Your Cart ({cartItemCount})
          </h3>
          <button className="close-cart" onClick={toggleCart}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="cart-body">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">
                <i className="fas fa-shopping-bag"></i>
              </div>
              <h4>Your cart is empty</h4>
              <p>Add some products to get started!</p>
              <button 
                className="btn-modern-outline" 
                onClick={toggleCart}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-image">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/80x80?text=No+Image';
                        }}
                      />
                    </div>
                    <div className="cart-item-details">
                      <h4 className="cart-item-title">{item.title}</h4>
                      <p className="cart-item-variant">{item.variantTitle}</p>
                      <p className="cart-item-price">${formatPrice(item.price)}</p>
                      
                      <div className="cart-item-actions">
                        <div className="quantity-controls mini">
                          <button
                            className="quantity-btn"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <i className="fas fa-minus"></i>
                          </button>
                          <span className="quantity-display">{item.quantity}</span>
                          <button
                            className="quantity-btn"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= 10}
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                        
                        <button
                          className="remove-item"
                          onClick={() => removeFromCart(item.id)}
                          title="Remove item"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <div className="cart-totals">
                  <div className="cart-subtotal">
                    <span>Subtotal</span>
                    <span>${formatPrice(cartTotal)}</span>
                  </div>
                  <p className="cart-tax-note">Taxes and shipping calculated at checkout</p>
                </div>

                <div className="cart-actions">
                  <button
                    className="btn-modern checkout-btn"
                    onClick={handleCheckout}
                  >
                    <i className="fas fa-lock"></i>
                    Checkout (${formatPrice(cartTotal)})
                  </button>
                  
                  <button
                    className="btn-modern-outline"
                    onClick={() => {
                      if (window.confirm('Clear all items from cart?')) {
                        clearCart();
                      }
                    }}
                  >
                    <i className="fas fa-trash"></i>
                    Clear Cart
                  </button>
                  
                  <button
                    className="continue-shopping-btn"
                    onClick={toggleCart}
                  >
                    <i className="fas fa-arrow-left"></i>
                    Continue Shopping
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;