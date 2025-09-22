// frontend/src/components/ProductCard.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';
import { CartContext } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (e) => {
    // Prevent navigating to product page when clicking the button inside Link
    e.preventDefault();
    e.stopPropagation();
    if (product.countInStock > 0) {
      addToCart(product, 1);
    }
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`} className="product-link">
        {/* Product Image */}
        <div className="product-image-wrap">
          <img
            src={`http://localhost:5000${product.image}`}
            alt={product.name}
            className="product-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
            }}
          />
          {product.countInStock === 0 && (
            <div className="sold-out-badge">Sold Out</div>
          )}
        </div>

        {/* Product Info */}
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-description">{product.description}</p>

          <div className="product-details">
            <div>
              <p className="product-price">₹{product.price.toFixed(2)}</p>
            </div>
            <div>
              {product.countInStock > 0 ? (
                <span className="product-stock in-stock">In Stock</span>
              ) : (
                <span className="product-stock out-of-stock">Out of Stock</span>
              )}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className={`add-to-cart-btn ${
              product.countInStock > 0 ? 'enabled' : 'disabled'
            }`}
            disabled={product.countInStock === 0}
          >
            {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </Link>
    </div>
  );
}
