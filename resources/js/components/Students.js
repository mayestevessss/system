import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../sass/Students.scss";

const Students = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMode, setFilterMode] = useState("none");

  // ✅ Fetch all active (non-archived) students
  const fetchStudents = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/students");
      if (!res.ok) throw new Error("Failed to fetch students");
      const data = await res.json();
      setStudents(data.filter((s) => !s.is_archived));
    } catch (error) {
      console.error("⚠️ Error fetching students:", error);
      alert("Cannot connect to backend. Please make sure Laravel server is running (php artisan serve).");
    }
  };

  // ✅ Fetch once on mount, and refetch if redirected after adding student
  useEffect(() => {
    fetchStudents();
  }, []);

  // ✅ Detect redirect after AddStudent
  useEffect(() => {
    if (location.state?.added) {
      fetchStudents(); // re-fetch list
      // ✅ clear state para hindi infinite loop
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate, location.pathname]);

  // ✅ Archive student
  const handleArchive = async (id) => {
    if (window.confirm("Are you sure you want to archive this student?")) {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/students/${id}/archive`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error("Failed to archive student");
        setStudents((prev) => prev.filter((s) => s.id !== id));
        alert("📦 Student archived successfully!");
      } catch (error) {
        console.error("⚠️ Error archiving student:", error);
        alert("Failed to archive student. Please try again.");
      }
    }
  };

  // ✅ Search
  const handleSearch = (e) => setSearchTerm(e.target.value);

  const filtered = students.filter(
    (s) =>
      s.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.student_id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Sort A–Z toggle
  const handleFilter = () => {
    if (filterMode === "none") {
      const sorted = [...students].sort((a, b) => a.fullname.localeCompare(b.fullname));
      setStudents(sorted);
      setFilterMode("az");
    } else {
      fetchStudents();
      setFilterMode("none");
    }
  };

  // ✅ Navigation handlers
  const handleEdit = (id) => navigate(`/editstudent/${id}`);
  const handleAddStudent = () => navigate("/addstudents");
  const handleViewArchive = () => navigate("/archivestu");

  return (
    <div className="students-page">
      {/* ✅ Sidebar */}
      <aside className="sidebar">
        <img src="/logo.png" alt="Logo" className="sidebar-logo" />
        <ul>
          <li onClick={() => navigate("/home")}>Home</li>
          <li onClick={() => navigate("/dashboard")}>Dashboard</li>
          <li onClick={() => navigate("/profile-management")}>My Profile</li>
          <li className="active" onClick={() => navigate("/students")}>
            Students
          </li>
          <li onClick={() => navigate("/faculty")}>Faculty</li>
          <li onClick={() => navigate("/reports")}>Reports</li>
          <li onClick={() => navigate("/settings")}>Settings</li>
          <li className="logout" onClick={() => navigate("/")}>Logout</li>
        </ul>
      </aside>

      {/* ✅ Main Content */}
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

        {/* ✅ Search & Filter */}
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

        {/* ✅ Table */}
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
                  <td>{student.course || "N/A"}</td>
                  <td>{student.student_id}</td>
                  <td>{student.department || "N/A"}</td>
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
                <td colSpan="11" style={{ textAlign: "center", padding: 20 }}>
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Students;
