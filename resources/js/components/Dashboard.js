import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaBuilding,
} from "react-icons/fa";
import "../../sass/Dashboard.scss";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    students: 0,
    faculty: 0,
    courses: 0,
    departments: 0,
  });

  const [studentPerCourse, setStudentPerCourse] = useState({});
  const [facultyPerDepartment, setFacultyPerDepartment] = useState({});

  useEffect(() => {
    const updateCounts = () => {
      const storedStudents = JSON.parse(localStorage.getItem("students")) || [];
      const storedFaculty = JSON.parse(localStorage.getItem("faculty")) || [];
      const storedCourses = JSON.parse(localStorage.getItem("courses")) || [];
      const storedDepartments = JSON.parse(localStorage.getItem("departments")) || [];

      const courseCount = {};
      storedStudents.forEach((s) => {
        const course = s.course || "Unassigned";
        courseCount[course] = (courseCount[course] || 0) + 1;
      });

      const deptCount = {};
      storedFaculty.forEach((f) => {
        const dept = f.department || "Unassigned";
        deptCount[dept] = (deptCount[dept] || 0) + 1;
      });

      setData({
        students: storedStudents.length,
        faculty: storedFaculty.length,
        courses: storedCourses.length,
        departments: storedDepartments.length,
      });

      setStudentPerCourse(courseCount);
      setFacultyPerDepartment(deptCount);
    };

    updateCounts();
    const interval = setInterval(updateCounts, 1000);
    return () => clearInterval(interval);
  }, []);

  const studentCourseChart = {
    labels: Object.keys(studentPerCourse),
    datasets: [
      {
        data: Object.values(studentPerCourse),
        backgroundColor: [
          "#007bff",
          "#ff6384",
          "#36a2eb",
          "#ffce56",
          "#4bc0c0",
          "#9966ff",
        ],
      },
    ],
  };

  const facultyDepartmentChart = {
    labels: Object.keys(facultyPerDepartment),
    datasets: [
      {
        data: Object.values(facultyPerDepartment),
        backgroundColor: [
          "#4bc0c0",
          "#ff9f40",
          "#9966ff",
          "#ffcd56",
          "#36a2eb",
          "#d95f5f",
        ],
      },
    ],
  };

  const pieOptions = {
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="dashboard-page">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <img src="/logo.png" alt="School Logo" className="sidebar-logo" />
        <ul>
          <li onClick={() => navigate("/home")}>Home</li>
          <li className="active" onClick={() => navigate("/dashboard")}>Dashboard</li>
          <li onClick={() => navigate("/profile-management")}>My Profile</li>
          <li onClick={() => navigate("/students")}>Students</li>
          <li onClick={() => navigate("/faculty")}>Faculty</li>
          <li onClick={() => navigate("/course")}>Courses</li>
          <li onClick={() => navigate("/departments")}>Departments</li>
          <li onClick={() => navigate("/reports")}>Reports</li>
          <li onClick={() => navigate("/settings")}>Settings</li>
          <li className="logout" onClick={() => navigate("/")}>Logout</li>
        </ul>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <header className="header">
          <div className="header-left">
            <img src="/logo.png" alt="logo" className="header-logo" />
            <div className="header-text">
              <h1>Dashboard</h1>
              <h3><em>Overview of Students and Faculty</em></h3>
            </div>
          </div>
        </header>

        <section className="cards">
          <div className="card blue">
            <FaUserGraduate className="card-icon" />
            <h2>{data.students}</h2>
            <p>Total Students</p>
            <div className="info" onClick={() => navigate("/students")}>More info</div>
          </div>

          <div className="card red">
            <FaChalkboardTeacher className="card-icon" />
            <h2>{data.faculty}</h2>
            <p>Faculty Members</p>
            <div className="info" onClick={() => navigate("/faculty")}>More info</div>
          </div>

          <div className="card green">
            <FaBook className="card-icon" />
            <h2>{data.courses}</h2>
            <p>Active Courses</p>
            <div className="info" onClick={() => navigate("/course")}>More info</div>
          </div>

          <div className="card purple">
            <FaBuilding className="card-icon" />
            <h2>{data.departments}</h2>
            <p>Departments</p>
            <div className="info" onClick={() => navigate("/departments")}>More info</div>
          </div>
        </section>

        <section className="chart-section">
          <div className="chart-box">
            <h3>Students per Course</h3>
            <div className="chart-container">
              <Pie data={studentCourseChart} options={pieOptions} />
            </div>
            <div className="chart-legend">
              {studentCourseChart.labels.map((label, i) => (
                <div key={i} className="legend-item">
                  <span
                    className="legend-color"
                    style={{ backgroundColor: studentCourseChart.datasets[0].backgroundColor[i] }}
                  ></span>
                  <span className="legend-text">
                    {label} — {studentCourseChart.datasets[0].data[i]} Students
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="chart-box">
            <h3>Faculty per Department</h3>
            <div className="chart-container">
              <Pie data={facultyDepartmentChart} options={pieOptions} />
            </div>
            <div className="chart-legend">
              {facultyDepartmentChart.labels.map((label, i) => (
                <div key={i} className="legend-item">
                  <span
                    className="legend-color"
                    style={{ backgroundColor: facultyDepartmentChart.datasets[0].backgroundColor[i] }}
                  ></span>
                  <span className="legend-text">
                    {label} — {facultyDepartmentChart.datasets[0].data[i]} Faculty
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
