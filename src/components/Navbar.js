import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Use react-router-dom for navigation
import { useLogin } from '../contexts/LoginContext';

const Navbar = () => {
  const { isLoggedIn, logout, user } = useLogin(); // Access user from context
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleAccountClick = () => {
    setIsDropdownVisible((prevState) => !prevState); // Toggle dropdown visibility
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to="/">Customer Portal</Link>
        </div>

        <div className="hidden md:flex space-x-6">
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="hover:bg-blue-700 px-4 py-2 rounded">Dashboard</Link>
              <Link to="/workorders" className="hover:bg-blue-700 px-4 py-2 rounded">Work Orders</Link>
              <Link to="/tickets" className="hover:bg-blue-700 px-4 py-2 rounded">Tickets</Link>
              <Link to="/invoices" className="hover:bg-blue-700 px-4 py-2 rounded">Invoices</Link>

              <div className="relative">
                <button onClick={handleAccountClick} className="hover:bg-blue-700 px-4 py-2 rounded">
                  Account
                </button>
                {isDropdownVisible && (
                  <div className="absolute right-0 mt-2 p-2 bg-white text-black rounded-lg shadow-lg">
                    <p className="px-4 py-2">{`Welcome, ${user?.username || 'User'}`}</p> {/* Display username */}
                    <button onClick={logout} className="block text-red-600 hover:text-red-800 px-4 py-2">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:bg-blue-700 px-4 py-2 rounded">Login</Link>
              <Link to="/signup" className="hover:bg-blue-700 px-4 py-2 rounded">Sign Up</Link>
            </>
          )}
        </div>

        <div className="md:hidden flex items-center">
          <button className="text-white">
            <i className="fa fa-bars text-2xl"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
