// FoodDetailsScreen.jsx
// PURPOSE: Shows one food item in detail, lets the user pick a quantity,
// and add it to the cart.
// This screen has its OWN small state (quantity) because no other screen needs it.

import { useState,useEffect,useActionState } from "react";

function FoodDetailsScreen({ food, onAddToCart, onBack }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="screen narrow">
      <button className="link-btn" onClick={onBack}>← Back</button>

      <div className="card center">
        <div className="big-emoji">{food.emoji}</div>
        <h1>{food.name}</h1>
        <p className="muted">from {food.restaurantName}</p>
        <p>{food.description}</p>
        <h2>₹{food.price}</h2>

        <div className="quantity-box">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>

        <button className="primary-btn" onClick={() => onAddToCart(food, quantity)}>
          Add to Cart • ₹{food.price * quantity}
        </button>
      </div>
    </div>
  );
}

export default FoodDetailsScreen;
