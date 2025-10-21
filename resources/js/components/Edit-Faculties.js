// resources/js/components/Edit-Faculties.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../sass/Edit-Faculties.scss";

const EditFaculties = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [faculty, setFaculty] = useState(null);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    department: "",
    position: "",
    gender: "",
  });

  // ✅ Load faculty data from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("faculty")) || [];
    const found = stored.find((f) => f.id === Number(id));
    if (found) {
      setFaculty(found);
      setFormData(found);
    }
  }, [id]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Save updates
  const handleSave = () => {
    const allFaculty = JSON.parse(localStorage.getItem("faculty")) || [];
    const updatedList = allFaculty.map((f) =>
      f.id === Number(id) ? { ...f, ...formData } : f
    );
    localStorage.setItem("faculty", JSON.stringify(updatedList));
    alert("✅ Faculty profile updated successfully!");
    navigate("/faculty");
  };

  if (!faculty) {
    return <div style={{ padding: "40px" }}>❌ Faculty not found.</div>;
  }

  return (
    <div className="edit-faculty-page">
      <div className="edit-container">
        <h2>Edit Faculty Profile</h2>
        <form className="edit-form" onSubmit={(e) => e.preventDefault()}>
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

          <div className="edit-buttons">
            <button type="button" className="save-btn" onClick={handleSave}>
              Save
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
