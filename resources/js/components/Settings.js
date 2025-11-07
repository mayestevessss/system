import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../sass/Settings.scss";

const Settings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("departments");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Sample data (you can replace this with data from your backend)
  const departments = [
    {
      name: "Computer Science Department",
      code: "CSD",
      description: "Focuses on computer systems, software, and AI research.",
    },
    {
      name: "Mathematics Department",
      code: "MATH",
      description: "Covers pure and applied mathematics studies.",
    },
  ];

  const courses = [
    {
      name: "BS Computer Science",
      code: "BSCS",
      department: "Computer Science Department",
      description: "Covers programming, algorithms, and systems design.",
    },
    {
      name: "BS Mathematics",
      code: "BSMATH",
      department: "Mathematics Department",
      description: "Focuses on analytical and statistical computation.",
    },
  ];

  const academicYears = [
    {
      yearName: "9 Year Monthsary / 2025",
      startDate: "2025-02-01",
      endDate: "2025-12-31",
    },
    {
      yearName: "8 Year Monthsary / 2024",
      startDate: "2024-02-01",
      endDate: "2024-12-31",
    },
  ];

  const handleAddClick = () => {
    if (activeTab === "departments") navigate("/all-departments");
    else if (activeTab === "courses") navigate("/all-courses");
    else if (activeTab === "academicyears") navigate("/add-academic-year");
  };

  return (
    <div className="settings-wrapper">
      {/* === MAIN SIDEBAR === */}
      <aside className="main-sidebar">
        <img src="/logo.png" alt="Logo" className="logo" />
        <ul>
          <li onClick={() => navigate("/home")}>Home</li>
          <li onClick={() => navigate("/dashboard")}>Dashboard</li>
          <li onClick={() => navigate("/profile-management")}>My Profile</li>
          <li onClick={() => navigate("/students")}>Students</li>
          <li onClick={() => navigate("/faculty")}>Faculty</li>
          <li onClick={() => navigate("/reports")}>Reports</li>
          <li className="active" onClick={() => navigate("/settings")}>
            Settings
          </li>
          <li className="logout" onClick={() => navigate("/")}>
            Logout
          </li>
        </ul>
      </aside>

      {/* === SETTINGS MAIN === */}
      <main className="settings-main">
        <header className="settings-header">
          <div className="header-left">
            <img src="/logo.png" alt="Logo" className="header-logo" />
            <div className="header-text">
              <h1>System Settings</h1>
              <h3>
                <em>Manage Departments, Courses, and Academic Years</em>
              </h3>
            </div>
          </div>
        </header>

        <div className="settings-body">
          {/* === COLLAPSIBLE INNER SIDEBAR === */}
          <aside
            className={`inner-sidebar ${isSidebarOpen ? "open" : "collapsed"}`}
          >
            <button
              className="toggle-btn"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? "⮜" : "⮞"}
            </button>

            {isSidebarOpen && (
              <ul>
                <li
                  className={activeTab === "departments" ? "active" : ""}
                  onClick={() => setActiveTab("departments")}
                >
                  Departments
                </li>
                <li
                  className={activeTab === "courses" ? "active" : ""}
                  onClick={() => setActiveTab("courses")}
                >
                  Courses
                </li>
                <li
                  className={activeTab === "academicyears" ? "active" : ""}
                  onClick={() => setActiveTab("academicyears")}
                >
                  Academic Years
                </li>
              </ul>
            )}
          </aside>

          {/* === CONTENT AREA === */}
          <section className="inner-content">
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
              {/* === DEPARTMENTS TABLE === */}
              {activeTab === "departments" && (
                <table className="departments-table">
                  <thead>
                    <tr>
                      <th>Department Name</th>
                      <th>Department Code</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departments.length > 0 ? (
                      departments.map((dept, index) => (
                        <tr key={index}>
                          <td>{dept.name}</td>
                          <td>{dept.code}</td>
                          <td>{dept.description}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" style={{ textAlign: "center" }}>
                          No departments found yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}

              {/* === COURSES TABLE === */}
              {activeTab === "courses" && (
                <table className="courses-table">
                  <thead>
                    <tr>
                      <th>Course Name</th>
                      <th>Course Code</th>
                      <th>Department</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.length > 0 ? (
                      courses.map((course, index) => (
                        <tr key={index}>
                          <td>{course.name}</td>
                          <td>{course.code}</td>
                          <td>{course.department}</td>
                          <td>{course.description}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" style={{ textAlign: "center" }}>
                          No courses found yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}

              {/* === ACADEMIC YEARS TABLE === */}
              {activeTab === "academicyears" && (
                <table className="academic-years-table">
                  <thead>
                    <tr>
                      <th>Year Name</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {academicYears.length > 0 ? (
                      academicYears.map((year, index) => (
                        <tr key={index}>
                          <td>{year.yearName}</td>
                          <td>{year.startDate}</td>
                          <td>{year.endDate}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" style={{ textAlign: "center" }}>
                          No academic years found yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Settings;
