// OrderConfirmationScreen.jsx
// PURPOSE: The "thank you" page after an order is placed.

function OrderConfirmationScreen({ order, onHome }) {
  return (
    <div className="screen narrow center">
      <div className="big-emoji">✅</div>
      <h1>Order Confirmed!</h1>
      <p>Order #{order.orderId}</p>

      <div className="card">
        {order.items.map((item) => (
          <div className="food-row" key={item.id}>
            <span>{item.quantity} × {item.name}</span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}
        <h2>Total paid: ₹{order.total}</h2>
      </div>

      <button className="primary-btn" onClick={onHome}>Back to Home</button>
      <button className="link-btn" onClick={onHome}>View Restaurants</button>
    </div>
  );
}

export default OrderConfirmationScreen;
