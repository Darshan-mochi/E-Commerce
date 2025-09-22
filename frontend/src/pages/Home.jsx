// frontend/src/pages/Home.jsx
import React, { useEffect, useState, useCallback } from 'react';
import './Home.css';
import { api } from '../utils/api';
import ProductCard from '../components/ProductCard';
import { useLocation } from 'react-router-dom';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();

  // Fetch products
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/products');
      setProducts(data);
      setFilteredProducts(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch products. Please try again later.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Filter products based on search term
  const filterProducts = useCallback((term) => {
    if (!term?.trim()) {
      setFilteredProducts(products);
      return;
    }

    const lowercasedTerm = term.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowercasedTerm) ||
        (product.description || '').toLowerCase().includes(lowercasedTerm)
    );
    setFilteredProducts(filtered);
  }, [products]);

  // Sync search term from query param `q`
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q') || '';
    setSearchTerm(q);
    filterProducts(q);
  }, [location.search, filterProducts]);

  // Keep filtering in sync when products change
  useEffect(() => {
    filterProducts(searchTerm);
  }, [products, searchTerm, filterProducts]);

  // Initial fetch
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) {
    return (
      <div className="home-loading">
        <div className="home-spinner" />
      </div>
    );
  }

  return (
    <div className="home-page">
      <section className="home-hero">
        <h1 className="home-title">Welcome to Our Store</h1>
        <p className="home-subtitle">Discover amazing products at great prices</p>
      </section>

      {error && (
        <div className="home-alert home-alert-error">{error}</div>
      )}

      {filteredProducts.length === 0 ? (
        <div className="home-empty">
          <h3 className="home-empty-title">No products found</h3>
          <p className="home-empty-subtitle">Try adjusting your search to find what you're looking for.</p>
        </div>
      ) : (
        <div className="home-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
