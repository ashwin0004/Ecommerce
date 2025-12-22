import React from "react";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";
import Home from "./pages/Home";
import Footer from "./components/Footer";

import "./style.css"; // your full CSS

import { Routes, Route } from 'react-router-dom';
import FoodDetails from "./pages/FoodDetails";

function App() {
    return (
        <CartProvider>
            <Navbar />
            <Routes>
                <Route path="/" element={<><Home /><Footer /></>} />
                <Route path="/food/:id" element={<FoodDetails />} />
            </Routes>
        </CartProvider>
    );
}

export default App;
