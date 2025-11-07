import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../sass/ListreportStudent.scss";

const ListreportStudent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Get initial state from location or localStorage
  const savedState = JSON.parse(localStorage.getItem("reportFilter") || "{}");
  const type = location.state?.type || savedState.type || "course";
  const value = location.state?.value || savedState.value || "All";

  const [students, setStudents] = useState([]);
  const [courseFilter, setCourseFilter] = useState(type === "course" ? value : "All");
  const [deptFilter, setDeptFilter] = useState(type === "department" ? value : "All");
  const [yearFilter, setYearFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [confirmPopup, setConfirmPopup] = useState(null);

  // ✅ Save the current filter in localStorage for page refresh persistence
  useEffect(() => {
    localStorage.setItem("reportFilter", JSON.stringify({ type, value }));
  }, [type, value]);

  // ✅ Fetch all students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/students");
        const data = await res.json();
        const withStatus = data.map((s) => ({
          ...s,
          status: s.status || "Active",
        }));

        setStudents(withStatus);
        localStorage.setItem("students", JSON.stringify(withStatus));
      } catch (err) {
        console.error("Error fetching students:", err);
      }
    };
    fetchStudents();
  }, []);

  const courses = ["All", ...new Set(students.map((s) => s.course))];
  const departments = ["All", ...new Set(students.map((s) => s.department))];

  // ✅ Filter logic (handles both course and department)
  const filteredStudents = students.filter((s) => {
    const courseMatch =
      courseFilter === "All" || s.course === courseFilter;
    const deptMatch =
      deptFilter === "All" || s.department === deptFilter;
    const yearMatch =
      yearFilter === "All" || s.year_level === yearFilter;
    const statusMatch =
      statusFilter === "All" || s.status === statusFilter;
    return courseMatch && deptMatch && yearMatch && statusMatch;
  });

  // ✅ Popup confirm logic
  const handleToggleStatus = (id) => {
    const student = students.find((s) => s.id === id);
    setConfirmPopup({
      id,
      name: student.fullname,
      newStatus: student.status === "Active" ? "Inactive" : "Active",
    });
  };

  const confirmStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/students/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      const data = await res.json();
      console.log("✅ Status updated:", data);

      const updated = students.map((s) =>
        s.id === id ? { ...s, status: newStatus } : s
      );
      setStudents(updated);
      localStorage.setItem("students", JSON.stringify(updated));

      if (newStatus === "Inactive") {
        navigate("/listInactive-students", { state: { from: "report" } });
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
          <h1>Student Report</h1>
          {type && value !== "All" && (
            <p>
              Showing report by{" "}
              <b>
                {type === "course"
                  ? `Course: ${value}`
                  : `Department: ${value}`}
              </b>
            </p>
          )}
          <button className="back-btn" onClick={() => navigate("/reports")}>
            Back
          </button>
        </div>

        {/* FILTERS */}
        <div className="filters">
          {type === "course" ? (
            <div>
              <b>Course:</b>
              <select
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
              >
                {courses.map((c, i) => (
                  <option key={i} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <b>Department:</b>
              <select
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
              >
                {departments.map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <b>Year Level:</b>
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
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
            onClick={() => navigate("/listInactive-students")}
          >
            View Inactive Students
          </button>
        </div>

        {/* TABLE */}
        <table className="report-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Student ID</th>
              <th>Full Name</th>
              <th>Course</th>
              <th>Department</th>
              <th>Year Level</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((s, index) => (
                <tr key={s.id}>
                  <td>{index + 1}</td>
                  <td>{s.student_id}</td>
                  <td>{s.fullname}</td>
                  <td>{s.course}</td>
                  <td>{s.department}</td>
                  <td>{s.year_level}</td>
                  <td>{s.status}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleToggleStatus(s.id)}
                    >
                      Set {s.status === "Active" ? "Inactive" : "Active"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* ✅ Confirmation Popup */}
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

export default ListreportStudent;
