import React, { createContext, useContext, useState, useEffect } from "react";
import { connectSocket, disconnectSocket } from "../components/Socket";

// Create the LoginContext
const LoginContext = createContext();

// LoginProvider component to provide state and functions to other components
export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // State for dropdown visibility

  // Check localStorage for user info on initial load
  useEffect(() => {
    const savedUserId = localStorage.getItem("user_id");
    const savedUsername = localStorage.getItem("username");
    const savedEmail = localStorage.getItem("email");
    const savedLoginStatus = localStorage.getItem("isLoggedIn");

    if (savedUserId && savedLoginStatus === "true") {
      const parsedUser = {
        user_id: savedUserId,
        username: savedUsername,
        email: savedEmail,
      };
      setUser(parsedUser);
      setIsLoggedIn(true);

      // Connect the socket with the saved user_id
      connectSocket(savedUserId);
    }
  }, []);

  const login = (userInfo) => {
    setIsLoggedIn(true);
    setUser(userInfo);

    // Save individual properties to localStorage
    localStorage.setItem("user_id", userInfo.user_id);
    localStorage.setItem("username", userInfo.username);
    localStorage.setItem("email", userInfo.email);
    localStorage.setItem("isLoggedIn", "true");

    // Connect the socket with the user_id
    connectSocket(userInfo.user_id);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);

    // Clear specific items from localStorage
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.setItem("isLoggedIn", "false");

    // Disconnect the socket
    disconnectSocket();
  };

  const resetDropdown = () => {
    setIsDropdownVisible(false); // Reset dropdown visibility
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
        resetDropdown, // Add the function here
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

// Custom hook to use the LoginContext
export const useLogin = () => useContext(LoginContext);
