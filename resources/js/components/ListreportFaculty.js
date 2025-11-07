import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../sass/ListreportStudent.scss"; // We can reuse the same styling

const ListreportFaculty = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        if (!location.state?.value) {
          throw new Error("No department selected");
        }

        const res = await fetch("http://127.0.0.1:8000/api/faculty");
        if (!res.ok) throw new Error("Failed to fetch faculty data");
        
        const data = await res.json();
        // Filter faculty by department
        const filtered = data.filter(
          f => f.department === location.state.value && !f.is_archived
        );
        
        setFaculties(filtered);
      } catch (err) {
        console.error("Error fetching faculty:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFaculties();
  }, [location.state]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="listreport-page">
      <header className="report-header">
        <img src="/logo.png" alt="logo" className="header-logo" />
        <div className="header-text">
          <h1>Faculty Report</h1>
          <h3>
            <em>Department: {location.state?.value || "N/A"}</em>
          </h3>
        </div>
      </header>

      <div className="controls">
        <button className="back-btn" onClick={() => navigate("/reports")}>
          ← Back to Reports
        </button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Position</th>
              <th>Gender</th>
              <th>Contact Number</th>
            </tr>
          </thead>
          <tbody>
            {faculties.length > 0 ? (
              faculties.map((faculty, idx) => (
                <tr key={faculty.id}>
                  <td>{idx + 1}</td>
                  <td>{faculty.fullname}</td>
                  <td>{faculty.email}</td>
                  <td>{faculty.department}</td>
                  <td>{faculty.position}</td>
                  <td>{faculty.gender === 'M' ? 'Male' : 'Female'}</td>
                  <td>{faculty.contact_number}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No faculty members found in this department.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListreportFaculty;