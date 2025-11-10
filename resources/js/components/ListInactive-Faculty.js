import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../sass/ListInactive-Students.scss";

const ListInactiveFaculty = () => {
  const navigate = useNavigate();
  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Inactive faculty from backend
  useEffect(() => {
    const fetchInactiveFaculty = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/listinactive-faculty");
        const data = await res.json();
        setFaculties(data);
      } catch (err) {
        console.error("Error fetching inactive faculty:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInactiveFaculty();
  }, []);

  // ✅ Change status from Inactive → Active
  const handleToggleStatus = async (id) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/listinactive-faculty/${id}/status`,
        { method: "PATCH" }
      );

      if (!res.ok) throw new Error("Failed to update status");

      // Remove from inactive list after activation
      setFaculties((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Something went wrong while updating status!");
    }
  };

  return (
    <div className="listinactive-page">
      <div className="sidebar"></div>

      <div className="main-content">
        {/* Header */}
        <div className="header">
          <h1>Inactive Faculty</h1>
          <button className="back-btn" onClick={() => navigate("/reports")}>
            Back
          </button>
        </div>

        {/* Top button beside the table */}
        <div className="table-header">
          <button
            className="status-switch"
            onClick={() => navigate("/listreport-faculty")}
          >
            View Active Faculty
          </button>
        </div>

        {/* Table */}
        <table className="report-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Position</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  Loading...
                </td>
              </tr>
            ) : faculties.length > 0 ? (
              faculties.map((f, index) => (
                <tr key={f.id}>
                  <td>{index + 1}</td>
                  <td>{f.fullname}</td>
                  <td>{f.email}</td>
                  <td>{f.department}</td>
                  <td>{f.position}</td>
                  <td>{f.status}</td>
                  <td>
                    <button
                      className="activate-btn"
                      onClick={() => handleToggleStatus(f.id)}
                    >
                      Set Active
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No inactive faculty found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListInactiveFaculty;

