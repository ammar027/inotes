import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Alert from "./Alert";
import "../css/Signup.css";

const Signup = ({ handleLogin }) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  // Base URL for API
  const API_URL = "https://inotebook-vusl.onrender.com/api";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = credentials;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/auth/createuser`, {
        name,
        email,
        password,
      });
      localStorage.setItem("token", response.data.authtoken);
      setSuccess("Account created successfully!");
      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      setError(error.response?.data?.error || "Failed to create account.");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-5">
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={credentials.name}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={credentials.confirmPassword}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Signup
        </button>
      </form>

      {/* Display alerts */}
      {error && (
        <Alert message={error} type="error" onClose={() => setError(null)} />
      )}
      {success && (
        <Alert
          message={success}
          type="success"
          onClose={() => setSuccess(null)}
        />
      )}
      {/* Sign up link */}
      <div className="signup-link">
        <span>
          Alredy have an account? <Link to="/login">Login</Link>
        </span>
      </div>
    </div>
  );
};

export default Signup;
