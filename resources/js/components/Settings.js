import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import "../../sass/Settings.scss";

const Settings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("departments");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Dynamic data from backend
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [deptsRes, coursesRes, yearsRes] = await Promise.all([
          fetch("http://127.0.0.1:8000/api/all-departments"),
          fetch("http://127.0.0.1:8000/api/all-courses"),
          fetch("http://127.0.0.1:8000/api/all-academic-years"),
        ]);

        if (deptsRes.ok) {
          const deptsData = await deptsRes.json();
          setDepartments(deptsData);
        }

        if (coursesRes.ok) {
          const coursesData = await coursesRes.json();
          setCourses(coursesData);
        }

        if (yearsRes.ok) {
          const yearsData = await yearsRes.json();
          setAcademicYears(yearsData);
        }
      } catch (error) {
        console.error("Error fetching settings data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddClick = () => {
    if (activeTab === "departments") navigate("/all-departments");
    else if (activeTab === "courses") navigate("/all-courses");
    else if (activeTab === "academicyears") navigate("/add-academic-year");
  };

  return (
    <div className="settings-wrapper">
      <Sidebar />

      {/* === SETTINGS MAIN === */}
      <main className="settings-main">
        <header className="settings-header">
          <div className="header-left">
            <img src="/image/logo-removebg-preview.png" alt="Logo" className="header-logo" />
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
                    {loading ? (
                      <tr>
                        <td colSpan="3" style={{ textAlign: "center" }}>Loading...</td>
                      </tr>
                    ) : departments.length > 0 ? (
                      departments.map((dept, index) => (
                        <tr key={dept.id || index}>
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
                    {loading ? (
                      <tr>
                        <td colSpan="4" style={{ textAlign: "center" }}>Loading...</td>
                      </tr>
                    ) : courses.length > 0 ? (
                      courses.map((course, index) => (
                        <tr key={course.id || index}>
                          <td>{course.name}</td>
                          <td>{course.code}</td>
                          <td>{course.department?.name || course.department || "N/A"}</td>
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
                    {loading ? (
                      <tr>
                        <td colSpan="3" style={{ textAlign: "center" }}>Loading...</td>
                      </tr>
                    ) : academicYears.length > 0 ? (
                      academicYears.map((year, index) => (
                        <tr key={year.id || index}>
                          <td>{year.year_name}</td>
                          <td>{year.start_date}</td>
                          <td>{year.end_date}</td>
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
