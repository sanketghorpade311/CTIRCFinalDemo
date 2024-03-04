import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Sidebar.css";

const Sidebar = ({ setShowNav }) => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };
  const handleLogout = () => {
    setShowNav(false);
    localStorage.removeItem("accessToken");
    navigate("/Login");
  };
  return (
    <div>
      <div className="SidebarComponent-buttons-container">
        <div className="C-1">
          <Card>
            <h3 style={{ textAlign: "center" }}>CTIRC Scheduler</h3>
          </Card>
          <Link
            style={{ marginTop: "5vh" }}
            to="/"
            onClick={() => handleButtonClick("About")}
            className={`btn btn-outline-primary${
              activeButton === "About" ? " active" : ""
            }`}
          >
            About
          </Link>

          <Link
            style={{ marginTop: "1vh" }}
            to="/Home"
            onClick={() => handleButtonClick("Dashboard")}
            className={`btn btn-outline-primary${
              activeButton === "Dashboard" ? " active" : ""
            }`}
          >
            Dashboard
          </Link>
          <Link
            style={{ marginTop: "1vh" }}
            to="/Calendar"
            onClick={() => handleButtonClick("Calendar")}
            className={`btn btn-outline-primary${
              activeButton === "Calendar" ? " active" : ""
            }`}
          >
            Calendar
          </Link>
          <Link
            style={{ marginTop: "1vh" }}
            to="/Faculty"
            onClick={() => handleButtonClick("Faculty")}
            className={`btn btn-outline-primary${
              activeButton === "Faculty" ? " active" : ""
            }`}
          >
            Faculty
          </Link>
          <Link
            style={{ marginTop: "1vh" }}
            to="/Groups"
            onClick={() => handleButtonClick("Groups")}
            className={`btn btn-outline-primary${
              activeButton === "Groups" ? " active" : ""
            }`}
          >
            Groups
          </Link>
          <Link
            style={{ marginTop: "1vh" }}
            to="/Trainings"
            onClick={() => handleButtonClick("Trainings")}
            className={`btn btn-outline-primary${
              activeButton === "Trainings" ? " active" : ""
            }`}
          >
            Trainings
          </Link>
        </div>
        <div className="C-2">
          <div onClick={handleLogout} className="mb-1 btn btn-outline-primary">
            Logout
          </div>
        </div>

        <Button style={{ display: "none" }}></Button>
      </div>
    </div>
  );
};

export default Sidebar;
