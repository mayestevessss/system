import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../sass/Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Invalid email or password");
      }

      // Store auth token and user data
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("user_id", data.user.id);
      localStorage.setItem("user_email", data.user.email);
      
      navigate("/home");
    } catch (error) {
      setError(error.message || "Login failed. Please try again.");
    }
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

      {/* ===== LOGIN BOX ===== */}
      <main className="login-container">
        <div className="login-box">
          <h2>LOGIN</h2>
          <p className="subtitle">Sign in to manage students and faculty</p>

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

            <button type="submit" className="login-btn">
              Sign in
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;