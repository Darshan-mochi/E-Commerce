// frontend/src/pages/CheckoutPage.jsx
import React, { useState, useContext } from 'react';
import './CheckoutPage.css';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
  const { cartItems, checkoutDummy } = useContext(CartContext);
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) { alert('Cart empty'); return; }
    setLoading(true);
    try {
      const order = await checkoutDummy({ address, city, postalCode, country });
      alert('Order placed (dummy). Order id: ' + order._id);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-checkout">
      <div className="checkout-card">
        <h2 className="checkout-title">Checkout (Dummy Payment)</h2>
        <form onSubmit={submit} className="checkout-form">
          <input className="input" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} />
          <input className="input" placeholder="City" value={city} onChange={e => setCity(e.target.value)} />
          <input className="input" placeholder="Postal Code" value={postalCode} onChange={e => setPostalCode(e.target.value)} />
          <input className="input" placeholder="Country" value={country} onChange={e => setCountry(e.target.value)} />
          <button disabled={loading} className="btn-primary btn-place">{loading ? 'Placing order...' : 'Pay (Dummy) & Place Order'}</button>
        </form>
      </div>
    </div>
  );
}
