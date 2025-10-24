import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../sass/Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignIn, setIsSignIn] = useState(true); // toggle buttons
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Default credentials
    const storedEmail = "admin123";
    const storedPassword = "admin1234";

    if (email === storedEmail && password === storedPassword) {
      navigate("/home");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-page">
      {/* ===== HEADER ===== */}
      <header className="header">
        <div className="logo">
          <img src="/image/fsuu logo.png" alt="FSUU Logo" />
        </div>

        <div className="header-info">
          <h3>About Us</h3>
          <div className="contact">
            <p><strong>Contact Us</strong></p>
            <p>Tel No: +612456789</p>
            <p>Email: john@gmail.com</p>
          </div>
        </div>
      </header>

      {/* ===== LOGIN BOX ===== */}
      <main className="login-container">
        <div className="login-box">
          <h2>LOGIN</h2>
          <p className="subtitle">Sign in to manage students and faculty</p>

          {/* Sign in / Sign up Buttons */}
          <div className="switch-buttons">
            <button
              type="button"
              className={isSignIn ? "active" : ""}
              onClick={() => setIsSignIn(true)}
            >
              Sign in
            </button>
            <button
              type="button"
              className={!isSignIn ? "active" : ""}
              onClick={() => setIsSignIn(false)}
            >
              Sign up
            </button>
          </div>

          {/* Login Form */}
          {isSignIn && (
            <form onSubmit={handleSubmit}>
              <label>Email</label>
              <input
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {error && <p className="error">{error}</p>}

              <button type="submit" className="login-btn">
                Sign in
              </button>
            </form>
          )}

          {/* Placeholder for Sign Up */}
          {!isSignIn && (
            <div className="signup-placeholder">
              <p>Sign up feature coming soon...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Login;
