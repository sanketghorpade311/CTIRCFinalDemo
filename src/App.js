import "./App.css";
import React, { useState, useEffect } from "react";
import Sidebar from "./pages/Sidebar/Sidebar";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import CalendarComp from "./pages/Calendar/CalendarComp";
import Faculty from "./pages/Faculty/Faculty";
import Groups from "./pages/Groups/Groups";
import { Trainings } from "./pages/Trainings/Trainings";
import Login from "./pages/Authentication/Login/Login";
import Signup from "./pages/Authentication/Signup/Signup";

function App() {
  const [showNav, setShowNav] = useState(true);
  const location = useLocation().pathname;
  const navigate = useNavigate();

  useEffect(() => {
    if (location === "/login" || location === "/signup") {
      setShowNav(false);
    } else {
      setShowNav(true);
      navigate("/");
    }

    const token = localStorage.getItem("accessToken");
    if (!token && location !== "/signup") {
      setShowNav(false);
      navigate("/Login");
    }
    //eslint-disable-next-line
  }, []);
  return (
    <div>
      <div className="App-Container">
        {showNav && (
          <div className="SideBar-App">
            <Sidebar setShowNav={setShowNav}></Sidebar>
          </div>
        )}
        <Routes>
          <Route
            exact
            path="/Login"
            element={<Login setShowNav={setShowNav} />}
          ></Route>
          <Route
            exact
            path="/Signup"
            element={<Signup setShowNav={setShowNav} />}
          ></Route>
        </Routes>
        {showNav && (
          <div className="MainBody-App">
            <Routes>
              <Route path="/" element={<About />}></Route>
              <Route path="/Home" element={<Home />}></Route>
              <Route path="/Calendar" element={<CalendarComp />}></Route>
              <Route path="/Faculty" element={<Faculty />}></Route>
              <Route path="/Groups" element={<Groups />}></Route>
              <Route path="/Trainings" element={<Trainings />}></Route>
            </Routes>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
