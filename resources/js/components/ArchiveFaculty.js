// resources/js/components/ArchiveFaculty.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../sass/ArchiveFaculty.scss";

const ArchiveFaculty = () => {
  const [faculty, setFaculty] = useState([]);
  const [search, setSearch] = useState("");
  const [filterMode, setFilterMode] = useState("none");
  const navigate = useNavigate();

  // ✅ Load archived faculty from localStorage
  useEffect(() => {
    const archived = JSON.parse(localStorage.getItem("archivedFaculty")) || [];
    setFaculty(archived);
  }, []);

  // 🔙 Restore faculty back to main list
  const handleRestore = (id) => {
    if (window.confirm("Are you sure you want to restore this faculty member?")) {
      const archivedList = JSON.parse(localStorage.getItem("archivedFaculty")) || [];
      const facultyToRestore = archivedList.find((f) => f.id === id);
      const remaining = archivedList.filter((f) => f.id !== id);

      const currentFaculty = JSON.parse(localStorage.getItem("faculty")) || [];
      localStorage.setItem("faculty", JSON.stringify([...currentFaculty, facultyToRestore]));
      localStorage.setItem("archivedFaculty", JSON.stringify(remaining));

      setFaculty(remaining);
      alert("✅ Faculty restored successfully!");
    }
  };

  // 🗑️ Permanently delete
  const handleDelete = (id) => {
    if (
      window.confirm(
        "⚠️ Are you sure you want to permanently delete this faculty member? This action cannot be undone."
      )
    ) {
      const remaining = faculty.filter((f) => f.id !== id);
      localStorage.setItem("archivedFaculty", JSON.stringify(remaining));
      setFaculty(remaining);
      alert("🗑️ Faculty permanently deleted!");
    }
  };

  // 🔍 Search filter
  const filteredFaculty = faculty.filter((f) =>
    f.email.toLowerCase().includes(search.toLowerCase())
  );

  // 🔄 Filter button logic (A→Z / Random / Reset)
  const handleFilter = () => {
    if (filterMode === "none") {
      const sorted = [...faculty].sort((a, b) => a.email.localeCompare(b.email));
      setFaculty(sorted);
      setFilterMode("az");
    } else if (filterMode === "az") {
      const shuffled = [...faculty].sort(() => Math.random() - 0.5);
      setFaculty(shuffled);
      setFilterMode("random");
    } else {
      const saved = JSON.parse(localStorage.getItem("archivedFaculty")) || [];
      setFaculty(saved);
      setFilterMode("none");
    }
  };

  return (
    <div className="archived-container">
      {/* Header Section */}
      <header className="archived-header">
        <img src="/logo.png" alt="logo" className="header-logo" />
        <div className="header-text">
          <h1>Archived Faculty</h1>
          <h3>
            <em>Student and Faculty Profile Management System</em>
          </h3>
        </div>
      </header>

      {/* Top Controls */}
      <div className="top-controls">
        <button className="back-btn" onClick={() => navigate("/faculty")}>
          ← Back
        </button>

        <div className="search-area">
          <input
            type="text"
            placeholder="Search by email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="filter-btn" onClick={handleFilter}>
            {filterMode === "none"
              ? "Filter A→Z"
              : filterMode === "az"
              ? "Random"
              : "Reset"}
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="table-container">
        <table className="archived-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Fullname</th>
              <th>Email</th>
              <th>Department</th>
              <th>Position</th>
              <th>Gender</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredFaculty.length > 0 ? (
              filteredFaculty.map((f, index) => (
                <tr key={f.id}>
                  <td>{index + 1}</td>
                  <td>{f.fullname}</td>
                  <td>{f.email}</td>
                  <td>{f.department}</td>
                  <td>{f.position}</td>
                  <td>{f.gender}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="restore-btn"
                        onClick={() => handleRestore(f.id)}
                      >
                        Restore
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(f.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-data">
                  No archived faculty found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ArchiveFaculty;
