import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../sass/Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Get stored credentials
    const storedEmail = localStorage.getItem("email") || "admin123";
    const storedPassword = localStorage.getItem("password") || "12345";

    if (email === storedEmail && password === storedPassword) {
      navigate("/home"); // redirect to home
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-page">
      <header className="header">
        <div className="logo">
          <img src="/logo.png" alt="School Logo" />
        </div>
        <div className="header-info">
          <h3>About Us</h3>
          <div className="contact">
            <p>
              <strong>Contact Us</strong>
            </p>
            <p>Tel No: +612456789</p>
            <p>Email: john@gmail.com</p>
          </div>
        </div>
      </header>

      <main className="login-container">
        <div className="login-box">
          <h2>LOGIN</h2>
          <p className="subtitle">Enter your credentials to continue</p>

          <form onSubmit={handleSubmit}>
            <label>Email Address:</label>
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <a href="#" className="forgot">
              Forget password?
            </a>

            {error && <p style={{ color: "yellow", fontSize: "13px" }}>{error}</p>}

            <button type="submit" className="login-btn">
              Log in
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
