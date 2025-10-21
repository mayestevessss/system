import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../sass/Faculty.scss";

const Faculty = () => {
  const navigate = useNavigate();
  const [faculty, setFaculty] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMode, setFilterMode] = useState("none");

  // ✅ Fetch Faculty Data
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
  const handleArchive = (id) => {
    if (window.confirm("Archive this faculty member?")) {
      const selected = faculty.find((f) => f.id === id);
      const updatedList = faculty.filter((f) => f.id !== id);

      const archivedList = JSON.parse(localStorage.getItem("archivedFaculty")) || [];
      localStorage.setItem("archivedFaculty", JSON.stringify([...archivedList, selected]));
      setFaculty(updatedList);

      alert("📦 Faculty archived successfully!");
    }
  };

  // ✅ Search filter
  const handleSearch = (e) => setSearchTerm(e.target.value);

  const filtered = faculty.filter(
    (f) =>
      f.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.department?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Sort A→Z toggle
  const handleFilter = () => {
    if (filterMode === "none") {
      const sorted = [...faculty].sort((a, b) => a.fullname.localeCompare(b.fullname));
      setFaculty(sorted);
      setFilterMode("az");
    } else {
      fetchFaculty();
      setFilterMode("none");
    }
  };

  // ✅ Navigation
  const handleEdit = (id) => navigate(`/editfaculty/${id}`);
  const handleAddFaculty = () => navigate("/addfaculty");
  const handleViewArchive = () => navigate("/archivefaculty");

  return (
    <div className="faculty-page">
      {/* ===== Sidebar ===== */}
      <aside className="sidebar">
        <img src="/logo.png" alt="Logo" className="sidebar-logo" />
        <ul>
          <li onClick={() => navigate("/home")}>Home</li>
          <li onClick={() => navigate("/dashboard")}>Dashboard</li>
          <li onClick={() => navigate("/students")}>Students</li>
          <li className="active" onClick={() => navigate("/faculty")}>Faculty</li>
          <li onClick={() => navigate("/reports")}>Reports</li>
          <li onClick={() => navigate("/settings")}>Settings</li>
          <li onClick={() => navigate("/profile")}>My Profile</li>
          <li className="logout" onClick={() => navigate("/")}>Logout</li>
        </ul>
      </aside>

      {/* ===== Main Content ===== */}
      <main className="faculty-main">
        <header className="header">
          <div className="header-left">
            <img src="/logo.png" alt="logo" className="header-logo" />
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
            <button className="add-btn" onClick={handleAddFaculty}>+ Add Faculty</button>
            <button className="filter-btn" onClick={handleFilter}>
              {filterMode === "none" ? "Filter A→Z" : "Reset"}
            </button>
            <button className="archive-view-btn" onClick={handleViewArchive}>View Archive</button>
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
                  <td className="fullname-cell">{f.fullname}</td>
                  <td>{f.email}</td>
                  <td>{f.employee_id || "—"}</td>
                  <td>{f.department}</td>
                  <td>{f.position}</td>
                  <td>{f.gender}</td>
                  <td>{f.contact_number}</td>
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
