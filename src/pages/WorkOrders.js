import React, { useState, useEffect } from "react";

const WorkOrders = () => {
  const [workOrders, setWorkOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filters, setFilters] = useState({
    model: "",
    series: "",
    status: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of rows per page

  // Fetch updated data from the server
  const fetchWorkOrdersFromServer = () => {
    const user_id = localStorage.getItem("user_id");
    if (user_id) {
      fetch(`http://127.0.0.1:5000/service/cases/${user_id}`)
        .then((response) => {
          if (!response.ok) throw new Error("Failed to fetch cases.");
          return response.json();
        })
        .then((data) => {
          if (data.cases) {
            localStorage.setItem("cases", JSON.stringify(data.cases));
            setWorkOrders(data.cases); // Update workOrders directly
            setFilteredOrders(data.cases); // Update filteredOrders directly
          } else {
            console.error("Cases key not found in response:", data);
          }
        })
        .catch((error) => {
          console.error("Error fetching cases:", error);
        });
    }
  };

  useEffect(() => {
    // Fetch work orders from the server on component mount
    fetchWorkOrdersFromServer();

    // Event listener for custom "casesUpdated" event
    const handleCustomUpdate = () => {
      console.log("Custom event 'casesUpdated' triggered");
      const storedOrders = localStorage.getItem("cases");
      if (storedOrders) {
        const orders = JSON.parse(storedOrders);
        setWorkOrders(orders);
        setFilteredOrders(orders);
      }
    };

    // Listen for custom events
    window.addEventListener("casesUpdated", handleCustomUpdate);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("casesUpdated", handleCustomUpdate);
    };
  }, []);

  // Extract unique filter values dynamically
  const uniqueValues = (key) => [
    ...new Set(workOrders.map((order) => order[key]).filter((val) => val)),
  ];

  // Update filter and apply
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
    setCurrentPage(1); // Reset to first page on filter change
  };

  // Apply filters when workOrders or filters change
  useEffect(() => {
    const filtered = workOrders.filter((order) => {
      return (
        (filters.model ? order.model === filters.model : true) &&
        (filters.series ? order.series === filters.series : true) &&
        (filters.status ? order.status === filters.status : true)
      );
    });
    setFilteredOrders(filtered);
  }, [filters, workOrders]);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="relative flex flex-col h-screen bg-gray-100">
      {/* Outer Container */}
      <div className="bg-white p-6 shadow-md flex-grow flex flex-col">
        <h1 className="text-2xl font-bold text-left mb-6">Work Orders</h1>

        <div className="flex flex-grow space-x-6">
          {/* Filter Panel */}
          <aside className="w-1/6 p-4 bg-gray-100 border border-gray-300 flex-shrink-0 h-[calc(100%-100px)]">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Model</label>
              <select
                name="model"
                value={filters.model}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 p-2"
              >
                <option value="">All</option>
                {uniqueValues("model").map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Series</label>
              <select
                name="series"
                value={filters.series}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 p-2"
              >
                <option value="">All</option>
                {uniqueValues("series").map((series) => (
                  <option key={series} value={series}>
                    {series}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 p-2"
              >
                <option value="">All</option>
                {uniqueValues("status").map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </aside>

          {/* Table Content */}
          <div className="flex-grow h-[calc(100%-100px)]">
            <div className="overflow-hidden border border-gray-300 bg-gray-50 h-full flex flex-col">
              {currentOrders.length > 0 ? (
                <table className="table-auto w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-300 px-4 py-2 text-left">Case ID</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Device Serial Number</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Brand</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Model</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Series</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Receive Date</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">TAT</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Failure</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentOrders.map((order) => (
                      <tr key={order.caseid} className="hover:bg-gray-100">
                        <td className="border border-gray-300 px-4 py-2">{order.caseid}</td>
                        <td className="border border-gray-300 px-4 py-2">{order.SN}</td>
                        <td className="border border-gray-300 px-4 py-2">{order.brand}</td>
                        <td className="border border-gray-300 px-4 py-2">{order.model || "N/A"}</td>
                        <td className="border border-gray-300 px-4 py-2">{order.series || "N/A"}</td>
                        <td className="border border-gray-300 px-4 py-2">{order.receivedate}</td>
                        <td className="border border-gray-300 px-4 py-2">{order.TAT}</td>
                        <td className="border border-gray-300 px-4 py-2">{order.status}</td>
                        <td className="border border-gray-300 px-4 py-2">{order.failure || "N/A"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center text-gray-500 p-4">No work orders found.</p>
              )}
            </div>
            {/* Pagination Controls Below Table */}
            <div className="mt-2 flex justify-end space-x-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => changePage(index + 1)}
                  className={`text-sm underline ${
                    currentPage === index + 1 ? "font-bold" : ""
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkOrders;

export const triggerUpdateEvent = () => {
  const event = new Event("casesUpdated");
  window.dispatchEvent(event);
};
