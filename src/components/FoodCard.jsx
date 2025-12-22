import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const FoodCard = ({ meal }) => {
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const imageUrl = meal.image_url || meal.image_front_url || 'https://via.placeholder.com/200x200?text=No+Image';
    const productName = meal.product_name || 'Unknown Product';
    const brands = meal.brands || 'No brand';

    const handleCardClick = (e) => {
        // Prevent navigation if clicking the add to cart button
        if (e.target.closest('.add-to-cart-btn')) return;
        navigate(`/food/${meal.id}`);
    };

    return (
        <div className="food-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
            <img src={imageUrl} alt={productName} />
            <div className="card-content">
                <h3>{productName}</h3>
                <p className="brand">{brands}</p>
                <button
                    className="add-to-cart-btn"
                    onClick={() => addToCart(meal)}
                >
                    🛒 Add to Cart
                </button>
            </div>
        </div>
    );
};

export default FoodCard;
