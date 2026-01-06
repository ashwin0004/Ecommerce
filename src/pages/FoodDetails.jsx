import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const FoodDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMealDetails = async () => {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
                const data = await response.json();
                if (data.meals && data.meals[0]) {
                    setMeal(data.meals[0]);
                }
                
            } catch (error) {
                console.error("Error fetching meal details:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchMealDetails();
        }
    }, [id]);

    if (loading) return (
        <div className="container" style={{ marginTop: '100px', textAlign: 'center' }}>
            <h2>Loading...</h2>
        </div>
    );

    if (!meal) return (
        <div className="container" style={{ marginTop: '100px', textAlign: 'center' }}>
            <h2>Meal not found</h2>
            <button onClick={() => navigate('/')} className="back-btn">Back to Home</button>
        </div>
    );

    // Prepare ingredients list
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push({
                ingredient: meal[`strIngredient${i}`],
                measure: meal[`strMeasure${i}`]
            });
        } else {
            break;
        }
    }

    return (
        <div className="container food-details-container" style={{ marginTop: '100px', padding: '20px' }}>
            <button
                onClick={() => navigate('/')}
                style={{
                    marginBottom: '20px',
                    padding: '8px 16px',
                    backgroundColor: '#f0f0f0',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                ← Back to Search
            </button>

            <div className="details-content" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                <div className="image-section">
                    <img
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                    />
                </div>
                <div className="info-section">
                    <h1 style={{ color: '#333', marginBottom: '10px' }}>{meal.strMeal}</h1>
                    <p className="category" style={{ color: '#666', marginBottom: '20px' }}>
                        <span style={{ fontWeight: 'bold' }}>Category:</span> {meal.strCategory} |
                        <span style={{ fontWeight: 'bold', marginLeft: '10px' }}>Area:</span> {meal.strArea}
                    </p>

                    <button
                        onClick={() => addToCart({
                            id: meal.idMeal,
                            product_name: meal.strMeal,
                            image_url: meal.strMealThumb,
                            brands: meal.strCategory
                        })}
                        style={{
                            padding: '12px 24px',
                            backgroundColor: '#fc8019',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            marginBottom: '20px'
                        }}
                    >
                        Add to Cart
                    </button>

                    <h3>Ingredients</h3>
                    <ul style={{ listStyle: 'none', padding: 0, marginBottom: '20px' }}>
                        {ingredients.map((item, index) => (
                            <li key={index} style={{ padding: '5px 0', borderBottom: '1px solid #eee' }}>
                                <strong>{item.ingredient}</strong> - {item.measure}
                            </li>
                        ))}
                    </ul>

                    <h3>Instructions</h3>
                    <p style={{ lineHeight: '1.6', color: '#444' }}>
                        {meal.strInstructions}
                    </p>

                    {meal.strYoutube && (
                        <div style={{ marginTop: '20px' }}>
                            <a
                                href={meal.strYoutube}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: 'red', textDecoration: 'none', fontWeight: 'bold' }}
                            >
                                Watch on YouTube
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FoodDetails;
