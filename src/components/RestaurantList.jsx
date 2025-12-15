import React from "react";
import RestaurantCard from "./RestaurantCard";
const restaurants = [];


const RestaurantList = () => {
    return (
        <section className="restaurants">
            <div className="container">
                <div className="item-bar">
                    <div className="number">Top restaurant chains in Bangalore</div>

                    <div className="filters">
                        <div>Relevance</div>
                        <div>Delivery Time</div>
                        <div>Rating</div>
                        <div>Cost: Low to High</div>
                        <div>Cost: High to Low</div>
                    </div>
                </div>

                <div className="restaurant-list">
                    {restaurants.map((r, i) => (
                        <RestaurantCard key={i} data={r} />

                    ))}
                </div>
            </div>
        </section>
    );
};

export default RestaurantList;
