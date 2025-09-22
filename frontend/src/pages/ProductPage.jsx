// frontend/src/pages/ProductPage.jsx
import React, { useEffect, useState, useContext } from 'react';
import './ProductPage.css';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import { CartContext } from '../context/CartContext';

export default function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    api.get(`/products/${id}`).then(res => setProduct(res.data)).catch(err => console.error(err));
  }, [id]);

  if (!product) return <div className="page-product"><div className="product-loading">Loading...</div></div>;

  return (
    <div className="page-product">
      <div className="product-grid">
        <img src={`http://localhost:5000${product.image}`} alt={product.name} className="product-image" />
        <div className="product-details">
        <h1 className="product-title">{product.name}</h1>
        <p className="product-description-text">{product.description}</p>
        <div className="product-price">₹{Number(product.price).toFixed(2)}</div>
        <div className="product-actions">
          <div className="qty-group">
            <label className="qty-label" htmlFor="qty-input">Qty</label>
            <input
              id="qty-input"
              type="number"
              min="1"
              max={product.countInStock}
              step="1"
              value={qty}
              onChange={e => setQty(Number(e.target.value))}
              className="qty-input"
              aria-label="Quantity"
            />
          </div>
          <button
            onClick={() => { addToCart(product, qty); navigate('/cart'); }}
            className="btn-primary add-to-cart"
          >
            Add to Cart
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}
