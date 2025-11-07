// resources/js/components/ArchiveFaculty.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../sass/ArchiveFaculty.scss";

const ArchiveFaculty = () => {
  const [faculty, setFaculty] = useState([]);
  const [search, setSearch] = useState("");
  const [filterMode, setFilterMode] = useState("none");
  const navigate = useNavigate();

  // ✅ Load archived faculty from API
  const fetchArchivedFaculty = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/faculties/archived");
      if (!res.ok) throw new Error("Failed to fetch archived faculty");
      const data = await res.json();
      setFaculty(data);
    } catch (error) {
      console.error("⚠️ Error fetching archived faculty:", error);
      alert("Cannot load archived faculty. Please check backend connection.");
    }
  };

  useEffect(() => {
    fetchArchivedFaculty();
  }, []);

  // 🔙 Restore faculty through API
  const handleRestore = async (id) => {
    if (window.confirm("Are you sure you want to restore this faculty member?")) {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/faculties/${id}/restore`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) throw new Error("Failed to restore faculty");
        
        alert("✅ Faculty restored successfully!");
        fetchArchivedFaculty(); // Refresh the list
      } catch (error) {
        console.error("⚠️ Restore error:", error);
        alert("Failed to restore faculty member.");
      }
    }
  };

  // 🗑️ Permanently delete through API
  const handleDelete = async (id) => {
    if (
      window.confirm(
        "⚠️ Are you sure you want to permanently delete this faculty member? This action cannot be undone."
      )
    ) {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/faculties/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to delete faculty");
        
        alert("🗑️ Faculty permanently deleted!");
        fetchArchivedFaculty(); // Refresh the list
      } catch (error) {
        console.error("⚠️ Delete error:", error);
        alert("Failed to delete faculty member.");
      }
    }
  };

  // 🔍 Search filter
  const filteredFaculty = faculty.filter((f) =>
    f.email.toLowerCase().includes(search.toLowerCase())
  );

  // 🔄 Filter button logic (A→Z / Reset)
  const handleFilter = () => {
    if (filterMode === "none") {
      const sorted = [...faculty].sort((a, b) => a.email.localeCompare(b.email));
      setFaculty(sorted);
      setFilterMode("az");
    } else {
      fetchArchivedFaculty();
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
