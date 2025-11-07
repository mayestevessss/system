import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../sass/AllAcademic-Years.scss";

const AllAcademicYears = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    yearName: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Academic Year Added:", formData);
    alert("Academic Year Added Successfully!");
    navigate("/settings");
  };

  return (
    <div className="academic-year-container">
      <div className="academic-year-header">
        <h2>Add Academic Year</h2>
        <span className="breadcrumb">home / Add Academic Year</span>
      </div>

      <div className="academic-year-form-card">
        <div className="form-header">
          <h3>Add Academic Year</h3>
        </div>

        <form onSubmit={handleSubmit} className="academic-year-form">
          {/* === Year Name Field === */}
          <div className="form-group">
            <label>Year Name:</label>
            <input
              type="text"
              name="yearName"
              placeholder="Name / Year"  // ✅ Added placeholder here
              value={formData.yearName}
              onChange={handleChange}
              required
            />
          </div>

          {/* === Start Date Field === */}
          <div className="form-group">
            <label>Start Date:</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>

          {/* === End Date Field === */}
          <div className="form-group">
            <label>End Date:</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </div>

          {/* === Buttons === */}
          <div className="form-buttons">
            <button type="submit" className="add-btn">
              Add
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

export default AllAcademicYears;
