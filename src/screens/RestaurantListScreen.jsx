// RestaurantListScreen.jsx
// PURPOSE: The menu page. Shows every restaurant with its menu. Clicking a food item
// opens the Food Details screen (unchanged).
// NEW: a search box filters the list, and if we arrived by clicking a restaurant card,
// the page scrolls to that restaurant's menu and highlights it.
// `.map()` turns an array of data into an array of UI elements.

import { useEffect } from "react";

function RestaurantListScreen({ restaurants, onSelectFood, searchText, onSearchChange, focusId }) {
  // Scroll to the chosen restaurant (if any) when the page appears.
  useEffect(() => {
    if (focusId) {
      document.getElementById("restaurant-" + focusId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [focusId]);

  // Keep a restaurant if the search text matches its name, cuisine, tags or any dish name.
  const text = searchText.trim().toLowerCase();
  const shown = restaurants.filter(
    (restaurant) =>
      text === "" ||
      restaurant.name.toLowerCase().includes(text) ||
      restaurant.cuisine.toLowerCase().includes(text) ||
      restaurant.tags.some((tag) => tag.toLowerCase().includes(text)) ||
      restaurant.menu.some((food) => food.name.toLowerCase().includes(text))
  );

  return (
    <div className="screen">
      <h1>Restaurants</h1>

      <input
        className="page-search"
        type="text"
        placeholder="🔍 Search restaurants or dishes..."
        value={searchText}
        onChange={(event) => onSearchChange(event.target.value)}
      />

      {shown.length === 0 && <p className="muted">No restaurants match "{searchText}". Try another search.</p>}

      <div className="menu-grid">
        {shown.map((restaurant) => (
          <div
            className={restaurant.id === focusId ? "card menu-card focused" : "card menu-card"}
            id={"restaurant-" + restaurant.id}
            key={restaurant.id}
          >
            <img className="menu-banner" src={restaurant.image} alt={restaurant.name} />
            <h2>{restaurant.emoji} {restaurant.name}</h2>
            <p className="muted">
              {restaurant.cuisine} • ⭐ {restaurant.rating} • 🕐 {restaurant.deliveryTime}
            </p>

            {restaurant.menu.map((food) => (
              <div className="food-row" key={food.id} onClick={() => onSelectFood(food, restaurant)}>
                <span>{food.emoji} {food.name}</span>
                <span>₹{food.price}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RestaurantListScreen;
