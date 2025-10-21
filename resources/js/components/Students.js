import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../sass/Students.scss";

const Students = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMode, setFilterMode] = useState("none");

  // ✅ Fetch real students from Laravel API
  const fetchStudents = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/students");
      if (!res.ok) throw new Error("Failed to fetch students");
      const data = await res.json();
      setStudents(data);
    } catch (error) {
      console.error("⚠️ Error fetching students:", error);
      alert("Cannot connect to backend. Please make sure Laravel server is running (php artisan serve).");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ✅ Archive Student
  const handleArchive = (id) => {
    if (window.confirm("Are you sure you want to archive this student?")) {
      const selected = students.find((s) => s.id === id);
      const updatedList = students.filter((s) => s.id !== id);

      const archivedList = JSON.parse(localStorage.getItem("archivedStudents")) || [];
      localStorage.setItem("archivedStudents", JSON.stringify([...archivedList, selected]));
      setStudents(updatedList);

      alert("📦 Student archived successfully!");
    }
  };

  // ✅ Search filter
  const handleSearch = (e) => setSearchTerm(e.target.value);

  const filtered = students.filter(
    (s) =>
      s.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.student_id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Sort A→Z toggle
  const handleFilter = () => {
    if (filterMode === "none") {
      const sorted = [...students].sort((a, b) => a.fullname.localeCompare(b.fullname));
      setStudents(sorted);
      setFilterMode("az");
    } else {
      fetchStudents(); // reset to original order
      setFilterMode("none");
    }
  };

  // ✅ Navigation handlers
  const handleEdit = (id) => navigate(`/editstudent/${id}`);
  const handleAddStudent = () => navigate("/addstudents");
  const handleViewArchive = () => navigate("/archivestu");

  return (
    <div className="students-page">
      <aside className="sidebar">
        <img src="/logo.png" alt="Logo" className="sidebar-logo" />
        <ul>
          <li onClick={() => navigate("/home")}>Home</li>
          <li onClick={() => navigate("/dashboard")}>Dashboard</li>
          <li onClick={() => navigate("/profile-management")}>Profile Management</li>
          <li onClick={() => navigate("/students")} className="active">
            Student
          </li>
          <li onClick={() => navigate("/faculty")}>Faculty Management</li>
           <li onClick={() => navigate("/reports")}>Report</li>
          <li onClick={() => navigate("/archivestu")}>Archived Students</li>
          <li onClick={() => navigate("/settings")}>Settings</li>
          <li className="logout" onClick={() => navigate("/")}>Logout</li>
        </ul>
      </aside>

      <main className="students-main">
        <header className="header">
          <div className="header-left">
            <img src="/logo.png" alt="logo" className="header-logo" />
            <div className="header-text">
              <h1>Students</h1>
              <h3><em>Manage Student Information</em></h3>
            </div>
          </div>
          <div className="header-right">
            <button className="add-btn" onClick={handleAddStudent}>
              + Add Student
            </button>
          </div>
        </header>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name, ID, or email..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <button className="filter-btn" onClick={handleFilter}>
            {filterMode === "none" ? "Filter A→Z" : "Reset"}
          </button>
          <button className="archive-view-btn" onClick={handleViewArchive}>
            📦 View Archive
          </button>
        </div>

        <table className="students-table">
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
            {filtered.length > 0 ? (
              filtered.map((student, idx) => (
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
                  <td className="actions">
                    <button className="edit-btn" onClick={() => handleEdit(student.id)}>✏️ Edit</button>
                    <button className="archive-btn" onClick={() => handleArchive(student.id)}>🗃️ Archive</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" style={{ textAlign: "center", padding: 20 }}>No students found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Students;
