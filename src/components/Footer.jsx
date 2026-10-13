// Footer.jsx
// PURPOSE: The site footer shown on every screen. It also acts as the "About" section
// (the navbar's About button scrolls down to it, using id="about").

function Footer({ onHome, onRestaurants, onOffers, onAbout }) {
  return (
    <footer className="footer" id="about">
      <div className="container footer-inner">
        <div>
          <h2 className="logo">🍴 FoodieGo</h2>
          <p>Delicious food. Delivered with love.</p>
          <p className="footer-small">
            FoodieGo connects you with the best local restaurants, so your favourite meals
            arrive hot, fresh and fast.
          </p>
        </div>

        <nav className="footer-links">
          <button onClick={onHome}>Home</button>
          <button onClick={onRestaurants}>Restaurants</button>
          <button onClick={onOffers}>Offers</button>
          <button onClick={onAbout}>About</button>
          <a href="mailto:hello@foodiego.example">Contact</a>
        </nav>
      </div>
      <div className="container footer-bottom">© 2026 FoodieGo. A learning project.</div>
    </footer>
  );
}

export default Footer;
