import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../sass/AddFac.scss";

const AddFac = () => {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [gender, setGender] = useState("M");

  const handleSave = (e) => {
    e.preventDefault();

    if (!fullname || !email || !department || !position) {
      alert("⚠ Please fill out all fields.");
      return;
    }

    const newFaculty = {
      id: Date.now(),
      fullname,
      email,
      department,
      position,
      gender,
    };

    const existing = JSON.parse(localStorage.getItem("faculty")) || [];
    const updated = [...existing, newFaculty];
    localStorage.setItem("faculty", JSON.stringify(updated));

    alert(`✅ Faculty "${fullname}" has been added!`);
    navigate("/faculty");
  };

  return (
    <div className="add-faculty-page">
      <div className="add-container">
        <h2>Add New Faculty</h2>
        <form className="add-form" onSubmit={handleSave}>
          <label>
            Fullname:
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="Enter full name"
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </label>
          <label>
            Department:
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="Enter department"
            />
          </label>
          <label>
            Position:
            <input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder="Enter position"
            />
          </label>
          <label>
            Gender:
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </label>

          <div className="add-buttons">
            <button type="submit" className="save-btn">
              Save
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/faculty")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFac;
