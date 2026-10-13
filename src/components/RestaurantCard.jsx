// RestaurantCard.jsx
// PURPOSE: One restaurant card (image, name, cuisine, rating, time, delivery, heart).
// Used in BOTH "Popular Restaurants" and "More Restaurants" so we write it once.
// Clicking the card calls onOpen(restaurant) — the same "open this restaurant's menu" action.

import { useState } from "react";

function RestaurantCard({ restaurant, onOpen }) {
  // The heart is only remembered while the page is open (local state).
  const [liked, setLiked] = useState(false);

  function toggleHeart(event) {
    event.stopPropagation(); // don't also "open" the restaurant
    setLiked(!liked);
  }

  return (
    <article
      className="r-card"
      onClick={() => onOpen(restaurant)}
      onKeyDown={(event) => event.key === "Enter" && onOpen(restaurant)}
      tabIndex={0}
    >
      <div className="r-card-image">
        <img src={restaurant.image} alt={restaurant.name} loading="lazy" />
        <button className="heart" onClick={toggleHeart} aria-label="Add to favourites">
          {liked ? "❤️" : "🤍"}
        </button>
      </div>

      <div className="r-card-body">
        <h3>{restaurant.name}</h3>
        <p className="muted">{restaurant.cuisine}</p>
        <div className="r-meta">
          <span>⭐ {restaurant.rating}</span>
          <span>🕐 {restaurant.deliveryTime}</span>
          <span>🛵 {restaurant.delivery}</span>
        </div>
      </div>
    </article>
  );
}

export default RestaurantCard;
