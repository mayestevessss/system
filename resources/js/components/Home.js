import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../sass/Home.scss";

const Home = () => {
  const navigate = useNavigate();

  const [studentCount, setStudentCount] = useState(0);
  const [facultyCount, setFacultyCount] = useState(20); // static example
  const [courseCount, setCourseCount] = useState(12);
  const [departmentCount, setDepartmentCount] = useState(6);
  const [activeUsers, setActiveUsers] = useState(10);

  useEffect(() => {
    // ✅ Load students count from localStorage
    const students = JSON.parse(localStorage.getItem("students")) || [];
    setStudentCount(students.length);
  }, []);

  return (
    <div className="home-page">
      {/* Sidebar */}
      <aside className="sidebar">
        <img src="/logo.png" alt="Logo" className="sidebar-logo" />
        <ul>
          <li className="active" onClick={() => navigate("/home")}>Home</li>
          <li onClick={() => navigate("/dashboard")}>Dashboard</li>
          {/* ✅ Changed name here */}
          <li onClick={() => navigate("/profile-management")}>My Profile</li>
          <li onClick={() => navigate("/students")}>Students</li>
          <li onClick={() => navigate("/faculty")}>Faculty</li>
          <li onClick={() => navigate("/course")}>Course</li>
          <li onClick={() => navigate("/settings")}>Settings</li>
          <li className="logout" onClick={() => navigate("/")}>Logout</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <div className="header-left">
            <img src="/logo.png" alt="logo" className="header-logo" />
            <div className="header-text">
              <h1>Homepage</h1>
              <h3>
                <em>Student and Faculty Profile Management System</em>
              </h3>
            </div>
          </div>
        </header>

        {/* Dashboard Cards */}
        <section className="cards">
          <div className="card blue">
            <div className="card-top">
              <h2>{studentCount}</h2>
              <p>Total Students</p>
            </div>
            <div className="info">More info</div>
          </div>

          <div className="card red">
            <div className="card-top">
              <h2>{facultyCount}</h2>
              <p>Faculty Members</p>
            </div>
            <div className="info">More info</div>
          </div>

          <div className="card green">
            <div className="card-top">
              <h2>{courseCount}</h2>
              <p>Total Courses</p>
            </div>
            <div className="info">More info</div>
          </div>

          <div className="card purple">
            <div className="card-top">
              <h2>{departmentCount}</h2>
              <p>Departments</p>
            </div>
            <div className="info">More info</div>
          </div>

          <div className="card yellow">
            <div className="card-top">
              <h2>{activeUsers}</h2>
              <p>Active Users</p>
            </div>
            <div className="info">More info</div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
