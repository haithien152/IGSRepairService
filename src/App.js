import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
        <Navbar useLogin/> {/* Navbar will consume login context */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/workorders" element={<WorkOrders />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </LoginProvider>
  );
}

export default App;
