// CartScreen.jsx
// PURPOSE: Lists items in the cart, lets the user change quantities,
// shows the total and has the "Place Order" button.

function CartScreen({ cart, onChangeQuantity, onPlaceOrder, onBrowse }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Empty cart: show a friendly message instead
  if (cart.length === 0) {
    return (
      <div className="screen narrow center">
        <div className="big-emoji">🛒</div>
        <h1>Your cart is empty</h1>
        <p>Add something tasty from a restaurant.</p>
        <button className="primary-btn" onClick={onBrowse}>Browse Restaurants</button>
      </div>
    );
  }

  return (
    <div className="screen narrow">
      <h1>Your Cart</h1>

      {cart.map((item) => (
        <div className="card cart-item" key={item.id}>
          <div>
            <strong>{item.emoji} {item.name}</strong>
            <p className="muted">₹{item.price} each</p>
          </div>
          <div className="quantity-box">
            <button onClick={() => onChangeQuantity(item.id, -1)}>−</button>
            <span>{item.quantity}</span>
            <button onClick={() => onChangeQuantity(item.id, 1)}>+</button>
          </div>
        </div>
      ))}

      <h2>Total: ₹{total}</h2>
      <button className="primary-btn" onClick={onPlaceOrder}>Place Order</button>
    </div>
  );
}

export default CartScreen;
