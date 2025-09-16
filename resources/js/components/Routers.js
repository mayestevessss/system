import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import profile from "./Profile";
import Profile from "./Profile";

export default function Routers() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

if (document.getElementById("root")) {
  ReactDOM.render(<Routers />, document.getElementById("root"));
}