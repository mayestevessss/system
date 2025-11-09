import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../sass/AddFac.scss";

const AddFac = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    department: "",
    position: "",
    gender: "",
    contact_number: "",
  });
  const [loading, setLoading] = useState(false);

  // ✅ Handle input changes with contact number restriction
  const handleChange = (e) => {
    const { name, value } = e.target;

    // ✅ Allow only digits for contact number & limit to 11
    if (name === "contact_number") {
      if (!/^\d*$/.test(value)) return; // only numbers
      if (value.length > 11) return; // max 11 digits
    }

    setForm({ ...form, [name]: value });
  };

  // ✅ Save faculty
  const handleSave = async (e) => {
    e.preventDefault();

    // ✅ Required field check
    for (let key in form) {
      if (!form[key]) return alert(`Please fill out the ${key.replace("_", " ")} field.`);
    }

    // ✅ Validate contact number format
    if (!/^09\d{9}$/.test(form.contact_number)) {
      return alert("Contact number must start with 09 and be exactly 11 digits.");
    }

    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/faculties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to save");

      alert("✅ Faculty added successfully!");
      navigate("/faculty"); // ✅ redirect back to Faculty list
    } catch (error) {
      console.error(error);
      alert("❌ " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-faculty-page">
      <div className="add-container">
        <h2>Add New Faculty</h2>

        <form className="add-form" onSubmit={handleSave}>
          <label>
            Fullname:
            <input
              type="text"
              name="fullname"
              value={form.fullname}
              onChange={handleChange}
              placeholder="Enter full name"
              required
            />
          </label>

          <label>
            Email:
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </label>

          <label>
            Department:
            <select name="department" value={form.department} onChange={handleChange} required>
              <option value="">Select Department</option>
              <option value="Computer Science Department">Computer Science Department</option>
              <option value="Accountancy Department">Accountancy Department</option>
              <option value="Psychology Department">Psychology Department</option>
              <option value="Engineering Department">Engineering Department</option>
              <option value="Business Administration Department">Business Administration Department</option>
            </select>
          </label>

          <label>
            Position:
            <input
              type="text"
              name="position"
              value={form.position}
              onChange={handleChange}
              placeholder="Enter position"
              required
            />
          </label>

          <label>
            Gender:
            <select name="gender" value={form.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </label>

          <label>
            Contact Number:
            <input
              type="text"
              name="contact_number"
              value={form.contact_number}
              onChange={handleChange}
              placeholder="e.g. 09123456789"
              maxLength="11"
              required
            />
          </label>

          <div className="add-buttons">
            <button type="submit" className="save-btn" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/faculty")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFac;
