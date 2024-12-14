import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the LoginContext
const LoginContext = createContext();

// LoginProvider component to provide state and functions to other components
export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // State for dropdown visibility

  // Check localStorage for user info on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedLoginStatus = localStorage.getItem('isLoggedIn');
    
    if (savedUser && savedLoginStatus === 'true') {
      setUser(JSON.parse(savedUser)); // Parse and set user info
      setIsLoggedIn(true); // Set login status to true
    }
  }, []);

  const login = (userInfo) => {
    setIsLoggedIn(true);
    setUser(userInfo);
    
    // Save to localStorage
    localStorage.setItem('user', JSON.stringify(userInfo));
    localStorage.setItem('isLoggedIn', 'true');
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    
    // Clear from localStorage
    localStorage.removeItem('user');
    localStorage.setItem('isLoggedIn', 'false');
  };

  return (
    <LoginContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout,
        isDropdownVisible,
        setIsDropdownVisible,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

// Custom hook to use the LoginContext
export const useLogin = () => useContext(LoginContext);
