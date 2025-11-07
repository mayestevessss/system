import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../sass/Report.scss";

const Report = () => {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedDept, setSelectedDept] = useState("");

  const handleGenerateCourseReport = () => {
    if (!selectedCourse) return alert("Please select a course first.");
    navigate("/listreport-student", {
      state: { type: "course", value: selectedCourse },
    });
  };

  const handleGenerateDeptReport = () => {
    if (!selectedDept) return alert("Please select a department first.");
    navigate("/listreport-student", {
      state: { type: "department", value: selectedDept },
    });
  };

  return (
    <div className="report-page">
      {/* Sidebar */}
      <aside className="sidebar">
        <img src="/logo.png" alt="Logo" className="sidebar-logo" />
        <ul>
          <li onClick={() => navigate("/home")}>Home</li>
          <li onClick={() => navigate("/dashboard")}>Dashboard</li>
          <li onClick={() => navigate("/profile")}>My Profile</li>
          <li onClick={() => navigate("/students")}>Students</li>
          <li onClick={() => navigate("/faculty")}>Faculty</li>
          <li className="active" onClick={() => navigate("/reports")}>Reports</li>
          <li onClick={() => navigate("/settings")}>Settings</li>
          <li className="logout" onClick={() => navigate("/")}>Logout</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="report-main">
        <header className="header">
          <div className="header-left">
            <img src="/logo.png" alt="logo" className="header-logo" />
            <div className="header-text">
              <h1>Reports</h1>
              <h3><em>Generate and Export Reports</em></h3>
            </div>
          </div>
        </header>

        <div className="report-container">
          <div className="report-box">
            <h2>Student Report</h2>
            <p>Generate report filtered by course</p>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option value="">Select Course</option>
              <option value="Information Technology">Information Technology</option>
              <option value="BA">BA</option>
              <option value="ED">ED</option>
              <option value="ED">ED</option>
              <option value="CS">CS</option>
            </select>
            <button onClick={handleGenerateCourseReport}>Generate Report</button>
          </div>

          <div className="report-box">
            <h2>Student Report</h2>
            <p>Generate report filtered by department</p>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
            >
              <option value="">Select Department</option>
              <option value="College of IT">College of IT</option>
              <option value="College of Education">College of Education</option>
              <option value="College of Business">College of Business</option>
            </select>
            <button onClick={handleGenerateDeptReport}>Generate Report</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Report;
