import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen bg-blue-50">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-3xl">Customer Portal</h1>
      </header>

      {/* Main content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <nav className="w-64 bg-blue-700 text-white p-4">
          <ul>
            <li>
              <Link to="/" className="block py-2">Dashboard</Link>
            </li>
            <li>
              <Link to="/workorders" className="block py-2">Work Orders</Link>
            </li>
            <li>
              <Link to="/tickets" className="block py-2">Tickets</Link>
            </li>
            <li>
              <Link to="/invoices" className="block py-2">Invoices</Link>
            </li>
          </ul>
        </nav>

        {/* Content Area */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
