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
    department: "",
    year_level: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        // Try fetching from API
        const res = await fetch(`http://127.0.0.1:8000/api/students/${id}`);
        if (!res.ok) throw new Error("No API response");
        const data = await res.json();

        setForm({
          fullname: data.fullname,
          email: data.email,
          student_id: data.student_id,
          department: data.department,
          year_level: data.year_level,
        });
      } catch (error) {
        console.warn("⚠️ API failed, loading from localStorage instead");
        // Fallback: get data from localStorage
        const stored = JSON.parse(localStorage.getItem("students")) || [];
        const student = stored.find((s) => String(s.id) === String(id));
        if (student) setForm(student);
        else alert("⚠️ Student not found in localStorage.");
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Try updating through API
      const res = await fetch(`http://127.0.0.1:8000/api/students/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      let updated;
      if (res.ok) {
        updated = await res.json();
      } else {
        // Fallback if no backend
        updated = { id, ...form };
      }

      // Update in localStorage
      const stored = JSON.parse(localStorage.getItem("students")) || [];
      const updatedList = stored.map((s) =>
        String(s.id) === String(id) ? updated : s
      );
      localStorage.setItem("students", JSON.stringify(updatedList));

      alert("✅ Student updated successfully!");
      navigate("/students", { state: { updatedStudent: updated } });
    } catch (error) {
      console.error(error);
      alert("⚠️ Failed to update student.");
    }
  };

  if (loading)
    return (
      <div className="edit-student-page">
        <p className="loading-text">Loading student data...</p>
      </div>
    );

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
            Department:
            <input
              type="text"
              name="department"
              value={form.department}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Year Level:
            <input
              type="text"
              name="year_level"
              value={form.year_level}
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
