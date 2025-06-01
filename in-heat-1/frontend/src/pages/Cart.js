import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (!userId) return;
        fetch(`http://localhost:3003/cart/${userId}`)
            .then(res => res.json())
            .then(data => {
                setCartItems(data);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading cart...</div>;

    if (cartItems.length === 0) return <div>Your cart is empty.</div>;

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            <ul>
                {cartItems.map(item => (
                    <li key={item._id}>
                        <img src={item.image || "/assets/product1.jpg"} alt={item.name} width={80} />
                        <div>
                            <strong>{item.name}</strong><br />
                            Quantity: {item.quantity}<br />
                            Price: ${item.price}
                        </div>
                    </li>
                ))}
            </ul>
            <Link to="/cart">Cart</Link>
        </div>
    );
}

export default Cart;

<Route path="/cart" element={<Cart />} />