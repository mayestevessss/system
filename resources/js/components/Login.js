import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../sass/Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignIn, setIsSignIn] = useState(true);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const storedEmail = "admin123";
    const storedPassword = "admin1234";

    if (email === storedEmail && password === storedPassword) {
      navigate("/home");
    } else {
      setError("Invalid email or password");
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    alert("Sign Up Successful!");
    setIsSignIn(true);
  };

  return (
    <div className="login-page">
      {/* ===== HEADER ===== */}
      <header className="header">
        <div className="logo">
          <img src="/image/logo-removebg-preview.png" alt="FSUU Logo" />
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

      {/* ===== LOGIN / SIGNUP BOX ===== */}
      <main className="login-container">
        <div className="login-box">
          <h2>{isSignIn ? "LOGIN" : "SIGN UP"}</h2>
          <p className="subtitle">
            {isSignIn
              ? "Sign in to manage students and faculty"
              : "Register to use the system"}
          </p>

          <div className="switch-buttons">
            <button
              type="button"
              className={isSignIn ? "active" : ""}
              onClick={() => {
                setIsSignIn(true);
                setError("");
              }}
            >
              Sign in
            </button>
            <button
              type="button"
              className={!isSignIn ? "active" : ""}
              onClick={() => {
                setIsSignIn(false);
                setError("");
              }}
            >
              Sign up
            </button>
          </div>

          {/* === SIGN IN FORM === */}
          {isSignIn && (
            <form onSubmit={handleLogin}>
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

              {/* You don't have an account text ABOVE Sign In button */}
              <p className="switch-top-text">
                You don’t have an account?{" "}
                <span onClick={() => setIsSignIn(false)}>Sign Up</span>
              </p>

              <button type="submit" className="login-btn">
                Sign in
              </button>
            </form>
          )}

          {/* === SIGN UP FORM === */}
          {!isSignIn && (
            <form onSubmit={handleSignUp}>
              {/* Already have an account text ABOVE all fields */}
              <p className="switch-top-text">
                Already have an account?{" "}
                <span onClick={() => setIsSignIn(true)}>Sign In</span>
              </p>

              <div className="name-fields">
                <input type="text" placeholder="First Name" required />
                <input type="text" placeholder="Last Name" required />
              </div>

              <label>Birthday</label>
              <div className="birthday-fields">
                <input type="text" placeholder="Month" required />
                <input type="text" placeholder="Day" required />
                <input type="text" placeholder="Year" required />
              </div>

              <input
                type="text"
                placeholder="Mobile number or email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              {error && <p className="error">{error}</p>}

              <button type="submit" className="login-btn">
                Sign Up
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
};

export default Login;