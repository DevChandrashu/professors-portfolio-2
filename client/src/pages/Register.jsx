// src/pages/Register.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Assumes you've created a custom hook

function Register() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { register } = useAuth(); // Get the register function from AuthContext

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the register function from the context
      await register(user);
      // Clear form fields after successful registration
      setUser({
        username: "",
        email: "",
        password: "",
      });
      // Navigate to home (or any page you choose)
      navigate(`/${user.username}`);
    } catch (error) {
      console.error("Registration error:", error);
      // Optionally, display an error message to the user
      alert(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  return (
    <section>
      <main>
        <div className="section-registration">
          <div className="container grid grid-two-cols">
            <div className="registration-image reg-img">
              <img
                src="/images/register.png"
                alt="Registration illustration"
                width="500"
                height="500"
              />
            </div>
            <div className="registration-form">
              <h1 className="main-heading mb-3">Registration Form</h1>
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleInput}
                    placeholder="Enter your username"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleInput}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleInput}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <br />
                <button type="submit" className="btn btn-submit">
                  Register Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}

export default Register;
