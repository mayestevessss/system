import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../sass/Sidebar.scss";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine which page is active based on current path
  const isActive = (path) => {
    // Handle exact matches
    if (location.pathname === path) return true;
    
    // Handle nested routes (e.g., /students, /addstudents, /editstudent/:id all belong to Students)
    if (path === "/students" && location.pathname.includes("student")) return true;
    if (path === "/faculty" && location.pathname.includes("facult")) return true;
    if (path === "/reports" && location.pathname.includes("report")) return true;
    if (path === "/settings" && location.pathname.includes("settings")) return true;
    if (path === "/settings" && location.pathname.includes("departments")) return true;
    if (path === "/settings" && location.pathname.includes("courses")) return true;
    if (path === "/settings" && location.pathname.includes("academic")) return true;
    
    return false;
  };

  return (
    <aside className="app-sidebar">
      <img
        src="/image/logo-removebg-preview.png"
        alt="School Logo"
        className="sidebar-logo"
      />
      <nav>
        <ul>
          <li
            className={isActive("/home") ? "active" : ""}
            onClick={() => navigate("/home")}
          >
            Home
          </li>
          <li
            className={isActive("/dashboard") ? "active" : ""}
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </li>
          <li
            className={isActive("/profile-management") ? "active" : ""}
            onClick={() => navigate("/profile-management")}
          >
            My Profile
          </li>
          <li
            className={isActive("/students") ? "active" : ""}
            onClick={() => navigate("/students")}
          >
            Students
          </li>
          <li
            className={isActive("/faculty") ? "active" : ""}
            onClick={() => navigate("/faculty")}
          >
            Faculty
          </li>
          <li
            className={isActive("/reports") ? "active" : ""}
            onClick={() => navigate("/reports")}
          >
            Reports
          </li>
          <li
            className={isActive("/settings") ? "active" : ""}
            onClick={() => navigate("/settings")}
          >
            Settings
          </li>
          <li className="logout" onClick={() => navigate("/")}>
            Logout
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

