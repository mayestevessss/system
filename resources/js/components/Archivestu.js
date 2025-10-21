import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../sass/Archivestu.scss";

const Archivestu = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [filterMode, setFilterMode] = useState("none");
  const navigate = useNavigate();

  // ✅ Load archived students from localStorage
  useEffect(() => {
    const archived = JSON.parse(localStorage.getItem("archivedStudents")) || [];
    setStudents(archived);
  }, []);

  // 🔙 Restore student
  const handleRestore = (id) => {
    if (window.confirm("Are you sure you want to restore this student?")) {
      const archivedList = JSON.parse(localStorage.getItem("archivedStudents")) || [];
      const studentToRestore = archivedList.find((s) => s.id === id);
      const remaining = archivedList.filter((s) => s.id !== id);

      const currentStudents = JSON.parse(localStorage.getItem("students")) || [];
      localStorage.setItem("students", JSON.stringify([...currentStudents, studentToRestore]));
      localStorage.setItem("archivedStudents", JSON.stringify(remaining));

      setStudents(remaining);
      alert("✅ Student restored successfully!");
    }
  };

  // 🗑️ Permanently delete
  const handleDelete = (id) => {
    if (
      window.confirm(
        "⚠️ Are you sure you want to permanently delete this student? This action cannot be undone."
      )
    ) {
      const remaining = students.filter((student) => student.id !== id);
      localStorage.setItem("archivedStudents", JSON.stringify(remaining));
      setStudents(remaining);
      alert("🗑️ Student permanently deleted!");
    }
  };

  // 🔍 Search filter
  const filteredStudents = students.filter((student) =>
    student.fullname?.toLowerCase().includes(search.toLowerCase()) ||
    student.email?.toLowerCase().includes(search.toLowerCase())
  );

  // 🔄 Filter button
  const handleFilter = () => {
    if (filterMode === "none") {
      const sorted = [...students].sort((a, b) => a.fullname.localeCompare(b.fullname));
      setStudents(sorted);
      setFilterMode("az");
    } else {
      const saved = JSON.parse(localStorage.getItem("archivedStudents")) || [];
      setStudents(saved);
      setFilterMode("none");
    }
  };

  return (
    <div className="archived-container">
      {/* HEADER */}
      <header className="archived-header">
        <img src="/logo.png" alt="logo" className="header-logo" />
        <div className="header-text">
          <h1>Archived Students</h1>
          <h3><em>Student and Faculty Profile Management System</em></h3>
        </div>
      </header>

      {/* CONTROLS */}
      <div className="top-controls">
        <button className="back-btn" onClick={() => navigate("/students")}>← Back</button>

        <div className="search-area">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="filter-btn" onClick={handleFilter}>
            {filterMode === "none" ? "Sort A→Z" : "Reset"}
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-container">
        <table className="archived-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Fullname</th>
              <th>Email</th>
              <th>Course</th>
              <th>Student ID</th>
              <th>Department</th>
              <th>Year Level</th>
              <th>Gender</th>
              <th>Contact Number</th>
              <th>Adviser</th>
              <th>Controls</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student, index) => (
                <tr key={student.id}>
                  <td>{index + 1}</td>
                  <td>{student.fullname}</td>
                  <td>{student.email}</td>
                  <td>{student.course}</td>
                  <td>{student.student_id || "—"}</td>
                  <td>{student.department || "—"}</td>
                  <td>{student.year_level || "—"}</td>
                  <td>{student.gender || "—"}</td>
                  <td>{student.contact_number || "—"}</td>
                  <td>{student.adviser || "—"}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="restore-btn" onClick={() => handleRestore(student.id)}>
                        Restore
                      </button>
                      <button className="delete-btn" onClick={() => handleDelete(student.id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="no-data">No archived students found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Archivestu;
