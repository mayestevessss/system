// resources/js/components/Routers.js
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import Home from "./Home";
import Dashboard from "./Dashboard";
import ProfileManagement from "./ProfileManagement";
import ViewEditProfile from "./ViewEditProfile";    
import Students from "./Students";
import EditStudent from "./EditStudent";
import AddStudent from "../components/Addstudents";
import Archivestu from "./Archivestu";
import Faculty from "./Faculty";
import AddFac from "./AddFac";
import EditFaculties from "./Edit-Faculties"; 
import ArchiveFaculty from "../components/ArchiveFaculty";
import Report from "./Report";
import Settings from "./Settings";  
import ListreportStudent from "./Listreport-Student";
import ListreportFaculty from "./ListreportFaculty";
import ListInactiveStudents from "./ListInactive-Students";
import ListInactiveFaculty from "./ListInactive-Faculty";
import AllDepartments from "./AllDepartments";
import AllCourse from "./AllCourse";
import AllAcademicYears from "./AllAcademic-Years";

function Routers() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile-management" element={<ProfileManagement />} />
        <Route path="/view-edit-profile" element={<ViewEditProfile />} />


        <Route path="/students" element={<Students />} />
       <Route path="/editstudent/:id" element={<EditStudent />} /> {/* ✅ Fixed */}
        <Route path="/addstudents" element={<AddStudent />} />
        <Route path="/archivestu" element={<Archivestu />} />


        <Route path="/faculty" element={<Faculty />} />
        <Route path="/addfac" element={<AddFac />} />
        <Route path="/edit-faculty/:id" element={<EditFaculties />} />
        <Route path="/archivefaculty" element={<ArchiveFaculty />} />

        <Route path="/reports" element={<Report />} />
        <Route path="/listreport-student" element={<ListreportStudent />} />
        <Route path="/listreport-faculty" element={<ListreportFaculty />} />
        <Route path="/listinactive-students" element={<ListInactiveStudents />} />
        <Route path="/listinactive-faculty" element={<ListInactiveFaculty />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/all-departments" element={<AllDepartments />} />
        <Route path="/all-courses" element={<AllCourse />} />
        <Route path="/add-academic-year" element={<AllAcademicYears />} />


      </Routes>
    </Router>
  );
}

export default Routers;

// Mount React app (React 17 style)
const root = document.getElementById("root");
if (root) {
  ReactDOM.render(<Routers />, root);
}
