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
  const [statusFilter, setStatusFilter] = useState("Active");
  const [departments, setDepartments] = useState([]);
  const [confirmPopup, setConfirmPopup] = useState(null);

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
          // Filter out archived faculty and add status
          const withStatus = data
            .filter(f => !f.is_archived)
            .map(f => ({
              ...f,
              status: f.status || "Active",
            }));
          
          setFaculties(withStatus);
          localStorage.setItem("faculties", JSON.stringify(withStatus));
          
          // Extract unique departments
          const uniqueDepts = ["All", ...new Set(withStatus.map(f => f.department))];
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

  // Filter faculties by selected department and status
  const filteredFaculties = faculties.filter(f => {
    const deptMatch = deptFilter === "All" || f.department === deptFilter;
    const statusMatch = statusFilter === "All" || f.status === statusFilter;
    return deptMatch && statusMatch;
  });

  // Handle status toggle
  const handleToggleStatus = (id) => {
    const faculty = faculties.find((f) => f.id === id);
    setConfirmPopup({
      id,
      name: faculty.fullname,
      newStatus: faculty.status === "Active" ? "Inactive" : "Active",
    });
  };

  const confirmStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/faculties/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      const data = await res.json();
      console.log("✅ Status updated:", data);

      const updated = faculties.map((f) =>
        f.id === id ? { ...f, status: newStatus } : f
      );
      setFaculties(updated);
      localStorage.setItem("faculties", JSON.stringify(updated));

      if (newStatus === "Inactive") {
        navigate("/listInactive-faculty", { state: { from: "report" } });
      }

      setConfirmPopup(null);
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Something went wrong while updating status!");
    }
  };

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

          <div>
            <b>Status:</b>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
            </select>
          </div>

          <button
            className="inactive-btn-top"
            onClick={() => navigate("/listInactive-faculty")}
          >
            View Inactive Faculty
          </button>
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
              <th>Status</th>
              <th>Action</th>
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
                  <td>{faculty.status}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleToggleStatus(faculty.id)}
                    >
                      Set {faculty.status === "Active" ? "Inactive" : "Active"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" style={{ textAlign: "center" }}>
                  No faculty members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Confirmation Popup */}
        {confirmPopup && (
          <div className="confirm-popup">
            <div className="popup-box">
              <p>
                Change status of <b>{confirmPopup.name}</b> to{" "}
                <b>{confirmPopup.newStatus}</b>?
              </p>
              <div className="popup-buttons">
                <button
                  className="yes-btn"
                  onClick={() =>
                    confirmStatusChange(confirmPopup.id, confirmPopup.newStatus)
                  }
                >
                  Yes
                </button>
                <button
                  className="no-btn"
                  onClick={() => setConfirmPopup(null)}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListreportFaculty;