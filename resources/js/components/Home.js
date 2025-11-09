import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../sass/Home.scss";

const Home = () => {
  const navigate = useNavigate();

  const [studentCount, setStudentCount] = useState(0);
  const [facultyCount, setFacultyCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);
  const [departmentCount, setDepartmentCount] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetch from dashboard API
        const res = await fetch("http://127.0.0.1:8000/api/dashboard");
        if (res.ok) {
          const data = await res.json();
          setStudentCount(data.summary?.students || 0);
          setFacultyCount(data.summary?.faculty || 0);
          setCourseCount(data.summary?.courses || 0);
          setDepartmentCount(data.summary?.departments || 0);
          setActiveUsers(data.summary?.students || 0); // Active students count
        }
      } catch (error) {
        console.error("Error fetching dashboard counts:", error);
      }
    };

    fetchCounts();

    // Refetch on focus to keep data fresh
    window.addEventListener("focus", fetchCounts);

    return () => {
      window.removeEventListener("focus", fetchCounts);
    };
  }, []);

  return (
    <div className="home-page">
      <aside className="sidebar">
        {/* ✅ Updated logo path */}
        <img
          src="/image/logo-removebg-preview.png"
          alt="Logo"
          className="sidebar-logo"
        />
        <ul>
          <li className="active" onClick={() => navigate("/home")}>Home</li>
          <li onClick={() => navigate("/dashboard")}>Dashboard</li>
          <li onClick={() => navigate("/profile-management")}>My Profile</li>
          <li onClick={() => navigate("/students")}>Students</li>
          <li onClick={() => navigate("/faculty")}>Faculty</li>
          <li onClick={() => navigate("/reports")}>Reports</li>
          <li onClick={() => navigate("/settings")}>Settings</li>
          <li className="logout" onClick={() => navigate("/")}>Logout</li>
        </ul>
      </aside>

      <main className="main-content">
        <header className="header">
          <div className="header-left">
            {/* ✅ Updated header logo path */}
            <img
              src="/image/logo-removebg-preview.png"
              alt="Logo"
              className="header-logo"
            />
            <div className="header-text">
              <h1>Homepage</h1>
              <h3>
                <em>Student and Faculty Profile Management System</em>
              </h3>
            </div>
          </div>
        </header>

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
              <p>Active Students</p>
            </div>
            <div className="info">More info</div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
