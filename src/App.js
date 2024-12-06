import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import WorkOrders from './pages/WorkOrders';
import Tickets from './pages/Tickets';
import Invoices from './pages/Invoices';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { LoginProvider, useLogin } from './contexts/LoginContext';  // Import LoginContext

function App() {
  return (
    <LoginProvider> {/* Wrap the app with LoginProvider */}
      <Router>
        <Navbar /> {/* Navbar will consume login context */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/workorders" element={<WorkOrders />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/invoices" element={<Invoices />} />
          
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
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default App;
