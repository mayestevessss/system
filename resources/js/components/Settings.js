import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../sass/Settings.scss";

const Settings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("departments");

  const handleAddClick = () => {
    if (activeTab === "departments") alert("Add Department clicked");
    else if (activeTab === "courses") alert("Add Course clicked");
    else alert("Add Academic Year clicked");
  };

  return (
    <div className="settings-page">
      {/* ===== Sidebar ===== */}
      <aside className="sidebar">
        <img src="/logo.png" alt="Logo" className="sidebar-logo" />
        <ul>
          <li onClick={() => navigate("/home")}>Home</li>
          <li onClick={() => navigate("/dashboard")}>Dashboard</li>
          <li onClick={() => navigate("/students")}>Students</li>
          <li onClick={() => navigate("/faculty")}>Faculty</li>
          <li onClick={() => navigate("/reports")}>Reports</li>
          <li className="active" onClick={() => navigate("/settings")}>
            Settings
          </li>
          <li onClick={() => navigate("/profile-management")}>Profile Management</li>
          <li className="logout" onClick={() => navigate("/")}>Logout</li>
        </ul>
      </aside>

      {/* ===== Main Content ===== */}
      <main className="settings-main">
        <header className="header">
          <div className="header-left">
            <img src="/logo.png" alt="logo" className="header-logo" />
            <div className="header-text">
              <h1>System Settings</h1>
              <h3><em>Manage Departments, Courses, and Academic Years</em></h3>
            </div>
          </div>
        </header>

        {/* ===== Tabs ===== */}
        <div className="tabs">
          <button
            className={activeTab === "departments" ? "active" : ""}
            onClick={() => setActiveTab("departments")}
          >
            Departments
          </button>
          <button
            className={activeTab === "courses" ? "active" : ""}
            onClick={() => setActiveTab("courses")}
          >
            Courses
          </button>
          <button
            className={activeTab === "academicyears" ? "active" : ""}
            onClick={() => setActiveTab("academicyears")}
          >
            Academic Years
          </button>
        </div>

        {/* ===== Content Box ===== */}
        <div className="content-box">
          <div className="content-header">
            <h2>
              {activeTab === "departments"
                ? "Departments"
                : activeTab === "courses"
                ? "Courses"
                : "Academic Years"}
            </h2>
            <button className="add-btn" onClick={handleAddClick}>
              + Add{" "}
              {activeTab === "departments"
                ? "Department"
                : activeTab === "courses"
                ? "Course"
                : "Academic Year"}
            </button>
          </div>

          <div className="content-body">
            <p>
              {activeTab === "departments"
                ? "List of departments will appear here."
                : activeTab === "courses"
                ? "List of courses will appear here."
                : "List of academic years will appear here."}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
