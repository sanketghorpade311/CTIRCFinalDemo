import React, { useEffect, useState } from "react";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup = ({ setShowNav }) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    pass: "",
    confirmpass: "",
  });

  const handleOnChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      if (credentials.pass !== credentials.confirmpass) {
        throw new Error("Passwords are not matching.");
      }
      const email = credentials.email;
      const password = credentials.pass;
      setCredentials({
        email: "",
        pass: "",
        confirmpass: "",
      });
      const user = await createUserWithEmailAndPassword(auth, email, password);
      const token = user.user.accessToken;
      localStorage.setItem("accessToken", token);
      setShowNav(true);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);

    window.onpopstate = function () {
      window.history.pushState(null, "", window.location.href);
    };
  }, []);
  return (
    <div id="body">
      <div
        style={{ maxWidth: "30vw", width: "100%", margin: 0 }}
        className="container bg-dark bg-opacity-75 p-4 rounded custom-box"
      >
        <h2 className="text-center mt-1 text-light signup-text">Signup</h2>
        <form action="/signup" method="POST">
          <div className="mb-4">
            <label htmlFor="name" className="form-label text-light">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="name"
              placeholder="Enter your name"
              required
              onChange={handleOnChange}
              value={credentials.email}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="form-label text-light">
              Password
            </label>
            <input
              type="password"
              name="pass"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              required
              onChange={handleOnChange}
              value={credentials.pass}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label text-light">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmpass"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              required
              onChange={handleOnChange}
              value={credentials.confirmpass}
            />
          </div>
          <div className="btn-box">
            <button
              type="submit"
              className="btn btn-secondary bg-opacity-25 btn-block submit-button"
              onClick={handleSignup}
            >
              Submit
            </button>
            <a href="/login">
              {" "}
              Already a User? <span>Login</span>{" "}
            </a>
          </div>
        </form>
      </div>{" "}
      /
    </div>
  );
};

export default Signup;
