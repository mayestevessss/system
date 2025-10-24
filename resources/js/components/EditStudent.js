import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../sass/EditStudent.scss";

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    student_id: "",
    course: "",
    department: "",
    year_level: "",
    gender: "",
    contact_number: "",
    adviser: "",
  });

  const [loading, setLoading] = useState(true);

  // ✅ Fetch student info
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/students/${id}`);
        if (!res.ok) throw new Error("Failed to fetch student");
        const data = await res.json();
        setForm(data);
      } catch (error) {
        console.error("⚠️ Error loading student:", error);
        alert("Failed to load student info from backend.");
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Submit updated data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/students/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to update student");
      }

      alert("✅ Student updated successfully!");
      navigate("/students");
    } catch (error) {
      console.error("⚠️ Update error:", error);
      alert("⚠️ Failed to update student. Please try again.");
    }
  };

  if (loading)
    return <p className="loading-text">Loading student data...</p>;

  return (
    <div className="edit-student-page">
      <div className="edit-card">
        <h2>Edit Student Information</h2>

        <form onSubmit={handleSubmit} className="edit-form">
          <label>
            Full Name:
            <input
              type="text"
              name="fullname"
              value={form.fullname}
              onChange={handleChange}
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
              required
            />
          </label>

          <label>
            Student ID:
            <input
              type="text"
              name="student_id"
              value={form.student_id}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Course:
            <select
              name="course"
              value={form.course}
              onChange={handleChange}
              required
            >
              <option value="">Select Course</option>
              <option value="CS">Computer Science</option>
              <option value="IT">Information Technology</option>
              <option value="ACC">Accountancy</option>
              <option value="ENG">Engineering</option>
              <option value="BA">Business Administration</option>
            </select>
          </label>

          <label>
            Department:
            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Accountancy">Accountancy</option>
              <option value="Psychology">Psychology</option>
              <option value="Engineering">Engineering</option>
              <option value="Business Administration">Business Administration</option>
            </select>
          </label>

          <label>
            Year Level:
            <select
              name="year_level"
              value={form.year_level}
              onChange={handleChange}
              required
            >
              <option value="">Select Year</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
          </label>

          <label>
            Gender:
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </select>
          </label>

          <label>
            Contact Number:
            <input
              type="text"
              name="contact_number"
              value={form.contact_number}
              onChange={handleChange}
              maxLength="11"
              required
            />
          </label>

          <label>
            Adviser:
            <input
              type="text"
              name="adviser"
              value={form.adviser}
              onChange={handleChange}
              required
            />
          </label>

          <div className="form-buttons">
            <button type="submit" className="update-btn">💾 Update</button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/students")}
            >
              ❌ Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStudent;
