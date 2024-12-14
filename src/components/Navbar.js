import React, { useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../contexts/LoginContext';

const Navbar = () => {
  const { isLoggedIn, logout, user, isDropdownVisible, setIsDropdownVisible } = useLogin();
  const dropdownRef = useRef(null);

  const handleAccountClick = () => {
    setIsDropdownVisible((prevState) => !prevState); // Toggle dropdown
  };

  const handleClickOutside = useCallback((event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownVisible(false); // Close dropdown when clicking outside
    }
  }, [setIsDropdownVisible]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <nav className="bg-white-600 text-blue-800 h-16 flex items-center border-b border-gray-300">
      <div className="container mx-6 flex justify-between items-center">
        <div className="h-full">
          <Link to="/" className="flex items-center h-full">
            <img
              src="/images/logo.jpg"
              alt="IGS Repair Service Logo"
              className="h-full object-contain max-h-10"
            />
          </Link>
        </div>

        <div className="hidden md:flex space-x-6">
          {isLoggedIn ? (
            <>
              <Link to="/workorders" className="text-gray-600 hover:bg-gray-200 hover:text-black px-4 py-2 h-full flex items-center">
                Repair Orders
              </Link>
              <Link to="/tickets" className="text-gray-600 hover:bg-gray-200 hover:text-black px-4 py-2 h-full flex items-center">
                Tickets
              </Link>
              <Link to="/invoices" className="text-gray-600 hover:bg-gray-200 hover:text-black px-4 py-2 h-full flex items-center">
                Invoices
              </Link>

              <div className="relative z-50" ref={dropdownRef}>
                <button
                  onClick={handleAccountClick}
                  className="text-gray-600 hover:bg-gray-200 hover:text-black px-4 py-2 h-full flex items-center"
                >
                  Account
                </button>
                {isDropdownVisible && (
                  <div className="absolute right-0 mt-2 p-2 bg-white text-black shadow-lg border border-gray-200">
                    <p className="px-4 py-2">{`Welcome, ${user?.username || 'User'}`}</p>
                    <button
                      onClick={() => {
                        logout();
                        setIsDropdownVisible(false); // Ensure dropdown is closed on logout
                      }}
                      className="block text-red-600 hover:text-red-800 px-4 py-2 w-full text-left"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-600 hover:bg-gray-200 hover:text-black px-4 py-2 h-full flex items-center"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-gray-600 hover:bg-gray-200 hover:text-black px-4 py-2 h-full flex items-center"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
