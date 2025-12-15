import React from 'react';
import { useCart } from '../context/CartContext';

const CartModal = ({ isOpen, onClose }) => {
    const { cart, updateQuantity, removeFromCart, clearCart, checkout } = useCart();

    if (!isOpen) return null;

    return (
        <div className="cart-modal" style={{ display: 'flex' }}
            onClick={(e) => e.target.className === 'cart-modal' && onClose()}>
            <div className="cart-modal-content">
                <div className="cart-header">
                    <h2>Your Cart</h2>
                    <span className="close-btn" onClick={onClose}>&times;</span>
                </div>

                {cart.length === 0 ? (
                    <div id="cart-empty" style={{ display: 'block' }}>
                        <p>Your cart is empty...😊</p>
                        <button className="start-shopping-btn" onClick={onClose}>Start Shopping</button>
                    </div>
                ) : (
                    <div id="cart-content" style={{ display: 'block' }}>
                        <div id="cart-items">
                            {cart.map(item => (
                                <div className="cart-item" key={item.id}>
                                    <img src={item.image} alt={item.name} />
                                    <div className="cart-item-info">
                                        <h4>{item.name}</h4>
                                        <p className="item-brand">{item.brand}</p>
                                        <div className="quantity-controls">
                                            <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>-</button>
                                            <span className="quantity">{item.quantity}</span>
                                            <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                                        </div>
                                    </div>
                                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>×</button>
                                </div>
                            ))}
                        </div>


                        <div className="cart-footer">
                            <button className="clear-cart-btn" onClick={clearCart}>Clear Cart</button>
                            <button className="checkout-btn" onClick={checkout}>Checkout</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartModal;
