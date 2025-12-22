import React, { createContext, useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('foodCart');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (error) {
                console.error("Failed to parse cart from localStorage", error);
            }
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('foodCart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (meal) => {
        const itemId = meal.id || meal.code || Date.now().toString();
        const existingItem = cart.find(item => item.id === itemId);

        if (existingItem) {
            setCart(cart.map(item =>
                item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
            ));
            Swal.fire({
                icon: 'success',
                title: 'Updated!',
                text: 'Item quantity updated in cart!',
                timer: 1500,
                showConfirmButton: false
            });
        } else {
            const newItem = {
                id: itemId,
                name: meal.product_name || 'Unknown Product',
                brand: meal.brands || 'No brand',
                image: meal.image_url || meal.image_front_url || 'https://via.placeholder.com/100x100?text=No+Image',
                quantity: 1
            };
            setCart([...cart, newItem]);
            Swal.fire({
                icon: 'success',
                title: 'Added!',
                text: 'Item added to cart!',
                timer: 1500,
                showConfirmButton: false
            });
        }
    };

    const removeFromCart = (itemId) => {
        setCart(cart.filter(item => item.id !== itemId));
        Swal.fire({
            icon: 'success',
            title: 'Removed!',
            text: 'Item removed from cart!',
            timer: 1500,
            showConfirmButton: false
        });
    };

    const updateQuantity = (itemId, change) => {
        setCart(prevCart => {
            return prevCart.map(item => {
                if (item.id === itemId) {
                    const newQuantity = item.quantity + change;
                    if (newQuantity <= 0) {
                        return null; // Will be filter out cheyan
                    }
                    return { ...item, quantity: newQuantity };
                }
                return item;
            }).filter(Boolean); // nulls remove cheyum (items with 0 quantity avum)
        });
    };

    const clearCart = () => {
        if (cart.length === 0) {
            Swal.fire('Info', 'Cart is already empty!', 'info');
            return;
        }

        Swal.fire({
            title: 'Clear Cart?',
            text: "Are you sure you want to remove all items?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, clear it!'
        }).then((result) => {
            if (result.isConfirmed) {
                setCart([]);
                Swal.fire('Cleared!', 'Your cart has been cleared.', 'success');
            }
        });
    };

    const checkout = () => {
        if (cart.length === 0) {
            Swal.fire('Info', 'Your cart is empty!', 'info');
            return;
        }

        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

        Swal.fire({
            title: 'Checkout',
            html: `
        <p>Total Items: <strong>${totalItems}</strong></p>
        <p>Ready to proceed with your order?</p>
      `,
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#28a745',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm Order'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Success!', 'Your order has been placed!', 'success');
                setCart([]);
            }
        });
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, checkout }}>
            {children}
        </CartContext.Provider>
    );
};
