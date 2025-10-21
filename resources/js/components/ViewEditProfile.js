import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../sass/ViewEditProfile.scss";

const ViewEditProfile = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    age: "",
    gender: "",
    password: "",
  });

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("profileData"));
    if (savedProfile) {
      setForm(savedProfile);
    } else {
      const email = localStorage.getItem("email") || "john@gmail.com";
      const password = localStorage.getItem("password") || "12345";
      const defaultProfile = {
        firstName: "John",
        middleName: "N/A",
        lastName: "Lydrick",
        email,
        phone: "63+994947920",
        address: "123 St. Main, P-4 123",
        age: "21",
        gender: "Male",
        password,
      };
      setForm(defaultProfile);
      localStorage.setItem("profileData", JSON.stringify(defaultProfile));
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Save updated profile
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.password.trim()) {
      alert("⚠️ Password cannot be empty!");
      return;
    }

    // Save full profile
    localStorage.setItem("profileData", JSON.stringify(form));

    // Update login credentials
    localStorage.setItem("email", form.email);
    localStorage.setItem("password", form.password);

    alert("✅ Profile updated successfully!");
    navigate("/profile-management");
  };

  return (
    <div className="edit-profile-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <h2>View/Edit Profile</h2>

      <form onSubmit={handleSubmit}>
        {/* Name group */}
        <div className="name-group">
          <div>
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Middle Name:</label>
            <input
              type="text"
              name="middleName"
              value={form.middleName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Other fields */}
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />

        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
        />

        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={form.age}
          onChange={handleChange}
        />

        {/* Password field with toggle */}
        <label>Password:</label>
        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            className="toggle-pass"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈 Hide" : "👁️ Show"}
          </button>
        </div>

        <button type="submit" className="save-btn">
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default ViewEditProfile;
