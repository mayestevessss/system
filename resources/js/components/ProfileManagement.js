import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import "../../sass/ProfileManagement.scss";

const ProfileManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    age: "",
    gender: "",
  });

  // Fetch profile from backend
  useEffect(() => {
    let isMounted = true; // Track if component is mounted
    const controller = new AbortController(); // For cancelling fetch requests

    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem("user_id") || 1; // Default to user 1 if not logged in
        const res = await fetch(`http://127.0.0.1:8000/api/profile/${userId}`, {
          signal: controller.signal
        });
        
        if (res.ok && isMounted) {
          const data = await res.json();
          setProfile({
            first_name: data.first_name || "",
            middle_name: data.middle_name || "",
            last_name: data.last_name || "",
            email: data.email || "",
            phone: data.phone || "",
            address: data.address || "",
            age: data.age || "",
            gender: data.gender || "",
          });
        }
      } catch (error) {
        if (error.name !== 'AbortError' && isMounted) {
          console.error("Error fetching profile:", error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProfile();

    // Cleanup function
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [location]);

  const handleEdit = () => setShowConfirm(true);

  const handleConfirm = (choice) => {
    if (choice === "yes") {
      navigate("/view-edit-profile");
    }
    setShowConfirm(false);
  };

  return (
    <div className="profile-page">
      <Sidebar />

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
                <h2>{`${profile.first_name} ${profile.last_name}`}</h2>
                <p>{profile.gender}</p>
              </div>
              <button className="edit-btn" onClick={handleEdit}>
                Edit
              </button>
            </div>

            {/* ✅ Details Section */}
            <div className="profile-details">
              {loading ? (
                <div style={{ textAlign: "center", padding: "20px" }}>Loading...</div>
              ) : (
                <>
                  <div className="detail-row">
                    <div className="detail-box">
                      <label>First Name</label>
                      <div className="value">{profile.first_name || "N/A"}</div>
                    </div>
                    <div className="detail-box">
                      <label>Middle Name</label>
                      <div className="value">{profile.middle_name || "N/A"}</div>
                    </div>
                    <div className="detail-box">
                      <label>Last Name</label>
                      <div className="value">{profile.last_name || "N/A"}</div>
                    </div>
                  </div>

                  <div className="detail-box">
                    <label>Email</label>
                    <div className="value">{profile.email || "N/A"}</div>
                  </div>

                  <div className="detail-box">
                    <label>Phone</label>
                    <div className="value">{profile.phone || "N/A"}</div>
                  </div>

                  <div className="detail-box">
                    <label>Address</label>
                    <div className="value">{profile.address || "N/A"}</div>
                  </div>

                  <div className="detail-box">
                    <label>Age</label>
                    <div className="value">{profile.age || "N/A"}</div>
                  </div>

                  <div className="detail-box">
                    <label>Password</label>
                    <div className="value">••••••••</div>
                  </div>
                </>
              )}
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
