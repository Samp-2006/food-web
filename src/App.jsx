// App.jsx
// PURPOSE: The "brain" of the app. It owns ALL shared state
// (which screen is showing, the cart, the last order, the search text)
// and passes it down to the screens as props.
//
// We still do NOT use a router library. We keep a string called `screen`
// and show the matching component. Easy to read, easy to learn.

import { useState, useEffect } from "react";
import "./App.css";
import { restaurants } from "./data";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import RestaurantListScreen from "./screens/RestaurantListScreen";
import FoodDetailsScreen from "./screens/FoodDetailsScreen";
import CartScreen from "./screens/CartScreen";
import OrderConfirmationScreen from "./screens/OrderConfirmationScreen";
import LoginScreen from "./screens/LoginScreen";
import { LoginUser, trackEvents, trackCharged } from "./analytics";

// Read the saved user (if any) from the browser, so a refresh does not log you out.
function loadUser() {
  try {
    const saved = localStorage.getItem("foodiego-user");
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function App() {
  // ---- STATE (data that can change; React re-draws the screen when it changes) ----
  const [screen, setScreen] = useState("home"); // home | restaurants | food | cart | confirmation
  const [selectedFood, setSelectedFood] = useState(null);
  const [cart, setCart] = useState([]); // list of { id, name, price, quantity, ... }
  const [lastOrder, setLastOrder] = useState(null);
  const [searchText, setSearchText] = useState(""); // NEW: used by search bars + category cards
  const [focusId, setFocusId] = useState(null); // NEW: which restaurant to scroll to on the menu page
  const [user, setUser] = useState(loadUser); // NEW: the logged-in user, or null if nobody is logged in

  // Total number of items in the cart (shown in the header)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Every time the screen changes, jump to the top of the page
  // (except when we are about to scroll to one specific restaurant's menu).
  useEffect(() => {
    if (screen === "restaurants" && focusId) return;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [screen, focusId]);

  // ---- NAVIGATION ACTIONS (NEW) ----

  // Go to the Restaurants page. Pass text to search for something; pass nothing to keep the current search.
  function openRestaurants(text) {
    if (text !== undefined) setSearchText(text);
    setFocusId(null);
    setScreen("restaurants");
  }

  // Clicking a restaurant card: open the Restaurants page and scroll to that restaurant's menu.
  function openRestaurant(restaurant) {
    setSearchText("");
    setFocusId(restaurant.id);
    trackEvents("Restaurant Clicked", {
      "Restaurant Name": restaurant.name,
      Cuisine: restaurant.cuisine,
      Rating: restaurant.rating,
      "Delivery Time": restaurant.deliveryTime,
      "Delivery Info": restaurant.delivery,
    });
    console.log("Restaurant clicked:", restaurant.name);
    setScreen("restaurants");
  }

  // Scroll to a section on the Home page (e.g. "offers") or to the footer ("about").
  function scrollToSection(sectionId) {
    function scroll() {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }
    if (screen === "home" || sectionId === "about") {
      scroll();
    } else {
      setScreen("home");
      setTimeout(scroll, 100); // wait for the Home screen to appear first
    }
  }

  // ---- LOGIN ACTIONS (NEW) ----

  // Called by the login form with { name, email, phone }.
  function handleLogin(details) {
    // Tell CleverTap who this person is. We use their email as the unique Identity.
    LoginUser({
      name: details.name,
      identity: details.email,
      email: details.email,
      phone: details.phone || undefined, // leave it out if empty
    });
    setUser(details);
    localStorage.setItem("foodiego-user", JSON.stringify(details));
    setScreen("home");
    console.log("User logged in:", details);
  }

  function handleLogout() {
    setUser(null);
    localStorage.removeItem("foodiego-user");
    setScreen("home");
  }

  // ---- CART ACTIONS (unchanged) ----

  // User tapped a food item in the restaurant list
  function openFood(food, restaurant) {
    setSelectedFood({ ...food, restaurantName: restaurant.name });
    trackEvents("Food Clicked", {
      "Food Name": food.name,
      "Restaurant Name": restaurant.name,
      Cuisine: restaurant.cuisine,
      Price: food.price,
    });
    console.log("Food clicked:", food.name, "from", restaurant.name);
    setFocusId(restaurant.id); // so "Back" returns to this restaurant
    setScreen("food");
  }

  // Add food to the cart. If it is already there, just increase the quantity.
  function addToCart(food, quantity) {
    const existing = cart.find((item) => item.id === food.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === food.id ? { ...item, quantity: item.quantity + quantity } : item
        )
      );
    } else {
      setCart([...cart, { ...food, quantity }]);
    }
    trackEvents("Added to Cart", {
      "Food Name": food.name,
      "Restaurant Name": food.restaurantName,
      Price: food.price,
      Quantity: quantity,
    });
    console.log("Added to the cart");
    setScreen("cart");
  }

  // change = +1 or -1. If quantity reaches 0, remove the item.
  function changeQuantity(foodId, change) {
    setCart(
      cart
        .map((item) =>
          item.id === foodId ? { ...item, quantity: item.quantity + change } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  // Turn the cart into an order, then empty the cart
  function placeOrder() {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const orderId = Math.floor(Math.random() * 9000) + 1000; // fake 4-digit order number
    setLastOrder({ orderId: orderId, items: cart, total: total });
    trackCharged(orderId, total, cart); // send the order to CleverTap
    setCart([]);
    setScreen("confirmation");
  }

  // ---- WHAT TO SHOW ----
  return (
    <div className="app">
      <Header
        screen={screen}
        cartCount={cartCount}
        onHome={() => setScreen("home")}
        onRestaurants={() => openRestaurants("")}
        onOffers={() => scrollToSection("offers")}
        onAbout={() => scrollToSection("about")}
        onSearch={() => openRestaurants()}
        onCart={() => setScreen("cart")}
        user={user}
        onLogin={() => setScreen("login")}
        onLogout={handleLogout}
      />

      <div className="page">
        {screen === "home" && (
          <HomeScreen
            restaurants={restaurants}
            onSearch={openRestaurants}
            onCategory={openRestaurants}
            onOpenRestaurant={openRestaurant}
            onOrderNow={() => openRestaurants("")}
          />
        )}

        {screen === "restaurants" && (
          <RestaurantListScreen
            restaurants={restaurants}
            onSelectFood={openFood}
            searchText={searchText}
            onSearchChange={setSearchText}
            focusId={focusId}
          />
        )}

        {screen === "food" && (
          <FoodDetailsScreen
            food={selectedFood}
            onAddToCart={addToCart}
            onBack={() => setScreen("restaurants")}
          />
        )}

        {screen === "cart" && (
          <CartScreen
            cart={cart}
            onChangeQuantity={changeQuantity}
            onPlaceOrder={placeOrder}
            onBrowse={() => openRestaurants("")}
          />
        )}

        {screen === "login" && (
          <LoginScreen onLogin={handleLogin} onGuest={() => setScreen("home")} />
        )}

        {screen === "confirmation" && (
          <OrderConfirmationScreen order={lastOrder} onHome={() => setScreen("home")} />
        )}
      </div>

      <Footer
        onHome={() => setScreen("home")}
        onRestaurants={() => openRestaurants("")}
        onOffers={() => scrollToSection("offers")}
        onAbout={() => scrollToSection("about")}
      />
    </div>
  );
}

export default App;