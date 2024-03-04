import React, { useEffect, useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = ({ setShowNav }) => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    pass: "",
  });

  const handleOnChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const email = credentials.email;
      const password = credentials.pass;

      const user = await signInWithEmailAndPassword(auth, email, password);
      const token = user.user.accessToken;
      localStorage.setItem("accessToken", token);

      setShowNav(true);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }

    setCredentials({
      email: "",
      pass: "",
    });
  };

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);

    window.onpopstate = function () {
      window.history.pushState(null, "", window.location.href);
    };
  }, []);
  return (
    <div id="body" style={{ backgroundColor: "#fff" }}>
      <div
        style={{ maxWidth: "30vw", width: "100%", margin: 0 }}
        className="bg-dark bg-opacity-75 p-4 rounded custom-box"
      >
        <h2 className="text-center mt-2 text-light login-text">Login</h2>
        <p className="text-light">Use Email : sanketghorpade311@gmail.com</p>
        <p className="text-light">Password : test123</p>
        <form action="/login" method="POST">
          <div className="mt-2 mb-4">
            <label htmlFor="name" className="form-label mb-2 text-light">
              Email
            </label>
            <input
              type="text"
              name="email"
              className="form-control"
              id="name"
              placeholder="Enter your email"
              required
              value={credentials.email}
              onChange={handleOnChange}
            />
          </div>
          <div className="mt-2 mb-4">
            <label htmlFor="password" className="form-label mb-2 text-light">
              Password
            </label>
            <input
              type="password"
              name="pass"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              required
              value={credentials.pass}
              onChange={handleOnChange}
            />
          </div>
          <div className="btn-box">
            <button
              type="submit"
              className="btn btn-primary bg-opacity-25 btn-block submit-button"
              onClick={handleLogin}
            >
              Submit
            </button>
            <a href="/signup">
              {" "}
              Not a User? <span>Signup</span>{" "}
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
