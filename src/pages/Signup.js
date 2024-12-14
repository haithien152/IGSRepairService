import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const usernameRef = useRef(null); // Reference for the "Username" input field

  useEffect(() => {
    // Focus the "Username" field when the component mounts
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (data.message === `User ${username} signed up successfully!`) {
        alert('Sign up successfully! Please log in.');
        navigate('/login');
      } else {
        setErrorMessage(data.message || 'An error occurred while signing up');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      setErrorMessage('An error occurred while signing up');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
      <div className="absolute top-1/3 transform -translate-y-1/3 bg-white p-8 shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>

        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              ref={usernameRef} // Attach the ref to the "Username" input field
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300"
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border border-gray-300"
              placeholder="Confirm your password"
              required
            />
          </div>

          <button type="submit" className="w-full bg-blue-800 text-white py-3 hover:bg-blue-700">
            Sign Up
          </button>
        </form>

        <button
          onClick={() => navigate('/login')}
          className="w-full mt-4 bg-gray-300 text-gray-700 py-3 hover:bg-gray-400"
        >
          Already have an account?
        </button>
      </div>
    </div>
  );
};

export default Signup;
