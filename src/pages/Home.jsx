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

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const fetchMeals = useCallback(async (query, page) => {
        if (!query) {
            setMeals([]);
            return;
        }

        setLoading(true);
        try {
            const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&page=${page}&json=true`;
            const response = await fetch(url);
            const data = await response.json();
            setMeals(data.products || []);
        } catch (error) {
            console.error("Error fetching meals:", error);
            setMeals([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (debouncedQuery) {
            fetchMeals(debouncedQuery, currentPage);
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
                                setDebouncedQuery(searchQuery);
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
