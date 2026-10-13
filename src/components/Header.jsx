// Header.jsx
// PURPOSE: The sticky top navigation bar shown on every screen.
// Left: logo. Middle: Home / Restaurants / Offers / About. Right: Search + Login (or name + Logout) + Cart (with count).
// It only DISPLAYS things; every click calls a function that App.jsx gave us.

function Header({ screen, cartCount, onHome, onRestaurants, onOffers, onAbout, onSearch, onCart, user, onLogin, onLogout }) {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <h2 className="logo" onClick={onHome}>🍴 FoodieGo</h2>

        <nav className="nav-links">
          <button className={screen === "home" ? "nav-link active" : "nav-link"} onClick={onHome}>Home</button>
          <button className={screen === "restaurants" ? "nav-link active" : "nav-link"} onClick={onRestaurants}>Restaurants</button>
          <button className="nav-link" onClick={onOffers}>Offers</button>
          <button className="nav-link" onClick={onAbout}>About</button>
        </nav>

        <div className="nav-actions">
          <button className="nav-btn" onClick={onSearch}>🔍 Search</button>
          {user ? (
            <>
              <span className="user-chip">👤 {user.name}</span>
              <button className="nav-btn" onClick={onLogout}>Logout</button>
            </>
          ) : (
            <button className="nav-btn" onClick={onLogin}>Login</button>
          )}
          <button className="nav-btn cart-btn" onClick={onCart}>🛒 Cart ({cartCount})</button>
        </div>
      </div>
    </header>
  );
}

export default Header;