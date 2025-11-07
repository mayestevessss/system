import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../sass/ListInactive-Students.scss";

const ListInactiveStudents = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Inactive students from backend
  useEffect(() => {
    const fetchInactiveStudents = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/listinactive");
        const data = await res.json();
        setStudents(data);
      } catch (err) {
        console.error("Error fetching inactive students:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInactiveStudents();
  }, []);

  // ✅ Change status from Inactive → Active
  const handleToggleStatus = async (id) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/listinactive/${id}/status`,
        { method: "PATCH" }
      );

      if (!res.ok) throw new Error("Failed to update status");

      // Remove from inactive list after activation
      setStudents((prev) => prev.filter((s) => s.id !== id));
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
          <h1>Inactive Students</h1>
          <button className="back-btn" onClick={() => navigate("/reports")}>
            Back
          </button>
        </div>

        {/* Top button beside the table */}
        <div className="table-header">
          <button
            className="status-switch"
            onClick={() => navigate("/listreport-student")}
          >
            View Active Students
          </button>
        </div>

        {/* Table */}
        <table className="report-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Student ID</th>
              <th>Full Name</th>
              <th>Course</th>
              <th>Year Level</th>
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
            ) : students.length > 0 ? (
              students.map((s, index) => (
                <tr key={s.id}>
                  <td>{index + 1}</td>
                  <td>{s.student_id}</td>
                  <td>{s.fullname}</td>
                  <td>{s.course}</td>
                  <td>{s.year_level}</td>
                  <td>{s.status}</td>
                  <td>
                    <button
                      className="activate-btn"
                      onClick={() => handleToggleStatus(s.id)}
                    >
                      Set Active
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No inactive students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListInactiveStudents;
