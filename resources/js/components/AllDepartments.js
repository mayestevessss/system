// src/pages/settings/AllDepartments.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../sass/AllDepartments.scss";
import axios from "axios";

const AllDepartments = () => {
  const navigate = useNavigate();
  const [department, setDepartment] = useState({
    name: "",
    code: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!department.name || !department.code || !department.description) {
      alert("⚠️ Please fill in all required fields.");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/api/all-departments", department);
      alert("✅ Department added successfully!");

      // ✅ Mark that we just added a department (for refresh trigger)
      localStorage.setItem("deptAdded", "true");

      // ⏳ Small delay para makita muna ang success message
      setTimeout(() => {
        navigate("/settings");
      }, 800);
    } catch (error) {
      console.error(error);
      alert("❌ Failed to add department.");
    }
  };

  return (
    <div className="add-department-page">
      <h1>Add Department</h1>
      <div className="add-department-container">
        <div className="add-header">Add Department</div>

        <form className="add-department-form" onSubmit={handleSubmit}>
          <label>
            Department Name:
            <input
              type="text"
              name="name"
              value={department.name}
              onChange={handleChange}
              placeholder="Enter department name"
              required
            />
          </label>

          <label>
            Department Code:
            <input
              type="text"
              name="code"
              value={department.code}
              onChange={handleChange}
              placeholder="Enter department code"
              required
            />
          </label>

          <label>
            Description:
            <textarea
              name="description"
              value={department.description}
              onChange={handleChange}
              placeholder="Enter description"
              rows="4"
              required
            ></textarea>
          </label>

          <div className="form-buttons">
            <button type="submit" className="add-btn">
              Add Department
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/settings")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AllDepartments;
