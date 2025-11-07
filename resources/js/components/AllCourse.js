import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../sass/AllCourse.scss";

const AllCourse = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    courseName: "",
    courseCode: "",
    department: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Course added:", formData);
    // You can later replace this with an API call to save the course
    navigate("/settings"); // redirect back to settings
  };

  return (
    <div className="add-course-page">
      <div className="breadcrumb">
        home / <span>add course</span>
      </div>

      <h2 className="page-title">Add Course</h2>

      <div className="course-form-container">
        <div className="form-header">Add Course</div>

        <form className="course-form" onSubmit={handleSubmit}>
          <label>Course Name:</label>
          <input
            type="text"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            required
          />

          <label>Course Code:</label>
          <input
            type="text"
            name="courseCode"
            value={formData.courseCode}
            onChange={handleChange}
            required
          />

          <label>Department:</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          />

          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
          />

          <div className="form-buttons">
            <button type="submit" className="add-btn">
              Add Course
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

export default AllCourse;
