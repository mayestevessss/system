import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../sass/ViewEditProfile.scss";

const ViewEditProfile = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    age: "",
    gender: "",
    password: "",
  });

  // Fetch profile from backend
  useEffect(() => {
    let isMounted = true; // Track if component is mounted
    const controller = new AbortController(); // For cancelling fetch requests

    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem("user_id") || 1;
        const res = await fetch(`http://127.0.0.1:8000/api/profile/${userId}`, {
          signal: controller.signal
        });
        
        if (res.ok && isMounted) {
          const data = await res.json();
          setForm({
            first_name: data.first_name || "",
            middle_name: data.middle_name || "",
            last_name: data.last_name || "",
            email: data.email || "",
            phone: data.phone || "",
            address: data.address || "",
            age: data.age || "",
            gender: data.gender || "",
            password: "", // Don't prefill password for security
          });
        }
      } catch (error) {
        if (error.name !== 'AbortError' && isMounted) {
          console.error("Error fetching profile:", error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProfile();

    // Cleanup function
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Save updated profile to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userId = localStorage.getItem("user_id") || 1;
      const payload = {
        first_name: form.first_name,
        middle_name: form.middle_name,
        last_name: form.last_name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        age: form.age,
        gender: form.gender,
      };

      // Only include password if it was changed
      if (form.password && form.password.trim()) {
        payload.password = form.password;
      }

      const res = await fetch(`http://127.0.0.1:8000/api/profile/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update profile");
      }

      alert("✅ Profile updated successfully!");
      navigate("/profile-management");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("❌ Failed to update profile: " + error.message);
    }
  };

  if (loading) return <div style={{textAlign: "center", padding: "50px"}}>Loading...</div>;

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
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Middle Name:</label>
            <input
              type="text"
              name="middle_name"
              value={form.middle_name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Last Name:</label>
            <input
              type="text"
              name="last_name"
              value={form.last_name}
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
