import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import WorkOrders from './pages/WorkOrders';
import Tickets from './pages/Tickets';
import Invoices from './pages/Invoices';
import Login from './pages/Login';
import Signup from './pages/Signup';
import QueryPage from './pages/Query';
import Homepage from './pages/Homepage'; // Import the Homepage component
import { LoginProvider, useLogin } from './contexts/LoginContext'; // Import LoginContext

function App() {
  return (
    <LoginProvider> {/* Wrap the app with LoginProvider */}
      <Router>
        <Navbar /> {/* Navbar will consume login context */}
        <ScrollLock /> {/* Component to lock scroll on specific routes */}
        <Routes>
          <Route path="/" element={<Homepage />} /> {/* Set Homepage as default */}
          <Route path="/workorders" element={<WorkOrders />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/query" element={<QueryPage />} />
          
          {/* Redirect to dashboard if user is already logged in */}
          <Route path="/login" element={<RedirectIfLoggedIn><Login /></RedirectIfLoggedIn>} />
          <Route path="/signup" element={<RedirectIfLoggedIn><Signup /></RedirectIfLoggedIn>} />
        </Routes>
      </Router>
    </LoginProvider>
  );
}

// A wrapper component to redirect logged-in users
const RedirectIfLoggedIn = ({ children }) => {
  const { isLoggedIn } = useLogin();
  
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return children;
};

// Scroll Lock Component
const ScrollLock = () => {
  const location = useLocation();

  useEffect(() => {
    const { pathname } = location;
    if (pathname === '/login' || pathname === '/signup') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto'; // Reset on unmount
    };
  }, [location]);

  return null;
};

export default App;
