import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../sass/AllCourse.scss";

const AllCourse = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    courseName: "",
    courseCode: "",
    department_id: "",
    description: "",
  });

  const [departments, setDepartments] = useState([]);

  // Fetch departments for dropdown
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/all-departments");
        if (res.ok) {
          const data = await res.json();
          setDepartments(data);
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch("http://127.0.0.1:8000/api/all-courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.courseName,
          code: formData.courseCode,
          department_id: formData.department_id,
          description: formData.description,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to add course");
      }

      alert("✅ Course Added Successfully!");
      navigate("/settings");
    } catch (error) {
      console.error("Error adding course:", error);
      alert("❌ Failed to add course: " + error.message);
    }
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
          <select
            name="department_id"
            value={formData.department_id}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>

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
