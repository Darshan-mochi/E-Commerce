// frontend/src/pages/CartPage.jsx
import React, { useContext } from 'react';
import './CartPage.css';
import { CartContext } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

export default function CartPage() {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const itemsPrice = Number(
    cartItems.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2)
  );

  return (
    <div className="page-cart">
      <h1 className="cart-title">Shopping Cart</h1>
      <div className="cart-grid">
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="cart-empty">Your cart is empty. <Link to="/" className="cart-link">Go shopping</Link></div>
          ) : (
            cartItems.map(item => (
              <div key={item.product} className="cart-item">
                <div>
                  <div className="item-name">{item.name}</div>
                  <div className="item-qty">Qty: {item.qty}</div>
                </div>
                <div className="item-right">
                  <div className="item-price">₹{item.price}</div>
                  <button className="btn-link btn-remove" onClick={() => removeFromCart(item.product)}>Remove</button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="cart-summary">
          <h2 className="summary-title">Order Summary</h2>
          <div className="summary-row">Items: <span className="summary-value">₹{itemsPrice}</span></div>
          <button onClick={() => navigate('/checkout')} className="btn-primary btn-checkout">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
