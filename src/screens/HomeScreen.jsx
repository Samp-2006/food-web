// HomeScreen.jsx
// PURPOSE: The landing page. From top to bottom:
//   Hero -> Categories -> Popular Restaurants -> Special Offer -> More Restaurants
// The restaurant data comes in as a prop, so we reuse the existing data.js.

import { useState } from "react";
import RestaurantCard from "../components/RestaurantCard";
import Reveal from "../components/Reveal";

// Category cards. `name` is also used as the search word when a card is clicked.
const categories = [
  { name: "Burgers", emoji: "🍔", image: "/images/burger.svg" },
  { name: "Pizza", emoji: "🍕", image: "/images/pizza.svg" },
  { name: "Chinese", emoji: "🍜", image: "/images/chinese.svg" },
  { name: "Japanese", emoji: "🍣", image: "/images/sushi.svg" },
  { name: "Mexican", emoji: "🌮", image: "/images/tacos.svg" },
  { name: "Healthy", emoji: "🥗", image: "/images/healthy.svg" },
  { name: "Italian", emoji: "🍝", image: "/images/pasta.svg" },
  { name: "Desserts", emoji: "🍰", image: "/images/dessert.svg" },
];

function HomeScreen({ restaurants, onSearch, onCategory, onOpenRestaurant, onOrderNow }) {
  const [query, setQuery] = useState("");

  // First 4 restaurants are "Popular"; the rest go in "More Restaurants" (no duplicates).
  const popular = restaurants.slice(0, 4);
  const more = restaurants.slice(4);

  function handleSearch(event) {
    event.preventDefault(); // stop the page from reloading
    onSearch(query);
  }

  return (
    <div>
      {/* ---------- HERO ---------- */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-text">
            <span className="pill">🔥 Delicious food delivered fast</span>
            <h1>
              Your favorite food,<br />
              <span className="green-text">delivered to you.</span>
            </h1>
            <p className="hero-sub">
              Discover the best restaurants around you and order your favorite meals with FoodieGo.
            </p>

            <form className="search-bar" onSubmit={handleSearch}>
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search restaurants or dishes..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              <button type="submit" className="primary-btn">Search</button>
            </form>
          </div>

          <div className="hero-visual">
            <div className="hero-float">
              <img className="hero-img" src="/images/hero.svg" alt="Burger and fries" />
              <div className="float-card card-top">⭐ <strong>4.9</strong> Rating</div>
              <div className="float-card card-bottom">🚴 <strong>25 min</strong> delivery</div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- CATEGORIES ---------- */}
      <section className="section">
        <Reveal>
          <div className="container">
            <p className="eyebrow">Explore Categories</p>
            <h2 className="section-title">What are you craving?</h2>
            <div className="category-grid">
              {categories.map((category) => (
                <button className="category-card" key={category.name} onClick={() => onCategory(category.name)}>
                  <img src={category.image} alt="" loading="lazy" />
                  <span>{category.emoji} {category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------- POPULAR RESTAURANTS ---------- */}
      <section className="section section-white">
        <Reveal>
          <div className="container">
            <p className="eyebrow">Top picks</p>
            <h2 className="section-title">Popular Restaurants</h2>
            <div className="restaurant-grid">
              {popular.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} onOpen={onOpenRestaurant} />
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------- SPECIAL OFFER ---------- */}
      <section className="offer" id="offers">
        <Reveal>
          <div className="container offer-inner">
            <div className="offer-text">
              <span className="pill pill-yellow">🔥 LIMITED TIME OFFER</span>
              <h2>Get 30% OFF your first order</h2>
              <p>
                Use code <span className="code">FOODIE30</span> at checkout.
              </p>
              <button className="accent-btn" onClick={onOrderNow}>Order Now →</button>
            </div>
            <div className="offer-visual">
              <img src="/images/pizza.svg" alt="Fresh pizza" loading="lazy" />
              <div className="offer-badge">30%<small>OFF</small></div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------- MORE RESTAURANTS ---------- */}
      <section className="section">
        <Reveal>
          <div className="container">
            <p className="eyebrow">Keep exploring</p>
            <h2 className="section-title">More Restaurants</h2>
            <div className="restaurant-grid">
              {more.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} onOpen={onOpenRestaurant} />
              ))}
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

export default HomeScreen;
