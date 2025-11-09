import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import "../../sass/Report.scss";

const Report = () => {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);

  // Fetch courses and departments from backend
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [coursesRes, deptsRes] = await Promise.all([
          fetch("http://127.0.0.1:8000/api/courses"),
          fetch("http://127.0.0.1:8000/api/departments"),
        ]);

        if (coursesRes.ok) {
          const coursesData = await coursesRes.json();
          // Extract unique course names from students
          const uniqueCourses = [...new Set(coursesData.map(c => c.name || c.title))];
          setCourses(uniqueCourses);
        }

        if (deptsRes.ok) {
          const deptsData = await deptsRes.json();
          setDepartments(deptsData);
        }
      } catch (error) {
        console.error("Error fetching dropdown options:", error);
      }
    };

    fetchOptions();
  }, []);

  const handleGenerateCourseReport = () => {
    if (!selectedCourse) return alert("Please select a course first.");
    navigate("/listreport-student", {
      state: { type: "course", value: selectedCourse },
    });
  };

  const handleGenerateDeptReport = () => {
    if (!selectedDept) return alert("Please select a department first.");
    navigate("/listreport-faculty", {
      state: { type: "department", value: selectedDept },
    });
  };

  return (
    <div className="report-page">
      <Sidebar />

      {/* Main Content */}
      <main className="report-main">
        <header className="header">
          <div className="header-left">
            <img src="/image/logo-removebg-preview.png" alt="logo" className="header-logo" />
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
              {courses.map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
            </select>
            <button onClick={handleGenerateCourseReport}>Generate Report</button>
          </div>

          <div className="report-box">
            <h2>Faculty Report</h2>
            <p>Generate report filtered by department</p>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>
            <button onClick={handleGenerateDeptReport}>Generate Report</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Report;
