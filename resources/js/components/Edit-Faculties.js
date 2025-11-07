import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../sass/Edit-Faculties.scss";

const EditFaculties = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    department: "",
    position: "",
    gender: "M",
    contact_number: "",
  });
  const [loading, setLoading] = useState(true);

  // ✅ Fetch single faculty data from backend
  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        // ✅ Get a single faculty (not all)
        const res = await fetch(`http://127.0.0.1:8000/api/faculties/${id}`);
        if (!res.ok) throw new Error("Failed to load faculty data");

        const data = await res.json();

        // ✅ Remove unwanted fields like department_id or timestamps
        const { department_id, created_at, updated_at, ...cleanData } = data;

        setFormData(cleanData);
      } catch (err) {
        console.error("⚠️ Error fetching faculty:", err);
        alert("Cannot load faculty data. Please check your backend.");
        navigate("/faculty");
      } finally {
        setLoading(false);
      }
    };

    fetchFaculty();
  }, [id, navigate]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Save updated faculty
  const handleSave = async (e) => {
    e.preventDefault();

    // ✅ Check for empty fields
    for (let key in formData) {
      if (!formData[key]) return alert(`Please fill in ${key.replace("_", " ")}.`);
    }

    // ✅ Validate contact number format
    if (!/^09\d{9}$/.test(formData.contact_number)) {
      return alert("Contact number must start with 09 and be exactly 11 digits.");
    }

    try {
      // ✅ Remove any leftover unwanted keys before sending
      const { department_id, created_at, updated_at, ...payload } = formData;

      const res = await fetch(`http://127.0.0.1:8000/api/faculties/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");

      alert("✅ Faculty updated successfully!");
      navigate("/faculty");
    } catch (err) {
      console.error("❌ Error updating faculty:", err);
      alert(err.message);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="edit-faculty-page">
      <div className="edit-card">
        <h2>Edit Faculty Profile</h2>

        <form className="edit-form" onSubmit={handleSave}>
          <label>
            Fullname:
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
            />
          </label>

          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>

          <label>
            Department:
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
            />
          </label>

          <label>
            Position:
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
            />
          </label>

          <label>
            Gender:
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </label>

          <label>
            Contact Number:
            <input
              type="text"
              name="contact_number"
              value={formData.contact_number}
              onChange={handleChange}
              maxLength="11"
              placeholder="e.g. 09123456789"
            />
          </label>

          <div className="form-buttons">
            <button type="submit" className="update-btn">
              Save Changes
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

export default EditFaculties;
