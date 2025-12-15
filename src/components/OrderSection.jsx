import React from "react";
import OrderCard from "./OrderCard";
const orders = [];

const OrderSection = () => {
    return (
        <div className="order_section">
            {orders.map((orderRow, index) => (
                <div key={index} className="order">
                    {orderRow.map((item, i) => (
                        <OrderCard key={i} order={item} />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default OrderSection;
