import React, { useState, useEffect, useCallback } from "react";
import FoodCard from "../components/FoodCard";
// eslint-disable-next-line
import Footer from "../components/Footer";

const Home = () => {
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [debouncedQuery, setDebouncedQuery] = useState("");

    // Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery);
            setCurrentPage(1); // Reset to page 1 on new search
        }, 1000);

        return () => clearTimeout(timer); // prevent multiple api calls
    }, [searchQuery]); // searchquery change avumbo mathram call cheyyan

    const fetchMeals = useCallback(async (query, page) => {  //useacallback prevent unnecessary re-renders
        if (!query) { // If query is empty, clear meals and return
            setMeals([]);
            return;
        }

        setLoading(true);
        try {
            // Using TheMealDB which is more reliable for recipe/meal searches
            const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`;  // encodeURIComponent prevent uri errors
            const response = await fetch(url);
            const data = await response.json();

            // Map TheMealDB format to what FoodCard expects
            const mappedMeals = (data.meals || []).map(meal => ({
                id: meal.idMeal,
                product_name: meal.strMeal,
                image_url: meal.strMealThumb,
                brands: meal.strCategory, // Using category as "brand" equivalent
                // Keep original data just in case
                ...meal
            }));

            setMeals(mappedMeals);  // save meals in state
        } catch (error) {
            console.error("Error fetching meals:", error); // prevent app crash
            setMeals([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (debouncedQuery) {
            fetchMeals(debouncedQuery, currentPage); // api run cheyunth if only the user stops typing for 1 s
        }
    }, [debouncedQuery, currentPage, fetchMeals]);

    return (
        <>
            <div className="container" style={{ marginTop: '100px', minHeight: '80vh', padding: '20px' }}>

                <main className="main-container">
                    <section className="restaurants">
                        <div className="container">
                            <div className="item-bar">
                                <div className="number">Top restaurant chains in Banglore</div>
                                <div className="filters">
                                    <div className="relevance">Relevance</div>
                                    <div className="delivery">Delivery Time</div>
                                    <div className="rating">Rating</div>
                                    <div className="cost-lh">Cost: Low to High</div>
                                    <div className="cost-hl">Cost: High to Low</div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <div className="search-container" style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        maxWidth: '500px',
                        margin: '0 auto',
                        position: 'relative'
                    }}>
                        <input
                            type="text"
                            id="search"
                            placeholder="Search for food (e.g. pizza, burger..)"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && setDebouncedQuery(searchQuery)}
                            style={{
                                padding: '12px 20px',
                                width: '100%',
                                borderRadius: '25px',
                                border: '1px solid #ddd',
                                fontSize: '16px',
                                outline: 'none',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                paddingRight: '50px' // Make space for the button
                            }}
                        />
                        <button
                            onClick={() => {
                                setDebouncedQuery(searchQuery); //The input box shows whatever is inside searchQuery
                                setCurrentPage(1);
                            }}
                            style={{
                                position: 'absolute',
                                right: '5px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#fc8019',
                                fontSize: '1.2rem'
                            }}
                        >

                            <i className="fa-solid fa-magnifying-glass"></i>

                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>🍕 Loading delicious food items 🍕...</p>
                    </div>
                ) : (
                    <>
                        {!debouncedQuery && (
                            <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#666' }}>
                                Please enter a Food Item to search!....
                            </p>
                        )}

                        {debouncedQuery && meals.length === 0 && !loading && (
                            <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#666' }}>
                                No food items found!
                            </p>
                        )}

                        <div id="food-container" style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                            gap: '20px',
                            padding: '20px 0'
                        }}>
                            {meals.map((meal, index) => (
                                <FoodCard key={meal.id || index} meal={meal} />
                            ))}
                        </div>

                        {meals.length > 0 && (
                            <div className="pagination" style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    style={{
                                        padding: '8px 16px',
                                        backgroundColor: currentPage === 1 ? '#ccc' : '#fc8019',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => setCurrentPage(prev => prev + 1)}
                                    style={{
                                        padding: '8px 16px',
                                        backgroundColor: '#fc8019',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default Home;
