// frontend/src/components/Header.jsx
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { 
  FaSearch, 
  FaShoppingCart, 
  FaBars, 
  FaTimes 
} from 'react-icons/fa';
import './Header.css';


export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) navigate(`/?q=${encodeURIComponent(q)}`);
    else navigate('/');
  };

  const cartCount = Array.isArray(cartItems)
    ? cartItems.reduce((total, item) => {
        const n = Number(item?.qty ?? item?.quantity ?? 0);
        return total + (Number.isFinite(n) ? n : 0);
      }, 0)
    : 0;

  return (
    <>
      <header className="header">
        {/* Logo */}
        <Link to="/" className="header-logo" aria-label="HyperMart Home">
          <span className="header-logo-text">HyperMart</span>
        </Link>

        {/* Delivery Location */}
        <div className="header-option">
          <span className="header-option-line-one">Deliver to</span>
          <span className="header-option-line-two">Select your address</span>
        </div>

        {/* Search Bar */}
        <div className="header-search">
          <select className="header-search-select">
            <option>All</option>
            <option>Electronics</option>
            <option>Books</option>
            <option>Home & Kitchen</option>
          </select>
          <input 
            type="text" 
            className="header-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
            placeholder="Search Amazon"
          />
          <button 
            type="button" 
            className="header-search-button"
            onClick={handleSearch}
            aria-label="Search"
          >
            <FaSearch className="search-icon" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="header-nav">
          {/* User Account / Auth Links */}
          <div className="header-option">
            <span className="header-option-line-one">
              Hello, {user ? user.name : 'Guest'}
            </span>
            <span className="header-option-line-two">
              {user ? (
                <button onClick={logout} className="header-link-button">Logout</button>
              ) : (
                <>
                  <Link to="/login" className="header-link-button">Sign In</Link>
                  <span className="mx-1">|</span>
                  <Link to="/register" className="header-link-button">Register</Link>
                </>
              )}
            </span>
          </div>

          {/* Returns & Orders */}
          <div className="header-option">
            <span className="header-option-line-one">Returns</span>
            <span className="header-option-line-two">& Orders</span>
          </div>

          {/* Cart */}
          <Link to="/cart" className="header-cart">
            <FaShoppingCart className="cart-icon" />
            <span className="cart-count">
              {cartCount}
            </span>
            <span className="cart-text">Cart</span>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu">
            <div className="mobile-menu-option">
              <span>Hello, {user ? user.name : 'Guest'}</span>
              <span>{user ? 'Your Account' : 'Welcome'}</span>
            </div>
            <div className="mobile-menu-option">
              <span>Returns</span>
              <span>& Orders</span>
            </div>
            <Link to="/cart" className="mobile-menu-option">
              <span>Your Cart</span>
              <span>{cartCount} items</span>
            </Link>
            {user ? (
              <button 
                onClick={logout}
                className="mobile-menu-option sign-out"
              >
                Sign Out
              </button>
            ) : (
              <>
                <Link to="/login" className="mobile-menu-option">Sign In</Link>
                <Link to="/register" className="mobile-menu-option">Register</Link>
              </>
            )}
          </div>
        )}
      </header>
    </>
  );
}
