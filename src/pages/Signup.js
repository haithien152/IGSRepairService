import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for page redirection

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initialize navigate hook

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      // Send signup request to Flask backend
      const response = await fetch('https://d615-12-11-47-202.ngrok-free.app/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,  // Sending username
          password,  // Sending password
        }),
      });

      const data = await response.json();

      if (data.message === `User ${username} signed up successfully!`) {
        // Handle successful signup
        console.log('Sign-up successful');
        // Redirect to login page after successful sign-up
        alert('Sign up successfully! Please log in.');
        navigate('/login');  // Navigate back to the login page
      } else {
        // Handle error response
        setErrorMessage(data.message || 'An error occurred while signing up');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      setErrorMessage('An error occurred while signing up');
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4 text-blue-800">Sign Up</h1>
      <div className="max-w-sm mx-auto bg-white p-6 shadow-lg rounded-lg">
        <form onSubmit={handleSignup}>
          {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mt-2"
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mt-2"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mt-2"
              placeholder="Confirm your password"
              required
            />
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
