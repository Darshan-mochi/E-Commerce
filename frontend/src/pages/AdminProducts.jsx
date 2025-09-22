// frontend/src/pages/AdminProducts.jsx
import React, { useEffect, useState, useContext } from 'react';
import './AdminProducts.css';
import { api } from '../utils/api';
import { AuthContext } from '../context/AuthContext';

export default function AdminProducts() {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: 0, image: '', countInStock: 0 });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await api.get('/products');
    setProducts(res.data);
  };

  const createProduct = async (e) => {
    e.preventDefault();
    try {
      await api.post('/products', form);
      setForm({ name: '', description: '', price: 0, image: '', countInStock: 0 });
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  const deleteProduct = async (id) => {
    if (!confirm('Delete product?')) return;
    await api.delete(`/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="page-admin">
      <h1 className="admin-title">Admin - Products</h1>
      <form onSubmit={createProduct} className="admin-form">
        <input className="input" placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        <input className="input" placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
        <input className="input" placeholder="Image URL" value={form.image} onChange={e => setForm({...form, image: e.target.value})} />
        <input type="number" className="input" placeholder="Price" value={form.price} onChange={e => setForm({...form, price: Number(e.target.value)})} />
        <input type="number" className="input" placeholder="Count In Stock" value={form.countInStock} onChange={e => setForm({...form, countInStock: Number(e.target.value)})} />
        <button className="btn-primary">Create Product</button>
      </form>

      <div className="admin-grid">
        {products.map(p => (
          <div key={p._id} className="admin-card">
            <h3 className="card-title">{p.name}</h3>
            <div className="card-line">Price: <strong>₹{p.price}</strong></div>
            <div className="card-line">Stock: <strong>{p.countInStock}</strong></div>
            <div className="card-actions">
              <button onClick={() => deleteProduct(p._id)} className="btn-link btn-delete">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
