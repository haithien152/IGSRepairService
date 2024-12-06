import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WorkOrders = () => {
  const [workOrders, setWorkOrders] = useState([]);

  useEffect(() => {
    axios.get('/workorders').then((response) => {
      setWorkOrders(response.data.workorders);
    });
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-blue-800">Work Orders</h1>
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Order List</h2>
        <ul className="space-y-4">
          {workOrders.map((order, index) => (
            <li key={index} className="border-b py-2">
              <div className="flex justify-between">
                <span>{order.name}</span>
                <span className="text-blue-600">Status: {order.status}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WorkOrders;
