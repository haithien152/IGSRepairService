import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../contexts/LoginContext";
import { connectSocket, disconnectSocket } from "../components/Socket";

const LoginPage = () => {
  const { login, resetDropdown } = useLogin();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const usernameOrEmailRef = useRef(null);

  useEffect(() => {
    // Focus on input when component mounts
    if (usernameOrEmailRef.current) usernameOrEmailRef.current.focus();

    return () => {
      disconnectSocket();
    };
  }, []);

  useEffect(() => {
    const id = localStorage.getItem("user_id");
    console.log("Stored user_id in localStorage:", id);
    if (id) {
      connectSocket(id);
    }

    return () => {
      disconnectSocket();
    };
  }, []);

  const handleLoginSuccess = (id, username, email) => {
    // Save user data to local storage
    localStorage.setItem("user_id", id);
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmail = emailRegex.test(usernameOrEmail);
    const endpoint = isEmail ? "/user/loginasemail" : "/user/loginasusername";

    try {
      const response = await fetch(`http://127.0.0.1:5000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isEmail
            ? { email: usernameOrEmail, password }
            : { username: usernameOrEmail, password }
        ),
      });

      const data = await response.json();

      if (response.ok && data.message.includes("Login successful")) {
        const { id, username, email } = data;

        // Save user data to React context and local storage
        login({ id, username, email });

        // Handle successful login
        handleLoginSuccess(id, username, email);
        resetDropdown();
        navigate("/"); // Redirect to home page
      } else {
        setErrorMessage(data.message || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("An error occurred while logging in. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
      <div className="absolute top-1/3 transform -translate-y-1/3 bg-white p-8 shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="usernameOrEmail" className="block text-sm font-medium text-gray-700">
              Username or Email
            </label>
            <input
              type="text"
              id="usernameOrEmail"
              ref={usernameOrEmailRef}
              className="w-full p-3 border border-gray-300"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              placeholder="Enter your username or email"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border border-gray-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-3 hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <button
          onClick={() => navigate("/signup")}
          className="w-full mt-4 bg-gray-300 text-gray-700 py-3 hover:bg-gray-400"
        >
          Create an account
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
