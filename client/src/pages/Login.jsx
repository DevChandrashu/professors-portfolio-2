// src/pages/Login.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login } = useAuth(); // Use the login function from context

  // Handle changes in input fields
  const handleInput = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials); // Call the login function from context
      alert("Login Successful");
      setCredentials({ email: "", password: "" });
      navigate("/"); // Navigate to the home page or any desired page
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid credentials");
    }
  };

  return (
    <section>
      <main>
        <div className="section-registration">
          <div className="container grid grid-two-cols">
            <div className="registration-image reg-img">
              <img
                src="/images/login.png"
                alt="login to your account"
                width="500"
                height="500"
              />
            </div>
            <div className="registration-form">
              <h1 className="main-heading mb-3">Login Form</h1>
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={credentials.email}
                    onChange={handleInput}
                    placeholder="Email"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleInput}
                    placeholder="Password"
                    required
                  />
                </div>
                <br />
                <button type="submit" className="btn btn-submit">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}

export default Login;
