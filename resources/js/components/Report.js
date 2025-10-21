import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../sass/Report.scss";

const Report = () => {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedDept, setSelectedDept] = useState("");

  const handleGenerateCourseReport = () => {
    if (!selectedCourse) return alert("Please select a course first.");
    alert(`Generating report for course: ${selectedCourse}`);
  };

  const handleGenerateDeptReport = () => {
    if (!selectedDept) return alert("Please select a department first.");
    alert(`Generating report for department: ${selectedDept}`);
  };

  return (
    <div className="report-page">
      {/* ===== Sidebar ===== */}
      <aside className="sidebar">
        <img src="/logo.png" alt="Logo" className="sidebar-logo" />
        <ul>
          <li onClick={() => navigate("/home")}>Home</li>
          <li onClick={() => navigate("/dashboard")}>Dashboard</li>
          <li onClick={() => navigate("/students")}>Students</li>
          <li onClick={() => navigate("/faculty")}>Faculty</li>
          <li className="active" onClick={() => navigate("/reports")}>
            Reports
          </li>
          <li onClick={() => navigate("/settings")}>Settings</li>
          <li onClick={() => navigate("/profile")}>My Profile</li>
          <li className="logout" onClick={() => navigate("/")}>Logout</li>
        </ul>
      </aside>

      {/* ===== Main Content ===== */}
      <main className="report-main">
        <header className="header">
          <div className="header-left">
            <img src="/logo.png" alt="logo" className="header-logo" />
            <div className="header-text">
              <h1>Reports</h1>
              <h3>
                <em>Generate and Export Reports</em>
              </h3>
            </div>
          </div>
        </header>

        <div className="report-container">
          {/* ===== Left Box: Course ===== */}
          <div className="report-box">
            <h2>Student Report</h2>
            <p>Generate report filtered by course</p>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option value="">Select Course</option>
              <option value="BSIT">BSIT</option>
              <option value="BSBA">BSBA</option>
              <option value="BSED">BSED</option>
              <option value="BEED">BEED</option>
            </select>
            <button onClick={handleGenerateCourseReport}>Generate Report</button>
          </div>

          {/* ===== Right Box: Department ===== */}
          <div className="report-box">
            <h2>Student Report</h2>
            <p>Generate report filtered by department</p>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
            >
              <option value="">Select Department</option>
              <option value="Computer Studies">Computer Studies</option>
              <option value="Education">Education</option>
              <option value="Business">Business</option>
            </select>
            <button onClick={handleGenerateDeptReport}>Generate Report</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Report;
