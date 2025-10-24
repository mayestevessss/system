import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../sass/AddStudents.scss";

const AddStudents = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    course: "",
    student_id: "",
    department: "",
    year_level: "",
    gender: "",
    contact_number: "",
    adviser: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "contact_number" && !/^\d*$/.test(value)) return; // only numbers
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullname || !formData.email || !formData.course || !formData.student_id) {
      alert("Please fill out all required fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to add student");
      }

      alert("🎉 Student added successfully!");
      // ✅ Auto refresh trigger when redirected to Students page
      navigate("/students", { state: { added: true } });
    } catch (error) {
      console.error("⚠️ Error adding student:", error);
      alert("Cannot connect to backend. Make sure Laravel server is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm("Cancel adding this student?")) navigate("/students");
  };

  return (
    <div className="add-student-page">
      <div className="add-container">
        <h2>Add New Student</h2>
        <form className="add-form" onSubmit={handleSubmit}>
          <label>
            Fullname
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="e.g. Cruz, Juan"
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. juan.cruz@gmail.com"
              required
            />
          </label>

          <label>
            Course
            <select name="course" value={formData.course} onChange={handleChange} required>
              <option value="">Select Course</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Accountancy">Accountancy</option>
              <option value="Engineering">Engineering</option>
              <option value="Business Administration">Business Administration</option>
            </select>
          </label>

          <label>
            Student ID
            <input
              type="text"
              name="student_id"
              value={formData.student_id}
              onChange={handleChange}
              placeholder="e.g. STU1001"
              required
            />
          </label>

          <label>
            Department
            <select name="department" value={formData.department} onChange={handleChange} required>
              <option value="">Select Department</option>
              <option value="Computer Science Department">Computer Science Department</option>
              <option value="Accountancy Department">Accountancy Department</option>
              <option value="Psychology Department">Psychology Department</option>
              <option value="Engineering Department">Engineering Department</option>
              <option value="Business Administration Department">Business Administration Department</option>
            </select>
          </label>

          <label>
            Year Level
            <select name="year_level" value={formData.year_level} onChange={handleChange} required>
              <option value="">Select Year</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
          </label>

          <label>
            Gender
            <select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </select>
          </label>

          <label>
            Contact Number
            <input
              type="text"
              name="contact_number"
              value={formData.contact_number}
              onChange={handleChange}
              placeholder="09XXXXXXXXX"
              maxLength="11"
              required
            />
          </label>

          <label>
            Adviser
            <input
              type="text"
              name="adviser"
              value={formData.adviser}
              onChange={handleChange}
              placeholder="e.g. Prof. Maria Santos"
              required
            />
          </label>

          <div className="add-buttons">
            <button type="submit" className="save-btn" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
            <button type="button" className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudents;
