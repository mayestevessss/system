import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../sass/ListreportStudent.scss"; // Reuse the same styling

const ListreportFaculty = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get initial department from navigation state
  const initialDept = location.state?.value || "All";
  
  const [faculties, setFaculties] = useState([]);
  const [deptFilter, setDeptFilter] = useState(initialDept);
  const [departments, setDepartments] = useState([]);

  // Fetch all faculties
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchFaculties = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/faculties", {
          signal: controller.signal,
        });
        
        if (!res.ok) throw new Error("Failed to fetch faculty data");
        
        const data = await res.json();
        
        if (isMounted) {
          // Filter out archived faculty
          const activeFaculties = data.filter(f => !f.is_archived);
          setFaculties(activeFaculties);
          
          // Extract unique departments
          const uniqueDepts = ["All", ...new Set(activeFaculties.map(f => f.department))];
          setDepartments(uniqueDepts);
        }
      } catch (err) {
        if (err.name !== 'AbortError' && isMounted) {
          console.error("Error fetching faculty:", err);
          alert("Failed to load faculty data");
        }
      }
    };

    fetchFaculties();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  // Filter faculties by selected department
  const filteredFaculties = faculties.filter(f => 
    deptFilter === "All" || f.department === deptFilter
  );

  return (
    <div className="listreport-page">
      <div className="sidebar"></div>

      <div className="main-content">
        {/* HEADER */}
        <div className="header">
          <h1>Faculty Report</h1>
          {initialDept !== "All" && (
            <p>
              Showing report by <b>Department: {initialDept}</b>
            </p>
          )}
          <button className="back-btn" onClick={() => navigate("/reports")}>
            Back
          </button>
        </div>

        {/* FILTERS */}
        <div className="filters">
          <div>
            <b>Department:</b>
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
            >
              {departments.map((dept, i) => (
                <option key={i} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* TABLE */}
        <table className="report-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Position</th>
              <th>Gender</th>
              <th>Contact Number</th>
            </tr>
          </thead>
          <tbody>
            {filteredFaculties.length > 0 ? (
              filteredFaculties.map((faculty, idx) => (
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
                  No faculty members found.
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