import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../sass/ProfileManagement.scss";

const ProfileManagement = () => {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Detect navigation (for reloading)
  const [showConfirm, setShowConfirm] = useState(false);

  const [profile, setProfile] = useState({
    firstName: "John",
    middleName: "N/A",
    lastName: "Lydrick",
    email: "john@gmail.com",
    phone: "63+994947920",
    address: "123 St. Main, P-4 123",
    age: "21",
    gender: "Male",
    password: "12345",
  });

  // ✅ Load or refresh profile from localStorage every time page changes
  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("profileData"));
    if (savedProfile) {
      setProfile(savedProfile);
    } else {
      const email = localStorage.getItem("email") || "john@gmail.com";
      const password = localStorage.getItem("password") || "12345";
      setProfile((prev) => ({ ...prev, email, password }));
    }
  }, [location]); // 👈 triggers reload whenever you return from ViewEditProfile

  const handleEdit = () => setShowConfirm(true);

  const handleConfirm = (choice) => {
    if (choice === "yes") {
      navigate("/view-edit-profile");
    }
    setShowConfirm(false);
  };

  return (
    <div className="profile-page">
      {/* ✅ Sidebar */}
      <aside className="sidebar">
        <img src="/logo.png" alt="School Logo" className="sidebar-logo" />
        <ul>
          <li onClick={() => navigate("/home")}>Home</li>
          <li onClick={() => navigate("/dashboard")}>Dashboard</li>
            <li className="active" onClick={() => navigate("/profile-management")}>
            My Profile
          </li>
          <li onClick={() => navigate("/students")}>Students</li>
          <li onClick={() => navigate("/faculty")}>Faculty</li>
          <li onClick={() => navigate("/course")}>Course</li>
          <li onClick={() => navigate("/reports")}>Reports</li>
          <li onClick={() => navigate("/settings")}>Settings</li>
          <li className="logout" onClick={() => navigate("/")}>
            Logout
          </li>
        </ul>
      </aside>

      {/* ✅ Main Content */}
      <main className="main-content">
        <header className="header">
          <div className="header-left">
            <img src="/logo.png" alt="logo" className="header-logo" />
            <div className="header-text">
              <h1>Profile Management</h1>
              <h3>
                <em>Student and Faculty Profile Management System</em>
              </h3>
            </div>
          </div>
        </header>

        <section className="profile-section">
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-icon"></div>
              <div className="profile-info">
                <h2>{`${profile.firstName} ${profile.lastName}`}</h2>
                <p>{profile.gender}</p>
              </div>
              <button className="edit-btn" onClick={handleEdit}>
                Edit
              </button>
            </div>

            {/* ✅ Details Section */}
            <div className="profile-details">
              <div className="detail-row">
                <div className="detail-box">
                  <label>First Name</label>
                  <div className="value">{profile.firstName}</div>
                </div>
                <div className="detail-box">
                  <label>Middle Name</label>
                  <div className="value">{profile.middleName}</div>
                </div>
                <div className="detail-box">
                  <label>Last Name</label>
                  <div className="value">{profile.lastName}</div>
                </div>
              </div>

              <div className="detail-box">
                <label>Email</label>
                <div className="value">{profile.email}</div>
              </div>

              <div className="detail-box">
                <label>Phone</label>
                <div className="value">{profile.phone}</div>
              </div>

              <div className="detail-box">
                <label>Address</label>
                <div className="value">{profile.address}</div>
              </div>

              <div className="detail-box">
                <label>Age</label>
                <div className="value">{profile.age}</div>
              </div>

              <div className="detail-box">
                <label>Password</label>
                <div className="value">{"•".repeat(profile.password.length)}</div>
              </div>
            </div>
          </div>
        </section>

        {/* ✅ Confirmation Modal */}
        {showConfirm && (
          <div className="confirm-box">
            <p>Are you sure you want to edit your profile?</p>
            <div className="confirm-buttons">
              <button className="yes" onClick={() => handleConfirm("yes")}>
                Yes
              </button>
              <button className="no" onClick={() => handleConfirm("no")}>
                No
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProfileManagement;
