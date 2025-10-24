import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../sass/Archivestu.scss";

const Archivestu = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [filterMode, setFilterMode] = useState("none");
  const navigate = useNavigate();

  // 🔹 Fetch archived students from backend
  const fetchArchivedStudents = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/students/archived");
      if (!res.ok) throw new Error("Failed to fetch archived students");
      const data = await res.json();
      setStudents(data);
    } catch (error) {
      console.error("⚠️ Error fetching archived students:", error);
      alert("Cannot load archived students. Please check backend connection.");
    }
  };

  useEffect(() => {
    fetchArchivedStudents();
  }, []);

  // 🔙 Restore student
  const handleRestore = async (id) => {
    if (window.confirm("Restore this student?")) {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/students/${id}/restore`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) throw new Error("Failed to restore student");
        alert("✅ Student restored successfully!");
        fetchArchivedStudents();
      } catch (error) {
        console.error("⚠️ Restore error:", error);
        alert("Failed to restore student.");
      }
    }
  };

  // 🗑️ Permanently delete
  const handleDelete = async (id) => {
    if (window.confirm("⚠️ Permanently delete this student?")) {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/students/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to delete student");
        alert("🗑️ Student permanently deleted!");
        fetchArchivedStudents();
      } catch (error) {
        console.error("⚠️ Delete error:", error);
        alert("Failed to delete student.");
      }
    }
  };

  // 🔍 Search & sort
  const filteredStudents = students.filter(
    (s) =>
      s.fullname?.toLowerCase().includes(search.toLowerCase()) ||
      s.email?.toLowerCase().includes(search.toLowerCase())
  );

  const handleFilter = () => {
    if (filterMode === "none") {
      setStudents([...students].sort((a, b) => a.fullname.localeCompare(b.fullname)));
      setFilterMode("az");
    } else {
      fetchArchivedStudents();
      setFilterMode("none");
    }
  };

  return (
    <div className="archived-container">
      <header className="archived-header">
        <img src="/logo.png" alt="logo" className="header-logo" />
        <div className="header-text">
          <h1>Archived Students</h1>
          <h3><em>Student and Faculty Profile Management System</em></h3>
        </div>
      </header>

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
              filteredStudents.map((student, idx) => (
                <tr key={student.id}>
                  <td>{idx + 1}</td>
                  <td>{student.fullname}</td>
                  <td>{student.email}</td>
                  <td>{student.course}</td>
                  <td>{student.student_id}</td>
                  <td>{student.department}</td>
                  <td>{student.year_level}</td>
                  <td>{student.gender}</td>
                  <td>{student.contact_number}</td>
                  <td>{student.adviser}</td>
                  <td>
                    <button className="restore-btn" onClick={() => handleRestore(student.id)}>Restore</button>
                    <button className="delete-btn" onClick={() => handleDelete(student.id)}>Delete</button>
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
