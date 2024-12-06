import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../contexts/LoginContext';

const LoginPage = () => {
  const { login } = useLogin();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send login request to Flask backend via Ngrok URL
      const response = await fetch('https://d615-12-11-47-202.ngrok-free.app/login', {  // Use Ngrok URL here
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (data.message === `User ${username} logged in successfully!`) {
        // Store the user info in context and localStorage
        login({ username });
        navigate('/dashboard'); // Redirect to dashboard
      } else {
        setErrorMessage(data.message || 'Invalid credentials. Please try again.');
      }

      console.log(data.message);
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('An error occurred while logging in. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
