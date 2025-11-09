import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import "../../sass/Faculty.scss";

const Faculty = () => {
  const navigate = useNavigate();
  const [faculty, setFaculty] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMode, setFilterMode] = useState("none");

  // ✅ Fetch Faculty Data from Laravel backend
  const fetchFaculty = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/faculties");
      if (!res.ok) throw new Error("Failed to fetch faculty data");
      const data = await res.json();
      setFaculty(data);
    } catch (error) {
      console.error("⚠️ Error fetching faculty:", error);
      alert("Cannot connect to backend. Please ensure Laravel server is running.");
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  // ✅ Archive Faculty
  const handleArchive = async (id) => {
    if (!window.confirm("Archive this faculty member?")) return;
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/faculties/${id}/archive`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Failed to archive faculty");
      alert("📦 Faculty archived successfully!");
      fetchFaculty(); // refresh
    } catch (error) {
      console.error("Error archiving faculty:", error);
      alert("❌ Failed to archive faculty.");
    }
  };

  // ✅ Search Filter
  const handleSearch = (e) => setSearchTerm(e.target.value);

  const filtered = faculty.filter((f) => {
    const deptName = f.department?.name || f.department || "";
    return (
      f.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deptName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // ✅ Sort A–Z toggle
  const handleFilter = () => {
    if (filterMode === "none") {
      const sorted = [...faculty].sort((a, b) =>
        a.fullname.localeCompare(b.fullname)
      );
      setFaculty(sorted);
      setFilterMode("az");
    } else {
      fetchFaculty();
      setFilterMode("none");
    }
  };

  // ✅ Navigation Handlers
  const handleEdit = (id) => navigate(`/edit-faculty/${id}`);
  const handleAddFaculty = () => navigate("/addfac");
  const handleViewArchive = () => navigate("/archivefaculty");

  // ✅ Gender Display (M → Male / F → Female)
  const displayGender = (gender) => {
    if (gender === "M") return "Male";
    if (gender === "F") return "Female";
    return "N/A";
  };

  return (
    <div className="faculty-page">
      <Sidebar />

      {/* ===== Main Content ===== */}
      <main className="faculty-main">
        <header className="header">
          <div className="header-left">
            <img src="/image/logo-removebg-preview.png" alt="logo" className="header-logo" />
            <div className="header-text">
              <h1>Faculty</h1>
              <h3><em>Manage Faculty Information</em></h3>
            </div>
          </div>
        </header>

        {/* ===== Search and Filter Bar ===== */}
        <div className="search-section">
          <div className="search-input-container">
            <input
              type="text"
              placeholder="🔍 Search by name, ID, or email..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="search-buttons">
            <button className="add-btn" onClick={handleAddFaculty}>
              + Add Faculty
            </button>
            <button className="filter-btn" onClick={handleFilter}>
              {filterMode === "none" ? "Filter A→Z" : "Reset"}
            </button>
            <button className="archive-view-btn" onClick={handleViewArchive}>
              View Archive
            </button>
          </div>
        </div>

        {/* ===== Faculty Table ===== */}
        <table className="faculty-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Fullname</th>
              <th>Email</th>
              <th>Employee ID</th>
              <th>Department</th>
              <th>Position</th>
              <th>Gender</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((f, idx) => (
                <tr key={f.id}>
                  <td>{idx + 1}</td>
                  <td className="fullname-cell">{f.fullname || "—"}</td>
                  <td>{f.email || "—"}</td>
                  <td>{f.employee_id || `EMP-${1000 + f.id}`}</td>
                  <td>{f.department?.name || f.department || "Unassigned"}</td>
                  <td>{f.position || "Instructor"}</td>
                  <td>{displayGender(f.gender)}</td>
                  <td>{f.contact_number || "—"}</td>
                  <td className="actions">
                    <button className="edit-btn" onClick={() => handleEdit(f.id)}>Edit</button>
                    <button className="archive-btn" onClick={() => handleArchive(f.id)}>Archive</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" style={{ textAlign: "center", padding: "20px" }}>
                  No faculty found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Faculty;
