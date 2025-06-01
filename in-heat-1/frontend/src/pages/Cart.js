import React, { useEffect, useState } from "react";

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    useEffect(() => {
        const userId = localStorage.getItem("userId");
        fetch(`http://localhost:3003/cart/${userId}`)
            .then(res => res.json())
            .then(setCartItems);
    }, []);
    if (!cartItems.length) return <div>Your cart is empty.</div>;
    return (
        <div>
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
        </div>
    );
}

export default Cart;