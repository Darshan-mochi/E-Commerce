// frontend/src/context/CartContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { api } from '../utils/api';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState(() => {
    const raw = localStorage.getItem('cart');
    return raw ? JSON.parse(raw) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, qty = 1) => {
    setCartItems(prev => {
      const exists = prev.find(i => i.product === product._id);
      if (exists) return prev.map(i => i.product === product._id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, {
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        qty
      }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(i => i.product !== productId));
  };

  const clearCart = () => setCartItems([]);

  const checkoutDummy = async (shippingAddress) => {
    if (!user) throw new Error('Login required');
    // compute prices
    const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
    const taxPrice = Math.round(itemsPrice * 0.05); // 5% tax
    const shippingPrice = itemsPrice > 1000 ? 0 : 50;
    const totalPrice = itemsPrice + taxPrice + shippingPrice;

    const orderData = {
      orderItems: cartItems,
      shippingAddress,
      paymentMethod: 'Dummy',
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      isPaid: true, // dummy payment marked paid
      paymentResult: { id: 'DUMMY_PAY', status: 'COMPLETED', email_address: user.email }
    };

    const res = await api.post('/orders', orderData);
    clearCart();
    return res.data;
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, checkoutDummy }}>
      {children}
    </CartContext.Provider>
  );
};
