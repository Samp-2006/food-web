// LoginScreen.jsx
// PURPOSE: A simple login page. The visitor types their name, email and (optionally) phone.
// When the form is valid it calls onLogin(details); App.jsx then tells CleverTap who the user is.
//
// NOTE: This is a DEMO login. There is no password and no server, so it does not check
// anything — it just remembers who you say you are. A real login needs a backend.

import { useState } from "react";

function LoginScreen({ onLogin, onGuest }) {
  // One piece of state per input box, plus one for an error message
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault(); // stop the browser from reloading the page

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    // Very simple checks
    if (cleanName === "") {
      setError("Please enter your name.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(cleanEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    onLogin({ name: cleanName, email: cleanEmail, phone: phone.replace(/\s/g, "") });
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">🍴</div>
        <h1>Welcome to FoodieGo</h1>
        <p className="muted">Log in to save your details and order faster.</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            Full name
            <input type="text" placeholder="Your name" value={name} onChange={(event) => setName(event.target.value)} />
          </label>

          <label>
            Email
            <input type="email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>

          <label>
            Phone (optional)
            <input type="tel" placeholder="+919876543210" value={phone} onChange={(event) => setPhone(event.target.value)} />
          </label>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="primary-btn login-submit">Log in</button>
        </form>

        <button className="link-btn" onClick={onGuest}>Continue as guest</button>
      </div>
    </div>
  );
}

export default LoginScreen;